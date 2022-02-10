import { cardsLeftState } from '../../recoil/atoms';
import { useRecoilState } from 'recoil';
import { CardParams } from '../types';
const Card = ({ cardNumber, cardSymbol, cardIndex, canRotateCards }: CardParams) => {
  const color = cardSymbol === '♣' || cardSymbol === '♠' ? 'black' : '#F64242';

  const mapCardIndexToExtraMarginTop = [0, 61 + 7 - 17, 84 - 17, 61 + 7 - 17, 0]; // For Desktop displays
  const mapCardIndexToRotation = [15, 7.5, 0, -7.5, -15]; // For Desktop displays
  const extraMarginTop = mapCardIndexToExtraMarginTop[cardIndex];
  const rotation = mapCardIndexToRotation[cardIndex];

  const marginTop = canRotateCards ? `${extraMarginTop}px` : '';
  const transform = canRotateCards ? `rotate(${rotation}deg)` : '';

  return (
    <div
      className="font-courierPrimeBold inline-block mr-7 ml-7 cursor-default select-none"
      style={{ color, marginTop, transform }}
    >
      <div className="rounded-3xl bg-white w-48 h-64">
        <div className="pt-[18px] ml-6 text-[90px] leading-[101px]">{cardNumber}</div>
        <div className="mt-[-13px] ml-[36px] text-[56px] leading-[56px]">{cardSymbol}</div>
        <div className="mt-[-56px] ml-[76px] text-[130px]">{cardSymbol}</div>
      </div>
    </div>
  );
};

export default Card;
