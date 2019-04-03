import { ContentItem as oldContentItem } from '@apollosproject/data-connector-rock';
import natural from 'natural';
import sanitizeHtmlNode from 'sanitize-html';

export default class ContentItem extends oldContentItem.dataSource {
  createSummary = ({ content, attributeValues: { summary = {} } }) => {
    if (summary.value) return summary.value;
    if (!content || typeof content !== 'string') return '';
    // Protect against 0 length sentences (tokenizer will throw an error)
    if (content.split(' ').length === 1) return '';

    const tokenizer = new natural.SentenceTokenizer();
    return tokenizer.tokenize(
      sanitizeHtmlNode(content, {
        allowedTags: [],
        allowedAttributes: [],
      })
    )[0];
  };
}
