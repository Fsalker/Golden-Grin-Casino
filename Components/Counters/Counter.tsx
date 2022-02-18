const Counter = ({ value, description }: { value: number; description: string }) => {
  return (
    <div>
      <div
        className="flex flex-col items-center w-44 border-game-yellow-brighter border-[1px]
    text-white bg-black mt-[90px] font-courierPrimeBold"
      >
        <div className="mt-5 text-[48px] leading-[52px]">{value}</div>
        <div className="mb-4 font-courierPrimeBold text-[20px] leading-[22px]">{description}</div>
      </div>
    </div>
  );
};

export default Counter;
