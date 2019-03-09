import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableHighlight, Button } from 'react-native';
import { connect } from 'react-redux'

import { toggleTodo } from '../actions'


/* StyleSheet
============================================================================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});


/* Home
============================================================================= */

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
      inStockOnly: false,
    };
  }

  launchScan = (event) => {
    const { navigate } = this.props.navigation;

    navigate('SearchProduct');
  }

  selectItem = (data) => {
    data.item.isSelect = !data.item.isSelect;
  }

  openItem = (data) => {
    const { navigation } = this.props;
    navigation.navigate('ProductLogEdit', { productLog: data.item });
  }

  renderItem = (data) => {
    return (
      <TouchableHighlight
        onPress={() => this.openItem(data)}
        onLongPress={() => this.selectItem(data)}
      >
        <Text>Name : {data.item.productLog.name}</Text>
      </TouchableHighlight>
    );
  }

  render() {
    const { items } = this.props;

    return (
      <View style={styles.container}>
        <Text>Home screen</Text>
        <FlatList
          data={items}
          renderItem={item => this.renderItem(item)}
          keyExtractor={(item, index) => index.toString()}
        />
        <Button
          onPress={this.launchScan}
          title="Scan"
          color="#841584"
          accessibilityLabel="Scan product"
        />
      </View>
    );
  }
}


/* Exports
============================================================================= */

const mapStateToProps = state => ({
  items: state.logs
})

const mapDispatchToProps = dispatch => ({
  toggleTodo: id => dispatch(toggleTodo(id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)


