import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

import { useAuthenticator } from "@aws-amplify/ui-react-native";

const SettingScreen = () => {
  const { signOut } = useAuthenticator();

  return (
    <SafeAreaView>
      <View
        style={{
          marginLeft: 15,
          paddingTop: 40,
          position: 'absolute',
          top: 40,
        }}
      >
        <Text style={{ fontWeight: 600, fontSize: 25 }}>Profile</Text>
      </View>
      <View
        style={{
          paddingVertical: 20,
          alignItems: 'center',
          height: '70%',
          marginTop: 100,
        }}
      >
        <View
          style={{
            backgroundColor: '#3B0BEC',
            width: 100,
            height: 100,
            borderRadius: 50,
            position: 'absolute',
            zIndex: 100,
            top: -40,
          }}
        >
          <Text
            style={{
              fontSize: 60,
              lineHeight: 100,
              textAlign: 'center',
              color: 'white',
            }}
          >
            C
          </Text>
        </View>
        <View
          style={[
            styles.shadow,
            {
              backgroundColor: 'white',
              width: '80%',
              height: '75%',
              borderRadius: 20,
            },
          ]}
        >
          <View
            style={[
              styles.divider,
              { marginTop: 45, alignItems: 'center', height: 45 },
            ]}
          >
            <Text style={{ fontWeight: 'bold' }}>
              Christopher Morales
            </Text>
            <Text>christophermoralesdev@gmail.com</Text>
          </View>
          <View style={{ marginTop: 20, marginHorizontal: 10 }}>
            {/* <ProfilePermissions /> */}
          </View>
        </View>
        <TouchableOpacity style={[styles.button, { marginTop: 15 }]} onPress={signOut}>
          <Text style={styles.buttonText} >
            Log Out
          </Text>
        </TouchableOpacity>
      </View>
      <View></View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  divider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#E8EBEB',
  },
  button: {
    backgroundColor: 'gray',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: '60%',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  shadow: {
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: -1 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  shadowBottom: {
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 0,
    borderTopLeftRadius: 150,
    borderTopRightRadius: 150,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 10,
  },
});

export default SettingScreen;