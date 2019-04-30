const resolver = {
  Query: {
    prayerMenuCategories: (
      root,
      args,
      { dataSources: { PrayerMenuCategory } }
    ) => PrayerMenuCategory.getPrayerMenuCategories(),
  },
};

export default resolver;
