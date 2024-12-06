import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, View, StyleSheet, Pressable } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
import {municipios} from '../../assets/data/municipios';
import { Video } from 'expo-av';
import React, { useEffect, useState } from 'react';
import { router } from 'expo-router';


export default function Index() {
    const data = municipios.map((value) => {
        return {
          label: value.city,
          value: value.city        
        };
      });

    const [openTown, setOpenTown] = useState(false);
    const [valueTown, setValueTown] = useState();
    const [itemTown, setItemTown] = useState([...data]);

    // This is to delete result
    // useEffect(async() => {
    //   try {
    //     await AsyncStorage.removeItem('myTripData');
    //     console.log('myTripData has been removed');
    //   } catch (error) {
    //     console.error('Error removing myTripData:', error);
    //   }
    // }, [])

    const saveData = async(valueTown) => {
      const storedData = await AsyncStorage.getItem('myTripData');
      
      const tripArray = storedData ? JSON.parse(storedData) : [];
      
      if (!Array.isArray(tripArray)) {
        throw new Error('Stored data is not an array');
      }

      const newTrip = { city: valueTown };

      const updatedTripArray = tripArray.some((trip) => trip.city === valueTown)
        ? tripArray
        : [...tripArray, newTrip];

      await AsyncStorage.setItem('myTripData', JSON.stringify(updatedTripArray));

      router.push({
        pathname: '/mytrip'
      })
    }

  return (
    <View
      style={styles.container}
    >

        <Text style={styles.title}>Let Your Journey Begin</Text>
        <Video
        source={require('../../assets/videos/background.mp4')}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode="cover" 
        shouldPlay
        isLooping
        style={styles.backgroundVideo}
      />
            <View style={styles.overlay} />

        <View
        style={{
            backgroundColor: 'white',
            display: 'flex',
            padding: 30,
            gap: 15,
            width: '90%',
            height: 250,
            borderRadius: 15

        }}
        >  
        <Text style={{
            fontWeight: 700,
        }}>Where do you want to go?</Text>
        <DropDownPicker
                open={openTown}
                value={valueTown}
                items={itemTown}
                setOpen={setOpenTown}
                setValue={setValueTown}
                setItems={setItemTown}
                onSelectItem={(item) => {
                  setValueTown(item);
                }}
                placeholder={`Select a town`}
                searchable={true}
                autoScroll={true}
                listMode="FLATLIST"
                min={0}
                max={1}
                modalAnimationType="slide"
                listParentLabelStyle={{
                  fontWeight: 'bold',
                }}
                listChildLabelStyle={{
                  color: 'grey',
                }}
                placeholderStyle={{
                  color: 'grey',
                  fontWeight: 'bold',
                }}
                style={{ borderWidth: 1, borderColor: 'grey' }}
              />
        
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>

        <Pressable 
        disabled={!valueTown} 
        style={[styles.button, {backgroundColor: valueTown ? '#3B0BEC': 'gray'}]}
        onPress={async () => 
         { 
          try {
            await saveData(valueTown)
            
          } catch (error) {
            console.error('Error saving trip data:', error);

          }
      
      }}>
          <Text style={{ color: 'white' }}>Next</Text>
        </Pressable>
</View>

            
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 20
      },
    button: {
        alignItems: 'center',
        paddingVertical: 12,
        borderRadius: 4,
        width: 70,
        elevation: 3
    },
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: 1000,
      },
      overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      title: {
        color: 'white',
        fontFamily: 'ui-sans-serif',
        fontWeight: 700,
        fontSize: 35,
        padding: 20,
        zIndex: 100
      }
  })