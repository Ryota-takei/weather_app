import { memo,  useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Button, Container, Input } from "@chakra-ui/react";
import GoogleMapReact from "google-map-react";

import styles from "./SearchArea.module.css";
import { useGetWeatherInformation } from "../../../hooks/useGetWeatherInformation";
import {
  selectPosition,
  setPosition,
  setInputAreaName,
  selectCurrentWeather,
} from "../../../features/position/positionSlice";

export const SearchArea: React.FC = memo(() => {
  const { handleSubmit } = useForm();
  const dispatch = useDispatch();
  const position = useSelector(selectPosition);
  const [address, setAddress] = useState("");
  const [geocoder, setGeocoder] = useState<any>("");
  const [map, setMap] = useState<any>("");
  const [maps, setMaps] = useState<any>("");
  const [marker, setMarker] = useState<any>("");
  const { getWeatherInformation } = useGetWeatherInformation();
  const API_GOOGLE_KEY = process.env.REACT_APP_GOOGLE_MAP_API_KEY;
  const wetherInformation = useSelector(selectCurrentWeather);

  const handleApiLoaded: (obj: any) => void = (obj) => {
    setMap(obj.map);
    setMaps(obj.maps);
    setGeocoder(new obj.maps.Geocoder());
  };

  const searchAddress = () => {
    try {
      geocoder.geocode(
        {
          address,
        },
        (results: any, status: boolean) => {
          if (status === maps.GeocoderStatus.OK) {
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
            }
            dispatch(setPosition(searchPosition));
            getWeatherInformation();

          }
        }
        );
      } catch (e) {
        alert(
          "一時的なエラーによりご使用いただけません。時間を改めてご使用ください"
          );
        } finally {
      dispatch(setInputAreaName(address));
      setAddress("");
      console.log(wetherInformation);
    }
  };

  console.log(wetherInformation);
  return (
    <Container>
      <div className={styles.search_area}>
        <p>都市名</p>
        <div className={styles.input_wrapper}>
          <form onSubmit={handleSubmit(searchAddress)}>
            <Input
              h="40px"
              w="70%"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="例）東京"
            />
            <Button colorScheme="blue" type="submit" w="20%" ml="15px" h="40px">
              検索する
            </Button>
          </form>
        </div>
      </div>
      <div style={{ height: "200px", width: "350px", margin: "10px auto" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: `${API_GOOGLE_KEY}` }}
          defaultZoom={9}
          onGoogleApiLoaded={handleApiLoaded}
          yesIWantToUseGoogleMapApiInternals={true}
          center={{
            lat: position.latitude,
            lng: position.longitude,
          }}
        ></GoogleMapReact>
      </div>
    </Container>
  );
});
