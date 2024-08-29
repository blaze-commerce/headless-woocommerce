import { ParsedBlock } from '@src/components/blocks';
import { MaxMegaMenuStyleRepresenter } from '@src/components/blocks/maxmegamenu/style-representer';
import { GenerateBlocksButtonStyleRepresenter } from '@src/components/blocks/generateblocks/button/style-representer';

export function StaticImplements<T>() {
  // eslint-disable-next-line no-unused-expressions
  return <U extends T>(constructor: U) => {
    constructor;
  };
}

interface BlockStyleRepresenter {
  generateClassNames: (_block: ParsedBlock) => string;
}

export interface StaticBlockStyleRepresenter {
  new (): BlockStyleRepresenter;
  readonly blockName: string;
}

const blockStyleRepresenters: StaticBlockStyleRepresenter[] = [
  MaxMegaMenuStyleRepresenter,
  GenerateBlocksButtonStyleRepresenter,
];

export const getBlockStyleRepresenter = (block: ParsedBlock) => {
  return blockStyleRepresenters.find((representer) => representer?.blockName === block.blockName);
};

// interface Server {
//   handleRedirects?: (initialState: Partial<ApplicationState>, req: ExpressRequest) => string;
//   serverRequests?: {
//     (initialState: Partial<ApplicationState>, req: ExpressRequest, res: Response): ServerRequest[];
//   };
// }

// export interface StaticServer {
//   new (): Server;
//   readonly url: RegExp;
//   readonly proceedOnError?: boolean;
// }
