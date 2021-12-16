import React from "react";

export default function input() {
  return (
    <input
      type="text"
      name="price"
      id="price"
      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
      placeholder="0.00"
    />
  );
}
