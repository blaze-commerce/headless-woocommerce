import { render } from '@testing-library/react';

import type { AccordionItem } from '@components/accordion';
import { Accordion } from '@components/accordion';

const accordionItems: AccordionItem[] = [
  {
    title: 'Test Content 1',
    content: '<div>Test Content</div>',
    isOpen: true,
  },
  {
    title: 'Test Content 2',
    content: '<div>Test Content 2</div>',
  },
];

describe('<Accordion />', () => {
  it('captures snapshot', () => {
    const { container } = render(<Accordion data={accordionItems} />);
    expect(container).toMatchSnapshot();
  });
});
