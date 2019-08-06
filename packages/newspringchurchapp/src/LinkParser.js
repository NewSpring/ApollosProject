const linkParser = ({ url }) => {
  const urlSlug = url.split(/[\s/]+/);
  console.log(urlSlug);
  const appUrl = urlSlug[urlSlug.length - 1];
  return `newspringchurchapp://AppStackNavigator/ContentSingle?ItemId=${appUrl}`;
};

export default linkParser;
