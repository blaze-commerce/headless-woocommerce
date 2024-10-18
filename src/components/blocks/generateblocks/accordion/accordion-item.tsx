import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/20/solid';
import { ParsedBlock } from '@wordpress/block-serialization-default-parser';

import { Content } from '@src/components/blocks/content';
import { isAccordionItem } from '@src/lib/block';
import { BlockAttributes } from '@src/lib/block/types';
import { cn } from '@src/lib/helpers/helper';
import { ReactHTMLParser } from '@src/lib/block/react-html-parser';

type AccordionItemProps = {
  block: ParsedBlock;
};

const getButtonText = (htmlString: string): string => {
  // Regular expression to extract text inside the <span> tag
  const regex = /<span class="gb-button-text">([^<]*)<\/span>/;
  const match = htmlString.match(regex);

  // Extracted text
  return match ? match[1] : '';
};

export const AccordionItem = ({ block }: AccordionItemProps) => {
  if (!isAccordionItem(block)) {
    return <ReactHTMLParser html={block.innerHTML} />;
  }

  //Accordion Item must have to innerblocks for the accrodion button and accordion content
  if (block.innerBlocks.length !== 2) {
    return null;
  }

  const [accordionButton, accordionContent] = block.innerBlocks;

  const attribute = block.attrs as BlockAttributes;

  const buttonAttribute = accordionButton.attrs as BlockAttributes;
  const contentAttribute = accordionContent.attrs as BlockAttributes;

  return (
    <Disclosure
      as="div"
      className={cn(`_${attribute.uniqueId}`, attribute.className)}
      defaultOpen={false}
    >
      {({ open }) => (
        <>
          <Disclosure.Button
            className={cn(
              'flex w-full justify-between bg-white px-4 py-5 text-black focus:outline-none focus-visible:ring focus-visible:ring-black',
              `_${buttonAttribute.uniqueId}`,
              buttonAttribute.className
            )}
          >
            {getButtonText(accordionButton.innerHTML)}
            <ChevronUpIcon className={`${open ? 'rotate-180 transform' : ''} h-5 w-5 text-black`} />
          </Disclosure.Button>
          <Disclosure.Panel
            className={cn(
              `_${contentAttribute.uniqueId}`,
              contentAttribute.className,
              ' px-4 pb-2 pt-4 text-sm text-gray-500'
            )}
          >
            {accordionContent.innerBlocks.length > 0 && (
              <Content content={accordionContent.innerBlocks} />
            )}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};
