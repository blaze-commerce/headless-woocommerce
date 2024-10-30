import { ParsedBlock } from '@wordpress/block-serialization-default-parser';

import { BlockAttributes } from '@src/lib/block/types';
import { Content } from '@src/components/blocks/content';
import { useSiteContext } from '@src/context/site-context';
import { Overlay } from '@src/components/overlay';

type MaxMegaMenuOverlayProps = {
  block: ParsedBlock;
};

export const MaxMegaMenuOverlay = ({ block }: MaxMegaMenuOverlayProps) => {
  const { setShowMenu, showMenu } = useSiteContext();
  const attribute = block.attrs as BlockAttributes;

  return (
    <Overlay
      isShowing={showMenu}
      setIsShowing={setShowMenu}
      style={{
        backgroundColor: '#fff',
      }}
    >
      <div className={attribute.className}>
        <Content content={block.innerBlocks} />
      </div>
    </Overlay>
  );
};
