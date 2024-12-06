import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useLocalSearchParams } from "expo-router";
import { Text, View, StyleSheet, SafeAreaView, Platform, StatusBar, ScrollView, Image } from "react-native";
import { useRef, useEffect, useState } from "react";
import { Video } from 'expo-av';
import MapView from 'react-native-maps';
import { useQuery } from "@tanstack/react-query";

import {getPlaces} from '../../api/places'
import { getCityLocation} from '../../utils/api'
import CustomMarker from "@/components/CustomMarker";

import PlacesListItem from "@/components/PlacesListItem";

const IconWithText = ({ iconName, text, iconColor = 'gray', iconSize = 22, backgroundColor = 'lightgray' }) => {
  return (
    <View style={styles.container}>
      <View style={[styles.iconContainer, { backgroundColor }]}>
        <FontAwesome name={iconName} size={iconSize} color={iconColor} />
      </View>
      <Text>{text}</Text>
    </View>
  );
};

export default function MapScreen() {
  const {image, description, city} = useLocalSearchParams()


  const {data} = useQuery({
    queryKey: ['places', city],
    queryFn: () => getPlaces({city})
  })

  const [selectedPlace, setSelectedPlace] = useState(
    null
  );
  const map = useRef();

  const coords = getCityLocation(city)

  const DELTA = 0.2

  useEffect(() => {
    if (!city) {
      return;
    }
    else {
      const region = {
        latitude: coords.lat,
        longitude: coords.long,
        latitudeDelta: DELTA,
        longitudeDelta: DELTA,
      };

      map.current.animateToRegion(region);
    }

    return setSelectedPlace(null)
  }, [city, data]);


  return (
    <SafeAreaView 
    style={{
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        backgroundColor: 'white',
        height: '100%',
      }}>
        <ScrollView
        style={{ height: '100%' }}
        contentInset={{ bottom: 800 }}
      >
        <View style={{
        width: '100%',
        height: 250
    }}>
    {
      city === 'San Juan' ? (
        <Video
          source={require('../../assets/videos/sanjuan.mp4')}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          shouldPlay
          isLooping
          style={[styles.backgroundVideo, styles.shadow]}
        />
      ) : (
        <Image source={{ uri: image }} style={{
          width: '100%',
          height: '100%'
        }} />
      )
    }
      <View style={{
        backgroundColor: '#FFF',
        width: 220,
        height: 110,
        position: 'absolute',
        top: 60, 
        left: 20,
        borderRadius: 15,
        gap: 5
      }}>
        <Text style={{
            fontSize: 25,
            fontWeight: 700,
            top: 10,
            left: 20
        }}>{city}</Text>
        <Text style={{
            fontSize: 16,
            top: 10,
            left: 20,
            color: 'gray'
        }}>Day Trip</Text>
        <Text style={{
            fontSize: 16,
            top: 10,
            left: 20,
            color: 'gray'
        }}>5 Recommendations</Text>
      </View>
    </View>

    <Text style={{
        fontSize: 30,
        fontWeight: 600,
        marginLeft: 5,
        marginTop: 20
    }}>Overview</Text>

    <View style={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around'
    }}>
      <IconWithText iconName="clock-o" text="8 hours" />
      <IconWithText iconName="cloud" text="85 °F" />
      <IconWithText iconName="star-half-full" text="4.5" />
    </View>

    <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionText}>{description}</Text>
        </View>
        
        <View style={{
            width: '100%',
            height: '100%'
        }}>
        <MapView
        ref={map}
        initialRegion={{
          latitude: coords.lat,
          longitude: coords.long,
          latitudeDelta: DELTA,
          longitudeDelta: DELTA,
        }}
        zoomEnabled={true}
        
        loadingEnabled={true}
        showsMyLocationButton={true}
        compassOffset={{
          x: -5,
          y: 80,
        }}
        mapType={Platform.OS === 'android' ? 'none' : 'mutedStandard'}
        style={[StyleSheet.absoluteFillObject, {margin: 20}]}
      >

      {data &&  data.map((place) => (
          <CustomMarker
            key={place.id}
            places={place}
            onPress={() => setSelectedPlace(place)}

          />
        ))}

      </MapView>

      {selectedPlace && (
        <PlacesListItem
          places={selectedPlace}
          containerStyle={styles.selectedContainer}
          city={city}
        />
      )}

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
        borderRadius: 20
      },
      shadow: {
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -1 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
      },
      descriptionContainer: {
        marginLeft: 20,
        marginRight: 20,
        padding: 5,
        borderRadius: 10,
        elevation: 2,
      },
      descriptionText: {
        fontSize: 16,
        lineHeight: 24,
        color: '#555',
        fontWeight: '400',
      },
      selectedContainer: {
        position: 'absolute',
        bottom: -600,
        right: 20,
        left: 40,
        width: 350,
        height: 150
      },
      container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        gap: 5,
      },
      iconContainer: {
        padding: 5,
        borderRadius: 8,
      },

  })