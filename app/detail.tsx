import { View, Text, Image, StyleSheet, Platform, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import MapView, { Marker } from 'react-native-maps'
import { getApps } from 'react-native-map-link';
import {
  MapPinIcon,
} from 'react-native-heroicons/outline';
const DetailScreen = () => {
  const {image, name, lat, long, city, description} = useLocalSearchParams()
  const [availableApps, setAvailableApps] = useState([]);


  (async () => {
    const result = await getApps({
      latitude: lat,
      longitude: long,
      googleForceLatLon: true, 
      alwaysIncludeGoogle: true, 
      appsWhiteList: ['google-maps', 'waze'],
    });
    setAvailableApps(result);
  })();

  return (
    <View style={{
      backgroundColor: 'white'
    }}>
      <Image source={{ uri: image }} style={styles.image}/>
      <View style={{
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 16
      }}>
          <View style={{
            flexDirection: 'column',
            gap: 0.25
          }}>
            <Text style={{
              fontSize: 24,
              lineHeight: 32,
              fontWeight: 700,
              marginBottom: 20
            }}>{name}</Text>
          </View>
        </View>
        <View style={{
          flexDirection: 'row',
          marginTop: 4,
          marginBottom: 4,
          marginHorizontal: 10
        }}>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center'
            }}>
              <MapPinIcon color="gray" opacity={0.4} size={22} />
              <Text style={{
                color: '#6b7280'
              }}>
                Nearby: {description} {city}
              </Text>
            </View>
          </View>
        <View
            style={{
              padding: 10,
              backgroundColor: 'white',
              borderTopWidth: 1,
              borderBottomWidth: 1,
              borderColor: 'rgb(209, 213, 219)',
            }}
          >
        <View style={{ width: '100%', height: 150 }}>
              <MapView
                initialRegion={{
                  latitude: lat,
                  longitude: long,
                  latitudeDelta: 0.05,
                  longitudeDelta: 0.05,
                }}
                zoomEnabled={true}
                style={{ flex: 1 }}
              >
                <Marker
                  coordinate={{
                    latitude: lat,
                    longitude: long,
                  }}
                />
              </MapView>
            </View>

            <View style={{ alignItems: 'center', marginTop: 10 }}>
              {availableApps.map(({ icon, name, id, open }) => (
                <TouchableOpacity
                  key={id}
                  onPress={open}
                  style={{ alignItems: 'center' }}
                >
                  <Image source={icon} style={{ width: 40, height: 40 }} />
                  <Text>
                    Open in {name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300
  },
  title: {
    fontSize: 25,
    fontWeight: 800,
    margin: 20
  }
});

export default DetailScreen