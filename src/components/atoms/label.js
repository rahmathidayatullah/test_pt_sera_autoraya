import React from "react";

export default function Label({ children }) {
  return (
    <label className="block text-sm font-medium text-gray-700">
      {children}
    </label>
  );
}
