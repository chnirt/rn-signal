import React from 'react';
import {StyleSheet, FlatList, View, Text} from 'react-native';
import {PRIMARY_COLOR} from '../../constants';
import {MyAvatar} from '../MyAvatar';

import {MyText} from '../MyText';

export function MyGiftedChat({user, messages}) {
  const Message = ({item}) => {
    const isSender = user._id === item.user._id;
    const text = item.text;
    const uri = item.user.avatar;
    // console.log(user._id, item.user._id, item);

    return (
      <View style={isSender ? styles.sender : styles.receiver}>
        <View style={styles.bubble}>
          <MyText style={styles.text}>{text}</MyText>
        </View>
        <MyAvatar uri={uri} />
      </View>
    );
  };
  return (
    <FlatList
      data={messages}
      renderItem={Message}
      keyExtractor={(item) => `${item.id}`}
      inverted
    />
  );
}

const styles = StyleSheet.create({
  sender: {
    // backgroundColor: 'red',
    alignItems: 'flex-end',
  },
  receiver: {
    // backgroundColor: 'blue',
    alignItems: 'flex-start',
  },
  bubble: {
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
  text: {color: '#fff'},
});
