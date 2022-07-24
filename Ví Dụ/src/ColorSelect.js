import React, { useContext } from "react";
import { ColorContext } from "./ColorContext";

export default function ColorSelect() {
  const { color, updateColor } = useContext(ColorContext);
  return (
    <>
      <h2 style={{ color }}>Chọn màu cho Counter</h2>
      <div className="color-select">
        <div className="red" onClick={() => updateColor("red")}></div>
        <div className="yellow" onClick={() => updateColor("yellow")}></div>
        <div className="blue" onClick={() => updateColor("blue")}></div>
      </div>
    </>
  );
}
