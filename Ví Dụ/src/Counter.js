import { useContext, useEffect, useRef, useState } from "react";
import { ColorContext } from "./ColorContext";

export default function Counter() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("Counter");
  const nameRef = useRef(null);
  const { color } = useContext(ColorContext);

  // giúp counter tự động tăng sau mỗi giây
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount((preCount) => preCount + 1);
    }, 1000);

    return () => intervalId && clearInterval(intervalId);
  }, []);

  const handleIncrease = () => {
    setCount(count + 1); // Tăng biến count lên 1
  };

  const handleInputChange = (e) => {
    const newName = e?.target?.value || "Counter";
    nameRef.current = newName;
  };

  const handleChangeName = () => {
    // Lấy giá trị đã lưu trong ref ra sử dụng
    setName(nameRef.current);
  };

  return (
    <div>
      <h1 style={{ color }}>{name}</h1>

      <div>
        <div className="counter" style={{ color }}>
          {count}
        </div>
        <button onClick={handleIncrease}>Tăng giá trị</button>
      </div>

      <div className="my-5">
        <input placeholder="Nhập tên của bộ đếm" onChange={handleInputChange} />
        <button onClick={handleChangeName}>Đổi tên</button>
      </div>
    </div>
  );
}
