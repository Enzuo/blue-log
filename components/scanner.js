import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';

export default class Scanner extends React.Component {
  state = {
    hasCameraPermission: null,
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  render() {
    const { hasCameraPermission } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
    if (this.props.disabled) {
      return null
    }
    return (
      <BarCodeScanner
        onBarCodeScanned={this.handleBarCodeScanned}
        style={styles.cameraView}
      />
    );
  }

  handleBarCodeScanned = ({ type, data }) => {
    console.log(`Bar code with type ${type} and data ${data} has been scanned!`);
    this.props.onItemScanned(data)
  }
}


const styles = StyleSheet.create({
  cameraView: {
    position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, // StyleSheet.absoluteFill
    height:50,

  },
});
