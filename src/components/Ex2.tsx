import React, { useMemo, useState } from "react";
type User = {
  id: number;
  name: string;
  age: number;
};
export const Ex2 = () => {
  const [users] = useState<User[]>([
    {
      id: 1,
      name: "john",
      age: 19,
    },
    {
      id: 2,
      name: "jane",
      age: 20,
    },
    {
      id: 3,
      name: "doe",
      age: 17,
    },
  ]);

  const filtered = useMemo(() => {
    return users.filter((u) => u.age > 18);
  }, [users]);
  return (
    <div style={{gap:"10px"}}>
      {filtered.map((u) => (
        <div key={u.id} style={{padding:"10px"}}>
          <span>Id: {u.id}</span>
          <span>Name: {u.name}</span>
          <span>Age: {u.age}</span>
          <hr />
        </div>
      ))}
    </div>
  );
};
