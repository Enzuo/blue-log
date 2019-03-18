import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { FAB, IconButton, List } from 'react-native-paper';

import { shareDatabase } from '../utils/dataExport';


/* StyleSheet
============================================================================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
  itemQty: {
    margin: 8,
    height: 40,
    width: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemQtyNb: {
    marginRight: 5,
    fontWeight: 'bold',
    color: '#3498db',
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
    return navigation.navigate('ProductLogEdit', { productLog: data.item });
  }

  renderItem = (data) => {
    const { selectedList } = this.state;

    const isSelected = !!selectedList.get(data.index);
    const itemIcon = isSelected ? 'check-box' : 'restaurant-menu';
    const description = data.item.energy ? `${data.item.energy} kcal` : null;
    return (
      <TouchableHighlight
        onPress={() => this.pressItem(data)}
        onLongPress={() => this.selectItem(data)}
        underlayColor="#00F"
      >
        <List.Item
          title={data.item.name}
          description={description}
          style={{ backgroundColor: isSelected ? '#DDD' : '#FFF' }}
          left={props => <List.Icon animated {...props} icon={itemIcon} />}
          right={() => <View style={styles.itemQty}><Text style={styles.itemQtyNb}>{data.item.qty}</Text><Text>g</Text></View>}
        />
      </TouchableHighlight>
    );
  }

  render() {
    const { items } = this.props;
    const { selectedList, selectMode } = this.state;

    return (
      <View style={styles.container}>
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
            size={24}
            disabled={!selectMode}
            onPress={() => console.log('Delete')}
          />
          <IconButton
            icon="add-to-photos"
            size={24}
            disabled={!selectMode}
            onPress={() => { shareDatabase(); }}
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
