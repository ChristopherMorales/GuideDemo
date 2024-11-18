import { Platform, StyleSheet, Text, View } from 'react-native'
import FontAwesome from '@expo/vector-icons/FontAwesome';

import React from 'react'
import { Tabs } from 'expo-router'

const TabsLayout = () => {
  return (
    <Tabs screenOptions={{tabBarActiveTintColor: '#3B0BEC',  headerTintColor: 'white',
        headerStyle: {
            backgroundColor: '#3B0BEC'
        },}}>
      <Tabs.Screen name='index' options={{
        title: "Home",
       
        tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
      }}/>
      <Tabs.Screen name="result" options={{
        headerTitle: " ",
        href: null,
      }}/>
      <Tabs.Screen name="mytrip" options={{
      title: 'My Trips',
      tabBarIcon: () => {
          return (
              <View style={{
                  alignItems:'center',
                  justifyContent: 'center',
                  backgroundColor: '#3B0BEC',
                  height: Platform.OS === 'ios' ? 70 : 60,
                  width: Platform.OS === 'ios' ? 70 : 60,
                  top: Platform.OS === 'ios' ? -20 : -30,
                  borderRadius: Platform.OS === 'ios' ? 35 : 30,
                  borderWidth: 2,
                  borderColor: '#3B0BEC'
              }}>
               <FontAwesome size={28} name="calendar" color="#FFF" />
              </View>
          )
      }
    }}/>
      <Tabs.Screen name="settings" options={{
        title: "Settings",
        tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
    }}/>
    
    
    </Tabs>
  )
}

export default TabsLayout;

const styles = StyleSheet.create({})