import { useEffect, useState } from "react";
import L from "leaflet";
import { useMap } from "react-leaflet";

const LeafletGeocoder = ({onLocationSelect}) => {
  const map = useMap();
  const [markerCount, setMarkerCount] = useState(0);
  let marker = null;
  useEffect(() => {
    L.Control.geocoder({
      defaultMarkGeocode: false,
    })
      .on("markgeocode", function (e) {
        var latlng = e.geocode.center;
        console.log(latlng);
        onLocationSelect(latlng)
        if (marker) {
          marker.setLatLng(latlng);
        } else {
          marker = L.marker(latlng, { draggable: true })
            .addTo(map)
            .bindPopup(e.geocode.name)
            .openPopup();
        }
        map.fitBounds(e.geocode.bbox);
        marker.on("dragend", function (e) {
          latlng = e.target.getLatLng();
          onLocationSelect(latlng);
        });
      })
      .addTo(map);

  }, []);

  useEffect(() => {

    const addMarker = (e) => {
      if (markerCount === 0) {
        setMarkerCount(1);
        var latlng = e.latlng;
        onLocationSelect(latlng);
        if (marker) {
          marker.setLatLng(latlng);
        } else {
          marker = L.marker(latlng, { draggable: true })
            .addTo(map)
            .bindPopup("Drag to your Location")
            .openPopup();
        }
        marker.on("dragend", function (e) {
          latlng = e.target.getLatLng();
          onLocationSelect(latlng);
        });
      }
    };
    map.on("click", addMarker);
    return () => {
      map.off("click", addMarker);
    };
  }, [markerCount, map]);
  return null;
};

export default LeafletGeocoder;