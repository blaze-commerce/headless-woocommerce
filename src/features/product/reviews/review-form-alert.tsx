import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/20/solid';

import { countObjectEntries } from '@src/lib/helpers/helper';

type Props = {
  name: boolean;
  email: boolean;
  body: boolean;
  failed: boolean;
};

export const ReviewFormSuccessAlert = () => {
  return (
    <div className="rounded-md bg-green-50 p-4 mt-5">
      <div className="flex">
        <div className="flex-shrink-0">
          <CheckCircleIcon
            className="h-5 w-5 text-green-400"
            aria-hidden="true"
          />
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-green-800">Review Submitted</p>
        </div>
      </div>
    </div>
  );
};

export const ReviewFormErrorAlert = (props: Props) => {
  const { name, email, body, failed } = props;
  const errorCount = countObjectEntries(props);
  return (
    <div className="rounded-md bg-red-50 p-4 mt-5">
      <div className="flex">
        <div className="flex-shrink-0">
          <XCircleIcon
            className="h-5 w-5 text-red-400"
            aria-hidden="true"
          />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">
            There {errorCount > 1 ? `are ${errorCount} errors` : 'is an error'} with your submission
          </h3>
          <div className="mt-2 text-sm text-red-700">
            <ul
              role="list"
              className="list-disc space-y-1 pl-5"
            >
              {name && <li>Name Field is Empty</li>}
              {email && <li>Email Field is Empty</li>}
              {body && <li>Review Field is Empty</li>}
              {failed && <li>Please try again.</li>}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
