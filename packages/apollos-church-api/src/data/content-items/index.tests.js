import resolver from '.';

describe('a test', () => {
  it('must make a snapshot', () => {
    expect(resolver).toMatchSnapshot();
  });
});
