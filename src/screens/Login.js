import { Image, Input, Button } from "@rneui/themed";
import React, { useEffect, useState } from "react";
import { Text, View, StatusBar, StyleSheet } from "react-native";
import { auth } from "../../firebase";
import { AppImages } from "../constants/Images";
import { FacebookAuthProvider, signInWithEmailAndPassword } from "firebase/auth";
import { CommonActions } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';


const Login = ({ navigation }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loader, setLoader] = useState(false)
  const [isSecureText, setIsSecureText] = useState(true);

  const onLoginPress = () => {
    setLoader(true)
    signInWithEmailAndPassword(auth, email, password)
      .then((x) => {
        navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: "Home" }] }))
        setLoader(false)
      })
      .catch((e) => {
        alert(e)
        setLoader(false)
      })
  }

  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged((user) => {
  //     if (user) {
  //       navigation.replace("Home")
  //     }
  //   })

  //   return unsubscribe;
  // }, [navigation])


  return (
    <View style={styles.container}>

      <StatusBar style="light" />

      <Image
        source={AppImages.logo}
        style={{ width: 100, height: 100 }}
      />

      <View style={styles.inputContainer}>

        <Input
          placeholder="Email"
          autoFocus
          keyboardType="email-address"
          textContentType="emailAddress"
          value={email}
          onChangeText={setEmail}
        />

        <Input
          placeholder="Password"
          secureTextEntry={isSecureText}
          value={password}
          onChangeText={setPassword}
          rightIcon={
            <Feather
              name={isSecureText ? "eye-off" : "eye"}
              size={20}
              onPress={() => setIsSecureText(!isSecureText)}
            />
          }
        />

      </View>

      <Button
        containerStyle={styles.button}
        title={"Login"}
        loading={loader}
        onPress={onLoginPress}
      />

      <Button
        containerStyle={styles.button}
        title={"Register"}
        type="outline"
        onPress={() => navigation.navigate('SignUp')}
      />

      <View style={{ height: 50 }} />

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    backgroundColor: "white",
    padding: 10
  },
  button: {
    width: 200,
    marginTop: 10
  },
  inputContainer: {
    marginTop: 20,
    width: 300
  }
})

export default Login;