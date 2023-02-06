import { Image, Input, Button, Text } from "@rneui/themed";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { useLayoutEffect, useState } from "react";
import { View, StatusBar, StyleSheet, KeyboardAvoidingView } from "react-native";
import { auth } from "../../firebase";
import { AppImages } from "../constants/Images";


const SignUp = ({ navigation }) => {

  const profileImage = 'https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png'

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [image, setImage] = useState('https://www.aljazeera.com/wp-content/uploads/2022/12/SOR03134.jpg');
  const [loader, setLoader] = useState(false);

  const register = () => {
    setLoader(true)
    createUserWithEmailAndPassword(auth, email, password)
      // auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        console.log("USER:", user)
        updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: image || profileImage
        })
          .then(() => {
            console.log("Profile Updated")
          })
          .catch((err) => {
            alert(err)
          })
        setLoader(false)
        navigation.navigate('Login')
      })
      .catch((err) => {
        console.log("ERROR:", err)
        setLoader(false)
        alert(err.message)
      })
  }


  // const register = () => {
  //   setLoader(true)
  //   createUserWithEmailAndPassword(auth, email, password)
  //     // auth.createUserWithEmailAndPassword(email, password)
  //     .then((user) => {
  //       console.log("USER:", user)
  //       // user.user.updateProfile({
  //       //   // user.user.update({
  //       //   displayName: name,
  //       //   photoURL: image || profileImage
  //       // })
  //       setLoader(false)
  //       navigation.navigate('Login')
  //     })
  //     .catch((err) => {
  //       console.log("ERROR:", err)
  //       setLoader(false)
  //       alert(err.message)
  //     })
  // }


  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: "Back to Login"
    })
  }, [navigation])

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>

      <StatusBar style="light" />

      <Text h3 style={{ marginBottom: 30 }}>
        Create a Signal account
      </Text>

      <View style={styles.inputContainer}>

        <Input
          placeholder="Full Name"
          autoFocus
          value={name}
          onChangeText={setName}
        />

        <Input
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <Input
          placeholder="Password"
          value={password}
          secureTextEntry
          onChangeText={setPassword}
        />

        <Input
          placeholder="Profile Picture URL (optional)"
          value={image}
          onChangeText={setImage}
          onSubmitEditing={register}
        />

      </View>

      <Button
        containerStyle={styles.button}
        buttonStyle={{ backgroundColor: loader == true ? 'rgba(244, 244, 244, 0.7)' : "#2C6BED" }}
        loading={loader}
        loadingProps={{
          size: 'small',

          // color: 'rgba(244, 244, 244, 0.7)'
        }}
        raised
        title={"Register"}
        onPress={register}
      />

    </KeyboardAvoidingView>
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

export default SignUp;