import React from 'react';
import { StyleSheet, View, Button, Text, Linking } from 'react-native';
import { connect } from 'react-redux';

import { addLog } from '../actions';


/* StyleSheet
============================================================================= */

const styles = StyleSheet.create({})


/* Helpers
============================================================================= */

async function getItemFromOpenFoodFact(code) {
  console.log('get item with code from open food fact', code);
  try {
    const response = await fetch(
      `https://world.openfoodfacts.org/api/v0/product/${code}.json`,
    );
    const responseJson = await response.json();
    if (responseJson.status === 0) {
      const error = { responseJson };
      throw error;
    }
    console.log(responseJson);
    return responseJson;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

function linkToOpenFoodFact(code) {
  return `https://world.openfoodfacts.org/product/${code}`;
}


/* ProductLogEntry
============================================================================= */

class ProductLogEntry extends React.Component {
  state = {

  }

  async componentDidMount() {
    const { navigation } = this.props;
    const ref = navigation.getParam('ref', null);

    this.setState({ ref });

    const productOpenFF = await getItemFromOpenFoodFact(ref);

    this.setState({
      name: productOpenFF.product.product_name,
    });
  }

  submit = () => {
    const { addLogProduct } = this.props;
    const { ref, name } = this.state;
    addLogProduct({
      ref, name,
    });
  }

  render() {
    const { ref, name } = this.state;
    return (
      <View>
        <Text>Ref : {ref}</Text>
        <Text>Name : {name}</Text>
        <Button
          onPress={this.submit}
          title="Submit"
          color="#841584"
          accessibilityLabel="Submit"
        />
        <Button
          title="Edit on open food fact"
          onPress={() => { Linking.openURL(linkToOpenFoodFact(ref)); }}
        />
      </View>
    );
  }
}


/* Exports
============================================================================= */

export default connect(
  null,
  { addLogProduct: addLog },
)(ProductLogEntry);
