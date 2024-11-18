import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useFocusEffect } from 'expo-router';
import {getCityData} from '../../utils/api'

const MyTripScreen = () => {
    const [tripData, setTripData] = useState();
    
    useFocusEffect(
      React.useCallback(() => {
        const fetchData = async () => {
          try {
            const data = await AsyncStorage.getItem('myTripData');
            if (data) {
              const parsedData = JSON.parse(data);

              result = parsedData.map((item) => {
                return getCityData(item.city)
              }) 
              setTripData(Array.isArray(result) ? result : [result]);
              }
            } catch (error) {
              console.error('Error fetching trip data:', error);
            }
          };
      
          fetchData();
        }, [])
    )

      const handleCardPress = (item) => {
        router.navigate({
            pathname: '/result',
            params: {
              ...item
            }
      })
    }
    
      if (!tripData) {
        return (
          <View style={styles.emptyContainer}>
            <Text>No trips found. Start planning your journey!</Text>
            <TouchableOpacity style={{
              backgroundColor: '#3B0BEC',
              borderRadius: 25,
              width: 45,
              height: 45,
            }} onPress={ () => {
              router.navigate({
                pathname: '/(tabs)/'
              })
            }}>
              <Text style={{color: 'white', fontSize: 35, position: 'absolute', left: 12}}>+</Text>
            </TouchableOpacity>
          </View>
        );
      }

      return (
        <View style={styles.container}>
          <FlatList
            data={tripData}
            style={{
              marginBottom: 10
            }}
            keyExtractor={(item, index) => `trip-${index}`}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.card} onPress={() => handleCardPress(item)}>
                <Image source={{ uri: item.image }} style={{
                  width: '100%',
                  height: '80%'
                }} />
                <Text style={styles.cardTitle}>{item.city}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      gap: 10
    },
    card: {
      backgroundColor: 'white',
      padding: 15,
      borderRadius: 10,
      marginBottom: 10,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
      elevation: 3,
    },
    cardTitle: {
      marginTop: 10,
      fontSize: 16,
      fontWeight: 'bold',
    },
    cardDescription: {
      fontSize: 14,
      color: 'gray',
    },
  });

export default MyTripScreen