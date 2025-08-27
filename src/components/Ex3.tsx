import React, { useCallback, useEffect, useState } from "react";
type InputType = {
  email: string;
  password: string;
};
export const Ex3 = () => {
  const [input, setInput] = useState<InputType>({
    email: "",
    password: "",
  });

  const [inputTemp, setInputTemp] = useState<InputType>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputTemp((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = useCallback(() => {
    setInput({ ...inputTemp });
    console.log(inputTemp);
  }, [inputTemp]);

  return (
    <div style={{ gap: "10px" }}>
      <input
        type="text"
        placeholder="nhap email"
        value={inputTemp.email}
        onChange={handleChange}
        name="email"
      />
      <input
        type="password"
        placeholder="nhap mat khau"
        value={inputTemp.password}
        onChange={handleChange}
        name="password"
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};
