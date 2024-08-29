import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { cn } from '@src/lib/helpers/helper';
import Link from 'next/link';

type Props = {
  classes: string;
  text: string;
  redirectUrl: string;
};

export const CallToAction = ({ classes, text, redirectUrl }: Props) => {
  const classNames = cn(classes, 'gap-2.5');
  const fontColor = classes?.match(/text-\[(.*)\]/)?.pop();
  const textStyle = {
    color: fontColor ? fontColor : '',
  };
  const hasRightArrow = classNames?.includes('has-right-arrow');

  if (!redirectUrl) return null;
  return (
    <Link
      href={redirectUrl}
      className={classNames}
      style={textStyle}
    >
      {text}
      {hasRightArrow && <ArrowRightIcon className="w-3.5 h-3.5" />}
    </Link>
  );
};
