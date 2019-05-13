import gql from 'graphql-tag';

export default gql`
  query PrayerMenuCategories {
    prayerMenuCategories {
      id
      title
      subtitle
      imageURL
      overlayColor
    }
  }
`;
