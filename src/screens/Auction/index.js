import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';
import CountDown from 'react-native-countdown-component';

import ProductDisplay from '../../components/ProductDisplay';
import { colors, spaces, fontSizes } from '../../styles/variables';
import Bid from '../../components/Bid';
import { formatNumber } from '../../libs';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import bidAcceptImage from '../../assets/images/accept-bid.png';
import CustomIcon from '../../components/CustomIcon';
import BidInfoBar from '../../components/BidInfoBar';

/**
 * @todo:
 * - use gif image for acceptance image
 * - format money input to include thousand separator
 */
const Auction = ({ route, navigation }) => {
  const bidDetail = route.params?.bidDetail ?? {};
  const { name, stars, imageUrl } = route.params?.productDetail ?? {};
  const [status, setStatus] = useState('winning');
  const [isRejectModalVisible, setIsRejectModalVisible] = useState(false);

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
  const currentStatusOption = statusOptions[status] || {};

  const acceptBid = () => {
    setStatus('accepted');
  };

  const attemptReject = () => {
    setIsRejectModalVisible(true);
  };

  const rejectBid = () => {
    setIsRejectModalVisible(false);
    setStatus('rejected');
  };

  const sendOffer = () => {
    setStatus('offer-sent');
    navigation.setOptions({ title: 'Offer sent' });
  };

  const renderAcceptanceInfo = () => {
    return (
      <View style={styles.acceptanceContainer}>
        <Image source={bidAcceptImage} style={styles.acceptanceImage} />
        <View style={styles.fill}>
          <Text style={styles.acceptanceTitle}>Bid Accepted!</Text>
          <Text style={styles.acceptanceText}>
            It usually takes a while, but not necessarily. Technology is subject
            to the speed of human evolution, inovation and invention. Enjoy it,
            all the same.
          </Text>
        </View>
      </View>
    );
  };

  const renderExpectation = () => {
    return (
      <View style={styles.expectationContainer}>
        <Text style={styles.expectationLabel}>Your Expected Price</Text>
        <TextInput
          keyboardType="numeric"
          money
          containerStyle={styles.expectationInput}
        />
        <Button title="REQUEST" onPress={sendOffer} />
      </View>
    );
  };

  const renderRejectionModal = () => {
    return (
      <Modal
        isVisible={isRejectModalVisible}
        onBackdropPress={() => setIsRejectModalVisible(false)}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalHeader}>
            Looks like you are not happy with the deal
          </Text>
          <Text style={styles.label}>What will you like to do now?</Text>

          <TouchableOpacity style={styles.button} onPress={rejectBid}>
            <Text style={styles.buttonText}>
              SEND A NEW OFFER TO ALL EXISTING BIDDERS
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>LIST ON MARKETPLACE</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setIsRejectModalVisible(false)}>
            <Text style={styles.buttonText}>
              CHANGED MY MIND, I WANT THE DEAL
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  };

  const bidInfoData = [
    {
      label: 'Offer sent',
      icon: <CustomIcon style={styles.infoIcon} name="tag" />,
      value: 'N52M',
      color: colors.orangeRed,
    },
    {
      label: 'Accepted',
      icon: <CustomIcon style={styles.infoIcon} name="bid-sign" />,
      value: '1',
    },
    {
      label: 'Rejected',
      icon: <CustomIcon style={styles.infoIcon} name="bid-sign" />,
      value: '15',
    },
    {
      label: 'Time left',
      icon: <CustomIcon style={styles.infoIcon} name="timer" />,
      value: '23h',
    },
  ];

  const renderSentOffer = () => {
    return (
      <View>
        <BidInfoBar data={bidInfoData} />
        <View style={styles.offerInfo}>
          <Text style={styles.acceptanceTitle}>Offer sent!</Text>
          <Text style={styles.acceptanceText}>
            It usually takes a while, but not necessarily. Technology is subject
            to the speed of human evolution, inovation and invention. Enjoy it,
            all the same. The near future as bright as a borrowed sun in the
            solar system.
          </Text>
        </View>
        <View style={styles.offerInfo}>
          <Text style={styles.label}>Remaining Time</Text>
          <View>
            <CountDown
              until={60 * 60 * 60 + 30}
              size={30}
              timeLabelStyle={styles.timeLabelStyle}
              digitStyle={styles.digitStyle}
              digitTxtStyle={styles.digitTxtStyle}
              timeToShow={['D', 'H', 'M', 'S']}
            />
          </View>
        </View>
      </View>
    );
  };

  return (
    <View>
      <ScrollView>
        <ProductDisplay name={name} stars={stars} imageUrl={imageUrl} />
        {status !== 'offer-sent' && (
          <>
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
          </>
        )}
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
                <Button
                  onPress={attemptReject}
                  title="REJECT BID"
                  type="error"
                />
              </View>
            </View>
          </View>
        )}
        {status === 'accepted' && renderAcceptanceInfo()}
        {status === 'rejected' && renderExpectation()}
        {status === 'offer-sent' && renderSentOffer()}
      </ScrollView>
      <View />
      {renderRejectionModal()}
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
  modalContainer: {
    backgroundColor: colors.white,
    padding: spaces.appSpacing01,
  },
  modalHeader: {
    fontSize: fontSizes.lg,
    fontWeight: '500',
    lineHeight: 28,
  },
  button: {
    marginTop: 15,
  },
  buttonText: {
    color: colors.primary,
  },
  infoIcon: {
    color: colors.grey,
    fontSize: fontSizes.md,
    marginRight: spaces.xs,
  },
  offerInfo: {
    paddingHorizontal: spaces.appSpacing01,
    paddingTop: spaces.lg,
  },
  digitStyle: {
    backgroundColor: colors.white,
  },
  digitTxtStyle: {
    color: colors.primary,
    fontWeight: '500',
  },
  timeLabelStyle: {
    color: colors.grey,
    fontSize: fontSizes.sm,
  },
});

export default React.memo(Auction);
