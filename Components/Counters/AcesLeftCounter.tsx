import { acesLeftState } from "../../recoil/atoms";
import { useRecoilState } from "recoil";
import { FunctionComponent } from "react";
import Counter from "./Counter";

const AcesLeftCounter: FunctionComponent = () => {
  const [acesLeft] = useRecoilState(acesLeftState);

  return <Counter value={acesLeft} description={"Aces Left"} />;
};

export default AcesLeftCounter;
