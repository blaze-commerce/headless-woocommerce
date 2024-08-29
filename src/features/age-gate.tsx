import { useEffect, useState } from 'react';

import { useSiteContext } from '@src/context/site-context';

export const AgeGate = () => {
  const { ageVerified, setAgeVerified } = useSiteContext();

  const handleAgeVerified = () => {
    setAgeVerified(true);
  };

  const handleExit = () => {
    window.location.href = 'https://www.google.com/';
  };

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, [ageVerified]);

  return (
    <div
      className={`fixed inset-0 z-50 bg-black bg-opacity-70 items-center justify-center hidden ${
        !ageVerified && loaded && '!flex'
      }`}
    >
      <div className="bg-white max-w-xl min-h-[378px] px-5 py-8 text-center">
        <h4 className="text-center text-zinc-800 text-2xl font-bold leading-normal uppercase pb-8">
          You must be 18 years of age
          <br /> or older to enter our <br />
          website.
        </h4>
        <p className="text-gray-600 text-sm font-normal leading-tight pb-10">
          I consent to provide my personal details to an authorised third party to verify my
          identification for the purpose of confirming my age.
        </p>

        <button
          className="w-full text-white bg-brand-primary py-2.5 text-sm font-medium leading-tight rounded-sm mb-2"
          onClick={handleAgeVerified}
        >
          I’M OVER 18 & AGREE TO BE AGE VERIFIED
        </button>
        <button
          className="w-full text-white bg-[#528EC1] py-2.5 text-sm font-medium leading-tight rounded-sm"
          onClick={handleExit}
        >
          Exit
        </button>
      </div>
    </div>
  );
};
