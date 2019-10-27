import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';
import {DrawerNavigatorItems} from 'react-navigation-drawer';

export default (SideBar = props => (
  <ScrollView>
    <View>
      <DrawerNavigatorItems {...props} />
    </View>
  </ScrollView>
));

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
