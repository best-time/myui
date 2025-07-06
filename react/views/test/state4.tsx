import { useState } from "react";

export default function Scoreboard() {
  const [isPlayerA, setIsPlayerA] = useState(true);
  return (
    <div>
      {/*{isPlayerA ? <Counter person="Taylor" /> : <Counter person="Sarah" />}*/}
      <Counter person={isPlayerA ? 'Taylor' : 'Sarah'} />
      <button
        onClick={() => {
          setIsPlayerA(!isPlayerA);
        }}
      >
        下一位玩家！
      </button>
    </div>
  );
}

function Counter({ person }: { person: string }) {
  const [score, setScore] = useState(0);
  const [hover, setHover] = useState(false);

  let className = "counter";
  if (hover) {
    className += " hover";
  }

  return (
    <div
      className={className}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <span>
        {person} 的分数：{score}
      </span>
      <button onClick={() => setScore(score + 1)}>加一</button>
    </div>
  );
}
