import React, {Fragment, memo, useEffect, useRef, useState} from 'react';
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {
  MyButton,
  MyKeyboardAvoidingView,
  MyLoading,
  MyText,
  MyTextInputMask,
} from '../../components';
import {countriesMockData} from '../../mocks';
import {useDebounce} from '../../hooks';
import {OTP} from '../../constants';

export function LoginPhoneScreen() {
  const navigation = useNavigation();

  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+84');
  const [countriesModalVisible, setCountriesModalVisible] = useState(false);

  const onSelect = (country = {}) => {
    setCountryCode(country.dialCode);
    setCountriesModalVisible(false);
  };

  const openCountriesModal = () => setCountriesModalVisible(true);

  const navigateOTP = () => navigation.navigate(OTP);

  const CountriesModal = ({visible = false, onSelect = () => {}}) => {
    const inputRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [countries, setCountries] = useState(countriesMockData);
    const debounceSearch = useDebounce(search, 250);

    useEffect(() => {
      fetchCountries();
    }, [debounceSearch]);

    const fetchCountries = () => {
      setLoading(true);
      setTimeout(() => {
        setCountries(
          countriesMockData
            .filter((country) => country.dialCode)
            .filter(
              (country) =>
                country.name.toLowerCase().indexOf(search.toLowerCase()) > -1 ||
                country.dialCode.toLowerCase().indexOf(search.toLowerCase()) >
                  -1,
            ),
        );
        setLoading(false);
        inputRef?.current?.focus();
      }, 1000);
    };

    const Country = ({item}) => {
      const code = item?.code;
      const emoji = item?.emoji;
      const name = item?.name;
      const dialCode = item?.dialCode;

      return (
        <TouchableWithoutFeedback key={code} onPress={() => onSelect(item)}>
          <View style={styles.countryContainer}>
            <View style={styles.flagContainer}>
              <MyText h2>{emoji}</MyText>
            </View>
            <View style={styles.nameDialCodeContainer}>
              <MyText h4>{name}</MyText>
              <MyText h4> {dialCode}</MyText>
            </View>
          </View>
        </TouchableWithoutFeedback>
      );
    };

    return (
      <Modal
        visible={visible}
        animationType="slide"
        presentationStyle="formSheet">
        <MyKeyboardAvoidingView>
          <View style={styles.modalContainer}>
            <TextInput
              style={styles.textInput}
              ref={inputRef}
              value={search}
              onChangeText={setSearch}
              placeholder="Select country"
            />
            {loading ? (
              <MyLoading />
            ) : (
              <FlatList
                data={countries}
                renderItem={Country}
                keyExtractor={(item) => item.code}
              />
            )}
          </View>
        </MyKeyboardAvoidingView>
      </Modal>
    );
  };

  // const MemoizedCountriesModal = memo(CountriesModal);

  return (
    <MyKeyboardAvoidingView>
      <Fragment>
        <View style={styles.header}>
          <MyText style={styles.title} h3>
            Please input your phone number
          </MyText>
        </View>
        <View style={styles.body}>
          <View style={styles.flagPhoneContainer}>
            <TouchableOpacity
              style={styles.dialCodeInput}
              onPress={openCountriesModal}>
              <Text>{countryCode} |</Text>
            </TouchableOpacity>
            <MyTextInputMask
              style={styles.phoneInput}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              // mask="0704--498--756"
              placeholder="0704--498--756"
              keyboardType="phone-pad"
            />
            {/* <TextInput
              style={styles.phoneInput}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              placeholder="0704 498 756"
              keyboardType="phone-pad"
            /> */}
          </View>
        </View>

        <View style={styles.footer}>
          <MyButton title="Continue" onPress={navigateOTP} />
        </View>

        {/* <MemoizedCountriesModal
          visible={countriesModalVisible}
          onSelect={onSelect}
        /> */}
        {/* <CountriesModal visible={countriesModalVisible} onSelect={onSelect} /> */}
      </Fragment>
    </MyKeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  header: {marginTop: 50},
  body: {flex: 1, marginTop: 50},
  flagPhoneContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    // padding: 10,
  },
  dialCodeInput: {justifyContent: 'center'},
  phoneInput: {flex: 1, padding: 10},
  title: {textAlign: 'center'},
  footer: {padding: 20},
  textInput: {padding: 20},
  countryContainer: {flexDirection: 'row'},
  flagContainer: {
    justifyContent: 'center',
  },
  nameDialCodeContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
