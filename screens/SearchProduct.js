import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Searchbar } from 'react-native-paper';
import KeyboardSpacer from 'react-native-keyboard-spacer';

import searchProduct from '../utils/mockSearch';

import Scanner from '../components/Scanner';
import SearchResultList from '../components/SearchResultList';


/* StyleSheet
============================================================================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
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


/* Helpers
============================================================================= */


/* SearchProduct
============================================================================= */

class SearchProduct extends React.Component {
  static navigationOptions = ({ props, state, navigation }) => {
    const onSearch = navigation.getParam('onSearch');
    const ref = React.createRef();
    // navigation.setParams({ refSearchBar: ref });
    return {
    // headerTitle instead of title
      headerTitle: (
        <Searchbar
          style={styles.searchBar}
          placeholder="Search"
          onChangeText={onSearch}
          ref={ref}
          autoFocus
        />
      ),
    };
  };

  constructor(props) {
    super(props);
    // var {height, width} = Dimensions.get('window');
    this.state = {
      text: 'Search here',
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    navigation.setParams({ onSearch: this.onSearch });
  }

  onSearch = (query) => {
    this.setState({ text: query });
    const products = searchProduct(query);
    this.setState({ searchResults: products });
  }

  onProductScanned(itemCode) {
    this.setState({
      scanDisabled: true,
    });

    this.openProductLog({ code: itemCode, isIncomplete: true });
  }

  onProductPicked(product) {
    this.openProductLog(product);
  }

  openProductLog(product) {
    const { navigation } = this.props;
    navigation.navigate('ProductLogEdit', { productLog: product });
  }

  render() {
    const { scanDisabled, text, itemLabel, searchResults } = this.state;

    return (
      <View style={styles.container}>
        <Scanner onProductScanned={code => this.onProductScanned(code)} disabled={scanDisabled} />
        <Text>Searching for {text}</Text>
        <Text>Name : {itemLabel}</Text>
        <SearchResultList
          results={searchResults}
          onResultClick={result => this.onProductPicked(result)}
        />
        <KeyboardSpacer />
      </View>
    );
  }
}


export default SearchProduct;
