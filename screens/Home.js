import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native';


export default class App extends React.Component {
  launchScan = (event) => {
    const {navigate} = this.props.navigation;

    navigate('Scan', {name: 'Jane'})
  }

  render() {

    return (
      <View style={styles.container}>
        <Text>Home screen</Text>

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
});
