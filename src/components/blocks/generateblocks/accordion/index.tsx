import { ParsedBlock } from '@wordpress/block-serialization-default-parser';
import parse from 'html-react-parser';

import { AccordionItem } from '@src/components/blocks/generateblocks/accordion/accordion-item';
import { isAccordion } from '@src/lib/block';
import { BlockAttributes } from '@src/lib/block/types';
import { cn } from '@src/lib/helpers/helper';

type AccordionProps = {
  block: ParsedBlock;
};

export const Accordion = ({ block }: AccordionProps) => {
  if (!isAccordion(block) || block.innerBlocks.length <= 0) {
    return <>{parse(block.innerHTML)}</>;
  }

  const attribute = block.attrs as BlockAttributes;
  return (
    <div className={cn(`_${attribute.uniqueId}`, attribute.className)}>
      {block.innerBlocks.map((innerBlock, index) => (
        <AccordionItem
          block={innerBlock}
          key={index}
        />
      ))}
    </div>
  );
};
