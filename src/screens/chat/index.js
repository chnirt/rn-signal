import React, {Fragment, useEffect, useLayoutEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/core';
import moment from 'moment';

import {
  MyAvatar,
  MyGiftedChat,
  MyText,
  MyKeyboardAvoidingView,
} from '../../components';
import {
  LeftArrowSVG,
  VideoCameraSVG,
  PhoneSVG,
  SendSVG,
} from '../../assets/svgs';
import {PRIMARY_COLOR} from '../../constants';
import {fbFirestore, fbTimestamp, fbAuth} from '../../firebase';

export function ChatScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const params = route?.params;
  const id = params?.id;
  const url = params?.url;
  const chatName = params?.title;

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  useLayoutEffect(() => {
    const subscriber = fbFirestore
      .collection('chats')
      .doc(id)
      .collection('messages')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapShot) => {
        const formatData = snapShot.docs.map((doc) => ({
          id: doc.id,
          text: doc.data().message,
          createdAt: moment(doc.data().timestamp?.seconds * 1000).fromNow(),
          user: {
            _id: doc.data().email,
            name: doc.data().displayName,
            avatar: doc.data().photoURL,
          },
          // data: doc.data(),
          //     _id: 1,
          //     text: 'Hello developer',
          //     createdAt: new Date(),
          //     user: {
          //       _id: 2,
          //       name: 'React Native',
          //       avatar: 'https://placeimg.com/140/140/any',
          //     },
        }));
        setMessages(formatData);
      });

    return subscriber;
  }, [route]);

  useEffect(() => {
    navigation.setOptions({
      title: 'Chat',
      headerBackTitleVisible: false,
      headerTitleAlign: 'left',
      headerTitle: () => (
        <View style={styles.headerContainer}>
          <MyAvatar name={chatName} uri={url} />
          <MyText style={styles.headerText} h3 bold color="#fff">
            {chatName}
          </MyText>
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity style={styles.leftHeaderContainer} onPress={goBack}>
          <LeftArrowSVG width={20} height={20} fill="#fff" />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View style={styles.rightHeaderContainer}>
          <View style={styles.iconItem}>
            <VideoCameraSVG width={20} height={20} fill="#fff" />
          </View>
          <View style={styles.iconItem}>
            <PhoneSVG width={20} height={20} fill="#fff" />
          </View>
        </View>
      ),
    });
  }, [navigation]);

  const goBack = () => navigation.goBack();

  const dismiss = () => Keyboard.dismiss();

  const onSend = () => {
    if (input.length === 0) return;

    dismiss();

    fbFirestore.collection('chats').doc(id).collection('messages').add({
      timestamp: fbTimestamp,
      message: input,
      displayName: fbAuth?.currentUser?.displayName,
      email: fbAuth?.currentUser?.email,
      photoURL: fbAuth?.currentUser?.photoURL,
    });

    setInput('');
  };

  return (
    <MyKeyboardAvoidingView>
      <Fragment>
        <MyGiftedChat
          messages={messages}
          onSend={(messages) => onSend(messages)}
          user={{
            _id: fbAuth?.currentUser?.email,
          }}
        />

        <View style={styles.footer}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Message..."
              multiline
              value={input}
              onChangeText={setInput}
              // onSubmitEditing={onSend}s
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={onSend}>
            <SendSVG width={20} height={20} fill={PRIMARY_COLOR} />
          </TouchableOpacity>
        </View>
      </Fragment>
    </MyKeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {flexDirection: 'row', alignItems: 'center'},
  leftHeaderContainer: {marginLeft: 20},
  iconItem: {marginLeft: 20},
  rightHeaderContainer: {marginRight: 20, flexDirection: 'row'},
  headerText: {
    marginLeft: 20,
  },

  footer: {
    flexDirection: 'row',
    padding: 20,
  },
  inputContainer: {
    flex: 1,
    height: 40,
    justifyContent: 'center',
    backgroundColor: '#ECECEC',
    borderRadius: 40 / 2,
    paddingHorizontal: 40 / 2,
  },
  input: {},
  button: {
    height: 40,
    justifyContent: 'center',
    marginLeft: 20,
  },
});
