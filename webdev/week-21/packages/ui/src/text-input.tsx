"use client";

type InputTypes = {
  placeholder: string;
  type: string;
  onChange: (e: any) => void;
};

export function TextInput({ placeholder, type, onChange }: InputTypes) {
  return (
    <input
      style={{
        padding: 10,
        margin: 10,
        borderColor: "black",
        borderWidth: "black",
      }}
      placeholder={placeholder}
      onChange={onChange}
      type={type}
    />
  );
}
