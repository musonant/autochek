import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import { Rating } from 'react-native-ratings';
import moment from 'moment';

import { colors, spaces, fontSizes } from '../../styles/variables';
import { productDetail } from './mockData';
import { formatNumber, abbreviateNumber } from '../../libs';
import Bid from './Bid';
import productImage from '../../assets/images/specimen.png';
import CustomIcon from '../../components/CustomIcon';

/**
 * @todo:
 * - Add image placeholder for product image
 */
const Product = () => {
  const { name, stars, highestBid, viewsCount, dueDate, bids } = productDetail;

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
      <SafeAreaView style={styles.title}>
        <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
        <Text style={styles.titleText}>Bids on your car</Text>
      </SafeAreaView>
      <ScrollView>
        <View style={styles.productDisplay}>
          <View style={styles.display}>
            <Image source={productImage} style={styles.productImage} />
            <View style={styles.displayInfo}>
              <Text style={styles.name}>{name}</Text>
              <View style={styles.row}>
                <Text style={styles.star}>{stars}</Text>
                <Rating
                  startingValue={stars}
                  ratingCount={5}
                  imageSize={15}
                  type="custom"
                  style={styles.rating}
                  ratingColor={colors.orange}
                  ratingBackgroundColor={colors.grey}
                  readonly
                />
              </View>
              <View>
                <Text style={styles.price}>{formatNumber(highestBid)}</Text>
              </View>
              <Text style={styles.label}>Buy now price</Text>
            </View>
          </View>
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
            <Bid key={bid.id} {...bid} />
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
  title: {
    backgroundColor: colors.primary,
  },
  titleText: {
    color: colors.white,
    paddingHorizontal: spaces.appSpacing01,
    paddingVertical: spaces.md,
    fontSize: fontSizes.title3,
  },
  productDisplay: {
    backgroundColor: colors.milk,
  },
  display: {
    paddingHorizontal: spaces.appSpacing01,
    paddingVertical: spaces.lg,
    flexDirection: 'row',
  },
  productImage: {
    flex: 1,
    height: 120,
    borderRadius: 7,
  },
  displayInfo: {
    flex: 1,
    paddingLeft: spaces.md,
    justifyContent: 'space-between',
  },
  quickInfo: {
    borderTopColor: colors.separator,
    borderTopWidth: 1,
    borderStyle: 'solid',
    padding: spaces.appSpacing01,
    flexDirection: 'row',
  },
  name: {
    fontSize: fontSizes.md,
    color: colors.primary,
    fontWeight: '500',
  },
  star: {
    color: colors.orange,
    fontSize: fontSizes.md,
  },
  rating: {
    marginLeft: spaces.sm,
  },
  price: {
    fontSize: fontSizes.lg,
    color: colors.primary,
    fontWeight: '500',
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

export default Product;
