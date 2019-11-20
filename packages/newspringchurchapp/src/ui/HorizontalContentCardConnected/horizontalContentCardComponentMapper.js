import React from 'react';
import { get } from 'lodash';
import PropTypes from 'prop-types';

import {
  CardLabel,
  HorizontalDefaultCard,
  HorizontalHighlightCard,
  ThemeConsumer,
} from '@apollosproject/ui-kit';

const horizontalContentCardComponentMapper = ({
  title,
  hyphenatedTitle,
  ...props
}) => {
  // map typename to the the card we want to render.
  const typeName = get(props, '__typename');

  switch (typeName) {
    case 'ContentSeriesContentItem':
      return <HorizontalHighlightCard {...props} />;
    case 'MediaContentItem':
      return <HorizontalHighlightCard title={hyphenatedTitle} {...props} />;
    case 'WeekendContentItem':
    case 'DevotionalContentItem': {
      let labelText;
      if (typeName === 'DevotionalContentItem') {
        labelText = `${get(props, 'seriesConnection.itemIndex', '')} of ${get(
          props,
          'seriesConnection.itemCount',
          ''
        )}`;
      } else if (typeName === 'WeekendContentItem') {
        labelText = `Week ${get(props, 'seriesConnection.itemIndex')}`;
      } else {
        labelText = '';
      }
      return (
        <ThemeConsumer>
          {(theme) => (
            <HorizontalHighlightCard
              title={hyphenatedTitle}
              {...props}
              coverImage={null}
              LabelComponent={
                <CardLabel
                  type={
                    get(theme, 'type') === 'light' ? 'darkOverlay' : undefined
                  }
                  title={labelText}
                />
              }
            />
          )}
        </ThemeConsumer>
      );
    }
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
};

export default horizontalContentCardComponentMapper;
