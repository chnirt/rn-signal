import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/core';

import {MyAvatar, MyText} from '../../components';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {LeftArrowSVG} from '../../assets/svgs';

export function ChatScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const params = route?.params;
  const chatName = params?.chatName;

  useEffect(() => {
    navigation.setOptions({
      title: 'Chat',
      headerBackTitleVisible: false,
      headerTitleAlign: 'left',
      headerTitle: () => (
        <View style={styles.headerContainer}>
          <MyAvatar name={chatName} />
          <MyText style={styles.headerText} h3 color="#fff" bold>
            {chatName}
          </MyText>
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity style={styles.leftHeaderContainer} onPress={goBack}>
          <LeftArrowSVG width={20} height={20} fill="#fff" />
        </TouchableOpacity>
      ),
      headerRight: () => {
        <View style={styles.rightHeaderContainer}></View>;
      },
    });
  }, [navigation]);

  const goBack = () => navigation.goBack();

  return (
    <View style={styles.container}>
      <Text>{chatName}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {flexDirection: 'row', alignItems: 'center'},
  leftHeaderContainer: {marginLeft: 20},
  rightHeaderContainer: {marginRight: 20},
  headerText: {
    marginLeft: 20,
  },
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});
