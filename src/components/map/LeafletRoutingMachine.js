import React, { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet-routing-machine";
import { useMap } from "react-leaflet";


const LeafletRoutingMachine = ({field}) => {
  const [longlat,setLongLat] = useState({})

  console.log("field>",field)

  useEffect(()=>{
    setLongLat({lat:field.lat, long:field.long})
  },[field])
  //[getCookie('lat'),getCookie('long')]
  console.log("longlat>",longlat)
  let playerIcon = L.icon({
    iconUrl: "/images/user.png",
    iconSize: [40, 40],
  });
  let fieldIcon = L.icon({
    iconUrl: "/images/restaurant.png",
    iconSize: [40, 40],
  });
  const map = useMap();
 const [remove,setRemove] = useState(0)

 function resetMap() {
  // Remove all layers from the map
  map.eachLayer(function (layer) {
      map.removeLayer(layer);
  });

  // Set the map's view to its initial state
  map.setView([51.505, -0.09], 13);
}

 
  useEffect(() => {


    // if(remove !=0)
    // {
    //   resetMap()
    //   setRemove(1)
    // }
    if(field.userlat!=null)//getCookie('lat')
    {
      var  marker1= L.marker([field.userlat, field.userlong], { icon: playerIcon }).addTo(
        map
      );

   }


   if(longlat.lat !=null)
   {
      L.marker([longlat.lat , longlat.long ],{icon : fieldIcon}).addTo(map);
      console.log("hi")
   }
     if(field.userlat !=null)//getCookie('lat')
     {
      console.log("longlat>11111111111111",longlat)
       var routtt=L.Routing.control({
            waypoints: [
              L.latLng(longlat.lat, longlat.long),
              L.latLng(field.userlat , field.userlong),
            ],
            line: {
              show: false // Hide the route text
            },
            lineOptions: {
              styles: [
                {
                  color: "#03C988",
                  weight: 3,
                  opacity: 0.7,
                },
              ],
            },
            routeWhileDragging: false,
            addWaypoints: false,
            draggableWaypoints: false,
            fitSelectedRoutes: true,
            showAlternatives: false,
          })
            .addTo(map);
     }

      



    
  }, [map,field]); // Include map and hasClicked in the dependencies array for proper effect behavior
  return null;
};

export default LeafletRoutingMachine;