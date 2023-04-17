import { GoogleMap, Marker, useLoadScript, InfoWindow } from "@react-google-maps/api"
import { useState, useEffect, useMemo } from "react";
import NewStudyForm from "./NewStudyForm";
import StudyCard from "./StudyCard";

function PleinAirMap(){

    const [markers, setMarkers] = useState([])
    const [selectedMarker, setSelectedMarker] = useState("")
    const [latLng, setLatLng] = useState("")

    const center = useMemo(() => ({lat: 44, lng: -80}), [])
    

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

    function handleMarkerClick(marker){
        setSelectedMarker(marker)
    }

    return(
        <div>
            <h3>Welcome to the Map!</h3>
            {markers ? markers.map(marker => <p>{marker.lat_lng}</p>): null}
            {isLoaded ? 
            <GoogleMap 
            zoom={10} 
            center={center} 
            mapContainerClassName="map-container"
            onClick={(e) => setLatLng(e.latLng)}
            options={{
                mapId: 'c2c10bd1417e4b9c',
                // disableDefaultUI: true,
                clickableIcons: false
            }}>
                {markers ? markers.map(marker => 
                <Marker key={marker.lat_lng} position={{lat: marker.latitude, lng: marker.longitude}} className="locationMarker" onClick={()=>handleMarkerClick(marker)}>
                    {/* {<InfoWindow 
                    // position={{lat: marker.latitude + .03, lng: marker.longitude}}
                    position={selectedMarker.position}
                    >
                        <div>hiii</div>
                    </InfoWindow>} */}
                </Marker>) 
                    : null}
                {selectedMarker ? 
                <InfoWindow 
                position={{lat: selectedMarker.latitude + .03, lng: selectedMarker.longitude}}
                onCloseClick={()=>{setSelectedMarker("")}}>
                    <StudyCard study={selectedMarker.study}/>
                </InfoWindow>
                : null}
                {latLng ? 
                <InfoWindow position={latLng}>
                    <NewStudyForm latLng={latLng}/>
                </InfoWindow> : null}
            </GoogleMap>
            :
            <h3>Loading...</h3>}
        </div>
    )
}
export default PleinAirMap
