import { NUM_OF_GUESSES_ALLOWED } from "../../constants";
import styles from "./styles.module.css";

const BoardWordle = ({ answer, guess, attempt, setIsWon, setIsLose }) => {
  const ARRAY_WITH_NUM_OF_GUESS_ALLOWED_LENGTH = Array.from(
    { length: NUM_OF_GUESSES_ALLOWED },
    () => crypto.randomUUID()
  );

  const ARRAY_WITH_ANSWER_LENGTH = Array.from({ length: answer.length }, () =>
    crypto.randomUUID()
  );

  const generateOccurencesCharsObj = () => {
    const occurencesChar = {};
    answer.split("").forEach((char) => {
      occurencesChar[char] = (
        answer.match(new RegExp(char, "gi")) || []
      ).length;
    });
    return occurencesChar;
  };

  return (
    <div>
      <table>
        <tbody>
          {ARRAY_WITH_NUM_OF_GUESS_ALLOWED_LENGTH.map((id, iRow) => {
            let correctChar = 0;
            const occurencesChar = generateOccurencesCharsObj();

            return (
              <tr key={id}>
                {ARRAY_WITH_ANSWER_LENGTH.map((id, iCol) => {
                  if (!attempt[iRow])
                    return <td key={id} className={styles.col}></td>;

                  const char = attempt[iRow][iCol] || guess[iCol];
                  const charInCludedInTheAnswer =
                    answer.match(new RegExp(char, "gi")) || [];

                  const isCharIncludedInTheAnswer = Boolean(
                    charInCludedInTheAnswer.length
                  );

                  const isCharIsExactlyPositioned =
                    charInCludedInTheAnswer.length && char === answer[iCol];

                  let tdStyle = styles.wrong;

                  if (isCharIncludedInTheAnswer && occurencesChar[char]) {
                    tdStyle = styles["right-but-not-exactly-positioned"];
                    occurencesChar[char] -= 1;
                  }

                  if (isCharIsExactlyPositioned) {
                    tdStyle = styles["right-exactly-positioned"];
                    correctChar += 1;

                    if (correctChar === answer.length) {
                      setTimeout(() => setIsWon(true), 500);
                    }
                  }

                  return (
                    <td key={id} className={`${styles.col} ${tdStyle}`}>
                      {char}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default BoardWordle;
