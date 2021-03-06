import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import firestore from '@react-native-firebase/firestore';

import {MyButton, MyInput} from '../../components';

export function CreateChatScreen() {
  const navigation = useNavigation();

  const [input, setInput] = useState('');

  useEffect(() => {
    navigation.setOptions({
      title: 'Add a new chat',
      headerBackTitle: 'Chats',
    });
  }, [navigation]);

  const createChat = () => {
    firestore()
      .collection('chats')
      .add({chatName: input})
      .then(() => navigation.goBack())
      .catch((error) => alert(error));
  };

  return (
    <View style={styles.container}>
      <MyInput
        value={input}
        onChangeText={setInput}
        onSubmitEditing={createChat}
        placeholder="Enter a chat name"
      />
      <MyButton onPress={createChat} title="Create new Chat" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, padding: 30, backgroundColor: '#fff'},
});
