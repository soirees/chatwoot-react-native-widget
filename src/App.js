import React, { useEffect, useState } from 'react';
import { SafeAreaView, Appearance, View } from 'react-native';
import PropTypes from 'prop-types';
import { storeHelper, findColors } from './utils';
import WebView from './WebView';
import styles from './style';
import {COLOR_WHITE} from './constants';

const propTypes = {
  isModalVisible: PropTypes.bool.isRequired,
  websiteToken: PropTypes.string.isRequired,
  baseUrl: PropTypes.string.isRequired,
  cwCookie: PropTypes.string,
  user: PropTypes.shape({
    name: PropTypes.string,
    avatar_url: PropTypes.string,
    email: PropTypes.string,
    identifier_hash: PropTypes.string,
  }),
  locale: PropTypes.string,
  colorScheme: PropTypes.oneOf(['dark', 'light', 'auto']),
  customAttributes: PropTypes.shape({}),
  closeModal: PropTypes.func,
  style: PropTypes.shape({}),
};

const defaultProps = {
  cwCookie: '',
  user: {},
  locale: 'en',
  colorScheme: 'light',
  customAttributes: {},
  style: {},
};

const ChatWootWidget = ({
  isModalVisible,
  baseUrl,
  websiteToken,
  user,
  locale,
  colorScheme,
  customAttributes,
  closeModal,
  style
}) => {
  const [cwCookie, setCookie] = useState('');

  useEffect(() => {
    async function fetchData() {
      const value = await storeHelper.getCookie();
      setCookie(value);
    }
    fetchData();
  }, []);
  const appColorScheme = Appearance.getColorScheme();

  const { headerBackgroundColor, mainBackgroundColor } = findColors({
    colorScheme,
    appColorScheme,
  });
  return (
    <View style={style}>
    <SafeAreaView style={[styles.headerView, { backgroundColor: headerBackgroundColor }]} />
    <SafeAreaView style={[styles.mainView, { backgroundColor: mainBackgroundColor }]}>
      <WebView
        websiteToken={websiteToken}
        cwCookie={cwCookie}
        user={user}
        baseUrl={baseUrl}
        locale={locale}
        colorScheme={colorScheme}
        customAttributes={customAttributes}
        closeModal={closeModal}
      />
    </SafeAreaView>
    </View>
  );
};

ChatWootWidget.defaultProps = defaultProps;
ChatWootWidget.propTypes = propTypes;

export default ChatWootWidget;
