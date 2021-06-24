export interface MapCoordinates {
  lat: number;
  lng: number;
}
interface GetCurrentLocation {
  (
    successCallback: ({ lat, lng }: MapCoordinates) => void,
    failureCallback: (error: GeolocationPositionError) => void
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
    }
  };

  return {
    getCurrentLocation,
  };
};

export default useCurrentLocation;
