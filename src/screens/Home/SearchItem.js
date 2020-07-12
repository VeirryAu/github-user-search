import React from 'react'
import {
  Text, Left, ListItem, Thumbnail, Body
} from 'native-base'
import {
  StyleSheet
} from 'react-native'

const styles = StyleSheet.create({
  body: {
    borderBottomWidth: 0
  }
})

const SearchItem = ({
  item
}) => {
  return (
    <ListItem avatar>
      <Left>
        <Thumbnail source={{ uri: item.avatar_url }} />
      </Left>
      <Body style={styles.body}>
        <Text>{item.login}</Text>
      </Body>
    </ListItem>
  )
}

export default SearchItem
