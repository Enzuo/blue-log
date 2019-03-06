import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native'

import Scanner from '../components/scanner'



class SearchProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: 'Search here' };
  }

  componentDidMount() {
    this.nameInput.focus()

    setTimeout(() => this.nameInput.focus(), 1000);

  }

  onItemScanned (id) {
    this.setState({
      itemId : id,
      scanDisabled: true,
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Scanner onItemScanned={(item) => this.onItemScanned(item)} disabled={this.state.scanDisabled}></Scanner>
        <TextInput
          style={ styles.searchbox }
          onChangeText={(text) => this.setState({ text })}
          value={this.state.text}
          autoFocus={true}
          ref={x => this.nameInput = x}
        />
        <Text>Searching for {this.state.itemId} on open food fact...</Text>
        <Text>Name : {this.state.itemLabel}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  searchbox: {
    backgroundColor: 'white',
    height: 40, 
    borderColor: 'gray', 
    borderWidth: 1,
  }
});




export default SearchProduct
