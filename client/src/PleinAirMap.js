import { GoogleMap, Marker, useLoadScript, InfoWindow } from "@react-google-maps/api"
import { useState, useEffect, useMemo, useContext } from "react";
import NewStudyForm from "./NewStudyForm";
import StudyCard from "./StudyCard";
import { UserContext } from "./context/user";
import EditStudyForm from "./EditStudyForm";

function PleinAirMap(){

    const {user, setUser} = useContext(UserContext)

    const [markers, setMarkers] = useState([])
    const [selectedMarker, setSelectedMarker] = useState("")
    const [latLng, setLatLng] = useState("")
    const [tagFilter, setTagFilter] = useState("")
    const [tagEntry, setTagEntry] = useState("")

    const [studyEdit, setStudyEdit] = useState("")

    const center = useMemo(() => ({lat: 15, lng: 0}), [])
    
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
        setStudyEdit("")
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
                tags: study.tags,
                created_at: study.created_at,
                author_username: user.username
            }
        }
        
        setMarkers([...markers, newMarker])
        setLatLng("")
  
    }

    function handleDeleteStudyState(studyId){
        setSelectedMarker("")

        const updatedMarkers = markers.filter(marker => marker.study.id !== studyId)
        setMarkers(updatedMarkers)

        const updatedStudies = user.studies.filter(study => study.id !== studyId)

        const updatedUser = {...user}
        updatedUser.studies = updatedStudies
  
        setUser(updatedUser)

    }

    useEffect(()=>{

        fetch(`/locations/${tagEntry}`)
        .then(r =>{
            if(r.ok){
                r.json().then(data => {
                    setMarkers(data)
                    setLatLng("")
                    setSelectedMarker("")
                })
            }
        })
    }, [tagEntry])

    function handleStudyEdit(editedStudy){
        const updatedMarkers = markers.map(marker =>{
            if(marker.study.id === editedStudy.id){
                marker.study = editedStudy
                return marker
            }else{
                return marker
            }
        })
        setMarkers(updatedMarkers)
    
        const updatedUser = {...user}
        updatedUser.studies = updatedUser.studies.map(study =>{
            if(study.id === editedStudy.id){
                return editedStudy
            }else{
                return study
            }
        })
        setUser(updatedUser)
    }

    function handleNewComment(comment){
        if(comment.study_author_id === user.id){
            const updatedStudies = []
            user.studies.map(study =>{
                if(study.id === comment.study_id){
                    study.comments = [...study.comments, comment]
                    updatedStudies.push(study)
                }else{
                    updatedStudies.push(study)
                }
            })

            const updatedUser = {...user}
            updatedUser.studies = updatedStudies
            setUser(updatedUser)
        }

        const updatedMarkers = markers.map(marker => {
            if(marker.study.id === comment.study_id){
                marker.study.comments = [...marker.study.comments, comment]
                return marker
            }else{
                return marker
            }
        })
        setMarkers(updatedMarkers)
    }

    function handleDeleteComment(comment){
        if(comment.study_author_id === user.id){
            const updatedStudies = []
            user.studies.map(study =>{
                if(study.id === comment.study_id){
                    const updatedComments = study.comments.filter(thisComment => thisComment.id !== comment.id)
                    study.comments = updatedComments
                    updatedStudies.push(study)
                }else{
                    updatedStudies.push(study)
                }
            })

            const updatedUser = {...user}
            updatedUser.studies = updatedStudies
            setUser(updatedUser)
        }
        const updatedMarkers = markers.map(marker => {
            if(marker.study.id === comment.study_id){
                const filteredComments = marker.study.comments.filter(filterComment => filterComment.id !== comment.id)
                marker.study.comments = filteredComments
                return marker
            }else{
                return marker
            }
        })
        setMarkers(updatedMarkers)
    }

    return(
        <div>
            <h3>Welcome to the Map!</h3>
            {tagEntry ? 
            <button className="studyEditTags" onClick={()=>setTagEntry("")}>{tagEntry}  X</button> 
            : 
            <form onSubmit={(e)=>{e.preventDefault(); setTagEntry(tagFilter)}}>
                <input type="text" value={tagFilter} onChange={(e)=> setTagFilter(e.target.value)} placeholder="seach tag here..." />
                <button type="submit">Search Tag</button>
            </form>}

            {isLoaded ? 
            <GoogleMap 
            zoom={2} 
            center={center} 
            mapContainerClassName="map-container"
            onClick={(e) => {if(user){setLatLng(e.latLng)}}}
            options={{
                mapId: 'c2c10bd1417e4b9c',
                disableDefaultUI: true,
                clickableIcons: false
            }}>
                {markers ? markers.map(marker => 
                <Marker 
                key={marker.lat_lng} 
                position={{lat: marker.latitude, lng: marker.longitude}} 
                className="locationMarker" 
                onClick={()=>handleMarkerClick(marker)}>
                </Marker>) 
                    : null}
                {selectedMarker ? 
                <InfoWindow 
                className="studyInfoWindow"
                maxWidth={10}
                position={{lat: selectedMarker.latitude, lng: selectedMarker.longitude}}
                onCloseClick={()=>{setSelectedMarker(""); setStudyEdit("")}}>
                    
                    {studyEdit == selectedMarker.study.id
                    ?
                    <EditStudyForm 
                    study={selectedMarker.study} 
                    setStudyEdit={setStudyEdit} 
                    onStudyEdit={handleStudyEdit} 
                    editFormClassName="mapStudyCard"/>
                    :
                    <StudyCard 
                    study={selectedMarker.study} 
                    studyClassName="mapStudyCard"
                    onDeleteStudy={handleDeleteStudyState}
                    onTagClick = {(tag)=>setTagEntry(tag.tag_name)}
                    setStudyEdit = {setStudyEdit}
                    onNewComment={handleNewComment}
                    onDeleteComment={handleDeleteComment}
                    />}
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
