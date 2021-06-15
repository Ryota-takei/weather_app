import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";
import GoogleMapReact from "google-map-react";

import { useGetWeatherInformation } from "../../../hooks/useGetWeatherInformation";
import { WeatherInformation } from "../../../types/WeatherInformation";
import {
  selectPosition,
  setPosition,
  setInputAreaName,
} from "../../../features/position/positionSlice";
import { CurrentWeather } from "../CurrentWeather/CurrentWeather";

interface HandleApiLoaded {
  map: object;
  maps: any;
}

export const SearchArea: React.VFC = () => {
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

  const handleApiLoaded = (obj: HandleApiLoaded) => {
    setMap(obj.map);
    setMaps(obj.maps);
    setGeocoder(new obj.maps.Geocoder());
  };

  const searchAddress = () => {
    if(address === ""){
      return;
    }
    try {
      geocoder.geocode(
        {
          address,
        },
        (results: WeatherInformation[], status: boolean) => {
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
            };
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
    }
  };

  return (
    <Box>
      <Box w="80%" mx="auto">
        <Text fontWeight="bold" mb="2">
          都市名
        </Text>
        <form onSubmit={handleSubmit(searchAddress)}>
          <Flex mx="auto">
            <Input
              h="40px"
              w="70%"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="例）東京"
            />
            <Button colorScheme="blue" type="submit" ml="15px">
              検索する
            </Button>
          </Flex>
        </form>
      </Box>
      <Box
        w={{ base: "95%", md: "90%" }}
        mt="8"
        mx="auto"
        display={{ base: "block", md: "flex" }}
      >
        <Box w={{ base: "100%", md: "50%" }}>
          <CurrentWeather />
        </Box>
        <Box h="250px" display="block" w={{ base: "90%", md: "50%" }} mx="auto" mt={{base:"3", md:"0"}}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: `${API_GOOGLE_KEY}` }}
            defaultZoom={9}
            onGoogleApiLoaded={handleApiLoaded}
            yesIWantToUseGoogleMapApiInternals={true}
            center={{
              lat: position.latitude,
              lng: position.longitude,
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};
