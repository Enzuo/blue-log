import React from 'react';
import { Animated, StyleSheet, Text, View, FlatList, Easing } from 'react-native';
import { Searchbar, List, Surface } from 'react-native-paper';
import searchProduct from '../utils/mockSearch';


import Scanner from '../components/Scanner';

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
  spacer: {
    height: 100,
  },
  surface: {
    flex: 1,
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
      spacerAnim: new Animated.Value(300),
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    navigation.setParams({ onSearch: this.onSearch });
  }

  onSearch = (query) => {
    this.setState({ text: query });
    const products = searchProduct(query);
    this.setState({ searchResult: products });

    const { spacerAnim } = this.state;

    if (products) {
      return Animated.timing(spacerAnim, {
        toValue: 100,
        easing: Easing.out(Easing.ease),
        duration: 300,
      }).start();
    }
    Animated.timing(spacerAnim, {
      toValue: 300,
      easing: Easing.in(Easing.ease),
      duration: 300,
    }).start();
  }

  onItemScanned(itemCode) {
    this.setState({
      itemCode,
      scanDisabled: true,
    });

    this.openProductLog({ code: itemCode, isIncomplete: true });
  }

  openProductLog(product) {
    const { navigation } = this.props;
    navigation.navigate('ProductLogEdit', { productLog: product });
  }

  renderSearchItem = (data) => {
    const { item } = data;
    console.log(item);
    const desc = `${item.energy} kcal`;
    return (
      <List.Item
        title={item.name}
        description={desc}
        left={props => <List.Icon {...props} icon="folder" />}
      />
    );
  }


  render() {
    const { scanDisabled, text, itemLabel, searchResult, spacerAnim } = this.state;
    return (
      <View style={styles.container}>
        <Scanner onItemScanned={code => this.onItemScanned(code)} disabled={scanDisabled} />
        <Text>Searching for {text}</Text>
        <Text>Name : {itemLabel}</Text>
        <Animated.View style={{ height: spacerAnim }} />
        <Surface style={styles.surface}>
          <FlatList
            data={searchResult}
            renderItem={item => this.renderSearchItem(item)}
          />
        </Surface>
      </View>
    );
  }
}


export default SearchProduct;
