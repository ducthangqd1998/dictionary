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

  z = 'hahaha';

  static navigationOptions = ({navigation}) => ({
    headerTitleStyle: {alignSelf: 'center'},
    title: `${navigation.state.params.word.word}`,
  });

  render() {
    return (
      <WebView
        originWhitelist={['*']}
        source={{html: this.state.content}}
        injectedJavaScript={
          "const meta = document.createElement('meta'); meta.setAttribute('content', 'width=width, initial-scale=0.5, maximum-scale=0.5, user-scalable=2.0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); "
        }
        scalesPageToFit={false}
        onLoadEnd={this._onLoadEnd}
      />
    );
  }
}
