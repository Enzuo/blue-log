import React from 'react';
import { StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';


/* StyleSheet
============================================================================= */

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});


/* Helpers
============================================================================= */


/* LogAddButton
============================================================================= */

class LogAddButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const { type, onPress } = this.props; // 1 product 2 recipe 3 notes
    const icon = 'restaurant';
    const color = type === 1 ? '#00F' : null;

    return (
      <FAB
        style={styles.fab}
        icon={icon}
        color={color}
        onPress={() => { onPress(type); }}
        accessibilityLabel="Add log"
      />
    );
  }
}

export default LogAddButton;
