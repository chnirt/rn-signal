import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export function OTPScreen() {
  return (
    <View style={styles.container}>
      <Text>OTP</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});
