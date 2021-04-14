import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import GoogleMapReact from "google-map-react";
import {
  selectPosition,
  setPosition,
} from "../../features/position/positionSlice";

export const SearchArea: React.FC = () => {
  const { handleSubmit} = useForm();
  const [address, setAddress] = useState("");
  const [geocoder, setGeocoder] = useState<any>("");
  const [map, setMap] = useState<any>("");
  const [maps, setMaps] = useState<any>("");
  const [marker, setMarker] = useState<any>("");
  const position = useSelector(selectPosition);
  const dispatch = useDispatch();
  const API_GOOGLE_KEY = process.env.REACT_APP_GOOGLE_MAP_API_KEY;

  const handleApiLoaded: (obj: any) => void = (obj) => {
    setMap(obj.map);
    setMaps(obj.maps);
    setGeocoder(new obj.maps.Geocoder());
  };

  const searchAddress = () => {
    geocoder.geocode(
      {
        address,
        // 調べている地名C
      },
      (results: any, status: boolean) => {
        if (status === maps.GeocoderStatus.OK) {
          // statusがboolean, resultsが住所などの情報が配列で入っている[{}]
          map.setCenter(results[0].geometry.location);
          if (marker) {
            marker.setMap(null);
          }
          setMarker(
            new maps.Marker({
              map,
              position: results[0].geometry.location,
            })
          );
          const searchPosition = {
            lat: results[0].geometry.location.lat(),
            lng: results[0].geometry.location.lng(),
          };
          dispatch(setPosition(searchPosition));
          setAddress("");
        }
      }
    );
  };


  return (
    <>
      <div className="search_area">
        <p>天気を知りたいエリアを入力して下さい</p>
        <form onSubmit={handleSubmit(searchAddress)}>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="例）東京"
          />
          <input type="submit" />
        </form>
      </div>
      <div style={{ height: "185px", width: "350px" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: `${API_GOOGLE_KEY}` }}
          defaultZoom={9}
          onGoogleApiLoaded={handleApiLoaded}
          yesIWantToUseGoogleMapApiInternals={true}
          center={{
            lat: position.latitude,
            lng: position.longitude,
          }}
        >
          {/* {currentPosition &&
          <Marker lat={position.latitude} lng={position.longitude} />
          } */}
        </GoogleMapReact>
      </div>
    </>
  );
};
