import React from 'react';
import { StyleSheet, TextInput, View, Text } from 'react-native';
import { colors, fontSizes } from '../styles/variables';

const CustomTextInput = ({ value, money, containerStyle, ...inputProps }) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {!!money && (
        <View style={styles.prefix}>
          <Text style={styles.prefixText}>{'\u20A6'}</Text>
        </View>
      )}
      <TextInput
        value={value}
        {...inputProps}
        style={[styles.input, money && styles.moneyFormat]}
      />
    </View>
  );
};

CustomTextInput.defaultProps = {
  containerStyle: {},
};

const styles = StyleSheet.create({
  prefix: {
    position: 'absolute',
    height: '100%',
    left: 10,
    justifyContent: 'center',
  },
  prefixText: {
    fontSize: fontSizes.md,
    color: colors.grey,
  },
  input: {
    borderColor: colors.grey,
    borderWidth: 1,
    fontSize: fontSizes.md,
    borderRadius: 5,
    padding: 10,
  },
  moneyFormat: {
    paddingLeft: 25,
  },
});

export default CustomTextInput;
