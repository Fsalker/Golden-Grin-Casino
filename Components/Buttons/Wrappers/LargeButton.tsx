import { LargeButtonType } from '../../types';

const LargeButton: LargeButtonType = ({ children }) => {
  return (
    <div
      className="cursor-pointer select-none font-alfaSlabOne
    bg-game-yellow w-fit p-2 rounded-[14px] mt-4 text-[64px] px-16"
    >
      {children}
    </div>
  );
};

export default LargeButton;
