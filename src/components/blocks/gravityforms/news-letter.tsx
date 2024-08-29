import { zodResolver } from '@hookform/resolvers/zod';
import { ParsedBlock } from '@wordpress/block-serialization-default-parser';
import { SubmitHandler, useForm } from 'react-hook-form';

import { NewsLetterProps, NewsLetterSchema } from '@src/pages/api/newsletter';
import { getAttributeValue } from '@src/lib/block';
import { BlockAttributes } from '@src/lib/block/types';
import { cn, stringToBoolean } from '@src/lib/helpers/helper';
import { useNewsLetter } from '@src/lib/hooks';

export const NewsLetter = ({ block }: { block: ParsedBlock }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewsLetterProps>({
    resolver: zodResolver(NewsLetterSchema),
  });

  const { data: apiResponse, loading, subscribe } = useNewsLetter();

  const attribute = block.attrs as BlockAttributes;
  const htmlAttributes = attribute.htmlAttributes ?? [];

  const formId = getAttributeValue(htmlAttributes, 'data-form-id');
  if (!formId) {
    return null;
  }

  const emailId = getAttributeValue(htmlAttributes, 'data-email-id');
  const hideSubmit = stringToBoolean(
    getAttributeValue(htmlAttributes, 'data-hide-submit') as string
  );
  const submitText = getAttributeValue(htmlAttributes, 'data-submit-text');
  const submitClassnames = getAttributeValue(htmlAttributes, 'data-submit-classnames');

  const showSuccessMessage = apiResponse && apiResponse.is_valid;
  const showErrorMessage =
    apiResponse && apiResponse.is_valid == false && emailId && apiResponse.validation_messages;

  const processForm: SubmitHandler<NewsLetterProps> = async (data) => {
    await subscribe(data);
    reset();
  };

  return (
    <div className="flex flex-col items-center gap-y-3">
      {showSuccessMessage && <p className="text-sm text-green-700">Thank you for subscribing!</p>}
      {errors.email?.message && <p className="text-sm text-red-400">{errors.email.message}</p>}
      {showErrorMessage && apiResponse.validation_messages && emailId && (
        <p className="text-sm text-red-400">{apiResponse.validation_messages[emailId]}</p>
      )}
      <form
        onSubmit={handleSubmit(processForm)}
        className={cn('border border-[#56575A] max-w-sm', loading && 'animate-pulse')}
      >
        <input
          type="hidden"
          {...register('formId')}
          value={formId}
        />

        <input
          type="hidden"
          {...register('emailId')}
          value={emailId}
        />

        <input
          {...register('email')}
          className="py-2.5 px-3 w-56"
          placeholder="Email address"
          disabled={loading}
        />
        {!hideSubmit && (
          <button
            disabled={loading}
            className={cn(
              'uppercase  py-2.5 px-[30px]',
              submitClassnames ? submitClassnames : 'bg-[#DC3334] text-white'
            )}
          >
            {submitText}
          </button>
        )}
      </form>
    </div>
  );
};
