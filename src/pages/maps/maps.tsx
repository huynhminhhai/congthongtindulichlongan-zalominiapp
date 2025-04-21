import L from 'leaflet';
import React, { useEffect, useRef, useState } from 'react';

import 'leaflet/dist/leaflet.css';
import 'leaflet-search/dist/leaflet-search.min.css';
import 'swiper/css';

import { Icon } from '@iconify/react';
import { Button } from 'antd';
import { useGetCategoryListHasMap } from 'apiRequest/categories';
import { useGetPostsList } from 'apiRequest/posts';
import { PostType } from 'apiRequest/posts/types';
import images from 'assets/images';
import classNames from 'classnames';
import { HeaderSub } from 'components/HeaderSub';
import { openUrlInWebview } from 'services/zalo';
import { useStoreApp } from 'store/store';
import { Swiper, SwiperSlide } from 'swiper/react';
import { formatImageSrc } from 'utils';
import { Box, Page } from 'zmp-ui';

import CategoryItem from './CategoryItem';
import styles from './Maps.module.scss';
import ServiceItem from './ServiceItem';
import ServiceItemSkeleton from './ServiceItemSkeleton';

interface Location {
  lat: number;
  lng: number;
  name: string;
  address: string;
  image: string;
}

interface Icons {
  [key: string]: string;
}

