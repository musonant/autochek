import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import moment from 'moment';

import { colors, spaces, fontSizes } from '../../styles/variables';
import { productDetail } from './mockData';
import { formatNumber, abbreviateNumber } from '../../libs';
import Bid from '../../components/Bid';
import CustomIcon from '../../components/CustomIcon';
import ProductDisplay from '../../components/ProductDisplay';
import Title from '../../components/Title';

const Product = ({ navigation }) => {
  const {
    name,
    stars,
    highestBid,
    viewsCount,
    dueDate,
    bids,
    imageUrl,
  } = productDetail;

  const calculateTimeLeft = () => {
    const time = moment(dueDate).diff(moment(), 'hours');
    return {
      days: Math.floor(time / 24),
      hours: time % 24,
    };
  };
  const timeLeft = calculateTimeLeft();
  const priceAbbreviation = abbreviateNumber(highestBid);

  return (
    <View style={styles.container}>
      <ScrollView>
        <Title title="Bids on your car" />
        <View style={styles.productDisplay}>
          <ProductDisplay
            name={name}
            stars={stars}
            highestBid={highestBid}
            imageUrl={imageUrl}
          />
          <View style={styles.quickInfo}>
            <View style={styles.infoItem}>
              <View style={styles.row}>
                <CustomIcon style={styles.infoIcon} name="tag" />
                <Text style={[styles.infoText, styles.orangeInfo]}>
                  {priceAbbreviation}
                </Text>
              </View>
              <Text style={styles.label}>Highest Bid</Text>
            </View>
            <View style={styles.infoItem}>
              <View style={styles.row}>
                <CustomIcon style={styles.infoIcon} name="bid-sign" />
                <Text style={styles.infoText}>{bids.length}</Text>
              </View>
              <Text style={styles.label}>Total bids</Text>
            </View>
            <View style={styles.infoItem}>
              <View style={styles.row}>
                <CustomIcon style={styles.infoIcon} name="timer" />
                <Text style={styles.infoText}>
                  {timeLeft.days}d {timeLeft.hours}h
                </Text>
              </View>
              <Text style={styles.label}>Time left</Text>
            </View>
            <View style={styles.infoItem}>
              <View style={styles.row}>
                <CustomIcon style={styles.infoIcon} name="eye" />
                <Text style={styles.infoText}>
                  {formatNumber(viewsCount, false)}
                </Text>
              </View>
              <Text style={styles.label}>Views</Text>
            </View>
          </View>
        </View>
        <SafeAreaView>
          {bids.map((bid) => (
            <TouchableOpacity
              key={bid.id}
              onPress={() =>
                navigation.navigate('Auction', {
                  bidDetail: bid,
                  productDetail,
                })
              }>
              <Bid {...bid} />
            </TouchableOpacity>
          ))}
        </SafeAreaView>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  productDisplay: {
    backgroundColor: colors.milk,
  },
  quickInfo: {
    borderTopColor: colors.separator,
    borderTopWidth: 1,
    borderStyle: 'solid',
    padding: spaces.appSpacing01,
    flexDirection: 'row',
  },
  label: {
    color: colors.blueGrey,
    fontSize: fontSizes.sm,
  },
  infoItem: {
    flex: 1,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spaces.xs,
  },
  infoIcon: {
    color: colors.grey,
    fontSize: fontSizes.md,
    marginRight: spaces.xs,
  },
  infoText: {
    fontSize: fontSizes.md,
    color: colors.base,
    fontWeight: '500',
  },
  orangeInfo: {
    color: colors.orangeRed,
  },
});

export default React.memo(Product);
