import React, { useLayoutEffect, useState } from 'react';
import { Text, View, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Image, Input, Button } from "@rneui/themed";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { db } from '../../firebase';
import { addDoc, collection } from 'firebase/firestore';

const AddChat = () => {

  const navigation = useNavigation();

  const [chatText, setChatText] = useState("")
  const [loader, setLoader] = useState(false);


  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Add a new Chat",
      headerBackTitle: "Chats"
    })
  }, [navigation])


  const createChat = async () => {
    setLoader(true)
    try {
      const addChat = await addDoc(collection(db, "chats"), {
        chatName: chatText
      })
      console.log(addChat.id)
      setLoader(false)
      navigation.goBack()
    }
    catch (err) {
      setLoader(false)
      Alert(err)
    }
  }


  // const createChat = async () => {
  //   setLoader(true)
  //   const resp = await db.collection('chats').add({
  //     chatName: chatText
  //   })
  //   console.log("RESP:", resp)
  //   //     .then(() => {
  //   //       setLoader(false)
  //   //       navigation.goBack()
  //   //     })
  //   //     .catch((err) => {
  //   //       setLoader(false)
  //   //       Alert(err)
  //   //     })
  // }


  return (
    <View style={styles.container}>
      <Input
        placeholder='Enter a chat name'
        value={chatText}
        onChangeText={setChatText}
        leftIcon={<FontAwesome name='wechat' size={24} color="black" />}
      />

      <Button
        loading={loader}
        title={"Create new chat"}
        onPress={createChat}
      />

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 20,
    height: "100%"
  }
})

export default AddChat;