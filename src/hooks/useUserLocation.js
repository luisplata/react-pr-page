import { useState, useCallback } from 'react';

export default function useUserLocation() {
  const [location, setLocation] = useState(null);

  const getLocation = useCallback(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setLocation({ lat: latitude, lon: longitude });
      },
      (err) => {
        console.error("No se pudo obtener la ubicación:", err);
      }
    );
  }, []);

  return { location, getLocation };
}