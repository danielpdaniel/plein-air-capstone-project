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

    function handleNewStudyState(study){
        const location = study.location
        const newMarker = {
            id: location.id,
            lat_lng: location.lat_lng,
            latitude: location.latitude,
            longitude: location.longitude,
            study: {
                id: study.id,
                user_id: study.user_id,
                attached_images: study.attached_images,
                caption: study.caption
            }
        }
        // console.log(markers[0])
        // console.log(newMarker)
        setMarkers([...markers, newMarker])
        setLatLng("")
    }

    function handleDeleteStudyState(studyId){
        setSelectedMarker("")
        const updatedMarkers = markers.filter(marker => marker.study.id !== studyId)
        setMarkers(updatedMarkers)
    }

    

    return(
        <div>
            <h3>Welcome to the Map!</h3>
            {isLoaded ? 
            <GoogleMap 
            zoom={10} 
            center={center} 
            mapContainerClassName="map-container"
            onClick={(e) => setLatLng(e.latLng)}
            options={{
                mapId: 'c2c10bd1417e4b9c',
                disableDefaultUI: true,
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
                className="studyInfoWindow"
                maxWidth={10}
                position={{lat: selectedMarker.latitude + .03, lng: selectedMarker.longitude}}
                onCloseClick={()=>{setSelectedMarker("")}}>
                    <StudyCard 
                    study={selectedMarker.study} 
                    studyClassName="mapStudyCard"
                    onDeleteStudy={handleDeleteStudyState}
                    />
                </InfoWindow>
                : null}
                {latLng ? 
                <InfoWindow position={latLng}>
                    <NewStudyForm latLng={latLng} onNewStudyState={handleNewStudyState}/>
                </InfoWindow> : null}
            </GoogleMap>
            :
            <h3>Loading...</h3>}
        </div>
    )
}
export default PleinAirMap
