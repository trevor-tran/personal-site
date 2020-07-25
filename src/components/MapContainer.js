import React from 'react';
import GoogleMap from 'google-map-react';

function MapContainer() {
  const gooKey = "AIzaSyD-sLi2s4Chn_MtQNbuRRiJq-SVLV2Efv0";
  const handleApiLoaded = (map, maps) => {
    console.log(map, maps)
   console.log(maps.Geocoder)
   let geocoder = new maps.Geocoder();
   geocoder.geocode({address: "98055"}, (result, status) => {
     map.setCenter(result[0].geometry.location)
     map.fitBounds(result[0].geometry.bounds)
   console.log(result);
   })
  }
  return (
    <GoogleMap
    bootstrapURLKeys={{key: gooKey}}
    defaultCenter={[47.608013, -122.335167]}
    defaultZoom={14}
    yesIWantToUseGoogleMapApiInternals
    onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}>
  </GoogleMap>
  );
}

export default MapContainer;