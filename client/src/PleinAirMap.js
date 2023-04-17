import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api"

function PleinAirMap(){

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_PLEIN_AIR_MAP_GOOGLE_MAPS_API_KEY
    });


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
            mapId='c2c10bd1417e4b9c'
            options={{
                mapId: 'c2c10bd1417e4b9c'
            }}
            >
                <Marker position={{lat: 44, lng: -80}}/>
            </GoogleMap>
            :
            <h3>Loading...</h3>}
        </div>
    )
}
export default PleinAirMap
