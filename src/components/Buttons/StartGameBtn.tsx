import { ButtonComponent } from "../types";
import LargeButton from "./Wrappers/LargeButton";
import { useRecoilState } from "recoil";
import {
  acesLeftState,
  cardsDrawnState,
  cardsLeftState,
  deckValuesState,
  gameState,
  loggedInState,
  numCardsInDeckState,
} from "../../recoil/atoms";
import { startGame } from "./common";

const StartGameBtn: ButtonComponent = () => {
  const [numCardsInDeck] = useRecoilState(numCardsInDeckState);
  const [loggedIn] = useRecoilState(loggedInState);
  const [, setCardsLeft] = useRecoilState(cardsLeftState);
  const [, setDeckValues] = useRecoilState(deckValuesState);
  const [, setDrawnCards] = useRecoilState(cardsDrawnState);
  const [, setAcesLeft] = useRecoilState(acesLeftState);
  const [, setGameState] = useRecoilState(gameState);

  const handleStartGame = async () => {
    await startGame({
      setCardsLeft,
      setDrawnCards,
      loggedIn,
      setDeckValues,
      numCardsInDeck,
      setAcesLeft,
      setGameState,
    });
  };

  return (
    <div onClick={handleStartGame}>
      <LargeButton smallerOnSmallDevices={true}>Start Game</LargeButton>
    </div>
  );
};

export default StartGameBtn;
