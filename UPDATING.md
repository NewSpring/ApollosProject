# Updating

## Updating from 0.8.0-alpha.4 to 0.8.0-alpha.5

### Updating Config
1. In Config.yml
  Replace
```
  CONTENT_ITEM_TYPES:
    - ContentItem
    - UniversalContentItem
    - DevotionalContentItem
    - MediaContentItem
```
  With
```
  CONTENT_ITEM:
    ContentSeriesContentItem:
      # When resolving "ContentSeriesContentItem" look in rock for a "ContentChannelItem"
      EntityType: ContentChannelItem
      # Used to define the subset of content channels types that use this specific type.
      ContentChannelTypeId: [6, 7]
    DevotionalContentItem:
      EntityType: ContentChannelItem
      ContentChannelTypeId: [1]
    MediaContentItem:
      EntityType: ContentChannelItem
    UniversalContentItem:
      EntityType: ContentChannelItem
    ContentItem:
      EntityType: ContentChannelItem
```
  Delete `SERIES_CONTENT_CHANNEL_TYPE_IDS:` and `DEVOTIONAL_TYPE_IDS:`

## Updating from 0.8.0-alpha.3 to 0.8.0-alpha.4

### Updating API

1. In `src/data/index.js`
  - [ ] Remove `Interactions` import and delete folder `data/interactions`.
  - [ ] Remove `RockConstants` import and delete `connectors` folder and all contents.
  - [ ] Add below code to top of file
```
import {
  Followings,
  Interactions,
  RockConstants,
} from '@apollosproject/data-connector-rock-actions';
```
  - [ ] Add `Followings,` to the data object.

2. In `package.json`
  - [ ] Add `"@apollosproject/data-connector-rock-actions": "^0.8.0-alpha.X",` to your dependencies. (Replace X with latest release.)

### Updating Client

1. In `content-single/getContentItem.js`
  - [ ] Add `likedCount` and `summary` to `contentItemFragment`.

2. In `src/ui/LikeButton/index.js`
  - [ ] (line 33-35) Change `updateLikeEntity` prop of `Mutation` to
```
        id: itemId, // unknown at this time
        isLiked: !isLiked,
        __typename: item.__typename,
```
  - [ ] (line 33-35) Change `updateLikeEntity: { operation },` into `updateLikeEntity: { isLiked: liked },`
  - [ ] (line 53) Change `isLiked: operation === 'Like',` to `isLiked: liked,`

3. In `src/ui/LikeButton/updateLikeEntity.js`
 - [ ] Add `isLiked` to the mutation result fields and remove `operation` and `interactionDateTime`

### Config

1. In config.yml
  - [ ] Add `APP.DEEP_LINK_HOST` config field. This field is used for the protocol when deep linking. Leave blank if you don't know yet.

```
APP:
  # This variable is used for generating deep links.
  # It should match whatver is in your Info.plist `CFBundleURLTypes`
  DEEP_LINK_HOST: newspringchurchapp
```
 - [ ] Add `CONTENT_ITEM_TYPES` to `ROCK_MAPPINGS`. This is used to reference all the different content item types. You should be safe to use the below as a default.
 ```
  CONTENT_ITEM_TYPES:
    - ContentItem
    - UniversalContentItem
    - DevotionalContentItem
    - MediaContentItem
```
  - [ ] Add `INTERACTIONS` to `ROCK_MAPPINGS`. Change your values to match your team / project
```
  INTERACTIONS:
    # Name of the InteractionChannel that will be created
    CHANNEL_NAME: Apollos App
    # Name of the InteractionComponent that will be created for Content Items
    COMPONENT_NAME: Apollos Content Item
    # 512 is "Mobile App"
    CHANNEL_MEDIUM_TYPE_ID: 512
```
