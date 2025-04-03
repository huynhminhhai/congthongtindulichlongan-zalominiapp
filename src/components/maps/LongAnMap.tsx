import React, { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { Tabs } from 'zmp-ui'
import 'leaflet-search/dist/leaflet-search.min.css'
import images from 'assets/images'
import { openUrlInWebview } from 'services/zalo'
import { useTranslation } from 'react-i18next'
import { LOCATION_DATA_FAKE } from 'utils/data'

interface Location {
  lat: number
  lng: number
  name: string
  address: string
  img: string
}

interface Locations {
  [key: string]: Location[]
}

interface Icons {
  [key: string]: string
}

const LongAnMap: React.FC = () => {
  const mapRef = useRef<L.Map | null>(null)
  const markersRef = useRef<L.LayerGroup>(L.layerGroup())
  const [activeTab, setActiveTab] = React.useState<string>('tourist')
  const { t } = useTranslation('common')
  const locations = LOCATION_DATA_FAKE

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
  }

  useEffect(() => {
    import('leaflet-search')
      .then(() => {
        if (!mapRef.current) {
          mapRef.current = L.map('map').setView([10.5333, 106.4167], 10)
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
          }).addTo(mapRef.current)

          markersRef.current.addTo(mapRef.current)
        }
        loadMarkers(activeTab)
        addSearchControl()
      })
      .catch((err) => {
        console.error('Failed to load leaflet-search:', err)
      })

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [activeTab])

  const loadMarkers = (type: string) => {
    if (!mapRef.current) return

    markersRef.current.clearLayers()

    const icon = L.icon({
      iconUrl: icons[type],
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    })

    const items = locations[type]

    if (items.length === 0) {
      mapRef.current.setView([10.5333, 106.4167], 10)
      return
    }

    const bounds = L.latLngBounds(
      items.map((item: Location) => [item.lat, item.lng])
    )

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
        `)

      marker.on('popupopen', () => {
        const googleMapsLink = (marker.getPopup() as any)
          .getElement()
          ?.querySelector('.google-maps-link')
        if (googleMapsLink) {
          googleMapsLink.addEventListener('click', () =>
            openGoogleMaps(item.lat, item.lng)
          )
        }
      })
    })

    if (bounds.isValid()) {
      mapRef.current.fitBounds(bounds, {
        paddingTopLeft: [0, 100],
        maxZoom: 14,
      })
    }
  }

  const openGoogleMaps = async (lat, lng) => {
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`
    await openUrlInWebview(googleMapsUrl, 'bottomSheet') // Sử dụng hàm openUrlInWebview để mở Google Maps
  }

  const addSearchControl = () => {
    if (!mapRef.current) return

    const SearchControl = (L.Control as any).Search

    if (!SearchControl) {
      console.error('Leaflet Search plugin is not loaded.')
      return
    }

    const searchControl = new SearchControl({
      layer: markersRef.current,
      initial: false,
      propertyName: 'title',
      marker: false,
      caseSensitive: false,
      filter: function (searchText: string, marker: any) {
        return (
          marker.options.title
            .toLowerCase()
            .indexOf(searchText.toLowerCase()) !== -1
        )
      },
      moveToLocation: function (latlng: L.LatLng, name: string, map: L.Map) {
        map.setView(latlng, 15)
        markersRef.current.eachLayer(function (layer: any) {
          if ((layer as L.Marker).options.title === name) {
            ;(layer as L.Marker).openPopup()
          }
        })
      },
      textPlaceholder: 'Tìm kiếm địa điểm...',
      textErr: 'Không tìm thấy địa điểm',
      textCancel: 'Hủy',
    })

    mapRef.current.addControl(searchControl)
  }

  const handleItemClick = (lat: number, lng: number) => {
    if (!mapRef.current) return

    mapRef.current.setView([lat, lng], 15)
    markersRef.current.eachLayer((marker: any) => {
      const markerLatLng = marker.getLatLng()
      if (markerLatLng.lat === lat && markerLatLng.lng === lng) {
        marker.openPopup()
      }
    })
  }

  return (
    <div className="map-wrap">
      <div className="sidebar">
        <Tabs
          activeKey={activeTab}
          onChange={(key) => setActiveTab(key)}
          scrollable
        >
          {Object.keys(icons).map((type: string) => (
            <Tabs.Tab
              key={type}
              label={
                <img
                  src={icons[type]}
                  alt={type}
                  className="tab-icon w-[52px]"
                />
              }
            ></Tabs.Tab>
          ))}
        </Tabs>
      </div>
      <div id="map" style={{ height: '500px' }}></div>
      <div className="p-2 flex flex-col gap-2 max-h-[220px] overflow-y-auto mb-2">
        {locations[activeTab].map((item: Location, index: number) => (
          <div
            key={index}
            className="flex gap-2"
            onClick={() => handleItemClick(item.lat, item.lng)}
          >
            <img
              className="w-[100px] h-[60px] object-cover"
              src={item.img}
              alt={item.name}
            />
            <div className="flex-1">
              <div className="text-[16px] leading-[24px] font-bold text-[#355933] line-clamp-1">
                {item.name}
              </div>
              <div className="text-[12px] leading-[16px] font-medium line-clamp-2">
                {item.address}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LongAnMap
