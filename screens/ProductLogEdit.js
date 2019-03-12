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

  const energyComputed = product.nutriments.energy_unit === 'kJ'
    ? (product.nutriments.energy_value / 4.184).toFixed(0) : product.nutriments.energy_value;

  return {
    // code : product.code,
    name: product.product_name,
    serving: product.serving_quantity,
    energy: energyComputed,
    fat: product.nutriments.energy_value,
    saturatedFat: product.nutriments['saturated-fat_value'],
    carbohydrates: product.nutriments.carbohydrates_value,
    sugar: product.nutriments.sugar_value,
    fiber: product.nutriments.fiber_value,
    proteins: product.nutriments.proteins_value,
  };
}


/* ProductLogEntry
============================================================================= */

class ProductLogEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: Date.now(),
      qty: 100,
    };
  }

  async componentDidMount() {
    const { navigation } = this.props;
    const productLog = navigation.getParam('productLog', null);

    this.setState(productLog);

    if (productLog.isIncomplete) {
      try {
        const openFFResponse = await getItemFromOpenFoodFact(productLog.code);
        const product = mapOpenFFAPI(openFFResponse);
        this.setState(product);
      } catch (err) {
        this.setState({
          error: 'got an error' + err.statusText,
        });
      }
    }
  }

  submit = () => {
    const { addProductLog } = this.props;
    const productLog = this.state;
    addProductLog(productLog);

    const { navigation } = this.props;
    navigation.popToTop();
  }

  render() {
    const { qty, date, code, name, energy, error } = this.state;
    return (
      <View>

        <Text>Quantity : {qty}</Text>
        <Text>Date : {date}</Text>
        <Text>Code : {code}</Text>
        <Text>Name : {name}</Text>
        <Text>Energy : {energy}</Text>
        <Text>Error : {error}</Text>
        <Button
          onPress={this.submit}
          title="Submit"
          color="#841584"
          accessibilityLabel="Submit"
        />
        <LinkOpenFoodFact code={code} />
      </View>
    );
  }
}


/* Exports
============================================================================= */

export default connect(
  null,
  { addProductLog: addLog },
)(ProductLogEntry);
