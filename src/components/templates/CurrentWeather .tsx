import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectPosition } from "../../features/position/positionSlice";

export const CurrentWeather = () => {
  const position = useSelector(selectPosition);
 
  useEffect(() => {
    
  }, [])

  return (
    <div>
      <></>
    </div>
  );
};
