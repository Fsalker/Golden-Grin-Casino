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
    bg-game-yellow w-fit p-2 rounded-[14px] mt-4 px-16 ${
      smallerOnSmallDevices ? "text-[32px] sm:text-[64px]" : "text-[64px]"
    }`}
    >
      {children}
    </div>
  );
};

export default LargeButton;
