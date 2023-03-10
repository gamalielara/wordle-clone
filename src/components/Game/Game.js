import React, { useState } from "react";

import { sample } from "../../utils";
import { WORDS } from "../../data";
import WordInput from "./WordInput";
import BoardWordle from "./BoardWordle";

// Pick a random word on every pageload.
let answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({ answer });

function Game() {
  const [guess, setGuess] = useState("");
  const [attempt, setAttempt] = useState([]);
  const [isWon, setIsWon] = useState(false);
  const [isLose, setIsLose] = useState(false);

  if (isWon || isLose) {
    const alertText = isWon
      ? "Congratulations, you won!"
      : "OOPS, you lose! try again!";

    alert(alertText);

    if (isWon) {
      answer = sample(WORDS);
      console.log({ answer });
    }
    setGuess("");
    setAttempt([]);
    setIsLose(false);
    setIsWon(false);
  }

  return (
    <>
      <BoardWordle
        answer={answer}
        guess={guess}
        attempt={attempt}
        setIsWon={setIsWon}
        setIsLose={setIsLose}
      />
      <WordInput guess={guess} setGuess={setGuess} setAttempt={setAttempt} />
    </>
  );
}

export default Game;
