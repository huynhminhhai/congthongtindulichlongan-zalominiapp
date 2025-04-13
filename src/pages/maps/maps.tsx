import L from 'leaflet';
import React, { useEffect, useRef } from 'react';

import 'leaflet/dist/leaflet.css';

import { Box, Page, Tabs } from 'zmp-ui';

import 'leaflet-search/dist/leaflet-search.min.css';

import images from 'assets/images';
import { HeaderSub } from 'components/header-sub';
import { useTranslation } from 'react-i18next';
import { openUrlInWebview } from 'services/zalo';
import { Swiper, SwiperSlide } from 'swiper/react';
import { LOCATION_DATA_FAKE } from 'utils/data';

import CategoryItem from './CategoryItem';
import styles from './Maps.module.scss';
import ServiceItem from './ServiceItem';

import 'swiper/css';

import { Icon } from '@iconify/react';
import { Button } from 'antd';
import { useGetCategoryListHasMap } from 'apiRequest/categories';
import { useGetPostsList } from 'apiRequest/posts';
import { PostType } from 'apiRequest/posts/types';

import ServiceItemSkeleton from './ServiceItemSkeleton';

interface Location {
  lat: number;
  lng: number;
  name: string;
  address: string;
  img: string;
  rating: number;
}

interface Icons {
  [key: string]: string;
}

