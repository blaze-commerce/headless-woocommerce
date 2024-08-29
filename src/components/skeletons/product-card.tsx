export const SkeletonProductCard = () => {
  return (
    <div className="group relative animate-pulse">
      <div className="w-full min-h-80 bg-gray-300 rounded-sm overflow-hidden h-48 lg:h-80"></div>
      <div className=" flex flex-col items-center justify-between md:flex-row ">
        <div className="mt-2.5 h-5 bg-gray-300 w-3/4 rounded-sm"></div>
        <div className="mt-2.5 h-5 bg-gray-300 w-1/6 rounded-sm"></div>
      </div>
    </div>
  );
};
