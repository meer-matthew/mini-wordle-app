import React, { useEffect, useRef, useState } from "react";
import {
  keyboardBottom,
  keyboardMiddle,
  keyboardTop,
  numberArr,
} from "./strings";
import {
  Main,
  Header,
  GameSection,
  TileContainer,
  TileRow,
  Tile,
  KeyboardRow,
  KeyboardButton,
  KeyboardSection,
} from "./style";

export default function MainPage() {
  const fullArr = [keyboardTop, keyboardMiddle, keyboardBottom];
  const guessLength = numberArr.length;

  let wordIndex = useRef(0);
  let nextRound = useRef(0);

  const [guess, setGuess] = useState({
    0: Array.from({ length: guessLength }).fill(),
    1: Array.from({ length: guessLength }).fill(),
    2: Array.from({ length: guessLength }).fill(),
    3: Array.from({ length: guessLength }).fill(),
    4: Array.from({ length: guessLength }).fill(),
  });
  const allKeys = fullArr.flat();

  const enterGuess = (pressedKey) => {
    if (pressedKey === "backspace") {
      eraseKey();
    } else if (pressedKey !== "enter") {
      publishKey(pressedKey);
    }
  };

  const eraseKey = () => {
    const _wordIndex = wordIndex.current;
    const _nextRound = nextRound.current;

    if (_wordIndex !== 0) {
      setGuess((prev) => {
        const newGuess = { ...prev };
        newGuess[_nextRound][_wordIndex - 1] = "";
        return newGuess;
      });

      wordIndex.current = _wordIndex - 1;
    }
  };

  const publishKey = (selectedKey) => {
    const _wordIndex = wordIndex.current;
    const _nextRound = nextRound.current;
    if (_wordIndex < guessLength) {
      setGuess((prev) => {
        const newGuess = { ...prev };
        newGuess[_nextRound][_wordIndex] = selectedKey.toLowerCase();
        return newGuess;
      });
      wordIndex.current = _wordIndex + 1;
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (allKeys.includes(e.key)) {
        console.log(e.key);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [allKeys]);

  const handleClick = (key) => {
    const pressedKey = key.toLowerCase();

    enterGuess(pressedKey);
  };

  const handleKeyDown = (e) => {
    const pressedKey = e.key.toLowerCase();

    if (allKeys.includes(pressedKey)) {
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
            {Object.values(guess).map((word, i) => (
              <TileRow key={i}>
                {word.map((letters, i) => (
                  <Tile key={i}>{letters}</Tile>
                ))}
              </TileRow>
            ))}
          </TileContainer>
        </GameSection>
        <KeyboardSection>
          <KeyboardRow>
            {keyboardTop.map((key) => (
              <KeyboardButton onClick={() => handleClick(key)}>
                {key}
              </KeyboardButton>
            ))}
          </KeyboardRow>
          <KeyboardRow>
            {keyboardMiddle.map((key) => (
              <KeyboardButton onClick={() => handleClick(key)}>
                {key}
              </KeyboardButton>
            ))}
          </KeyboardRow>
          <KeyboardRow>
            {keyboardBottom.map((key) => (
              <KeyboardButton onClick={() => handleClick(key)}>
                {key}
              </KeyboardButton>
            ))}
          </KeyboardRow>
        </KeyboardSection>
      </Main>
    </div>
  );
}
