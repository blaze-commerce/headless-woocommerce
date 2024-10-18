import { ParsedBlock } from '@wordpress/block-serialization-default-parser';

import { AccordionItem } from '@src/components/blocks/generateblocks/accordion/accordion-item';
import { isAccordion } from '@src/lib/block';
import { BlockAttributes } from '@src/lib/block/types';
import { cn } from '@src/lib/helpers/helper';
import { ReactHTMLParser } from '@src/lib/block/react-html-parser';

type AccordionProps = {
  block: ParsedBlock;
};

export const Accordion = ({ block }: AccordionProps) => {
  if (!isAccordion(block) || block.innerBlocks.length <= 0) {
    return <ReactHTMLParser html={block.innerHTML} />;
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
