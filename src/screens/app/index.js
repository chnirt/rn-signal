import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSetRecoilState} from 'recoil';

import {CREATE_CHAT, CHAT, PLACEHOLDER_AVATAR} from '../../constants';
import {fbAuth, fbFirestore} from '../../firebase';
import {MyAvatar, MyList} from '../../components';
import {CameraSVG} from '../../assets/svgs/camera';
import {PencilSVG} from '../../assets/svgs/pencil';
import {loadingState} from '../../recoils';

export function AppScreen() {
  const navigation = useNavigation();
  const setLoading = useSetRecoilState(loadingState);

  const [chats, setChats] = useState([]);

  useEffect(() => {
    navigation.setOptions({
      title: 'Signal',
      headerStyle: {
        backgroundColor: '#fff',
      },
      headerTitleStyle: {color: '#000'},
      headerTintColor: '#000',
      headerTitleAllowFontScaling: true,
      headerTitleAlign: 'center',
      headerLeft: () => (
        <View style={styles.headerLeftContainer}>
          <TouchableOpacity onPress={logout}>
            <MyAvatar
              uri={fbAuth?.currentUser?.photoURL}
              name={fbAuth?.currentUser?.displayName}
            />
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View style={styles.headerRightContainer}>
          <CameraSVG width={20} height={20} />
          <View style={styles.iconItem}>
            <TouchableOpacity onPress={navigateCreateChat}>
              <PencilSVG width={20} height={20} />
            </TouchableOpacity>
          </View>
        </View>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    const subscriber = fbFirestore
      .collection('chats')
      .onSnapshot((snapShot) => {
        const formatData = snapShot.docs.map((doc) => ({
          id: doc.id,
          url: PLACEHOLDER_AVATAR,
          title: doc.data().chatName,
          description: 'ABC',
        }));
        // see next step
        setChats(formatData);
      });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  const logout = () => {
    setLoading(true);

    fbAuth.signOut().then(() => {
      // console.log('User signed out!');
    });
  };

  const navigateCreateChat = () => navigation.navigate(CREATE_CHAT);

  const navigateChat = (chat) => navigation.navigate(CHAT, chat);

  return (
    <SafeAreaView style={styles.container}>
      <MyList data={chats} onPress={navigateChat} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerLeftContainer: {
    marginLeft: 20,
  },
  headerRightContainer: {
    marginRight: 20,
    flexDirection: 'row',
  },
  iconItem: {
    marginLeft: 20,
  },
});
