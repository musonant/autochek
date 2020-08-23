import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { Rating } from 'react-native-ratings';
import { formatNumber } from '../../libs';
import productImage from '../../assets/images/specimen.png';
import { colors, spaces, fontSizes } from '../../styles/variables';
import CustomIcon from '../CustomIcon';

/**
 * @todo:
 * - Add image placeholder for product image
 */
const ProductDisplay = ({ name, stars, highestBid, imageUrl }) => {
  return (
    <View style={styles.display}>
      <Image source={productImage} style={styles.productImage} />
      <View style={[styles.displayInfo]}>
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
        {!!highestBid && (
          <>
            <View style={styles.row}>
              <CustomIcon name="tag" style={styles.tagIcon} />
              <Text style={styles.price}>{formatNumber(highestBid)}</Text>
            </View>
            <Text style={styles.label}>Buy now price</Text>
          </>
        )}
      </View>
    </View>
  );
};

ProductDisplay.defaultProps = {
  name: '',
  stars: 0,
  highestBid: 0,
  imageUrl: '',
};

const styles = StyleSheet.create({
  display: {
    paddingHorizontal: spaces.appSpacing01,
    paddingVertical: spaces.lg,
    flexDirection: 'row',
    backgroundColor: colors.milk,
  },
  productImage: {
    flex: 1,
    height: 120,
    borderRadius: 7,
  },
  displayInfo: {
    flex: 1,
    paddingLeft: spaces.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spaces.xs,
  },
  name: {
    fontSize: fontSizes.md,
    color: colors.primary,
    fontWeight: '500',
    lineHeight: 30,
  },
  star: {
    color: colors.orange,
    fontSize: fontSizes.md,
    lineHeight: 30,
  },
  rating: {
    marginLeft: spaces.sm,
  },
  price: {
    fontSize: fontSizes.lg,
    color: colors.primary,
    fontWeight: '500',
    lineHeight: 30,
  },
  tagIcon: {
    color: colors.grey,
    fontSize: fontSizes.md,
    marginRight: spaces.xs,
  },
  label: {
    color: colors.blueGrey,
    fontSize: fontSizes.sm,
  },
});

export default ProductDisplay;
