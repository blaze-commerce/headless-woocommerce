import { BlockComponentProps } from '@src/components/blocks';
import { cn } from '@src/lib/helpers/helper';

type BlockAttrsType = {
  type: string;
  providerNameSlug: string;
  url: string;
  title: string;
  className: string;
};

export const Separator = ({ block }: BlockComponentProps) => {
  if ('core/separator' !== block.blockName) {
    return null;
  }

  if (!block.attrs) return null;

  const { className } = block.attrs as BlockAttrsType;

  return <hr className={`${cn(className, block?.id)}`} />;
};
