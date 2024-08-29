import { times } from 'lodash';

import { EmptyStar } from '@src/components/svg/icons/empty-star';

export const ReviewItemSkeleton = () => {
  return (
    <div className="py-8 animate-pulse border-b border-b-[#C5C6CA]">
      <div className="flex items-center gap-5 mb-5">
        <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0"></div>
        <div>
          <div className="flex items-center">
            {times(5, (index) => (
              <EmptyStar
                key={index}
                className="text-gray-300 stroke-gray-300 fill-gray-300 w-5 h-5"
                color={'none'}
                size={'none'}
              />
            ))}
            <p className="ml-2 bg-gray-300 rounded-md h-3 w-16"></p>
          </div>
          <p className="bg-gray-300 rounded-md h-5 w-38 mt-2"></p>
        </div>
      </div>
      <p className="bg-gray-300 rounded-md h-3 w-[100px] mt-1"></p>
      <p className="bg-gray-300 rounded-md h-3 w-[150px] mt-1"></p>
      <p className="bg-gray-300 rounded-md h-3 w-[170px] mt-1"></p>
      <p className="bg-gray-300 rounded-md h-3 w-[50px] mt-1"></p>
    </div>
  );
};
