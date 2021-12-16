import React from "react";
import Input from "../atoms/input";
import Label from "../atoms/label";

export default function InputField({
  label,
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
    <div className="col-span-6">
      <Label>{label}</Label>
      <Input
        onChange={onChange}
        type={type}
        name={name}
        id={id}
        value={value}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className={className}
      />
    </div>
  );
}
