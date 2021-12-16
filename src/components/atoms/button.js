import React from "react";

export default function Button({ children, type, className, onClick }) {
  return (
    <button onClick={onClick} type={type} className={className}>
      {children}
    </button>
  );
}
