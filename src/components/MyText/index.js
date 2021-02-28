import React from 'react';
import {StyleSheet, Text} from 'react-native';

export function MyText({
  h1,
  h2,
  h3,
  h4,
  h5,
  p,
  bold,
  italic,
  style,
  color,
  children,
  ...rest
}) {
  return (
    <Text
      style={[
        // styles.fontFamily,
        h1 && styles.h1,
        h2 && styles.h2,
        h3 && styles.h3,
        h4 && styles.h4,
        h5 && styles.h5,
        p && styles.p,
        bold && styles.bold,
        italic && styles.italic,
        color ? {color} : null,
        style,
      ]}
      {...rest}>
      {children}
    </Text>
  );
}

export const styles = StyleSheet.create({
  // fontFamily: {fontFamily: 'Montserrat-Thin'},
  h1: {fontSize: 48},
  h2: {fontSize: 32},
  h3: {fontSize: 20},
  h4: {fontSize: 18},
  h5: {fontSize: 16},
  p: {fontSize: 12},
  bold: {fontWeight: 'bold'},
  italic: {fontStyle: 'italic'},
});
