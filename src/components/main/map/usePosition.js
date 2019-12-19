import { useState, useLayoutEffect } from "react";

export const usePosition = () => {
  const [position, setPosition] = useState("");
  const [error, setError] = useState("");

  const onChange = ({ coords }) => {
    setPosition({
      latitude: coords.latitude,
      longitude: coords.longitude
    });
  };
  const onError = error => {
    setError(error.message);
  };
  useLayoutEffect(() => {
    const geo = navigator.geolocation;
    if (!geo) {
      setError("Geolocation is not supported");
      return;
    }
    const watcher = geo.watchPosition(onChange, onError);
    console.log("watcher", watcher);
    return () => geo.clearWatch(watcher);
  }, []);
  if (position) return { ...position, error };
  return "no position";
};
