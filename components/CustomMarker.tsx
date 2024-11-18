import { View, Image } from 'react-native';
import React from 'react';
import { Marker } from 'react-native-maps';

const CustomMarker = ({ places, onPress }) => {
  return (
    <Marker
      onPress={onPress}
      coordinate={{
        latitude: places.latitude,
        longitude: places.longitude,
      }}
      identifier="origin"
      tracksViewChanges={false}
    >
      <View
        style={{
          paddingHorizontal: 10,
        }}
      >
        <Image source={require('../assets/images/marker.png')} />
      </View>
    </Marker>
  );
};

export default CustomMarker;