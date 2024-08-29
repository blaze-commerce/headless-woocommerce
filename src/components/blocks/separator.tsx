import parse from 'html-react-parser';
import { cn } from '@src/lib/helpers/helper';
import { ParsedBlock } from '@wordpress/block-serialization-default-parser';

type BlockAttrsType = {
  type: string;
  providerNameSlug: string;
  url: string;
  title: string;
  className: string;
};

type EmbedProps = {
  block: ParsedBlock;
};

export const Separator = ({ block }: EmbedProps) => {
  if ('core/separator' !== block.blockName) {
    return null;
  }

  if (!block.attrs) return null;

  const { className } = block.attrs as BlockAttrsType;

  return <hr className={`${cn(className)}`} />;
};
