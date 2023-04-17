import { GoogleMap, Marker, useLoadScript, InfoWindow } from "@react-google-maps/api"
import { useState, useEffect } from "react";
import NewStudyForm from "./NewStudyForm";

function PleinAirMap(){

    const [markers, setMarkers] = useState([])
    const [latLng, setLatLng] = useState("")
    

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_PLEIN_AIR_MAP_GOOGLE_MAPS_API_KEY
    });

    useEffect(()=>{
        if(isLoaded){
        fetch("/locations")
        .then(r => {
            if(r.ok){
                r.json().then(data => setMarkers(data))
            }
        })}
    }, [isLoaded])

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
            {markers ? markers.map(marker => <p>{marker.lat_lng}</p>): null}
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
                {markers ? markers.map(marker => <Marker key={marker.lat_lng} position={marker.lat_lng} className="locationMarker"/>) : null}
                {latLng ? <InfoWindow position={latLng}><NewStudyForm latLng={latLng}/></InfoWindow> : null}
            </GoogleMap>
            :
            <h3>Loading...</h3>}
        </div>
    )
}
export default PleinAirMap
