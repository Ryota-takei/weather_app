import React, { useState } from 'react'
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import {
  setInputAreaName,
} from "../../features/position/positionSlice";

export const Search:React.VFC = () => {
  const { handleSubmit } = useForm();
  const [address, setAddress] = useState("");
  const dispatch = useDispatch();
  return (
    <div className="search_area">
    <p>天気を知りたいエリアを入力して下さい</p>
    <form onSubmit={handleSubmit(() => dispatch(setInputAreaName(address)))}>
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="例）東京"
      />
      <input type="submit" />
    </form>
  </div>
  )
}
