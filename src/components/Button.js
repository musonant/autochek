import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, spaces, fontSizes } from '../styles/variables';

const CustomButton = ({ title, type }) => {
  const typeToColor = {
    primary: colors.primary,
    error: colors.red,
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[styles.container, { backgroundColor: typeToColor[type] }]}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

CustomButton.defaultProps = {
  title: '',
  type: 'primary',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: spaces.md,
    paddingVertical: spaces.md,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 3,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
  title: {
    color: colors.white,
    fontWeight: '500',
    fontSize: fontSizes.md,
  },
});

export default React.memo(CustomButton);
