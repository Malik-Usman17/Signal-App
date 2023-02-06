import React, { useLayoutEffect, useState } from "react";
import { KeyboardAvoidingView, SafeAreaView, StatusBar, StyleSheet, ScrollView, Text, View, TextInput, Platform, TouchableWithoutFeedback, Keyboard } from "react-native";
import { ListItem, Avatar } from '@rneui/themed';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { addDoc, collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebase";


const Chat = ({ route }) => {

  const navigation = useNavigation();

  const [msg, setMsg] = useState('');

  const profileImage = 'https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png'

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Chat",
      headerBackTitleVisible: false,
      headerBackVisible: false,
      headerTitleAlign: "left",
      headerTitle: () => (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Avatar
            rounded
            source={{ uri: profileImage }}
          />
          <Text style={styles.headerTitle}>
            {route.params.chatName}
          </Text>
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity
          style={{ marginRight: 15 }}
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="arrowleft" size={24} color="white" />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View style={styles.headerRightContainer}>
          <TouchableOpacity>
            <FontAwesome
              name="video-camera"
              size={24}
              color="white"
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons
              name="call"
              size={24}
              color="white"
            />
          </TouchableOpacity>
        </View>


      )
    })
  }, [navigation])

  const sendMessage = async () => {
    Keyboard.dismiss()
    const addMessage = doc(db, "chats", route.params.id)
    const msg = await getDoc(addMessage)
    // const addMessage = collection(db, "chats").id(route.params.id)
    // const addMessage = await (await getDocs(collection(db, "chats"))).docs.
    console.log("ADD MESSAGE:", msg.data())
    console.log("ADD MESSAGE ID:", msg.id)
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>

      <StatusBar barStyle={"light-content"} />

      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={90}
      >
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss}>
          <>
            {/* <ScrollView></ScrollView> */}
            <View style={styles.footer}>
              <TextInput
                placeholder="Signal Message"
                style={styles.textInput}
              />
              <TouchableOpacity onPress={sendMessage}>
                <Ionicons name="send" size={24} color="#2B68E6" />
              </TouchableOpacity>
            </View>
          </>
        </TouchableWithoutFeedback>

      </KeyboardAvoidingView>

    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "green"
  },
  headerTitle: {
    color: "white",
    fontWeight: "700",
    marginLeft: 10
  },
  headerRightContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 80
  },
  footer: {
    flexDirection: "row",
    backgroundColor: "pink",
    // alignSelf: "flex-end",
    marginTop: "auto",
    alignItems: "center",
    width: "100%",
    padding: 15
  },
  textInput: {
    bottom: 0,
    height: 40,
    flex: 1,
    marginRight: 15,
    backgroundColor: "#ECECEC",
    color: "grey",
    borderRadius: 30
  }
})
export default Chat;