import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/20/solid';
import { ParsedBlock } from '@wordpress/block-serialization-default-parser';
import { isEmpty } from 'lodash';

import { Content } from '@src/components/blocks/content';
import { isMobileAccordion } from '@src/lib/block';
import { BlockAttributes } from '@src/lib/block/types';
import { cn } from '@src/lib/helpers/helper';
import { ReactHTMLParser } from '@src/lib/block/react-html-parser';

type MobileAccordionProps = {
  block: ParsedBlock;
};

export const MobileAccordion = ({ block }: MobileAccordionProps) => {
  // we just make sure that the block is correct block because other people can use this component and it has the same props from other
  if (!isMobileAccordion(block) || block.innerBlocks.length !== 2) {
    return null;
  }

  const [accordionButton, accordionPanel] = block.innerBlocks;
  const buttonLabel = !isEmpty(accordionButton.innerBlocks[0]) ? (
    <ReactHTMLParser html={accordionButton.innerBlocks[0].innerHTML} />
  ) : null;
  const attribute = block.attrs as BlockAttributes;

  return (
    <Disclosure
      as="div"
      className={cn('mt-2 justify', `_${attribute.uniqueId}`)}
      defaultOpen={true}
    >
      {({ open }) => (
        <>
          <Disclosure.Button className="flex lg:hidden w-full justify-between bg-white px-4 py-5 text-black focus:outline-none focus-visible:ring focus-visible:ring-black border-b">
            {buttonLabel}
            <ChevronUpIcon className={`${open ? 'rotate-180 transform' : ''} h-5 w-5 text-black`} />
          </Disclosure.Button>
          <Disclosure.Panel className=" px-4 lg:px-0 pb-2 pt-4 text-sm text-gray-500">
            <div className="hidden lg:block">{buttonLabel}</div>

            <Content content={accordionPanel.innerBlocks} />
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};
