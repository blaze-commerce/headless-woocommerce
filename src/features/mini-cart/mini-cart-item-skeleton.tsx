export const MiniCartItemSkeleton = () => {
  return (
    <div className="flex animate-pulse">
      <div className="h-[61px] w-[68px] bg-gray-300 "></div>
      <div className="ml-4 flex flex-1 flex-col space-y-2">
        <div className="h-4  bg-gray-300 w-40 rounded-sm"></div>
        <div className="h-3 bg-gray-300 w-3/4 rounded-sm"></div>
      </div>
    </div>
  );
};
