import React, { useEffect } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { AppImages } from '../constants/Images';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { auth } from '../../firebase';


const Splash = () => {


  const navigation = useNavigation();


  useEffect(() => {
    setTimeout(() => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: "Home" }] }))
        }
        else {
          navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: "Login" }] }))
        }
      })

    }, 1000)

  }, [])

  return (
    <View style={styles.container}>
      <Image source={AppImages.logo} style={styles.image} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "White",
    justifyContent: 'center',
    alignItems: "center"
  },
  image: {
    height: 200,
    width: 200
  }
});

export default Splash;