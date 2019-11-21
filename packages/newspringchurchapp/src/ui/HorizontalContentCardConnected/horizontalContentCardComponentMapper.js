import React from 'react';
import { get } from 'lodash';
import PropTypes from 'prop-types';

import {
  CardLabel,
  HorizontalDefaultCard,
  HorizontalHighlightCard,
  ThemeConsumer,
} from '@apollosproject/ui-kit';

const StyledHorizontalHightlightCard = ({
  hyphenatedTitle,
  labelText,
  ...props
}) => (
  <ThemeConsumer>
    {(theme) => (
      <HorizontalHighlightCard
        title={hyphenatedTitle}
        {...props}
        coverImage={null}
        LabelComponent={
          <CardLabel
            type={get(theme, 'type') === 'light' ? 'darkOverlay' : undefined}
            title={labelText}
          />
        }
      />
    )}
  </ThemeConsumer>
);

StyledHorizontalHightlightCard.propTypes = {
  hyphenatedTitle: PropTypes.string,
  labelText: PropTypes.string,
};

const horizontalContentCardComponentMapper = ({
  title,
  hyphenatedTitle,
  ...props
}) => {
  // map typename to the the card we want to render.
  const {
    __typename: typename,
    seriesConnection: { itemCount, itemIndex } = {},
  } = props;

  switch (typename) {
    case 'ContentSeriesContentItem':
      return <HorizontalHighlightCard {...props} />;
    case 'MediaContentItem':
      return <HorizontalHighlightCard title={hyphenatedTitle} {...props} />;
    case 'WeekendContentItem':
      return (
        <StyledHorizontalHightlightCard
          {...props}
          hyphenatedTitle={hyphenatedTitle}
          labelText={itemIndex ? `Week ${itemIndex}` : ''}
        />
      );
    case 'DevotionalContentItem':
      return (
        <StyledHorizontalHightlightCard
          {...props}
          hyphenatedTitle={hyphenatedTitle}
          labelText={
            itemIndex && itemCount ? `${itemIndex} of ${itemCount}` : ''
          }
        />
      );
    default:
      return <HorizontalDefaultCard title={title} {...props} />;
  }
};

horizontalContentCardComponentMapper.propTypes = {
  hyphenatedTitle: PropTypes.string,
  title: PropTypes.string,
  theme: PropTypes.shape({
    type: PropTypes.string,
  }),
  __typename: PropTypes.string,
  seriesConnection: PropTypes.shape({
    itemCount: PropTypes.number,
    itemIndex: PropTypes.number,
  }),
};

export default horizontalContentCardComponentMapper;
