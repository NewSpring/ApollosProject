import { ContentItem } from '@apollosproject/data-connector-rock';
import { schemaMerge } from '@apollosproject/server-core';

const resolver = {
  // ContentItem: {
  //   htmlContent: (data) => console.log(data) || 'HELLLLLO',
  // },
  // MediaContentItem: {
  //   htmlContent: (data) => console.log(data) || 'HELLLLLO',
  // },
  // ContentSeriesContentItem: {
  //   htmlContent: (data) => console.log(data) || 'HELLLLLO',
  // },
  // UniversalContentItem: {
  //   htmlContent: (data) => console.log(data) || 'HELLLLLO',
  // },
  // DevotionalContentItem: {
  //   htmlContent: (data) => console.log(data) || 'HELLLLLO',
  // },
};

export default schemaMerge(resolver, ContentItem);
