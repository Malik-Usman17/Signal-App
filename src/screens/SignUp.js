import { Input, Button, Text } from "@rneui/themed";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { useLayoutEffect, useState } from "react";
import { View, StatusBar, StyleSheet, KeyboardAvoidingView, Image } from "react-native";
import { auth } from "../../firebase";
import { AppImages } from "../constants/Images";


const SignUp = ({ navigation }) => {

  const profileImage = 'https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png'
  // const profileImage = 'https://upload.wikimedia.org/wikipedia/commons/b/b4/Lionel-Messi-Argentina-2022-FIFA-World-Cup_%28cropped%29.jpg'

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [image, setImage] = useState('https://upload.wikimedia.org/wikipedia/commons/b/b4/Lionel-Messi-Argentina-2022-FIFA-World-Cup_%28cropped%29.jpg')
  // const [image, setImage] = useState('https://www.aljazeera.com/wp-content/uploads/2022/12/SOR03134.jpg');
  const [loader, setLoader] = useState(false);

  const register = () => {
    setLoader(true)
    createUserWithEmailAndPassword(auth, email, password)
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


  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: "Back to Login"
    })
  }, [navigation])


  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>

      <StatusBar style="light" backgroundColor={"white"} barStyle={"dark-content"} />

      <Image source={AppImages.logo} style={{ width: 100, height: 100 }} />

      <Text h3 style={{ marginVertical: 30 }}>
        Create a Signal account
      </Text>

      <View style={styles.inputContainer}>

        <Input
          placeholder="Full Name"
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
          size: 'small'
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
    padding: 10,
    paddingHorizontal: 20
  },
  button: {
    width: 200,
    marginTop: 10
  },
  inputContainer: {
    width: "100%"
  }
})

export default SignUp;