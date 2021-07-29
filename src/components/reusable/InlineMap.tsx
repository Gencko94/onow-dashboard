import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { BiCurrentLocation } from "react-icons/bi";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { ThemeContext } from "../../contexts/ThemeContext";
import useCurrentLocation from "../../hooks/useCurrentLocation";
import { Libraries } from "@react-google-maps/api/dist/utils/make-load-script-url";
import { GoogleMapsResult, MapCoordinates } from "../../interfaces/maps/maps";
import { useQuery } from "react-query";
import { getGoogleMapsLocation } from "../../utils/queries";
import Button from "./Button";
import useToast from "../../hooks/useToast";

interface IProps {
  mapCenter: MapCoordinates;
  setValue: any;
  name: string;
}
const InlineMap = ({ mapCenter, setValue, name }: IProps) => {
  console.log(mapCenter, "center");
  const [marker, setMarker] = useState<MapCoordinates>(mapCenter);
  const {
    i18n: { language },
    t,
  } = useTranslation(["map"]);
  const { data, isLoading } = useQuery(
    ["google-maps-result", marker, language],
    () =>
      getGoogleMapsLocation({
        coords: {
          lat: marker.lat,
          lng: marker.lng,
        },
        language,
      }),
    {
      onSuccess: (data) => {
        setValue(name, { ...marker });
      },
    }
  );

  const [outOfBorder, setOutOfBorder] = useState<boolean>(false);
  const { getCurrentLocation } = useCurrentLocation();
  const { handleCloseToast, setToastStatus } = useToast();
  const { mode } = useContext(ThemeContext);
  const libraries = useMemo<Libraries>(() => ["places"], []);
  const history = useHistory();

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
    language,
  });
  //problem here when changing lng
  const mapOptions: any = useMemo(() => {
    return {
      disableDefaultUI: true,
      zoomControl: false,
      gestureHandling: "greedy",

      styles:
        mode === "light"
          ? []
          : [
              { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
              {
                elementType: "labels.text.stroke",
                stylers: [{ color: "#242f3e" }],
              },
              {
                elementType: "labels.text.fill",
                stylers: [{ color: "#746855" }],
              },
              {
                featureType: "administrative.locality",
                elementType: "labels.text.fill",
                stylers: [{ color: "#d59563" }],
              },
              {
                featureType: "poi",
                elementType: "labels.text.fill",
                stylers: [{ color: "#d59563" }],
              },
              {
                featureType: "poi.park",
                elementType: "geometry",
                stylers: [{ color: "#263c3f" }],
              },
              {
                featureType: "poi.park",
                elementType: "labels.text.fill",
                stylers: [{ color: "#6b9a76" }],
              },
              {
                featureType: "road",
                elementType: "geometry",
                stylers: [{ color: "#38414e" }],
              },
              {
                featureType: "road",
                elementType: "geometry.stroke",
                stylers: [{ color: "#212a37" }],
              },
              {
                featureType: "road",
                elementType: "labels.text.fill",
                stylers: [{ color: "#9ca5b3" }],
              },
              {
                featureType: "road.highway",
                elementType: "geometry",
                stylers: [{ color: "#746855" }],
              },
              {
                featureType: "road.highway",
                elementType: "geometry.stroke",
                stylers: [{ color: "#1f2835" }],
              },
              {
                featureType: "road.highway",
                elementType: "labels.text.fill",
                stylers: [{ color: "#f3d19c" }],
              },
              {
                featureType: "transit",
                elementType: "geometry",
                stylers: [{ color: "#2f3948" }],
              },
              {
                featureType: "transit.station",
                elementType: "labels.text.fill",
                stylers: [{ color: "#d59563" }],
              },
              {
                featureType: "water",
                elementType: "geometry",
                stylers: [{ color: "#17263c" }],
              },
              {
                featureType: "water",
                elementType: "labels.text.fill",
                stylers: [{ color: "#515c6d" }],
              },
              {
                featureType: "water",
                elementType: "labels.text.stroke",
                stylers: [{ color: "#17263c" }],
              },
            ],
    };
  }, []);
  // console.log(data);

  const mapRef = useRef<any>();
  const onMapLoad = useCallback((map: any) => {
    mapRef.current = map;

    // getCurrentLocation(
    //   ({ lat, lng }) => {
    //     panTo({ lat, lng });
    //   },
    //   (error) => {
    //     console.log(error);
    //   }
    // );
  }, []);

  const panTo = useCallback(({ lat, lng }: { lat: number; lng: number }) => {
    mapRef.current?.panTo({ lat, lng });
    // setMarker({ lat, lng });
    // setMarkerInfoWindowDetails(null);
  }, []);

  if (!isLoaded) return <div>loading</div>;
  return (
    <GoogleMap
      mapContainerStyle={{
        width: "100%",
        height: "100%",
      }}
      zoom={15}
      center={mapCenter}
      options={mapOptions}
      clickableIcons={false}
      onLoad={onMapLoad}
      onClick={(e) => {
        setMarker({
          lat: e.latLng.lat(),
          lng: e.latLng.lng(),
        });
      }}
    >
      {marker && <Marker position={{ lat: marker?.lat, lng: marker?.lng }} />}
      {outOfBorder && (
        <OutOfBorderContainer>{t("cannot-deliver-here")}</OutOfBorderContainer>
      )}
      <MapIcon>
        <Button
          bg="primary"
          withRipple
          padding="0.25rem"
          text="Get my location"
          textSize="0.8rem"
          Icon={BiCurrentLocation}
          iconSize={20}
          onClick={() =>
            getCurrentLocation(
              ({ lat, lng }) => {
                panTo({ lat, lng });
              },
              (error) => {
                let message: string;
                if (error.message === "User denied Geolocation") {
                  message = "Please Allow the browser to get your location";
                } else {
                  message = "Something went wrong, Please try again later";
                }
                setToastStatus?.({
                  open: true,
                  fn: () => handleCloseToast?.(),
                  text: message,
                  type: "error",
                });
              }
            )
          }
        />
      </MapIcon>
    </GoogleMap>
  );
};

export default InlineMap;

const MapIcon = styled.button`
  z-index: 9;
  position: absolute;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.25rem;
`;

const OutOfBorderContainer = styled.div`
  position: absolute;
  margin: 0 0.5rem;
  padding: 0.5rem;
  top: 52px;
  left: 2%;
  right: 2%;
  background-color: #b72b2b;
  color: #fff;
  width: 94%;
  border-radius: 12px;
  font-size: 0.9rem;
  text-align: center;
`;
