/*eslint-disable */
import { useEffect, useState } from "react";

export default function Timer({ setTimeOut, questionNumber,counterValue }) {
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    if (timer === 0) return setTimeOut(true);
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
      abc()
    }, 1000);
    return () => clearInterval(interval);
  }, [timer, setTimeOut]);

  useEffect(() => {
    setTimer(120);
  }, [questionNumber]);

  const abc = () =>{
    counterValue(timer)
  }

  return (
    <div style={{
      color:'green',
      border:'2px solid green',
      borderRadius:'50%',
      alignItems:'center',
      display:'flex',
      justifyContent:'center',
      padding:20,
      width:"90px",
      // marginTop:5
    }}>
      <h2 style={{marginTop:5}}>
      {timer}

      </h2>
    </div>
  );
}
