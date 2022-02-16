import { CardSymbols } from '../types';
import { FunctionComponent } from 'react';
import Club from '../../public/card-symbols/club.svg';
import Diamond from '../../public/card-symbols/diamond.svg';
import Heart from '../../public/card-symbols/heart.svg';
import Spade from '../../public/card-symbols/spade.svg';

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
  const color = cardSymbol === '♣' || cardSymbol === '♠' ? 'black' : '#F64242';

  const mapCardIndexToExtraMarginTop = [0, 61 + 7 - 17, 84 - 17, 61 + 7 - 17, 0]; // For Desktop displays
  const mapCardIndexToRotation = [15, 7.5, 0, -7.5, -15]; // For Desktop displays
  const extraMarginTop = mapCardIndexToExtraMarginTop[cardIndex];
  const rotation = mapCardIndexToRotation[cardIndex];

  const marginTop = canRotateCards ? `${extraMarginTop}px` : '';
  const transform = canRotateCards ? `rotate(${rotation}deg)` : '';

  const mapCardSymbolToSrc = {
    '♣': Club.src,
    '♦': Diamond.src,
    '♥': Heart.src,
    '♠': Spade.src,
  };
  const cardSymbolSrc = mapCardSymbolToSrc[cardSymbol];

  return (
    <div
      className="font-courierPrimeBold inline-block mr-7 ml-7 cursor-default select-none"
      style={{ color, marginTop, transform }}
    >
      <div className="rounded-3xl bg-white w-[192px] h-[264px]">
        <div className="pt-[18px] ml-6 text-[90px] leading-[101px]">{cardNumber}</div>
        <div className="mt-[-13px] ml-[36px] text-[56px] leading-[56px]">
          {/*{cardSymbol}*/}
          <img src={cardSymbolSrc} className="w-[36px] h-[36px]" />
        </div>
        <div className="mt-0 ml-[71px] text-[130px]">
          {/*{cardSymbol}*/}
          <img src={cardSymbolSrc} className="w-[90px] h-[90px]" />
        </div>
      </div>
    </div>
  );
};

export default Card;
