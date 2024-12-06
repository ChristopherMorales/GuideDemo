import { View, Text, StyleSheet, Image, ViewStyle, TouchableOpacity } from 'react-native';
import React from 'react'
import { router } from 'expo-router';

const PlacesListItem = ({places, containerStyle, city}) => {

  return (
    <TouchableOpacity onPress={() => router.push({
        pathname: '/detail',
        params: {
            image: places.s3_url,
            name: places.name,
            lat: places.latitude,
            long: places.longitude,
            description: places.description,
            category: places.category,
            city: city
        }
    })}>
        <View style={[styles.card, containerStyle]}>
      <Image source={{ uri: places.s3_url}} style={styles.image} />
      <View style={styles.rightContainer}>
        <Text style={styles.title}>{places.name}</Text>
        <Text style={styles.description}>
          {places.description}
        </Text>

        <View style={styles.footer}>
          <Text style={styles.rating}>
            ★ {4.5} ({5})
          </Text>
          <Text style={styles.rating}>
            {places.category}
          </Text>
        </View>
      </View>
    </View>
    </TouchableOpacity>
  );
}

export default PlacesListItem

const styles = StyleSheet.create({
    card: {
      backgroundColor: 'white',
  
      flexDirection: 'row',
      borderRadius: 20,
  
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
  
      elevation: 3,
    },
    image: {
      width: 150,
      aspectRatio: 1,
      borderTopLeftRadius: 20,
      borderBottomLeftRadius: 20,
    },
    rightContainer: {
      padding: 10,
      flex: 1,
    },
    title: {
      fontFamily: 'InterBold',
      marginBottom: 10,
      fontSize: 16,
    },
    description: {
      color: 'gray',
    },
    rating: {
      fontFamily: 'InterBold',
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 'auto',
    },
  });
  