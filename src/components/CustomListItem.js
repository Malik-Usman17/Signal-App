import React from "react";
import { ListItem, Avatar } from '@rneui/themed';

const CustomListItem = ({ id, chatName, enterChat }) => {
  return (
    <ListItem
      key={id}
      bottomDivider
      onPress={() => enterChat(id, chatName)}
    >
      <Avatar
        size={32}
        rounded
        source={{ uri: "https://randomuser.me/api/portraits/men/36.jpg" }}
      />
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: "800" }}>
          {chatName}
        </ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
          helooo bksuigvdi fudivgfd fdiigf7d8  dfkhviodf sdv
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  )
}

export default CustomListItem;