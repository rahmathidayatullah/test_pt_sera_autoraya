import React from "react";

export default function Input({
  onChange,
  type,
  name,
  id,
  value,
  autoComplete,
  placeholder,
  className,
}) {
  return (
    <input
      onChange={onChange}
      type={type}
      name={name}
      id={id}
      value={value}
      autoComplete={autoComplete}
      placeholder={placeholder}
      className={className}
    />
  );
}
