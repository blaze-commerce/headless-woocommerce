import { useSiteContext } from '@src/context/site-context';
import { cn } from '@src/lib/helpers/helper';

type Props = {
  progress: string;
  color?: string;
  holderClassNames?: string;
  barClassNames?: string;
};

export const ProgressBar = (props: Props) => {
  const { settings } = useSiteContext();
  const { progress } = props;

  const fillerStyles = {
    width: `${progress}%`,
    backgroundColor: props?.color,
  };

  return (
    <div
      className={cn({
        'h-4 w-52 md:w-64 bg-[#ebebeb] rounded-xl overflow-hidden':
          settings?.store?.reviewService === 'judge.me',
        'h-2.5 w-16 bg-stone-200': settings?.store?.reviewService === 'yotpo',
        'h-1.5 w-48 bg-[#0000001a] rounded':
          settings?.store?.reviewService === 'woocommerce_native_reviews',
      })}
    >
      <div
        style={fillerStyles}
        className={cn('h-full rounded-xl', {
          'bg-brand-primary': !props?.color,
          'bg-[#96588a] rounded':
            !props?.color && settings?.store?.reviewService === 'woocommerce_native_reviews',
        })}
      />
    </div>
  );
};
