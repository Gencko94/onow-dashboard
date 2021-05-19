export interface MapCoordinates {
  lat: number;
  lng: number;
}
interface GetCurrentLocation {
  (
    successCallback: ({ lat, lng }: MapCoordinates) => void,
    failureCallback: (error: GeolocationPositionError | string) => void
  ): void;
}

const useCurrentLocation = () => {
  const getCurrentLocation: GetCurrentLocation = (
    successCallback,
    failureCallback
  ) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          successCallback({ lat: coords.latitude, lng: coords.longitude });
        },
        (error) => {
          failureCallback(error);
        }
      );
    } else {
      failureCallback("not allowed");
    }
  };

  return {
    getCurrentLocation,
  };
};

export default useCurrentLocation;
