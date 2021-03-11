import React from 'react';
import {StyleSheet, FlatList, View} from 'react-native';

import {PRIMARY_COLOR} from '../../constants';
import {MyAvatar} from '../MyAvatar';
import {MyText} from '../MyText';

export function MyGiftedChat({user, messages}) {
  const Message = ({item}) => {
    const isSender = user._id === item.user._id;
    const text = item.text;
    const createdAt = item.createdAt;
    const uri = item.user.avatar;
    // console.log(user._id, item.user._id, item);

    return (
      <View style={isSender ? styles.sender : styles.receiver}>
        <View
          style={[
            styles.bubbleContainer,
            isSender
              ? styles.senderBubbleContainer
              : styles.receiverBubbleContainer,
          ]}>
          <View
            style={[
              styles.bubble,
              isSender ? styles.senderBubble : styles.receiverBubble,
            ]}>
            <MyText h5 style={styles.text}>
              {text}
            </MyText>
            <MyText p style={[styles.text, styles.createdAt]}>
              {createdAt}
            </MyText>
          </View>
          <MyAvatar uri={uri} />
        </View>
      </View>
    );
  };
  return (
    <FlatList
      contentContainerStyle={{padding: 10}}
      data={messages}
      renderItem={Message}
      keyExtractor={(item) => `${item.id}`}
      inverted
      showsVerticalScrollIndicator={false}
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
  bubbleContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  senderBubbleContainer: {},
  receiverBubbleContainer: {flexDirection: 'row-reverse'},
  bubble: {
    borderRadius: 10,
    padding: 10,
    margin: 10,
    width: '50%',
  },
  senderBubble: {
    backgroundColor: PRIMARY_COLOR,
  },
  receiverBubble: {
    backgroundColor: '#D3D3D3',
  },
  text: {color: '#fff'},
  createdAt: {color: '#fff', textAlign: 'right'},
});
