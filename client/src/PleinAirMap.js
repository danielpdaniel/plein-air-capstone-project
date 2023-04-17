import { GoogleMap, Marker, useLoadScript, InfoWindow } from "@react-google-maps/api"
import { useState, useEffect } from "react";

function PleinAirMap(){

    const [markers, setMarkers] = useState([])
    const [latLng, setLatLng] = useState("")
    

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_PLEIN_AIR_MAP_GOOGLE_MAPS_API_KEY
    });

    useEffect(()=>{
        fetch("/locations")
        .then(r => {
            if(r.ok){
                r.json().then(data => setMarkers(data))
            }
        })
    }, [])
console.log(markers)
    // useEffect(()=>{
    //     console.log(isLoaded)
    // }, [isLoaded])


    // function initMap(): void {
    //     new google.maps.Map(
    //       document.getElementById("map") as HTMLElement,
    //       {
    //         mapId: "8e0a97af9386fef",
    //         center: { lat: 48.85, lng: 2.35 },
    //         zoom: 12,
    //       } as google.maps.MapOptions
    //     );
    //   }
      
    //   declare global {
    //     interface Window {
    //       initMap: () => void;
    //     }
    //   }
    //   window.initMap = initMap;

    return(
        <div>
            <h3>Welcome to the Map!</h3>
            {isLoaded ? 
            <GoogleMap 
            zoom={10} 
            center={{lat: 44, lng: -80}} 
            mapContainerClassName="map-container"
            onClick={(e) => setLatLng(e.latLng)}
            options={{
                mapId: 'c2c10bd1417e4b9c',
                disableDefaultUI: true,
                clickableIcons: false
            }}>
                {/* <Marker className="testMarker" position={{lat: 44, lng: -80}}/> */}
                {markers ? markers.map(marker => <Marker key={marker.longitude+marker.latitude} position={{lat: marker.latitude, lng: marker.longitude}} className="locationMarker"/>) : null}
                {latLng ? <InfoWindow position={latLng}><div>Hehe :3c</div></InfoWindow> : null}
            </GoogleMap>
            :
            <h3>Loading...</h3>}
        </div>
    )
}
export default PleinAirMap
