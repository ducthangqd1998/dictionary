import React from 'react';
import HomeScreen from './HomeScreen';
import VocabularyScreen from './VocabularyScreen';
import VietnameseEngLishScreen from './VietnameseEngLishScreen';

export const VietnameseEngLish = ({navigation}) => (
  <VietnameseEngLishScreen navigation={navigation} name="VietnameseEngLish" />
);

export const Screen3 = ({navigation}) => (
  <HomeScreen navigation={navigation} name="Screen3" />
);

export const Screen4 = ({navigation}) => (
  <HomeScreen navigation={navigation} name="Screen4" />
);

export const Screen5 = ({navigation}) => (
  <HomeScreen navigation={navigation} name="Screen5" />
);

export const Screen6 = ({navigation}) => (
  <HomeScreen navigation={navigation} name="Screen6" />
);
