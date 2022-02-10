import { FunctionComponent } from 'react';

const LargeButton: FunctionComponent = ({ children }) => {
  return (
    <div
      className="cursor-pointer select-none font-alfaSlabOne
    bg-game-yellow w-fit p-2 rounded-game-14 mt-4 text-game-64 px-16"
    >
      {children}
    </div>
  );
};

export default LargeButton;
