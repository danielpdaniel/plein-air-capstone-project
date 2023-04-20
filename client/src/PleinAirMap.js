import { GoogleMap, Marker, useLoadScript, InfoWindow } from "@react-google-maps/api"
import { useState, useEffect, useMemo, useContext } from "react";
import NewStudyForm from "./NewStudyForm";
import StudyCard from "./StudyCard";
import { UserContext } from "./context/user";
import { useParams } from "react-router-dom";

function PleinAirMap(){

    const [markers, setMarkers] = useState([])
    const [selectedMarker, setSelectedMarker] = useState("")
    const [latLng, setLatLng] = useState("")
    const [tagFilter, setTagFilter] = useState("")
    const [tagEntry, setTagEntry] = useState("")

    // const params = useParams()
    // console.log(params)

    // const { user, setUser } = useContext(UserContext)

    const center = useMemo(() => ({lat: 44, lng: -80}), [])
    

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_PLEIN_AIR_MAP_GOOGLE_MAPS_API_KEY
    });

    useEffect(()=>{
        if(isLoaded){
            // if(!params.tag_name){
            fetch("/locations")
            .then(r => {
                if(r.ok){
                    r.json().then(data => setMarkers(data))
                }
            })}
        // }
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
                caption: study.caption,
                tags: study.tags
            }
        }

        // const updatedUser = user
        // updatedUser.studies = [study, ...user.studies]
        
        setMarkers([...markers, newMarker])
        setLatLng("")
        // setUser(updatedUser)
    }

    function handleDeleteStudyState(studyId){
        setSelectedMarker("")
        const updatedMarkers = markers.filter(marker => marker.study.id !== studyId)
        setMarkers(updatedMarkers)
    }

    // function handleTagFilter(tagEntry){
    //     console.log(tagEntry)
    //     fetch(`/locations/${tagEntry}`)
    //     .then(r =>{
    //         if(r.ok){
    //             r.json().then(data => {
    //                 // const updatedMarkers = data.filter(study => study.location_id)
    //                 setMarkers(data)
    //                 // setMarkers(updatedMarkers)
    //                 setLatLng("")
    //                 setSelectedMarker("")
    //             })
    //         }
    //     })
    // }

    useEffect(()=>{
        console.log(tagEntry)
        fetch(`/locations/${tagEntry}`)
        .then(r =>{
            if(r.ok){
                r.json().then(data => {
                    // const updatedMarkers = data.filter(study => study.location_id)
                    setMarkers(data)
                    // setMarkers(updatedMarkers)
                    setLatLng("")
                    setSelectedMarker("")
                })
            }
        })
    }, [tagEntry])

    

    return(
        <div>
            <h3>Welcome to the Map!</h3>
            {tagEntry ? 
            <button className="studyEditTags" onClick={()=>setTagEntry("")}>{tagEntry}  X</button> 
            : 
            <form onSubmit={(e)=>{e.preventDefault(); setTagEntry(tagFilter)}}>
                <input type="text" value={tagFilter} onChange={(e)=> setTagFilter(e.target.value)} placeholder="seach tag here..." />
                <input type="submit" value="search tag"/>
            </form>}

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
                    onTagClick = {setTagEntry}
                    />
                </InfoWindow>
                : null}
                {latLng ? 
                <InfoWindow position={latLng} onCloseClick={()=>setLatLng("")}>
                    <NewStudyForm latLng={latLng} onNewMapStudyState={handleNewStudyState}/>
                </InfoWindow> : null}
            </GoogleMap>
            :
            <h3>Loading...</h3>}
        </div>
    )
}
export default PleinAirMap
