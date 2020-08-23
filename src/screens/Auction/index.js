import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import Title from '../../components/Title';
import ProductDisplay from '../../components/ProductDisplay';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors, spaces, fontSizes } from '../../styles/variables';
import Bid from '../../components/Bid';
import { formatNumber } from '../../libs';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import bidAcceptImage from '../../assets/images/accept-bid.png';

/**
 * @todo:
 * - format money input to include thousand separator
 */
const Auction = ({ route }) => {
  const bidDetail = route.params?.bidDetail ?? {};
  const { name, stars, imageUrl } = route.params?.productDetail ?? {};
  const [status, setStatus] = useState('winning');

  const statusOptions = {
    winning: {
      text: 'This Bid won the auction',
      color: colors.orange,
    },
    accepted: {
      text: 'Bid Accepted',
      color: colors.green,
    },
    rejected: {
      text: 'Winning Bid Rejected',
      color: colors.red,
    },
  };
  const currentStatusOption = statusOptions[status];

  const acceptBid = () => {
    setStatus('accepted');
  };

  const rejectBid = () => {
    setStatus('rejected');
  };

  const renderAcceptanceInfo = () => {
    return (
      <View style={styles.acceptanceContainer}>
        <Image source={bidAcceptImage} style={styles.acceptanceImage} />
        <View style={styles.fill}>
          <Text style={styles.acceptanceTitle}>Bid Accepted!</Text>
          <Text style={styles.acceptanceText}>
            Stuff Stuff Stuff Stuff Stuff Stuff Stuff Stuff Stuff Stuff Stuff
            Stuff Stuff Stuff Stuff Stuff Stuff Stuff Stuff StuffStuff Stuff
            Stuff Stuff Stuff Stuff Stuff Stuff Stuff Stuff Stuff Stuff Stuff
            Stuff
          </Text>
        </View>
      </View>
    );
  };

  const renderExpectation = () => {
    return (
      <View style={styles.expectationContainer}>
        <Text style={styles.expectationLabel}>Your Expected Price</Text>
        <TextInput money containerStyle={styles.expectationInput} />
        <Button title="REQUEST" />
      </View>
    );
  };

  return (
    <View>
      <Title title="Auction Completed" />
      <ScrollView>
        <ProductDisplay name={name} stars={stars} imageUrl={imageUrl} />
        <View style={styles.status}>
          <Icon
            name="star"
            style={styles.starIcon}
            color={currentStatusOption.color}
          />
          <Text style={{ color: currentStatusOption.color }}>
            {currentStatusOption.text}
          </Text>
        </View>
        <Bid {...bidDetail} />
        {status === 'winning' && (
          <View style={styles.infoArea}>
            <View style={styles.row}>
              <Text style={styles.tableHeader}>Bid</Text>
              <Text style={styles.tableHeader}>
                {formatNumber(bidDetail.price)}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Net Pay</Text>
              <Text style={styles.label}>- {formatNumber(1000)}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Service Charge</Text>
              <Text style={styles.label}>- {formatNumber(1000)}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Logistics Fee</Text>
              <Text style={styles.label}>- {formatNumber(1000)}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.tableHeader}>Total</Text>
              <Text style={[styles.label, styles.totalText]}>
                {formatNumber(51700000)}
              </Text>
            </View>
            <View style={[styles.row, styles.actions]}>
              <View style={styles.actionButton}>
                <Button onPress={acceptBid} title="ACCEPT BID" type="primary" />
              </View>
              <View style={styles.actionButton}>
                <Button onPress={rejectBid} title="REJECT BID" type="error" />
              </View>
            </View>
          </View>
        )}
        {status === 'accepted' && renderAcceptanceInfo()}
        {status === 'rejected' && renderExpectation()}
      </ScrollView>
      <View />
    </View>
  );
};

const styles = StyleSheet.create({
  status: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spaces.appSpacing01,
    paddingVertical: spaces.lg,
    borderBottomColor: colors.separator,
    borderBottomWidth: 1,
  },
  starIcon: {
    fontSize: 22,
    marginRight: spaces.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  fill: {
    flex: 1,
  },
  actionButton: {
    width: '48%',
  },
  infoArea: {
    paddingHorizontal: spaces.appSpacing01,
    padding: spaces.lg,
  },
  tableHeader: {
    paddingBottom: spaces.xs,
    fontSize: fontSizes.md,
  },
  label: {
    color: colors.blueGrey,
    paddingVertical: spaces.xs,
  },
  totalText: {
    fontSize: fontSizes.lg,
    color: colors.black,
  },
  actions: {
    marginTop: spaces.md,
  },
  acceptanceContainer: {
    backgroundColor: colors.cloudWhite,
    flexDirection: 'row',
    paddingHorizontal: spaces.appSpacing01,
    paddingVertical: spaces.md,
    marginTop: spaces.lg,
  },
  acceptanceImage: {
    width: 120,
    height: 120,
  },
  acceptanceTitle: {
    color: colors.primary,
    fontWeight: '500',
    marginBottom: spaces.md,
  },
  acceptanceText: {
    fontSize: fontSizes.xs,
    lineHeight: 20,
  },
  expectationContainer: {
    backgroundColor: colors.cloudWhite,
    paddingHorizontal: spaces.appSpacing01,
    paddingVertical: spaces.md,
  },
  expectationInput: {
    marginBottom: spaces.md,
  },
  expectationLabel: {
    color: colors.grey,
    marginBottom: spaces.md,
  },
});

export default React.memo(Auction);
