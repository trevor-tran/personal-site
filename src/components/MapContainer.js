import React from 'react';
import GoogleMap from 'google-map-react';

function MapContainer() {
  const gooKey = "AIzaSyD-sLi2s4Chn_MtQNbuRRiJq-SVLV2Efv0";
  const myZipCode = "98055";
  const handleApiLoaded = (map, maps) => {
    let geocoder = new maps.Geocoder();
    geocoder.geocode({ address: myZipCode}, (result, status) => {
      if (status === maps.GeocoderStatus.OK) {
        map.setCenter(result[0].geometry.location);
        map.fitBounds(result[0].geometry.bounds);
      }
    })
  }
  return (
    <GoogleMap
      bootstrapURLKeys={{ key: gooKey }}
      defaultCenter={[47.608013, -122.335167]}
      defaultZoom={15}
      yesIWantToUseGoogleMapApiInternals
      onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}>
    </GoogleMap>
  );
}

export default MapContainer;