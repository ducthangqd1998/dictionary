import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createStackNavigator} from 'react-navigation-stack';
import SideBar from './src/component/SideBar';
import {Image} from 'react-native';
import HomeScreen from './src/screen/HomeScreen';
import VocabularyScreen from './src/screen/VocabularyScreen';
import FavoritesScreen from './src/screen/FavoritesScreen';
import VietNameseEngLishScreen from './src/screen/VietnameseEngLishScreen';
import FlashCardScreen from './src/screen/FlashCardScreen';
import {
  VietnameseEngLish,
  Screen3,
  Screen4,
  Screen5,
  Screen6,
} from './src/screen';

const AVNavigator = createStackNavigator(
  {
    HomeScreen: {
      screen: HomeScreen,
      navigationOptions: {
        header: null,
      },
    },
    Vocabulary: {
      screen: VocabularyScreen,
      navigationOptions: {},
    },
  },
  {headerLayoutPreset: 'center'},
);

const VANavigator = createStackNavigator(
  {
    VietNameseEngLishScreen: {
      screen: VietNameseEngLishScreen,
      navigationOptions: {
        header: null,
      },
    },
    Vocabulary: {
      screen: VocabularyScreen,
      navigationOptions: {},
    },
  },
  {headerLayoutPreset: 'center'},
);

const FavoritesNavigator = createStackNavigator({
  FavoritesScreen: {
    screen: FavoritesScreen,
    navigationOptions: {
      header: null,
    },
  },
  Vocabulary: {
    screen: VocabularyScreen,
    navigationOptions: {},
  },
});

const DrawerNavigator = createDrawerNavigator(
  {
    EnglishVietnamese: {
      screen: AVNavigator,
      navigationOptions: {
        title: 'English - Vietnamese',
        drawerIcon: ({tintColor}) => (
          <Image
            style={{width: 25, height: 25}}
            source={require('./img/home.png')}
          />
        ),
      },
    },
    EnglishEnglish: {
      screen: AVNavigator,
      navigationOptions: {
        title: 'English - English',
        drawerIcon: ({tintColor}) => (
          <Image
            style={{width: 25, height: 25}}
            source={require('./img/E_V.png')}
          />
        ),
      },
    },
    VietnameseEnglish: {
      screen: VANavigator,
      navigationOptions: {
        title: 'Vietnamese - English',
        drawerIcon: ({tintColor}) => (
          <Image
            style={{width: 25, height: 25}}
            source={require('./img/V_A.png')}
          />
        ),
      },
    },
    FavoritesScreen: {
      screen: FavoritesNavigator,
      navigationOptions: {
        title: 'Favorites',
        drawerIcon: ({tintColor}) => (
          <Image
            style={{width: 25, height: 25}}
            source={require('./img/favorites.png')}
          />
        ),
      },
    },
    FlashCardScreen: {
      screen: FlashCardScreen,
      navigationOptions: {
        title: 'Flash Card',
        drawerIcon: ({tintColor}) => (
          <Image
            style={{width: 30, height: 30}}
            source={require('./img/flashcard.png')}
          />
        ),
      },
    },
    WordScreen: {
      screen: Screen5,
      navigationOptions: {
        title: 'Your Word',
        drawerIcon: ({tintColor}) => (
          <Image
            style={{width: 25, height: 25}}
            source={require('./img/word.png')}
          />
        ),
      },
    },
    ShareScreen: {
      screen: Screen6,
      navigationOptions: {
        title: 'Share',
        drawerIcon: ({tintColor}) => (
          <Image
            style={{width: 25, height: 25}}
            source={require('./img/share.png')}
          />
        ),
      },
    },
    HelpScreen: {
      screen: Screen6,
      navigationOptions: {
        title: 'Help',
        drawerIcon: ({tintColor}) => (
          <Image
            style={{width: 25, height: 25}}
            source={require('./img/help.png')}
          />
        ),
      },
    },
  },
  {
    contentComponent: props => <SideBar {...props} />,
  },
);

export default createAppContainer(DrawerNavigator);
