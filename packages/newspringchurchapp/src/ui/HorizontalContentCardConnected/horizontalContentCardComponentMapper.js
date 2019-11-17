import React from 'react';
import { get } from 'lodash';
import PropTypes from 'prop-types';

import {
  HorizontalDefaultCard,
  HorizontalHighlightCard,
} from '@apollosproject/ui-kit';

const horizontalContentCardComponentMapper = ({
  title,
  hyphenatedTitle,
  ...props
}) => {
  // map typename to the the card we want to render.
  switch (get(props, '__typename')) {
    case 'ContentSeriesContentItem':
      return <HorizontalHighlightCard {...props} />;
    case 'MediaContentItem':
      return <HorizontalHighlightCard title={hyphenatedTitle} {...props} />;
    case 'WeekendContentItem':
    case 'DevotionalContentItem':
      return (
        <HorizontalHighlightCard
          title={hyphenatedTitle}
          {...props}
          coverImage={null}
          labelText={null}
        />
      );
    default:
      return <HorizontalDefaultCard title={title} {...props} />;
  }
};

horizontalContentCardComponentMapper.propTypes = {
  hyphenatedTitle: PropTypes.string,
  title: PropTypes.string,
};

export default horizontalContentCardComponentMapper;
