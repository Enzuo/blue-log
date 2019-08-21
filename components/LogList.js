import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableHighlight } from 'react-native';
import { List } from 'react-native-paper';
import LOGTYPES from './constants';


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

function hasSameDate(ts1, ts2) {
  const d1 = new Date(ts1);
  const d2 = new Date(ts2);
  const y1 = d1.getYear();
  const y2 = d2.getYear();
  const m1 = d1.getMonth();
  const m2 = d2.getMonth();
  const j1 = d1.getDate();
  const j2 = d2.getDate();
  return y1 === y2 && m1 === m2 && j1 === j2;
}


/* LogList
============================================================================= */

let headerKeys = [];
class LogList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  onLongPress = (data) => {
    const key = data.item.id;
    const { onSelect } = this.props;

    return onSelect(key);
  }

  onPress = (data) => {
    const { selectMode, onSelect, onPick } = this.props;
    if (selectMode) {
      const key = data.item.id;
      return onSelect(key);
    }
    return onPick(data);
  }

  renderItem = (data) => {
    const { selectedItems } = this.props;

    const key = data.item.id;
    const isSelected = !!selectedItems.get(key);
    let itemIcon = data.item.type === 3 ? 'book' : 'restaurant-menu';
    itemIcon = isSelected ? 'check-box' : itemIcon;
    const description = data.item.energy ? `${data.item.energy} kcal` : null;
    const hasHeader = headerKeys.indexOf(data.item.id) > -1;
    const header = hasHeader ? <List.Subheader>{data.item.date}</List.Subheader> : null

    return (
      <View>
        {header}
        <TouchableHighlight
          onPress={() => this.onPress(data)}
          onLongPress={() => this.onLongPress(data)}
          delayLongPress={500}
          underlayColor="#00F"
        >
          <List.Item
            title={data.item.name}
            description={description}
            style={{ backgroundColor: isSelected ? '#DDD' : '#FFF' }}
            left={props => <List.Icon {...props} icon={itemIcon} />}
            right={() => (
              <View style={styles.itemQty}>
                <Text style={styles.itemQtyNb}>{data.item.qty}</Text>
                <Text>g</Text>
              </View>
            )}
          />
        </TouchableHighlight>
      </View>
    );
  }

  render() {
    const { items, selectedItems } = this.props;

    let previousDate = null;
    headerKeys = items.reduce((keys, item) => {
      if (!hasSameDate(item.date, previousDate)) {
        keys.push(item.id);
        previousDate = item.date;
      }
      return keys;
    }, []);

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
