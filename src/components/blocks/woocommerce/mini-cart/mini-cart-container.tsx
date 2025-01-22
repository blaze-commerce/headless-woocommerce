import { Fragment } from 'react';
import { Transition } from '@headlessui/react';
import { ParsedBlock } from '@src/components/blocks';
import { getBlockName } from '@src/lib/block';
import { Content } from '@src/components/blocks/content';
import { BlockAttributes } from '@src/lib/block/types';
import { cn } from '@src/lib/helpers/helper';

type MiniCartContainerProps = {
  block: ParsedBlock;
};

export const MiniCartContainer = ({ block }: MiniCartContainerProps) => {
  const blockName = getBlockName(block);
  if ('MiniCartContainer' !== blockName) {
    return null;
  }

  const attributes = block.attrs as BlockAttributes;

  return (
    <Transition.Child
      as={Fragment}
      enter="transform transition ease-in-out duration-500 sm:duration-700"
      enterFrom="translate-x-full"
      enterTo="translate-x-0"
      leave="transform transition ease-in-out duration-500 sm:duration-700"
      leaveFrom="translate-x-0"
      leaveTo="translate-x-full"
    >
      <div
        className={cn(
          'pointer-events-auto fixed inset-y-0 right-0 flex max-w-[349px] bg-white',
          attributes.className
        )}
      >
        <div className="flex h-full flex-col">
          <Content
            type="mini-cart"
            content={block.innerBlocks}
          />
        </div>
      </div>
    </Transition.Child>
  );
};