const ResidentMapPage = () => {
  const { currentLanguage } = useStoreApp();
  const t = currentLanguage.value;
  const [isMapReady, setIsMapReady] = useState(false);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.LayerGroup>(L.layerGroup());

  const [activeTab, setActiveTab] = useState<number>();
  const { data: categories } = useGetCategoryListHasMap();
  const { data: postListData, isLoading } = useGetPostsList(
    {
      page: 1,
      size: 100,
      categoryId: activeTab,
    },
    {
      enabled: !!activeTab,
    }
  );

  const icons: Icons = {
    tourist: images.markerTravel,
    restaurant: images.markerRestaurant,
    hotel: images.markerHotel,
    bus: images.markerBus,
    atm: images.markerAtm,
    hospital: images.markerHospital,
    oil: images.markerOil,
    taxi: images.markerTaxi,
    shopping: images.markerShopping,
  };

  const locations = postListData?.pages[0]?.items || [];
  const initializeMap = async () => {
    await import('leaflet-search');

    if (mapRef.current) return;

    const mapContainer = document.getElementById('map');
    if (!mapContainer) return;

    const map = L.map(mapContainer).setView([10.5333, 106.4167], 10);

    L.tileLayer('https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      attribution: '&copy; <a href="https://www.google.com/maps">Google Maps</a>',
    }).addTo(map);

    const markers = L.layerGroup().addTo(map);

    mapRef.current = map;
    markersRef.current = markers;

    addSearchControl();
    setIsMapReady(true);
  };

  useEffect(() => {
    let isMounted = true;

    initializeMap();

    return () => {
      isMounted = false;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        setIsMapReady(false);
      }
    };
  }, []);

  useEffect(() => {
    if (categories && categories.length > 0) {
      setActiveTab(categories[0].id);
    }
  }, [categories]);

  useEffect(() => {
    if (isMapReady) {
      loadMarkers();
    }
  }, [postListData, activeTab, isMapReady]);

  const loadMarkers = () => {
    if (!mapRef.current || locations.length === 0) return;

    markersRef.current.clearLayers();

    const icon = L.icon({
      iconUrl: icons['tourist'],
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    });

    const boundsArray: [number, number][] = [];

    locations.forEach((item: PostType) => {
      item.postMaps?.forEach((point: Location) => {
        const marker = L.marker([point.lat, point.lng], {
          icon,
          title: point.name,
        }).addTo(markersRef.current).bindPopup(`
            <div style="width: 180px">
              <div class="card-img">
                <img style="width: 100%; height: 100px" src="${formatImageSrc(point.image)}" alt="${point.name}" />
              </div>
              <div style="padding-block: 6px;">
                <div style="color: #355933; font-size: 15px; font-weight: 600; margin-bottom: 2px;">${point.name}</div>
                <div style="font-size: 11px;">
                  <div style="margin-bottom: 4px;"><strong>${t['Address']}:</strong> ${point.address}</div>
                  <button style="line-height: 1; padding: 6px; background-color: #355933; border-radius: 4px; color: #fff;" class="google-maps-link">${t['Directions']}</button>
                </div>
              </div>
            </div>
          `);

        marker.on('popupopen', () => {
          const popupEl = (marker.getPopup() as any).getElement();
          const button = popupEl?.querySelector('.google-maps-link');
          if (button) {
            button.addEventListener('click', () => openGoogleMaps(point.lat, point.lng));
          }
        });

        boundsArray.push([point.lat, point.lng]);
      });
    });

    if (boundsArray.length > 0) {
      const bounds = L.latLngBounds(boundsArray);
      mapRef.current.fitBounds(bounds, {
        paddingTopLeft: [0, 100],
        maxZoom: 14,
      });
    }
  };

  const openGoogleMaps = async (lat: number, lng: number) => {
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    await openUrlInWebview(googleMapsUrl, 'bottomSheet');
  };

  const addSearchControl = () => {
    if (!mapRef.current) return;

    const SearchControl = (L.Control as any).Search;

    if (!SearchControl) {
      console.error('Leaflet Search plugin is not loaded.');
      return;
    }

    const searchControl = new SearchControl({
      layer: markersRef.current,
      initial: false,
      propertyName: 'title',
      marker: false,
      caseSensitive: false,
      filter: function (searchText: string, marker: any) {
        return marker.options.title.toLowerCase().includes(searchText.toLowerCase());
      },
      moveToLocation: function (latlng: L.LatLng, name: string, map: L.Map) {
        map.setView(latlng, 15);
        markersRef.current.eachLayer((layer: any) => {
          if ((layer as L.Marker).options.title === name) {
            (layer as L.Marker).openPopup();
          }
        });
      },
      textPlaceholder: 'Tìm kiếm địa điểm...',
      textErr: 'Không tìm thấy địa điểm',
      textCancel: 'Hủy',
    });

    mapRef.current.addControl(searchControl);
  };

  const handleItemClick = (lat: number, lng: number) => {
    if (!mapRef.current || !lat || !lng) return;

    mapRef.current.setView([lat, lng], 15);

    markersRef.current.eachLayer((marker: any) => {
      const markerLatLng = marker.getLatLng();

      if (markerLatLng.lat === Number(lat) && markerLatLng.lng === Number(lng)) {
        marker.openPopup();
      }
    });
  };

  return (
    <Page className="relative flex-1 flex flex-col bg-white">
      <Box>
        <HeaderSub title={t['Map']} />
        <div className="map-wrap">
          <div className="sidebar">
            <div className={styles.categoryList}>
              {categories?.map((cate, index) => (
                <CategoryItem
                  key={index}
                  active={activeTab === cate.id}
                  icon={cate.icon}
                  title={cate.name}
                  onClick={() => setActiveTab(cate.id)}
                />
              ))}
            </div>
          </div>
          <div className="relative">
            <div className={classNames(styles.map, 'h-[calc(100vh-175px)] w-full rounded-lg z-10')} id="map" />
            <div className={styles.serviceListWrapper}>
              <div className={styles.actionWrapper}></div>
              <Swiper className={styles.serviceList} slidesPerView={1.08} spaceBetween={12}>
                {isLoading
                  ? Array.from({ length: 4 }).map((_, index) => (
                      <SwiperSlide key={index}>
                        <ServiceItemSkeleton />
                      </SwiperSlide>
                    ))
                  : locations.map((location: PostType) => {
                      if (location.postMaps.length > 0) {
                        return location.postMaps.map((postMap, index) => {
                          return (
                            <SwiperSlide key={index}>
                              <ServiceItem
                                rating={location.averageRating}
                                name={postMap.name}
                                address={postMap.address}
                                image={postMap.image}
                                totolVote={location.totalVotes}
                                onClick={() => handleItemClick(postMap.lat, postMap.lng)}
                              />
                            </SwiperSlide>
                          );
                        });
                      }
                      return;
                    })}
              </Swiper>
            </div>
          </div>
        </div>
      </Box>
    </Page>
  );
};

export default ResidentMapPage;
