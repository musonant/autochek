import React from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import moment from 'moment';

import { colors, spaces, fontSizes } from '../../styles/variables';
import { productDetail } from './mockData';
import { formatNumber, abbreviateNumber } from '../../libs';
import Bid from '../../components/Bid';
import CustomIcon from '../../components/CustomIcon';
import ProductDisplay from '../../components/ProductDisplay';
import Title from '../../components/Title';
import BidInfoBar from '../../components/BidInfoBar';

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

  const bidInfoData = [
    {
      label: 'Highest Bid',
      icon: <CustomIcon style={styles.infoIcon} name="tag" />,
      value: priceAbbreviation,
      color: colors.orangeRed,
    },
    {
      label: 'Total Bids',
      icon: <CustomIcon style={styles.infoIcon} name="bid-sign" />,
      value: bids.length,
    },
    {
      label: 'Time left',
      icon: <CustomIcon style={styles.infoIcon} name="bid-sign" />,
      value: `${timeLeft.days}d ${timeLeft.hours}h`,
    },
    {
      label: 'Views',
      icon: <CustomIcon style={styles.infoIcon} name="timer" />,
      value: formatNumber(viewsCount, false),
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      <ScrollView>
        <View style={styles.productDisplay}>
          <ProductDisplay
            name={name}
            stars={stars}
            highestBid={highestBid}
            imageUrl={imageUrl}
          />
          <BidInfoBar data={bidInfoData} />
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
  label: {
    color: colors.blueGrey,
    fontSize: fontSizes.sm,
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
});

export default React.memo(Product);
