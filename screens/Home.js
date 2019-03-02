import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { Button } from 'react-native';
import { connect } from 'react-redux'

import { toggleTodo } from '../actions'



class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
      inStockOnly: false,
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
          data={this.props.items}
          renderItem={({item}) => <Text style={styles.item}>Text : {item.text}</Text>}
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

const mapStateToProps = state => ({
  items: state.todos
})

const mapDispatchToProps = dispatch => ({
  toggleTodo: id => dispatch(toggleTodo(id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)

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
