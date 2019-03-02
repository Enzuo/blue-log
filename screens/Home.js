import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { Button } from 'react-native';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
      inStockOnly: false,
      items: [{ key : 'bob'}, 
              {'key' : 'pomme'},
              { key : 'caramel'}]
    };
  }

  launchScan = (event) => {
    const {navigate} = this.props.navigation;

    navigate('Scan', {name: 'Jane'})
  }

  render() {

    return (
      <View style={styles.container}>
        <Text>Home screen</Text>
        <FlatList
          data={this.state.items}
          renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
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
