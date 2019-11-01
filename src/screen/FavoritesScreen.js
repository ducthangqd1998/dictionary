import React, {Component} from 'react';
import {openDatabase} from 'react-native-sqlite-storage';
var db = openDatabase({name: 'aa.db'});

import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';

export default class FavoritesScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {records: [], id: '', word: '', content: ''};
    this.navigation = this.props.navigation;
    self = this;
    db.transaction(function(txn) {
      txn.executeSql(
        "SELECT * FROM sqlite_master WHERE type='table' AND name='favoritesword'",
        [],
        function(tx, res) {
          if (res.rows.length === 0) {
            txn.executeSql(
              'DROP TABLE IF EXISTS favoritesword',
              [],
              (tes, res) => {
                console.log(res);
              },
            );
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS favoritesword(id INTEGER PRIMARY KEY AUTOINCREMENT, word VARCHAR(30), content VARCHAR(1000))',
              [],
            );
          }
        },
      );
    });
    db.transaction(function(tx) {
      tx.executeSql('SELECT * FROM favoritesword', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; i++) {
          temp.push(results.rows.item(i));
        }
        try {
          self.setState({
            records: temp,
          });
        } catch (e) {
          console.log(e);
        }
      });
    });
  }

  onDelete(id) {
    var temp = [];
    db.transaction(tx => {
      tx.executeSql('DELETE FROM  favoritesword where id=?', [id]);
    });
    db.transaction(function(tx) {
      tx.executeSql('SELECT * FROM favoritesword', [], (tx, results) => {
        for (let i = 0; i < results.rows.length; i++) {
          temp.push(results.rows.item(i));
        }
      });
    });
    this.setState({
      records: temp,
    });
  }

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
            <Text style={styles.size25}>FAVORITES WORD</Text>
          </View>
        </View>

        <View style={styles.mt20}>
          <FlatList
            data={this.state.records}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  onPress={() => this.VocabularyView(item)}
                  onLongPress={() => {
                    this.onDelete(item.id);
                  }}>
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
  plusButton: {
    width: 55,
    height: 55,
  },
  addmoreWord: {
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    width: '100%',
    marginRight: '3%',
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  menuIcon: {
    width: 22,
    height: 22,
  },
  voiceIcon: {
    width: 32,
    height: 32,
  },
  mt20: {
    marginTop: 20,
  },
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
