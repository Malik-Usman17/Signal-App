import React, { useEffect, useLayoutEffect, useState } from "react";
import { View, Text, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import CustomListItem from "../components/CustomListItem";
import { ListItem, Avatar } from '@rneui/themed';
import { auth, db } from "../../firebase";
import { TouchableOpacity } from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { collection, getDocs } from "firebase/firestore";
import { useNavigation, useIsFocused } from '@react-navigation/native';


const Home = () => {

  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [chats, setChats] = useState([])

  // console

  const signOut = () => {
    auth.signOut().then(() => {
      navigation.replace("Login")
    })
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Signal",
      headerStyle: { backgroundColor: "white" },
      headerTitleStyle: { color: "black" },
      headerTintColor: "black",
      headerLeft: () => (
        <TouchableOpacity
          activeOpacity={0.8}
          style={{ marginRight: 10 }}
          onPress={signOut}
        >
          <Avatar
            rounded
            source={{ uri: auth?.currentUser?.photoURL }}
            containerStyle={{ backgroundColor: "green" }}
          />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View style={styles.headerRightContainer}>
          <TouchableOpacity activeOpacity={0.8}>
            <AntDesign
              name="camerao"
              size={24}
              color="black"
            />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('AddChat')}>
            <SimpleLineIcons
              name="pencil"
              size={24}
              color="black"
            />
          </TouchableOpacity>
        </View>
      )
    })
  }, [navigation])



  // useEffect(() => {
  //   // const unsubscribe = getChatsData()
  //   // console.log(typeof unsubscribe)
  //   const unsubscribe = getDocs(collection(db, "chats"))
  //   setChats(unsubscribe.docs.map((doc) => ({
  //     id: doc.id,
  //     data: doc.data()
  //   }))
  //   )

  //   return unsubscribe;
  // }, [])

  useEffect(() => {

    const getChatsData = async () => {
      const getChats = await getDocs(collection(db, "chats"))
      setChats(getChats.docs.map((doc) => ({
        id: doc.id,
        data: doc.data()
      }))
      )
    }

    getChatsData()
  }, [isFocused])

  const enterChat = (id, chatName) => {
    navigation.navigate("Chat", {
      id: id,
      chatName: chatName
    })
  }

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        {chats.map(({ id, data: { chatName } }) => (
          <CustomListItem
            key={id}
            id={id}
            chatName={chatName}
            enterChat={enterChat}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  headerRightContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 80
  },
  container: {
    height: "100%"
  }
})

export default Home;