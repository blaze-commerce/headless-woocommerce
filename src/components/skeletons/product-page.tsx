export const SkeletonProductPage = () => {
  return (
    <>
      <div className="group relative animate-pulse">
        <div className="flex flex-col gap-4 px-2 md:p-4 ">
          <div className="w-full h-8 bg-gray-300 rounded-lg"></div>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-1/2 flex flex-col gap-4">
              <div className="w-full h-96 bg-gray-300 rounded-lg"></div>
              <div className="flex flex-row gap-4 w-full">
                <div className="w-1/2 md:w-1/4 h-32 bg-gray-300 rounded-lg"></div>
                <div className="w-1/2 md:w-1/4 h-32 bg-gray-300 rounded-lg"></div>
                <div className="hidden md:block w-1/4 h-32 bg-gray-300 rounded-lg"></div>
                <div className="hidden md:block w-1/4 h-32 bg-gray-300 rounded-lg"></div>
              </div>
            </div>
            <div className="w-full md:w-1/2 flex flex-col gap-4">
              <div className="w-full h-16 bg-gray-300 rounded-lg"></div>
              <div className="w-full h-6 bg-gray-300 rounded-lg"></div>
              <div className="w-full h-10 bg-gray-300 rounded-lg"></div>
              <div className="w-full h-6 bg-gray-300 rounded-lg"></div>
              <div className="w-full h-1 bg-gray-300 rounded-lg"></div>
              <div className="w-full h-24 bg-gray-300 rounded-lg"></div>
              <div className="w-full h-24 bg-gray-300 rounded-lg"></div>
              <div className="w-full h-24 bg-gray-300 rounded-lg"></div>
              <div className="w-full h-24 bg-gray-300 rounded-lg"></div>
              <div className="w-full h-24 bg-gray-300 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
