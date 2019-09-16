import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Query, Mutation } from 'react-apollo';
import { Dimensions } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { PaddedView, ButtonLink } from '@apollosproject/ui-kit';
import requestLocation from './requestLocation';

import GET_CAMPUSES from './getCampusLocations';
import CHANGE_CAMPUS from './campusChange';
import MapView from './MapView';

class Location extends PureComponent {
  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
      navigate: PropTypes.func,
      goBack: PropTypes.func,
    }),
    initialRegion: PropTypes.shape({
      latitude: PropTypes.number,
      longitude: PropTypes.number,
      latitudeDelta: PropTypes.number,
      longitudeDelta: PropTypes.number,
    }),
  };

  static defaultProps = {
    initialRegion: {
      // roughly show the entire USA by default
      latitude: 32.916107,
      longitude: -80.974731,
      latitudeDelta: 8,
      longitudeDelta:
        (5 * Dimensions.get('window').width) / Dimensions.get('window').height,
    },
  };

  static navigationOptions = ({ navigation }) => ({
    title: 'Location',
    headerLeft: null,
    headerRight: (
      <PaddedView vertical={false}>
        <ButtonLink onPress={() => navigation.goBack()}>Back</ButtonLink>
      </PaddedView>
    ),
  });

  state = {
    userLocation: {
      latitude: 34.59778,
      longitude: -82.62259,
    },
  };

  async componentDidMount() {
    await requestLocation();
    Geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          userLocation: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
        });
      },
      () => null,
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }

  render() {
    return (
      <Query
        query={GET_CAMPUSES}
        variables={{
          latitude: this.state.userLocation.latitude,
          longitude: this.state.userLocation.longitude,
        }}
        fetchPolicy="cache-and-network"
      >
        {({ loading, error, data: { campuses = [] } = {} }) =>
          console.log(campuses) || (
            <Mutation mutation={CHANGE_CAMPUS}>
              {(handlePress) => (
                <MapView
                  navigation={this.props.navigation}
                  isLoading={loading}
                  error={error}
                  campuses={campuses}
                  initialRegion={this.props.initialRegion}
                  userLocation={this.state.userLocation}
                  onLocationSelect={async ({ id }) => {
                    await handlePress({
                      variables: {
                        campusId: id,
                      },
                    });
                    this.props.navigation.goBack();
                  }}
                />
              )}
            </Mutation>
          )
        }
      </Query>
    );
  }
}

export default Location;
