import { CommonActions } from '@react-navigation/native';
import { Button, Image, Input } from "@rneui/themed";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import AwesomeButton from 'react-native-really-awesome-button';
import Feather from 'react-native-vector-icons/Feather';
import { auth } from "../../firebase";
import { AppImages } from "../constants/Images";


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


  return (
    <View style={styles.container}>

      <StatusBar style="light" backgroundColor={"white"} barStyle={"dark-content"} />

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

      <AwesomeButton backgroundColor='blue' backgroundShadow='blue'>
        HELLO
      </AwesomeButton>

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
    padding: 10,
    paddingHorizontal: 30
  },
  button: {
    width: 200,
    marginTop: 10
  },
  inputContainer: {
    marginTop: 40,
    width: "100%"
  }
})

export default Login;