
import { shallow } from 'enzyme';
import * as React from 'react';
import { EditModalContent } from '../../../src/components/config/EditModalContent';

describe('>>> components/config/EditModalContent.tsx component methods', () => {
  it('should...', () => {
    const props = {
      component: {} as any,
      saveEdit: () => null,
      cancelEdit: () => null,
    }
    const mocked = shallow(<EditModalContent {...props} />);
    const instance = mocked.instance() as EditModalContent;

    // truncate
    expect(instance.truncate('blabla')).toBe('blabla');
    expect(
      instance
        .truncate('blablablablablablablablablablablablablablablablablablablablablablatrallala')
    ).toHaveLength(60);
  });
});
