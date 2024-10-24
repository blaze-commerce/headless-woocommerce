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
    <div className={attribute.className}>
      {showSuccessMessage && <p className="text-sm text-green-700">Thank you for subscribing!</p>}
      {errors.email?.message && <p className="text-sm text-red-400">{errors.email.message}</p>}
      {showErrorMessage && apiResponse.validation_messages && emailId && (
        <p className="text-sm text-red-400">{apiResponse.validation_messages[emailId]}</p>
      )}
      <form
        onSubmit={handleSubmit(processForm)}
        className={cn('flex flex-col gap-5 justify-start', loading && 'animate-pulse')}
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
        <div className="flex flex-col">
          <label
            htmlFor="email"
            className="text-[#ac97ff] text-base font-normal leading-normal"
          >
            Email<span className="text-[#ff0000] text-base font-normal leading-normal">* </span>
          </label>
          <input
            {...register('email')}
            className="h-10 px-3.5 py-2.5 bg-[#000180] rounded-md border border-[#4041a6] justify-start items-center gap-1 inline-flex text-[#ac97ff] placeholder-[#ac97ff]"
            placeholder="Email address"
            disabled={loading}
          />
        </div>
        {!hideSubmit && (
          <button
            disabled={loading}
            className={cn(
              'py-2.5 px-[30px]',
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
