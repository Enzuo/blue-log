import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

import Scanner from '../components/Scanner';


/* StyleSheet
============================================================================= */

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
  },
});


/* SearchProduct
============================================================================= */

class SearchProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: 'Search here' };
  }

  componentDidMount() {
    this.nameInput.focus();

    setTimeout(() => this.nameInput.focus(), 1000);
  }

  onItemScanned(itemRef) {
    this.setState({
      itemId: itemRef,
      scanDisabled: true,
    });

    this.selectProduct({ ref: itemRef });
  }

  selectProduct(product) {
    const { navigation } = this.props;
    navigation.navigate('ProductLogEdit', product);
  }

  render() {
    const { scanDisabled, text, itemId, itemLabel } = this.state;
    return (
      <View style={styles.container}>
        <Scanner onItemScanned={itemRef => this.onItemScanned(itemRef)} disabled={scanDisabled} />
        <TextInput
          style={styles.searchbox}
          onChangeText={txt => this.setState({ text: txt })}
          value={text}
          autoFocus
          ref={(x) => { this.nameInput = x; }}
        />
        <Text>Searching for {itemId} on open food fact...</Text>
        <Text>Name : {itemLabel}</Text>
      </View>
    );
  }
}


export default SearchProduct;
