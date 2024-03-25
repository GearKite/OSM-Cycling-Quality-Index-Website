import { BaseMap } from '@components/BaseMap/BaseMap'
import { $searchParams } from '@components/BaseMap/store'
import { useStore } from '@nanostores/react'
import 'maplibre-gl/dist/maplibre-gl.css'
import { NavigationControl } from 'react-map-gl/maplibre'
import { MapInspector } from './MapInspector'
import { MapSourceCqi } from './MapSourceCqi'
import { validAnzeigeValues, type SearchParamsCqiMap } from './storeCqi'
import { interactiveLayerIdsByGroup } from './layers/layers'
import { Overlay } from './Overlay'

export const CqiMap = () => {
  const params = useStore($searchParams) as SearchParamsCqiMap

  // Guard against invalid "anzeige" param values
  if (!validAnzeigeValues.includes(params.anzeige)) {
    $searchParams.open({ ...params, ...{ anzeige: 'cqi' } })
  }

  return (
    <BaseMap
      initialViewState={{
        longitude: 24.115,
        latitude: 56.94822,
        zoom: 12,
      }}
      interactiveLayerIds={interactiveLayerIdsByGroup[params?.anzeige] || []}
    >
      <MapSourceCqi />
      <NavigationControl showCompass={false} position="top-right" />
      <MapInspector />
      <Overlay />
    </BaseMap>
  )
}
