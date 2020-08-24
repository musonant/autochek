import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { colors, spaces, fontSizes } from '../styles/variables';

const BidInfoBar = ({ data }) => {
  return (
    <View style={styles.quickInfo}>
      {data.map(({ label, icon, value, color = colors.black }, index) => (
        <View style={styles.infoItem} key={`item-${index}`}>
          <View style={styles.row}>
            {icon}
            <Text style={[styles.infoText, { color }]}>{value}</Text>
          </View>
          <Text style={styles.label}>{label}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  quickInfo: {
    borderTopColor: colors.separator,
    borderTopWidth: 1,
    borderStyle: 'solid',
    padding: spaces.appSpacing01,
    flexDirection: 'row',
    backgroundColor: colors.milk,
  },
  infoText: {
    fontSize: fontSizes.md,
    color: colors.base,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spaces.xs,
  },
  infoItem: {
    flex: 1,
    alignItems: 'center',
  },
  label: {
    color: colors.blueGrey,
    fontSize: fontSizes.sm,
  },
});

export default BidInfoBar;
