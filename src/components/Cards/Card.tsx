import { CardSymbols } from "../types";
import { FunctionComponent } from "react";
import Club from "../../../public/card-symbols/club.svg";
import Diamond from "../../../public/card-symbols/diamond.svg";
import Heart from "../../../public/card-symbols/heart.svg";
import Spade from "../../../public/card-symbols/spade.svg";

export interface CardParams {
  cardNumber: string;
  cardSymbol: CardSymbols;
  cardIndex: number;
  canRotateCards: boolean;
}

const Card: FunctionComponent<CardParams> = ({
  cardNumber,
  cardSymbol,
  cardIndex,
  canRotateCards,
}) => {
  const color = cardSymbol === "♣" || cardSymbol === "♠" ? "black" : "#F64242";

  const mapCardIndexToExtraMarginTop = [
    0,
    61 + 7 - 17,
    84 - 17,
    61 + 7 - 17,
    0,
  ]; // For Desktop displays
  const mapCardIndexToRotation = [15, 7.5, 0, -7.5, -15]; // For Desktop displays
  const extraMarginTop = mapCardIndexToExtraMarginTop[cardIndex];
  const rotation = mapCardIndexToRotation[cardIndex];

  const marginTop = canRotateCards ? `${extraMarginTop}px` : "";
  const transform = canRotateCards ? `rotate(${rotation}deg)` : "";

  const mapCardSymbolToSrc = {
    "♣": Club.src,
    "♦": Diamond.src,
    "♥": Heart.src,
    "♠": Spade.src,
  };
  const cardSymbolSrc = mapCardSymbolToSrc[cardSymbol];

  return (
    <div
      key={`card-div-${Math.random()}`}
      className="inline-block sm:mx-[28px] mx-[10px] font-courierPrimeBold animate-card cursor-default select-none"
      style={{ color, marginTop, transform }}
    >
      <div className="sm:w-[192px] w-[103px] sm:h-[264px] h-[141px] bg-white sm:rounded-[24px] rounded-[10px]">
        <div className="sm:pt-[18px] pt-[17px] sm:ml-[24px] ml-[17px] sm:text-[90px] text-[38px] sm:leading-[101px] leading-[48px] sm:tracking-[-12px] tracking-[-6px]">
          {cardNumber}
        </div>
        <div className="sm:mt-[-13px] mt-[-5px] sm:ml-[37px] ml-[20px] text-[56px] leading-[56px]">
          {/*{cardSymbol}*/}
          <img
            src={cardSymbolSrc}
            className="sm:w-[36px] w-[19px] sm:h-[36px] h-[19px]"
          />
        </div>
        <div className="mt-0 sm:ml-[71px] ml-[38px] text-[130px]">
          {/*{cardSymbol}*/}
          <img
            src={cardSymbolSrc}
            className="sm:w-[90px] w-[48px] sm:h-[90px] h-[48px]"
          />
        </div>
      </div>
    </div>
  );
};

export default Card;
