import 'react-native-gesture-handler';
import React from 'react';
import {AppRegistry} from 'react-native';
import {Provider} from 'react-redux';
import {name as appName} from './app.json';
import storeConfig from './src/store';
import Routes from './src/routes';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
Icon.loadFont();

const store = storeConfig();

const RNRedux = () => {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => RNRedux);
