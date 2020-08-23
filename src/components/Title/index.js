import React from 'react';
import { SafeAreaView, StatusBar, Text, StyleSheet } from 'react-native';
import { colors, spaces, fontSizes } from '../../styles/variables';

const Title = ({ title }) => {
  return (
    <SafeAreaView style={styles.title}>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      <Text style={styles.titleText}>{title}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    backgroundColor: colors.primary,
  },
  titleText: {
    color: colors.white,
    paddingHorizontal: spaces.appSpacing01,
    paddingVertical: spaces.lg,
    fontSize: fontSizes.title3,
    fontWeight: '500',
  },
});

export default Title;
