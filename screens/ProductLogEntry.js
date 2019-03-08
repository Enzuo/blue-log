import React from 'react';
import { StyleSheet, View, Button, Text, Linking } from 'react-native';
import { connect } from 'react-redux';

import { addLog } from '../actions';


/* StyleSheet
============================================================================= */

const styles = StyleSheet.create({});


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
    return responseJson;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

function LinkOpenFoodFact({ code }) {
  if (!code) {
    return null;
  }
  const linkOpenFF = `https://world.openfoodfacts.org/product/${code}`;
  return (
    <Button
      title="Edit on open food fact"
      onPress={() => { Linking.openURL(linkOpenFF); }}
    />
  );
}

function mapOpenFFAPI(response) {
  const { product } = response;
  return {
    // code : product.code,
    name: product.product_name,
    serving: product.serving_quantity,
    energy: product.nutriments.energy_value,
    fat: product.nutriments.energy_value,
    saturatedFat: product.nutriments['saturated-fat_value'],
    carboyhydrates: product.nutriments.carbohydrates_value,
    sugar: product.nutriments.sugar_value,
    fiber: product.nutriments.fiber_value,
    proteins: product.nutriments.proteins_value,
  };
}


/* ProductLogEntry
============================================================================= */

class ProductLogEntry extends React.Component {
  state = {
    date: Date.now(),
    qty: 100,
  }

  async componentDidMount() {
    const { navigation } = this.props;
    const ref = navigation.getParam('ref', null);

    this.setState({ ref });

    try {
      const openFFResponse = await getItemFromOpenFoodFact(ref);
      const product = mapOpenFFAPI(openFFResponse);
      this.setState(product);
    } catch (err) {
      this.setState({
        error: 'got an error' + err.statusText,
      });
    }
  }

  submit = () => {
    const { addLogProduct } = this.props;
    const productLog = this.state;
    addLogProduct(productLog);
  }

  render() {
    const { qty, date, ref, name, energy, error } = this.state;
    return (
      <View>

        <Text>Quantity : {qty}</Text>
        <Text>Date : {date}</Text>
        <Text>Ref : {ref}</Text>
        <Text>Name : {name}</Text>
        <Text>Energy : {energy}</Text>
        <Text>Error : {error}</Text>
        <Button
          onPress={this.submit}
          title="Submit"
          color="#841584"
          accessibilityLabel="Submit"
        />
        <LinkOpenFoodFact code={ref} />
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
