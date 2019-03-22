import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableHighlight } from 'react-native';
import { List } from 'react-native-paper';


/* StyleSheet
============================================================================= */

const styles = StyleSheet.create({
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
});

/* Helpers
============================================================================= */


/* LogList
============================================================================= */

class LogList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  onLongPress = (data) => {
    const key = data.index;
    const { onSelect } = this.props;

    return onSelect(key);
  }

  onPress = (data) => {
    const { selectMode, onSelect, onPick } = this.props;
    if (selectMode) {
      const key = data.index;
      return onSelect(key);
    }
    return onPick(data);
  }

  renderItem = (data) => {
    const { selectedItems } = this.props;

    const isSelected = !!selectedItems.get(data.index);
    const itemIcon = isSelected ? 'check-box' : 'restaurant-menu';
    const description = data.item.energy ? `${data.item.energy} kcal` : null;

    return (
      <TouchableHighlight
        onPress={() => this.onPress(data)}
        onLongPress={() => this.onLongPress(data)}
        underlayColor="#00F"
      >
        <List.Item
          title={data.item.name}
          description={description}
          style={{ backgroundColor: isSelected ? '#DDD' : '#FFF' }}
          left={props => <List.Icon animated {...props} icon={itemIcon} />}
          right={() => (
            <View style={styles.itemQty}>
              <Text style={styles.itemQtyNb}>{data.item.qty}</Text>
              <Text>g</Text>
            </View>
          )}
        />
      </TouchableHighlight>
    );
  }

  render() {
    const { items, selectedItems } = this.props;

    return (
      <FlatList
        style={styles.list}
        data={items}
        renderItem={item => this.renderItem(item)}
        keyExtractor={(item, index) => index.toString()}
        extraData={selectedItems}
      />
    );
  }
}

export default LogList;
