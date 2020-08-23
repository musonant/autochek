import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Title from '../../components/Title';
import ProductDisplay from '../../components/ProductDisplay';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors, spaces, fontSizes } from '../../styles/variables';
import Bid from '../../components/Bid';
import { formatNumber } from '../../libs';
import Button from '../../components/Button';

const Auction = ({ route }) => {
  const bidDetail = route.params?.bidDetail ?? {};
  const { name, stars, imageUrl } = route.params?.productDetail ?? {};
  const [status, setStatus] = useState('winning');

  const { id, date, price } = bidDetail;

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
        <View style={styles.infoArea}>
          <View style={styles.row}>
            <Text style={styles.tableHeader}>Bid</Text>
            <Text style={styles.tableHeader}>{formatNumber(price)}</Text>
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
              <Button title="ACCEPT BID" type="primary" />
            </View>
            <View style={styles.actionButton}>
              <Button title="REJECT BID" type="error" />
            </View>
          </View>
        </View>
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
});

export default React.memo(Auction);
