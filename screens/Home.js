import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableHighlight, Button } from 'react-native';
import { connect } from 'react-redux';
import { FAB, IconButton } from 'react-native-paper';


/* StyleSheet
============================================================================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  groupActionContainer: {
    backgroundColor: '#EEE',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingRight: 80,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});


/* Home
============================================================================= */

class Home extends React.Component {
  state = {
    selectedList: new Map(), // iterable object with string:boolean key:value pairs
    selectMode: false,
  };


  launchScan = (event) => {
    const { navigation } = this.props;
    navigation.navigate('SearchProduct');
  }

  selectItem = (data) => {
    const key = data.index;
    const { selectedList } = this.state;

    const newSelectedList = new Map(selectedList);
    if (newSelectedList.has(key)) {
      newSelectedList.delete(key, !newSelectedList.get(key));
    } else {
      newSelectedList.set(key, !newSelectedList.get(key));
    }

    const selectMode = !!newSelectedList.size;
    this.setState({ selectedList: newSelectedList, selectMode });
  }

  pressItem = (data) => {
    const { selectMode } = this.state;
    if (selectMode) {
      return this.selectItem(data);
    }
    const { navigation } = this.props;
    navigation.navigate('ProductLogEdit', { productLog: data.item });
  }

  renderItem = (data) => {
    const { selectedList } = this.state;

    const isSelected = !!selectedList.get(data.index);
    return (
      <TouchableHighlight
        onPress={() => this.pressItem(data)}
        onLongPress={() => this.selectItem(data)}
      >
        <View style={{backgroundColor: isSelected ? '#F0F' : null }}>
          <Text>Name : {data.item.name}</Text>
          <Text>Qty : {data.item.qty}</Text>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    const { items } = this.props;
    const { selectedList, selectMode } = this.state;

    return (
      <View style={styles.container}>
        <Text>Home screen</Text>
        <FlatList
          style={styles.list}
          data={items}
          renderItem={item => this.renderItem(item)}
          keyExtractor={(item, index) => index.toString()}
          extraData={selectedList}
        />
        <View style={styles.groupActionContainer}>
          <IconButton
            icon="delete"
            // color={Colors.red500}
            size={24}
            disabled={!selectMode}
            onPress={() => console.log('Clear')}
          />
          <IconButton
            icon="add-to-photos"
            // color={Colors.red500}
            size={24}
            disabled={!selectMode}
            onPress={() => console.log('Clear')}
          />
        </View>

        <FAB
          style={styles.fab}
          icon="add"
          onPress={this.launchScan}
          accessibilityLabel="Add log"
        />
      </View>
    );
  }
}


/* Exports
============================================================================= */

const mapStateToProps = state => ({
  items: state.logs,
});

export default connect(
  mapStateToProps,
)(Home);
