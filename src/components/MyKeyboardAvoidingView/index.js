import React, {useState} from 'react';
import {
  StyleSheet,
  Keyboard,
  View,
  KeyboardAvoidingView,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';

const {height: fullHeight} = Dimensions.get('window');

export function MyKeyboardAvoidingView({containerStyle, children, ...rest}) {
  const [offset, setOffset] = useState(0);

  const onLayout = ({
    nativeEvent: {
      layout: {height},
    },
  }) => {
    const offset = fullHeight - height;
    setOffset(offset);
  };

  const dismiss = () => Keyboard.dismiss();

  return (
    <View style={[styles.container, containerStyle]} onLayout={onLayout}>
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={offset}
        {...rest}>
        <TouchableWithoutFeedback
          style={styles.dismissContainer}
          onPress={dismiss}>
          {children}
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
  keyboardContainer: {flex: 1},
  dismissContainer: {flex: 1, backgroundColor: 'red'},
});
