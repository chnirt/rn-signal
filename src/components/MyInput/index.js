import React from 'react';
import {StyleSheet, View, TextInput} from 'react-native';

export function MyInput({_, ...rest}) {
  return (
    <View style={styles.container}>
      <TextInput style={styles.input} {...rest} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomColor: '#D4DAE4', // Add this to specify bottom border color
    borderBottomWidth: 1,
    paddingVertical: 10,
    margin: 10,
    // flex: 1,
  },
  input: {
    // width: '100%',
  },
});
