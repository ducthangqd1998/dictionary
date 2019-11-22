import React, {Component} from 'react';
import {WebView} from 'react-native-webview';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage';
var db = openDatabase({name: 'aa.db'});

export default class VocabularyScreen extends Component {
  constructor(props) {
    super(props);
    this.navigation = this.props.navigation;
    const vocabulary = this.navigation.state.params;
    this.state = {
      id: vocabulary.word.id,
      word: vocabulary.word.word,
      content: vocabulary.word.content,
    };
  }

  static navigationOptions = ({navigation}) => ({
    headerTitleStyle: {alignSelf: 'center'},
    title: `${navigation.state.params.word.word}`,
  });

  addWord = () => {
    const {id, word, content} = this.state;
    console.log(id);
    db.transaction(function(tx) {
      try {
        tx.executeSql(
          'INSERT INTO favoritesword (id, word, content) VALUES (?,?,?)',
          [id, word, content],
          function(tx, results) {
            console.log('result', results);
            if (results.rowsAffected > 0) {
              console.log('sucess');
            }
          },
        );
      } catch (e) {
        console.log('okoko');
        console.log(e);
      }
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <WebView
          originWhitelist={['*']}
          source={{html: this.state.content}}
          injectedJavaScript={
            "const meta = document.createElement('meta'); meta.setAttribute('content', 'width=width, initial-scale=0.5, maximum-scale=0.5, user-scalable=2.0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); "
          }
          scalesPageToFit={false}
          onLoadEnd={this._onLoadEnd}
        />
        <View style={styles.favoriteWord}>
          <TouchableOpacity onPress={() => this.addWord()}>
            <Image
              style={styles.heartIcon}
              source={require('../../img/heart.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  heartIcon: {
    width: 55,
    height: 55,
  },
  favoriteWord: {
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    width: '100%',
    marginRight: '3%',
    position: 'absolute',
    bottom: 0,
    right: 0,
    marginBottom: 20,
  },
});
