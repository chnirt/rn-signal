import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';

import {PRIMARY_COLOR} from '../../constants';

export function MyButton({title, containerStyle, type = 'primary', ...rest}) {
  return (
    <TouchableOpacity
      style={[styles.button, styles[type], containerStyle]}
      {...rest}>
      {title && (
        <Text
          style={[
            styles.buttonText,
            type === 'primary' ? styles.whiteText : styles.primaryText,
          ]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    textAlign: 'center',
  },
  whiteText: {
    color: '#fff',
  },
  primaryText: {
    color: PRIMARY_COLOR,
  },
  primary: {
    backgroundColor: PRIMARY_COLOR,
  },
  outline: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#d3d3d3',
  },
});
