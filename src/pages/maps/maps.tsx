import React, { useCallback, useState } from 'react'
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  LayersControl,
  useMap,
} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { Box, Page, Sheet } from 'zmp-ui'
import { HeaderSub } from 'components/header-sub'
import 'leaflet.heat'
import { LegendNote, LongAnMap } from 'components/maps'
import { Icon } from '@iconify/react'

const generateResidents = (count: number) => {
  const statuses = [
    'Hộ nghèo',
    'Hộ cận nghèo',
    'Gia đình văn hóa',
    'Gia đình chưa văn hóa',
  ]
  const randomOffset = () => (Math.random() - 0.5) * 0.016

  return Array.from({ length: count }, (_, id) => ({
    id: id + 1,
    name: `Trần Văn ${String.fromCharCode(65 + (id % 26))}`,
    lat: 10.633 + randomOffset(),
    lng: 106.501 + randomOffset(),
    status: statuses[Math.floor(Math.random() * statuses.length)],
  }))
}

const HeatmapLayer = ({ residents }) => {
  const map = useMap()

  React.useEffect(() => {
    const heatData = residents.map((res) => [res.lat, res.lng, 0.5])
    const heatLayer = (L as any)
      .heatLayer(heatData, { radius: 25, blur: 15, maxZoom: 17 })
      .addTo(map)
    return () => {
      map.removeLayer(heatLayer)
    }
  }, [map, residents])

  return null
}

const ResidentMapPage = () => {
  const [sheetVisible, setSheetVisible] = useState(false)
  const [filter, setFilter] = useState<
    'poor' | 'culture' | 'heatmap' | 'heatmap2'
  >('poor')

  const handleSetFilter = useCallback(
    (value: 'poor' | 'culture' | 'heatmap' | 'heatmap2') => {
      setFilter(value)
    },
    []
  )

  const residents = generateResidents(500)

  const filteredResidents = residents.filter((res) => {
    if (filter === 'poor')
      return res.status === 'Hộ nghèo' || res.status === 'Hộ cận nghèo'
    if (filter === 'culture')
      return (
        res.status === 'Gia đình văn hóa' ||
        res.status === 'Gia đình chưa văn hóa'
      )
    return false
  })

  const center: [number, number] = [10.633159564692495, 106.50086913625947]
  const zoom = 14

  const getMarkerIcon = (status: string) => {
    const color =
      {
        'Hộ nghèo': 'red',
        'Hộ cận nghèo': 'orange',
        'Gia đình văn hóa': 'green',
        'Gia đình chưa văn hóa': 'blue',
      }[status] || 'blue'

    return L.icon({
      iconUrl: `https://maps.google.com/mapfiles/ms/icons/${color}-dot.png`,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
    })
  }

  return (
    <Page className="relative flex-1 flex flex-col bg-white">
      <Box>
        <HeaderSub title="Bản đồ" />

        <Box>
          <LongAnMap />
        </Box>
      </Box>
    </Page>
  )
}

export default ResidentMapPage
