import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import moment from 'moment';
import { spaces, colors, fontSizes } from '../../styles/variables';
import { formatNumber } from '../../libs';
import bidIcon from '../../assets/images/bid.png';
import CustomIcon from '../../components/CustomIcon';

const Bid = ({ id, date, price }) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftContent}>
        <Image style={styles.bidIcon} source={bidIcon} />
        <View style={styles.info}>
          <Text style={styles.number}>Bid no: {id}</Text>
          <Text style={styles.date}>
            {moment(date).format('MM/DD/YYYY H:mm')}
          </Text>
        </View>
      </View>
      <View style={styles.rightContent}>
        <CustomIcon name="tag" style={styles.icon} />
        {price && <Text style={styles.price}>{formatNumber(price)}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spaces.appSpacing01,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.separator,
  },
  leftContent: {
    flexDirection: 'row',
  },
  info: {
    justifyContent: 'space-between',
    marginLeft: spaces.sm,
  },
  number: {
    fontSize: fontSizes.md,
    fontWeight: '500',
  },
  date: {
    fontSize: fontSizes.sm,
    color: colors.grey,
  },
  rightContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    color: colors.grey,
    marginRight: spaces.xs,
    fontSize: fontSizes.md,
  },
  price: {
    color: colors.orangeRed,
    fontSize: fontSizes.md,
    fontWeight: '500',
  },
  bidIcon: {
    width: 50,
    height: 50,
  },
});

export default React.memo(Bid);
