import React, { useEffect, useRef } from "react";
import "./main.css";
type StateType = {
  input: {
    value: string;
    error: boolean;
  };
  handleAdd : () =>void
  handleInputChange:(newVal:string) => void;
};
export const AddFunctions = ({input,handleAdd,handleInputChange }: StateType) => {
  const inputRef = useRef<HTMLInputElement>(null)
  useEffect(()=>{
    inputRef.current?.focus()
  }, [])
  return (
    <div style={{ display: "flex", gap: "2%" }}>
      <input
        ref={inputRef}
        type="text"
        placeholder="Nhap ten cong viec"
        className="addInput"
        value={input.value}
        onChange={(e)=> handleInputChange(e.target.value)}    
      />
      <button className="addBtn" onClick={handleAdd}>Them</button>
    </div>
  );
};
