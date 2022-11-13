import React, { useEffect, useRef, useState } from "react";
import ReactModal from "react-modal";
import {
  Main,
  Header,
  GameSection,
  TileContainer,
  TileRow,
  Tile,
  ShareModal,
  ShareButton,
  Row,
  Heading,
} from "./style";

const wordOfTheDay = "words";

export default function MainPage() {
  const guessLength = 5;

  let wordIndex = useRef(0);
  let nextRound = useRef(0);

  const [guess, setGuess] = useState({
    0: Array.from({ length: guessLength }).fill(),
    1: Array.from({ length: guessLength }).fill(),
    2: Array.from({ length: guessLength }).fill(),
    3: Array.from({ length: guessLength }).fill(),
    4: Array.from({ length: guessLength }).fill(),
  });

  const [mark, setMark] = useState({
    0: Array.from({ length: guessLength }).fill(),
    1: Array.from({ length: guessLength }).fill(),
    2: Array.from({ length: guessLength }).fill(),
    3: Array.from({ length: guessLength }).fill(),
    4: Array.from({ length: guessLength }).fill(),
  });

  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [isShared, setIsShared] = useState(false);

  const finishGame = (title) => {
    document.removeEventListener("keydown", handleKeyDown);
    setShowModal(true);
    setTitle(title);
  };

  const enterGuess = (pressedKey) => {
    if (pressedKey === "enter" && !guess[nextRound.current].includes("")) {
      submitGuess();
    } else if (pressedKey === "backspace") {
      eraseKey();
    } else if (pressedKey !== "enter") {
      publishKey(pressedKey);
    }
  };

  const eraseKey = () => {
    const _wordIndex = wordIndex.current;
    const _round = nextRound.current;

    if (_wordIndex !== 0) {
      setGuess((prev) => {
        const newGuess = { ...prev };
        newGuess[_round][_wordIndex - 1] = "";
        console.log(newGuess);
        return newGuess;
      });

      wordIndex.current = _wordIndex - 1;
      console.log("Word Index - Erase", wordIndex);
    }
  };

  const publishKey = (selectedKey) => {
    const _wordIndex = wordIndex.current;
    const _round = nextRound.current;
    if (_wordIndex < guessLength) {
      setGuess((prev) => {
        const newGuess = { ...prev };
        newGuess[_round][_wordIndex] = selectedKey.toLowerCase();
        console.log(newGuess);

        return newGuess;
      });
      wordIndex.current = _wordIndex + 1;
      console.log("Word Index - Publish", wordIndex);
    }
  };

  const submitGuess = () => {
    const _round = nextRound.current;
    const updatedMarks = {
      ...mark,
    };
    const tempWOTD = wordOfTheDay.split("");
    const leftoverIndices = [];

    tempWOTD.forEach((letter, i) => {
      const guessLetter = guess[_round][i];
      console.log(guessLetter);
      if (guessLetter === letter) {
        // mark green if letter matches tempWOTD
        updatedMarks[_round][i] = "green";
        tempWOTD[i] = "";
      } else {
        leftoverIndices.push(i);
      }
    });
    if (updatedMarks[_round].every((guess) => guess === "green")) {
      setMark(updatedMarks);
      finishGame("You Win!");
      return;
    }
    if (leftoverIndices.length) {
      console.log("leftoverIndices", leftoverIndices);
      leftoverIndices.forEach((index) => {
        const guessedLetter = guess[_round][index];
        const correctPositionOfLetter = tempWOTD.indexOf(guessedLetter);
        console.log("correctPosition", correctPositionOfLetter);
        if (
          tempWOTD.includes(guessedLetter) &&
          correctPositionOfLetter !== index
        ) {
          // Mark yellow when letter is in tempWOTD but in the wrong order
          updatedMarks[_round][index] = "yellow";
          tempWOTD[correctPositionOfLetter] = "";
        } else {
          // Mark grey if letter is not in tempWOTD.
          updatedMarks[_round][index] = "grey";
          tempWOTD[index] = "";
        }
      });
    }
    setMark(updatedMarks);
    nextRound.current = _round + 1;
    wordIndex.current = 0;
  };

  const getDayOfYear = () => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start;
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
  };

  const copyMarkers = () => {
    const gameDate = new Date();
    const formattedDate = gameDate.toLocaleDateString();
    let shareText = `Wordle ${formattedDate}`;
    let shareGuesses = "";

    const amountOfGuesses = Object.entries(mark)
      .filter(([_, guesses]) => !guesses.includes(""))
      .map((round) => {
        const [_, guesses] = round;

        guesses.forEach((guess) => {
          if (guess === "green") {
            shareGuesses += "🟩";
          } else if (guess === "yellow") {
            shareGuesses += "🟨";
          } else {
            shareGuesses += "⬛️";
          }
        });

        shareGuesses += "\n";

        return "";
      });

    shareText += ` ${amountOfGuesses.length}/5\n${shareGuesses}`;

    navigator.clipboard.writeText(shareText);
    setIsShared(true);
  };

  const handleKeyDown = (e) => {
    const pressedKey = e.key.toLowerCase();
    if (pressedKey) {
      enterGuess(pressedKey);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div>
      <Main>
        <Header>WORDLE</Header>
        <GameSection>
          <TileContainer>
            {Object.values(guess).map((word, index) => (
              <TileRow key={index}>
                {word.map((letters, i) => (
                  <Tile key={i} hint={mark[index][i]}>
                    {letters}
                  </Tile>
                ))}
              </TileRow>
            ))}
          </TileContainer>
        </GameSection>
      </Main>
      <div id="share">
        <ReactModal
          isOpen={showModal}
          onRequestClose={() => setShowModal(false)}
          style={{
            content: {
              top: "50%",
              left: "50%",
              right: "auto",
              bottom: "auto",
              marginRight: "-50%",
              transform: "translate(-50%, -50%)",
            },
          }}
          contentLabel="Share"
        >
          <ShareModal>
            <Heading>{title}</Heading>
            <Row>
              <h3>Show off your score</h3>
              <ShareButton onClick={copyMarkers} disabled={isShared}>
                {isShared ? "Copied" : "Share"}
              </ShareButton>
            </Row>
          </ShareModal>
        </ReactModal>
      </div>
    </div>
  );
}
