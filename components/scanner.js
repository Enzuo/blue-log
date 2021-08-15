import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { IconButton } from 'react-native-paper';


/* StyleSheet
============================================================================= */

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,

    backgroundColor: '#AAA',
  },
  backgroundIcon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bgDesc: {
    color: '#999',
  },
  cameraView: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0, // StyleSheet.absoluteFill
  },
});


/* Scanner
============================================================================= */

export default class Scanner extends React.Component {
  state = {
    hasCameraPermission: null,
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  handleBarCodeScanned = ({ type, data }) => {
    const { onProductScanned } = this.props;
    console.log(`Bar code with type ${type} and data ${data} has been scanned!`);
    onProductScanned(data);
  }


  render() {
    const { hasCameraPermission } = this.state;
    const { disabled } = this.props;

    let problem = null;

    if (disabled) {
      problem = <Text style={styles.bgDesc}>Disabled</Text>;
    }
    if (hasCameraPermission === null) {
      problem = <Text style={styles.bgDesc}>Requesting for camera permission</Text>;
    }
    if (hasCameraPermission === false) {
      problem = <Text style={styles.bgDesc}>No access to camera</Text>;
    }
    if (problem) {
      return (
        <View style={styles.background}>
          <View style={styles.backgroundIcon}>
            <IconButton
              size={60}
              icon="camera"
              style={{ width: 100 }} // solve problem icon being cut in half
              color="#999"
              onPress={() => console.log('Pressed')}
            />
            {problem}
          </View>
          <KeyboardSpacer />
        </View>
      );
    }
    return (
      <BarCodeScanner
        onBarCodeScanned={this.handleBarCodeScanned}
        style={styles.cameraView}
      />
    );
  }


}



