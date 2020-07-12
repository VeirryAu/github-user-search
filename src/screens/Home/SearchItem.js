import React from 'react'
import {
  Text, Left, ListItem, Thumbnail, Body
} from 'native-base'

const SearchItem = ({
  item
}) => {
  return (
    <ListItem avatar>
      <Left>
        <Thumbnail source={{ uri: item.avatar_url }} />
      </Left>
      <Body>
        <Text>{item.login}</Text>
      </Body>
    </ListItem>
  )
}

export default SearchItem
