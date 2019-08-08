import LinkParser from './LinkParser';

test('parses the slug and fetches the id', () => {
  expect(
    LinkParser('fruit').toBe(
      'newspringchurchapp://AppStackNavigator/ContentSingle?itemId=DevotionalContentItem:2e4144092c34feca80e27de85ad238e7'
    )
  );
});
