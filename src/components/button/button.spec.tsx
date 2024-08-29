import { render, screen } from '@testing-library/react';

import { Button } from '@components/button';

describe('<Button />', () => {
  it('should render label', () => {
    render(<Button onClick={() => {}}>Test</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Test');
  });
});
