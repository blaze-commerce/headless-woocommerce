import { render } from '@testing-library/react';

import { Loader } from '@src/components/loader';

describe('<Loader />', () => {
  it('captures snapshot', () => {
    const { container } = render(<Loader />);
    expect(container).toMatchSnapshot();
  });
});
