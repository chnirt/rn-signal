import React from 'react';
import {NativeModules, StyleSheet, TextInput} from 'react-native';

export function MyTextInputMask({
  placeholder,
  onChangeText = () => {},
  ...rest
}) {
  let cache = '';
  let mask = placeholder;

  return (
    <TextInput
      {...rest}
      onChangeText={(text) => {
        // only allows 0-9 inputs
        // let currentValue = text.replace(/[^\d]/g, '');
        let currentValue = text;

        const length = currentValue.length;

        // const max = mask.replace(/[^\d]/g, '').length;
        const max = mask.length;
        // 0704-498-756
        if (length > max) {
          currentValue = currentValue.slice(0, -1);
        }

        // console.log('mask', mask);
        // mask="0704 (498) 756"

        const formatText = currentValue
          .split('')
          .map((element, index) => {
            console.log('123', /^\d/g.test(mask[index]), mask[index], element);
            if (/^\d/g.test(mask[index])) {
              // if (cache.length > 0) {
              //   const cloneCache = (' ' + cache).slice(1);
              //   cache = '';
              //   return cloneCache;
              // }

              return element;
            } else {
              // cache = cache.concat(element);
              // if (/^\d/g.test(mask[index + 1])) {
              //   console.log('22222');
              //   return `${mask[index]}${element}`;
              // }
              return mask[index];
            }
            // return /^\d/g.test(mask[index])
            //   ? element
            //   : /^\d/g.test(mask[index + 1])
            //   ? `${mask[index]}${element}`
            //   : mask[index];
          })
          .join('');

        onChangeText(formatText);
      }}
    />
  );
}

const styles = StyleSheet.create({});
