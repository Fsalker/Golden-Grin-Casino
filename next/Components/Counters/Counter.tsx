const Counter = ({ value, description }: { value: number; description: string }) => {
  return (
    <div>
      <div
        className="flex flex-col items-center w-44 border-game-yellow-brighter border-[1px]
    text-white bg-black mt-[90px] font-courierPrimeBold"
      >
        <div className="text-[48px] leading-[52px] mt-5">{value}</div>
        <div className="text-[20px] leading-[22px] mb-4 font-courierPrimeBold">{description}</div>
      </div>
    </div>
  );
};

export default Counter;
