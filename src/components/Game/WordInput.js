const WordInput = ({ guess, setGuess, setAttempt }) => {
  const typeGuessHandler = (e) => {
    if (e.target.value.length <= 5 && e.target.value !== " ") {
      setGuess(e.target.value.toUpperCase());
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (guess.length !== 5) {
      alert("Character length must 5!");
      return;
    }
    setAttempt((attempt) => {
      if (attempt.length < 6) {
        return [...attempt, guess];
      } else {
        alert("No more attempt!");
        return [...attempt];
      }
    });
    setGuess("");
  };

  return (
    <form onSubmit={submitHandler}>
      <input type="text" value={guess} onChange={typeGuessHandler} />
      <button />
    </form>
  );
};

export default WordInput;
