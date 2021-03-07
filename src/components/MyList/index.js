import React from 'react';
import {
  StyleSheet,
  StatusBar,
  SafeAreaView,
  FlatList,
  View,
} from 'react-native';

import {MyText} from '../MyText';
import {MyAvatar} from '../MyAvatar';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Item = ({index, item, onPress}) => {
  const {url, title, description} = item;

  return (
    <TouchableOpacity style={styles.item} onPress={() => onPress(item)}>
      <View style={styles.avatarContainer}>
        <MyAvatar index={index} name={title} uri={url} />
      </View>
      <View style={styles.contentContainer}>
        <MyText
          h4
          bold
          style={styles.title}
          numberOfLines={1}
          ellipsizeMode="tail">
          {title}
        </MyText>
        <MyText
          h5
          style={styles.description}
          numberOfLines={1}
          ellipsizeMode="tail">
          {description}
        </MyText>
      </View>
    </TouchableOpacity>
  );
};

export function MyList({data = [], onPress = () => {}}) {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={(props) => <Item {...props} onPress={onPress} />}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={styles.divider} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#fff',
    paddingVertical: 20 / 2,
    paddingHorizontal: 20,
    flexDirection: 'row',
  },
  avatarContainer: {
    flex: 1,
  },
  title: {},
  description: {},
  contentContainer: {
    flex: 10,
    paddingHorizontal: 10,
  },
  divider: {
    borderBottomColor: '#d3d3d3',
    borderBottomWidth: 1,
  },
});
