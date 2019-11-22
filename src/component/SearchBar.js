import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';

export default class SearchBar extends Component {
  render() {
    return (
      <View style={styles.navigationBar}>
        <TouchableOpacity
          style={styles.alignFlexEnd}
          onPress={this.props.navigation.openDrawer}>
          {/* onPress={this.read}> */}
          <Image
            style={styles.menuIcon}
            source={require('../../img/menu.png')}
          />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Nhập từ để tra"
          placeholderTextColor="grey"
          autoCaptalize="none"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  menuIcon: {
    width: 22,
    height: 22,
  },
  alignFlexEnd: {
    alignItems: 'flex-start',
  },
  navigationBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  input: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
    backgroundColor: '#ffffff',
    marginLeft: 20,
    fontSize: 18,
    borderBottomWidth: 0.4,
    width: '87%',
  },
});
