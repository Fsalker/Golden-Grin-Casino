import { SmallButtonType } from "../../types";

const SmallButton: SmallButtonType = ({ children }) => {
  return (
    <div
      className="cursor-pointer select-none font-alfaSlabOne
    border-[3px] border-game-yellow w-fit p-2 rounded-[14px] mt-4 text-[24px] px-8
    text-game-yellow leading-8"
    >
      {children}
    </div>
  );
};

export default SmallButton;
