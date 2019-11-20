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
    case 'DevotionalContentItem': {
      let labelText;
      if (
        get(props, 'parentChannel.name', '')
          .split(' - ')
          .pop() === 'Devotionals'
      ) {
        labelText = `${get(props, 'seriesConnection.itemIndex', '')} of ${get(
          props,
          'seriesConnection.itemCount',
          ''
        )}`;
      } else if (
        get(props, 'parentChannel.name', '')
          .split(' - ')
          .pop() === 'Sermons'
      ) {
        labelText = `Week ${get(props, 'seriesConnection.itemIndex')}`;
      } else {
        labelText = '';
      }
      return (
        <HorizontalHighlightCard
          title={hyphenatedTitle}
          {...props}
          coverImage={null}
          labelText={labelText}
        />
      );
    }
    default:
      return <HorizontalDefaultCard title={title} {...props} />;
  }
};

horizontalContentCardComponentMapper.propTypes = {
  hyphenatedTitle: PropTypes.string,
  title: PropTypes.string,
};

export default horizontalContentCardComponentMapper;
