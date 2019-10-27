import React, {Component} from 'react';
import {openDatabase} from 'react-native-sqlite-storage';
var db = openDatabase({
  name: 'viet_anh.db',
  createFromLocation: '1',
});
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';

export default class HomeSceen extends Component {
  constructor(props) {
    super(props);
    this.navigation = this.props.navigation;
    this.state = {records: [], id: '', word: '', content: ''};
    const self = this;
    db.transaction(function(tx) {
      tx.executeSql('SELECT * FROM viet_anh LIMIT 50', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; i++) {
          temp.push(results.rows.item(i));
        }
        // console.log('temp1', temp);
        try {
          self.setState({
            record: temp,
          });
        } catch (e) {}
      });
    });
  }

  read = () => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM viet_anh', [], (tx, results) => {
        console.log('results', results);
      });
    });
  };

  extractContent = string => {
    const regex = /(<([^>]+)>)/gi;
    return string.replace(regex, '').replace('"', '');
  };

  VocabularyView = word => {
    this.props.navigation.navigate('Vocabulary', {word});
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.navigationBar}>
          <TouchableOpacity
            style={styles.alignFlexEnd}
            onPress={this.props.navigation.openDrawer}>
            {/* onPress={this.read}> */}
            <Image
              style={styles.menuIcon}
              source={require('/home/maithang/Duc Thang/DUT/React Native/test/img/menu.png')}
            />
          </TouchableOpacity>
          <View style={styles.title}>
            <Text style={styles.size25}>VIE - ENG</Text>
          </View>
        </View>
        <View style={styles.search}>
          <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="Nhập từ để tra"
            placeholderTextColor="grey"
            autoCaptalize="none"
          />
          <TouchableOpacity style={styles.alignFlexEnd}>
            {/* onPress={this.read}> */}
            <Image
              style={styles.voiceIcon}
              source={require('/home/maithang/Duc Thang/DUT/React Native/test/img/voice.png')}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.mt20}>
          <FlatList
            data={this.state.record}
            renderItem={({item}) => {
              return (
                <TouchableOpacity onPress={() => this.VocabularyView(item)}>
                  <View style={styles.vocavularyView}>
                    <Text style={styles.info}>{item.word}</Text>
                  </View>
                </TouchableOpacity>
              );
            }}
            keyExtractor={item => item.id.toString()}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  menuIcon: {
    width: 22,
    height: 22,
  },
  voiceIcon: {
    width: 32,
    height: 32,
  },
  mt20: {marginTop: 20},
  alignFlexEnd: {
    alignItems: 'flex-start',
  },
  title: {
    alignItems: 'center',
    width: '90%',
    justifyContent: 'center',
  },
  size25: {
    fontSize: 25,
  },
  navigationBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  search: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
  },
  input: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
    backgroundColor: '#ffffff',
    fontSize: 18,
    borderBottomWidth: 0.4,
    width: '87%',
  },
  info: {
    fontSize: 16,
  },
  vocavularyView: {
    marginTop: 20,
    height: 60,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 2,
    shadowRadius: 6,
    elevation: 1,
    borderWidth: 0.1,
    borderRadius: 6,
    backgroundColor: '#ffffff',
    paddingLeft: 20,
    fontSize: 18,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
});