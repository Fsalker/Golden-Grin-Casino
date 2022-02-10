import { SmallButtonType } from '../../types';

const SmallButton: SmallButtonType = ({ children }) => {
  return (
    <div
      className="cursor-pointer select-none font-alfaSlabOne
    border-[3px] border-game-yellow w-fit p-2 rounded-game-14 mt-4 text-game-24 px-8"
    >
      {children}
    </div>
  );
};

export default SmallButton;
