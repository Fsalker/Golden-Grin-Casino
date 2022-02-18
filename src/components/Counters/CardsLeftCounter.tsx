import { cardsLeftState } from "../../recoil/atoms";
import { useRecoilState } from "recoil";
import { FunctionComponent } from "react";
import Counter from "./Counter";

const CardsLeftCounter: FunctionComponent = () => {
  const [cardsLeft] = useRecoilState(cardsLeftState);

  return <Counter value={cardsLeft} description={"Cards Left"} />;
};

export default CardsLeftCounter;
