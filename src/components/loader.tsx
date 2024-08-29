import { Spinner } from '@components/svg/spinner';

export const Loader = () => {
  return (
    <div className="absolute bg-white bg-opacity-75 inset-0 flex justify-center items-center">
      <Spinner />
    </div>
  );
};
