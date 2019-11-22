import React, {Component} from 'react';
import {openDatabase} from 'react-native-sqlite-storage';
import Voice from 'react-native-voice';

import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

var db = openDatabase({
  name: 'anh_viet.db',
  createFromLocation: '1',
});

export default class FlashCardScreen extends Component {
  constructor(props) {
    super(props);

    Voice.onSpeechStart = this.onSpeechStart;
    Voice.onSpeechRecognized = this.onSpeechRecognized;
    Voice.onSpeechResults = this.onSpeechResults;

    this.state = {
      records: [],
      id: '',
      word: '',
      content: '',
      recognized: '',
      started: '',
      results: [],
    };
    this.setInputState = this.setInputState.bind(this);
    this.navigation = this.props.navigation;
    const self = this;
    db.transaction(function(tx) {
      tx.executeSql('SELECT * FROM anh_viet LIMIT 50', [], (tx, results) => {
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

  setInputState(value) {
    console.log(value);

    this.setState({records: value});
  }

  addmoreWord = () => {
    var temp = this.state.records;
    db.transaction(function(tx) {
      tx.executeSql('SELECT * FROM anh_viet LIMIT 10000', [], (tx, results) => {
        for (let i = 0; i < results.rows.length; i++) {
          temp.push(results.rows.item(i));
        }
      });
    });
    this.setState({
      records: temp,
    });
  };

  updateWord = temp => {
    this.setState({records: temp});
  };

  searchWord = async keyWord => {
    var temp = [];
    await db.transaction(tx => {
      tx.executeSql(
        "SELECT * FROM anh_viet WHERE word LIKE '%' || ? || '%' LIMIT 20",
        [keyWord],
        (tx, results) => {
          console.log('result', results);
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push(results.rows.item(i));
          }
          this.updateWord(temp);
        },
      );
    });
  };

  extractContent = string => {
    const regex = new RegExp(/<li>([^<]*)<\/li>/gi);
    return regex.exec(string)[1];
  };

  VocabularyView = word => {
    this.props.navigation.navigate('Vocabulary', {word});
  };

  componentWillUnmount() {
    Voice.destroy().then(Voice.removeAllListeners);
  }
  onSpeechStart(e) {
    console.log('eeeee', e);
    this.setState({
      started: '√',
    });
  }
  onSpeechRecognized(e) {
    this.setState({
      recognized: '√',
    });
  }
  onSpeechResults(e) {
    this.setState({
      results: e.value,
    });
  }

  async _startRecognition(e) {
    this.setState({
      recognized: '',
      started: '',
      results: [],
    });
    console.log('ok');
    try {
      await Voice.start('en-US');
    } catch (e) {
      console.error(e);
    }
  }

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
              source={require('../../img/menu.png')}
            />
          </TouchableOpacity>
          <View style={styles.title}>
            <Text style={styles.fontsize25}>FLASH CARD</Text>
          </View>
        </View>
        <FlatList
          data={this.state.records}
          horizontal={true}
          pagingEnabled={true}
          renderItem={({item}) => {
            return (
              <View style={styles.flashcardView}>
                <View style={styles.flex1}>
                  <Image
                    style={{width: 130, height: 130}}
                    source={require('../../img/bee.png')}
                  />
                  <Text style={styles.size25}>{item.word}</Text>
                  <View>
                    <Text style={styles.size25}>
                      {this.extractContent(item.content)}
                    </Text>
                  </View>
                </View>
                <View style={styles.flexRow}>
                  <TouchableOpacity
                    style={styles.styleCenter}
                    onPress={this._startRecognition.bind(this)}>
                    <Image
                      style={styles.plusButton}
                      source={require('../../img/microphone.png')}
                    />
                  </TouchableOpacity>
                  <View style={styles.styleCenter}>
                    <Image
                      style={styles.plusButton}
                      source={require('../../img/volume1.png')}
                    />
                  </View>
                </View>
              </View>
            );
          }}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  plusButton: {
    width: 65,
    height: 65,
  },
  addmoreWord: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    width: '100%',
    marginRight: '3%',
    position: 'absolute',
    bottom: 20,
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
  title: {
    alignItems: 'center',
    width: '90%',
    justifyContent: 'center',
  },
  size25: {
    fontSize: 25,
    marginTop: 20,
  },
  fontsize25: {
    fontSize: 25,
  },
  navigationBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    justifyContent: 'flex-start',
    borderBottomWidth: 0.5,
  },
  flexRow: {
    flex: 1,
    paddingTop: 50,
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
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
  flex1: {
    justifyContent: 'center',
    flex: 2,
    borderWidth: 0.5,
    padding: 20,
    marginTop: 19,
    width: '90%',
    alignItems: 'center',
  },
  styleCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: {
    fontSize: 16,
  },
  flashcardView: {
    flex: 1,
    width: Dimensions.get('window').width,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
