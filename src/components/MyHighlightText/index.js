import React from 'react';
import {Text} from 'react-native';

export function MyHighlightText({
  styles,
  searchWords,
  textToHighlight,
  highlightStyle,
  ...rest
}) {
  const letters = textToHighlight.split(
    new RegExp(`(${searchWords.join('|')})`, 'gi'),
  );

  return (
    <Text style={styles} {...rest}>
      {letters.map((letter) => {
        const isSearch =
          searchWords
            .map((searchWord) => searchWord.toLowerCase())
            .indexOf(letter.toLowerCase()) > -1;

        return (
          <Text style={[styles, isSearch ? highlightStyle : null]} {...rest}>
            {letter}
          </Text>
        );
      })}
    </Text>
  );
}

{
  /* <MyHighlightText
  highlightStyle={{backgroundColor: 'yellow'}}
  searchWords={['and', 'or', 'the', 'just']}
  textToHighlight="The dog is chasing the cat. Or perhaps they're just playing?"
/> */
}
