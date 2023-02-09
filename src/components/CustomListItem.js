import React, { useEffect, useState } from "react";
import { ListItem, Avatar } from '@rneui/themed';
import { collection, query, orderBy, getDocs, doc } from "firebase/firestore";
import { db } from "../../firebase";
import { AppImages } from "../constants/Images";


const CustomListItem = ({ id, chatName, enterChat }) => {

  const [chatMessages, setChatMessages] = useState([])

  useEffect(() => {
    const getMessages = async () => {
      const getMessagesRef = doc(db, "chats", id)
      var getMessageQuery = query(collection(getMessagesRef, "messages"), orderBy("timeStamp", "desc"))
      const getMessage = await getDocs(getMessageQuery)
      let newArr = []
      getMessage.forEach((doc) => {
        newArr.push(doc.data())
      });
      setChatMessages(newArr)
    }

    getMessages()
  }, [chatMessages])


  return (
    <ListItem
      key={id}
      bottomDivider
      onPress={() => enterChat(id, chatName)}
    >
      <Avatar
        containerStyle={{ backgroundColor: "#000000" }}
        size={32}
        rounded
        source={{ uri: chatMessages[0]?.photoURL || AppImages.emptyProfileImage }}
      />
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: "800" }}>
          {chatName}
        </ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
          {chatMessages?.[0]?.displayName} : {chatMessages?.[0]?.message}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  )
}

export default CustomListItem;