const ResidentMapPage = () => {
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.LayerGroup>(L.layerGroup());
  const [activeTab, setActiveTab] = React.useState<number>();

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
  const { t } = useTranslation('common');

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
  // const categories = [
  //   { key: 'tourist', icon: 'material-symbols:tour-rounded', title: 'Tourist' },
  //   {
  //     key: 'restaurant',
  //     icon: 'ion:restaurant-sharp',
  //     title: 'Restaurant',
  //   },
  //   { key: 'hotel', icon: 'mingcute:hotel-fill', title: 'Hotel' },
  //   { key: 'bus', icon: 'bxs:bus', title: 'Bus' },
  //   { key: 'atm', icon: 'map:atm', title: 'Atm' },
  //   { key: 'hospital', icon: 'uis:hospital', title: 'Hospital' },
  //   { key: 'oil', icon: 'maki:fuel', title: 'Oil' },
  //   { key: 'taxi', icon: 'bxs:taxi', title: 'Taxi' },
  //   { key: 'shopping', icon: 'icon-park-solid:shopping', title: 'Shopping' },
  // ];
  const locations = postListData?.pages[0].items || 0;
  useEffect(() => {
    import('leaflet-search')
      .then(() => {
        if (!mapRef.current) {
          mapRef.current = L.map('map').setView([10.5333, 106.4167], 10);
          L.tileLayer('https://{s}.tile.openstreetmap.de/{z}/{x}/{y}.png', {
            maxZoom: 19,
          }).addTo(mapRef.current);

          markersRef.current.addTo(mapRef.current);
        }
        loadMarkers(activeTab);
        addSearchControl();
      })
      .catch(err => {
        console.error('Failed to load leaflet-search:', err);
      });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [activeTab]);

  const loadMarkers = (type: string) => {
    if (!mapRef.current && !locations) return;

    markersRef.current.clearLayers();

    const icon = L.icon({
      iconUrl: icons[type],
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    });

    const items = locations[type];

    if (items.length === 0) {
      mapRef.current.setView([10.5333, 106.4167], 10);
      return;
    }

    const bounds = L.latLngBounds(items.map((item: Location) => [item.lat, item.lng]));

    items.forEach((item: Location) => {
      const marker = L.marker([item.lat, item.lng], {
        icon,
        title: item.name,
      }).addTo(markersRef.current).bindPopup(`
            <div style="width: 180px">
              <div class="card-img">
                <img style="width: 100%; height: 100px" src="${item.img}" alt="${item.name}" />
              </div>
              <div style="padding-block: 6px;">
                <div style="color: #355933; font-size: 15px; font-weight: 600; margin-bottom: 2px;">${item.name}</div>
                <div style="font-size: 11px;">
                  <div style="margin-bottom: 4px;"><strong>${t('address')}:</strong> ${item.address}</div>
                  <button style="line-height: 1; padding: 6px; background-color: #355933; border-radius: 4px; color: #fff;" class="google-maps-link">${t('directions')}</button>
                </div>
              </div>
            </div>
          `);

      marker.on('popupopen', () => {
        const googleMapsLink = (marker.getPopup() as any).getElement()?.querySelector('.google-maps-link');
        if (googleMapsLink) {
          googleMapsLink.addEventListener('click', () => openGoogleMaps(item.lat, item.lng));
        }
      });
    });

    if (bounds.isValid()) {
      mapRef.current.fitBounds(bounds, {
        paddingTopLeft: [0, 100],
        maxZoom: 14,
      });
    }
  };

  const openGoogleMaps = async (lat, lng) => {
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    await openUrlInWebview(googleMapsUrl, 'bottomSheet'); // Sử dụng hàm openUrlInWebview để mở Google Maps
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
        return marker.options.title.toLowerCase().indexOf(searchText.toLowerCase()) !== -1;
      },
      moveToLocation: function (latlng: L.LatLng, name: string, map: L.Map) {
        map.setView(latlng, 15);
        markersRef.current.eachLayer(function (layer: any) {
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
    if (!mapRef.current) return;

    mapRef.current.setView([lat, lng], 15);
    markersRef.current.eachLayer((marker: any) => {
      const markerLatLng = marker.getLatLng();
      if (markerLatLng.lat === lat && markerLatLng.lng === lng) {
        marker.openPopup();
      }
    });
  };
  useEffect(() => {
    if (categories) {
      setActiveTab(categories[0].id);
    }
  }, [categories]);
  return (
    <Page className="relative flex-1 flex flex-col bg-white ">
      <Box>
        <HeaderSub title="Bản đồ" />
        <div className="map-wrap">
          <div className="sidebar">
            <div className={styles.categoryList}>
              {categories &&
                categories.map((cate, index) => {
                  return (
                    <CategoryItem
                      active={activeTab === cate.id}
                      key={index}
                      icon={cate.icon}
                      title={cate.name}
                      onClick={() => setActiveTab(cate.id)}
                    />
                  );
                })}
            </div>
          </div>
          <div className="relative">
            <div className={styles.map} id="map" style={{ height: 'calc(100vh - 175px)' }}></div>

            <div className={styles.serviceListWrapper}>
              <div className={styles.actionWrapper}>
                {/* <Button className={styles.showListButton}>
                  <Icon icon="lucide:list"></Icon>
                  <p>Danh sách</p>
                </Button> */}
                <Button className={styles.getCurrentLocationButton}>
                  <Icon icon="teenyicons:location-outline" />
                </Button>
              </div>
              {/* <Button className={styles.findNearButton}>
                Tìm kiếm khu vực này
              </Button> */}
              <Swiper className={styles.serviceList} slidesPerView={1.08} spaceBetween={12}>
                {isLoading
                  ? Array.from({ length: 4 }).map((_, index) => (
                      <SwiperSlide key={index}>
                        <ServiceItemSkeleton />
                      </SwiperSlide>
                    ))
                  : locations &&
                    locations.map((item: PostType, index: number) => (
                      <SwiperSlide key={index}>
                        <ServiceItem
                          rating={item.averageRating}
                          name={item.title}
                          address={item.address}
                          image={item.image}
                          totolVote={item.totalVotes}
                          onClick={() => handleItemClick(item.lat, item.lng)}
                        />
                      </SwiperSlide>
                    ))}
              </Swiper>
            </div>
          </div>
        </div>
      </Box>
    </Page>
  );
};

export default ResidentMapPage;
