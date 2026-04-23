import { useState } from "react";

export default function WhotGame(){

  const [round, setRound] = useState(1);
  const [score, setScore] = useState({ p1:0, p2:0 });

  function win(p){
    if(p==="p1") setScore(s=>({...s,p1:s.p1+1}));
    else setScore(s=>({...s,p2:s.p2+1}));

    if(score.p1===2 || score.p2===2){
      alert("Match finished");
    }else{
      setRound(r=>r+1);
    }
  }

  return (
    <div>
      <h2>Round {round}</h2>
      <button onClick={()=>win("p1")}>Win P1</button>
      <button onClick={()=>win("p2")}>Win P2</button>
    </div>
  );
}