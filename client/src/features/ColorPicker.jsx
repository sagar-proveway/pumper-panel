import React, { useState } from "react";
import { Sketch } from "@uiw/react-color";

const ColorPicker = ({ value, setFormData }) => {
  const [colorPicker, setColorPicker] = useState(false);

  return (
    <div>
      <div className="relative">
        <div className="absolute bottom-[100%] left-0">
          {colorPicker && (
            <Sketch
              style={{ marginBottom: 20 }}
              color={value}
              onChange={(color) => {
                setFormData(color);
              }}
            />
          )}
        </div>
        <div
          className="mt-3 w-full rounded-lg block p-3 text-sm bg-gray-700 placeholder-gray-400 text-white  focus:outline-none focus:ring-0  border-2 focus:border-gray-500 border-gray-600 "
          onClick={() => {
            setColorPicker(!colorPicker);
          }}
        >
          {value}
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;
