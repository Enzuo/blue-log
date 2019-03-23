import React from 'react';
import { StyleSheet, ScrollView, View, Button, Text, Linking } from 'react-native';
import { connect } from 'react-redux';
import { TextInput, FAB } from 'react-native-paper';
import KeyboardSpacer from 'react-native-keyboard-spacer';


import { addLog } from '../redux/logs';
import DateTime from '../components/DateTime';
import ProductEdit from '../components/ProductEdit';


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
    energy: energyComputed,
    fat: product.nutriments.fat_value,
    saturatedFat: product.nutriments['saturated-fat_value'],
    carbohydrates: product.nutriments.carbohydrates_value,
    sugar: product.nutriments.sugars_value,
    fiber: product.nutriments.fiber_value,
    proteins: product.nutriments.proteins_value,
    salt: product.nutriments.salt_value,
    serving: product.serving_quantity,
  };
}


/* ProductLogEntry
============================================================================= */

class ProductLogEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productLog: {
        date: Date.now(),
        qty: 100,
      },
    };
  }

  async componentDidMount() {
    const { navigation } = this.props;
    const productLogParam = navigation.getParam('productLog', null);

    const { productLog } = this.state;
    const productLogMerge = { ...productLog, ...productLogParam };
    this.setState({ productLog: productLogMerge });

    if (productLogMerge.isIncomplete) {
      try {
        const openFFResponse = await getItemFromOpenFoodFact(productLogMerge.code);
        const productOpenFF = mapOpenFFAPI(openFFResponse);
        this.setState({ productLog: { ...productLogMerge, ...productOpenFF } });
      } catch (err) {
        this.setState({
          error: 'got an error' + err.statusText,
        });
      }
    }
  }

  submit = () => {
    const { addProductLog } = this.props;
    const { productLog } = this.state;
    addProductLog(productLog);

    const { navigation } = this.props;
    navigation.popToTop();
  }

  render() {
    const { productLog, error } = this.state;
    const { qty, date, code, name, energy, fat, saturatedFat, carbohydrates, sugar } = productLog;
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 1}}>
          <ScrollView style={{flex:1, padding:5, backgroundColor:'#F0F'}}>
            <TextInput
              label="Quantity (g)"
              value={qty}
              keyboardType="numeric"
              autoFocus
              onChangeText={val => this.setState({ productLog: { ...productLog, qty: val } })}
              maxLength={3}
              returnKeyType="next"
              onSubmitEditing={() => { this.inputProductRef.focus(); }}
              blurOnSubmit={false}
            />
            <DateTime
              date={date}
              onChange={val => this.setState({ productLog: { ...productLog, date: val } })}
            />
            <ProductEdit
              {...productLog}
              ref={(c) => { this.inputProductRef = c; }}
              onChange={val => this.setState({ productLog: { ...productLog, ...val } })}
            />

            <Text>Error : {error}</Text>
            <LinkOpenFoodFact code={code} />
          </ScrollView>
          <FAB
            style={styles.fab}
            icon="done"
            onPress={this.submit}
            accessibilityLabel="Submit"
          />
        </View>
        <KeyboardSpacer />
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
