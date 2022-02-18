import { LargeButtonType } from "../../types";

interface LargeButtonProps {
  smallerOnSmallDevices?: boolean;
}

const LargeButton: LargeButtonType<LargeButtonProps> = ({
  children,
  smallerOnSmallDevices = false,
}) => {
  return (
    <div
      className={`cursor-pointer select-none font-alfaSlabOne
    bg-game-yellow w-fit p-2 rounded-[14px] mt-4 text-[64px] px-16 ${
      smallerOnSmallDevices ? "text-[32px]" : ""
    }`}
    >
      {children}
    </div>
  );
};

export default LargeButton;
