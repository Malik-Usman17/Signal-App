import React, { useLayoutEffect, useState } from "react";
import { KeyboardAvoidingView, TouchableOpacity, SafeAreaView, StatusBar, StyleSheet, ScrollView, Text, View, TextInput, Platform, TouchableWithoutFeedback, Keyboard, Alert } from "react-native";
import { ListItem, Avatar } from '@rneui/themed';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { addDoc, collection, doc, Firestore, getDoc, getDocs, orderBy, query, serverTimestamp, setDoc, Timestamp } from "firebase/firestore";
import { auth, db } from "../../firebase";


const Chat = ({ route, navigation }) => {

  // const navigation = useNavigation();

  const [msg, setMsg] = useState('');
  const [messageData, setMessageData] = useState([])

  // console.log("MESSAGES:", messageData?.slice(-1)[0]?.photoURL)

  // console.log(messageData)

  // // console.log(val messageData[0]?.timeStamp.valueOf)
  // console.log("DATE:", new Date(messageData[0]?.timeStamp.seconds * 1000))
  // console.log("MONTH:", new Date(messageData[0]?.timeStamp.seconds * 1000).getMonth())
  // console.log("DAY:", new Date(messageData[0]?.timeStamp.seconds * 1000).getDate())
  // console.log("YEAR:", new Date(messageData[0]?.timeStamp.seconds * 1000).getFullYear())
  // console.log("Hour:", new Date(messageData[0]?.timeStamp.seconds * 1000).getHours())
  // console.log("Minutes:", new Date(messageData[0]?.timeStamp.seconds * 1000).getMinutes())
  // console.log("Seconds:", new Date(messageData[0]?.timeStamp.seconds * 1000).getSeconds())

  const dateTimeFormat = (value) => {
    var month = new Date(value.seconds * 1000).getMonth() + 1
    month = month < 10 ? `0${month}` : month
    var day = new Date(value.seconds * 1000).getDate()
    day = day < 10 ? `0${day}` : day
    const year = new Date(value.seconds * 1000).getFullYear()
    const hour = new Date(value.seconds * 1000).getHours()
    const minute = new Date(value.seconds * 1000).getMinutes()
    const seconds = new Date(value.seconds * 1000).getSeconds()

    const dateTime = `${day}:${month}:${year}  ${hour}:${minute}:${seconds}`
    return dateTime
  }

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
            source={{ uri: messageData?.slice(-1)[0]?.photoURL }}
          //source={{ uri: messageData[-1]?.photoURL }}
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
  }, [navigation, messageData])

  const sendMessage = async () => {
    Keyboard.dismiss()
    const addMessageRef = doc(db, "chats", route.params.id)
    try {
      await addDoc(collection(addMessageRef, "messages"), {
        timeStamp: serverTimestamp(),
        message: msg,
        displayName: auth.currentUser.displayName,
        email: auth.currentUser.email,
        photoURL: auth.currentUser.photoURL
      })
      setMsg('')
      getMessagesData()
    } catch (error) {
      Alert(error)
    }
  }

  const getMessagesData = async () => {
    const getMessagesRef = doc(db, "chats", route.params.id)


    // const testDb = doc(db, "chats", route.params.id, "messages")
    // const testDb = collection(doc(db, "chats", route.params.id, "messages"))
    // const check = query(testDb, orderBy("timeStamp", "desc"))
    // const check = query(doc(db, "chats", route.params.id, "messages", orderBy("timeStamp", "desc")))
    // const dataCheck = await getDocs(testDb)

    // console.log("DATA CHECK:", dataCheck)

    // const checkingTest = await getDoc(getMessagesRef)
    // console.log("TEST:", checkingTest.data())


    // const queryTest = query(getMessagesRef, orderBy("timeStamp", "desc"))
    // console.log("QUERY TEST:", queryTest)
    // const checkingRef = query(doc(db, "chats", route.params.id), orderBy("timeStamp", "desc"))
    // const data = await getDocs(collection(checkingRef))
    // console.log("CHECKINGREF:", checkingRef)

    // const sortRef = query(getMessagesRef, orderBy("timeStamp", "desc"))
    // const checking = await getDocs(collection(sortRef, "messages"))
    // console.log("CHECKING:", data)
    // const testing = collection(db)
    // const queryMsgRef = query(collection(getMessagesRef, "messages"), orderBy("timeStamp", "desc"))
    // const check = await getDocs(queryMsgRef)
    // check.forEach((x) => console(x))
    try {
      // var getMessages = query(await getDocs(collection(getMessagesRef, "messages")), orderBy("desc"))
      // var getMessages = await getDocs(collection(getMessagesRef, "messages")).query(orderBy("desc"))
      //var getMessages = await getDocs(collection(query(getMessagesRef, "messages", orderBy("desc")))) //getDocs(collection(getMessagesRef, "messages"))
      var getMessages = await getDocs(collection(getMessagesRef, "messages")) //right one
      // const test = query(getMessages, orderBy("timeStamp", "desc"))
      // getMessages = query(getMessages, orderBy("desc"))
      // const getMessages = await getDocs(query(collection(getMessagesRef, orderBy("desc"), "messages")))
      //const getMessage = await getDocs(query(collection(getMessagesRef, "messages")), orderBy("", "desc")) //gives data but not doing sorting
      var getMessageQuery = query(collection(getMessagesRef, "messages"), orderBy("timeStamp", "asc"))
      const getMessage = await getDocs(getMessageQuery)
      // getMessage.forEach((x) => {
      //   console.log("X:", x.data())
      // })
      let newArr = []
      getMessage.forEach((doc) => {
        newArr.push({ ...doc.data(), id: doc.id })
      });
      setMessageData(newArr)
    } catch (error) {
      Alert(error)
    }
  }

  useLayoutEffect(() => {
    getMessagesData()
  }, [route, messageData])

  // useLayoutEffect(() => {

  //   const getMessagesData = async () => {
  //     const getMessagesRef = doc(db, "chats", route.params.id)
  //     try {
  //       const getMessages = await getDocs(collection(getMessagesRef, "messages"))
  //       let newArr = []
  //       getMessages.forEach((doc) => {
  //         newArr.push({ ...doc.data(), id: doc.id })
  //       });
  //       setMessageData(newArr)
  //     } catch (error) {
  //       Alert(error)
  //     }
  //   }

  //   getMessagesData()

  // }, [route])

  // console.log("MESSAGES:", messageData)

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
            <ScrollView contentContainerStyle={{ paddingTop: 10 }}>
              {
                messageData.map((data, id) =>
                  data.email === auth?.currentUser?.email ? (
                    <View key={id} style={styles.receiver}>
                      <Avatar
                        position="absolute"
                        rounded
                        source={{ uri: data.photoURL }}
                        bottom={-15}
                        right={-5}
                      />
                      <Text style={styles.receiverText}>{data.message}</Text>
                      {
                        data.timeStamp &&
                        <Text style={styles.time}>{dateTimeFormat(data.timeStamp)}</Text>
                      }
                    </View>
                  )
                    :
                    (
                      <View key={id} style={styles.sender}>
                        <Avatar
                          position="absolute"
                          rounded
                          source={{ uri: data.photoURL }}
                          bottom={-15}
                          left={-5}
                        />
                        <Text style={styles.senderText}>{data.message}</Text>
                        {
                          data.timeStamp &&
                          <Text style={styles.time}>{dateTimeFormat(data.timeStamp)}</Text>
                        }
                        <Text style={styles.senderName}>{data.displayName}</Text>
                      </View>
                    )
                )
              }
            </ScrollView>
            <View style={styles.footer}>
              <TextInput
                placeholder="Signal Message"
                style={styles.textInput}
                value={msg}
                onChangeText={setMsg}
                onSubmitEditing={sendMessage}
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
  },
  receiver: {
    padding: 15,
    backgroundColor: "#ECECEC",
    alignSelf: "flex-end",
    borderRadius: 20,
    marginRight: 15,
    marginBottom: 20,
    maxWidth: "80%",
  },
  sender: {
    padding: 15,
    backgroundColor: "#2B68E6",
    borderRadius: 20,
    margin: 15,
    maxWidth: "80%",
  },
  senderText: {
    color: "white",
    fontWeight: "500",
    marginLeft: 10,
    marginBottom: 15
  },
  senderName: {
    left: 10,
    paddingRight: 10,
    fontSize: 10,
    color: "white"
  },
  receiverText: {
    color: "black",
    fontWeight: "500",
    marginLeft: 10
  },
  time: {
    fontSize: 11,
    fontWeight: "500",

  }
})
export default Chat;