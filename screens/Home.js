import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { FAB, IconButton, List } from 'react-native-paper';

import { shareDatabase } from '../utils/dataExport';
import LogList from '../components/LogList';
import LogAddButton from '../components/LogAddButton';
import { deleteLogs } from '../redux/logs';


const TYPES = {
  PRODUCT: 1,
  RECIPE: 2, // product group
  NOTE: 3,
};


/* StyleSheet
============================================================================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  groupActionContainer: {
    backgroundColor: '#EEE',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingRight: 80,
  },
});


/* Home
============================================================================= */

class Home extends React.Component {
  state = {
    selectedItems: new Map(), // iterable object with string:boolean key:value pairs
    selectMode: false,
  };

  addLog = (type, noData) => {
    console.log('addLog event', type, noData)
    const { navigation, items } = this.props;
    const { selectedItems } = this.state;
    let data = null;
    if (!noData && selectedItems.size > 0) {
      const selectedLogs = items.filter(item => !!selectedItems.get(item.id));
      data = { products: selectedLogs };
    }
    if (type === 2) {
      return navigation.navigate('RecipeLogEdit', { recipeLog: data });
    }
    return this.launchScan();
  }

  launchScan = (event) => {
    const { navigation } = this.props;
    navigation.navigate('SearchProduct');
  }

  onPick = (data) => {
    const { navigation } = this.props;
    return navigation.navigate('ProductLogEdit', { productLog: data.item });
  }

  onSelect = (key) => {
    const { selectedItems } = this.state;

    const newSelectedList = new Map(selectedItems);
    if (newSelectedList.has(key)) {
      newSelectedList.delete(key, !newSelectedList.get(key));
    } else {
      newSelectedList.set(key, !newSelectedList.get(key));
    }

    const selectMode = !!newSelectedList.size;
    this.setState({ selectedItems: newSelectedList, selectMode });
  }

  onDelete = () => {
    const { deleteLogsAction } = this.props;
    const { selectedItems } = this.state;
    const selectedArr = Array.from(selectedItems.keys());
    deleteLogsAction(selectedArr);
    this.setState({ selectedItems: new Map() });
  }

  render() {
    const { items } = this.props;
    const { selectedItems, selectMode } = this.state;
    const addType = selectedItems.size > 1 ? TYPES.RECIPE : TYPES.PRODUCT;

    return (
      <View style={styles.container}>
        <LogList
          items={items}
          selectedItems={selectedItems}
          selectMode={selectMode}
          onSelect={this.onSelect}
          onPick={this.onPick}
        />
        <View style={styles.groupActionContainer}>
          <IconButton
            icon="delete"
            size={24}
            disabled={!selectMode}
            onPress={() => { this.onDelete(); }}
          />
          <IconButton
            icon="add-to-photos"
            size={24}
            disabled={!selectMode}
            onPress={() => { shareDatabase(); }}
          />
        </View>

        <LogAddButton
          onPress={this.addLog}
          type={addType}
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
  { deleteLogsAction: deleteLogs }, // will be wrapped into a dispatch call
)(Home);
