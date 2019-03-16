import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TextInput } from 'react-native-paper';

/* StyleSheet
============================================================================= */

/* Helpers
============================================================================= */

const styles = StyleSheet.create({});


/* ProductEdit
============================================================================= */

class ProductEdit extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {

  //   };
  // }

  handleChange = (data) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(data);
    }
  }

  focus() {
    this.inputEnergyRef.focus();
  }

  render() {
    const {
      name,
      code,
      serving,
      energy,
      fat,
      saturatedFat,
      carbohydrates,
      sugar,
      fiber,
      proteins,
      salt,
    } = this.props;

    return (
      <View>
        <TextInput
          label="Name"
          value={name}
          onChangeText={val => this.handleChange({ name: val })}
          ref={(c) => { this.inputNameRef = c; }}
          returnKeyType="next"
          onSubmitEditing={() => { this.inputEnergyRef.focus(); }}
          blurOnSubmit={false}
        />
        <Text>Code : {code}</Text>
        <TextInput
          label="Energy"
          value={energy}
          keyboardType="numeric"
          maxLength={3}
          onChangeText={val => this.handleChange({ energy: val })}
          ref={(c) => { this.inputEnergyRef = c; }}
          returnKeyType="next"
          onSubmitEditing={() => { this.inputFatRef.focus(); }}
          blurOnSubmit={false}
        />
        <TextInput
          label="Fat"
          value={fat}
          keyboardType="numeric"
          maxLength={6}
          onChangeText={val => this.handleChange({ fat: val })}
          ref={(c) => { this.inputFatRef = c; }}
          returnKeyType="next"
          onSubmitEditing={() => { this.inputSatFatRef.focus(); }}
          blurOnSubmit={false}
        />
        <TextInput
          label="Saturated Fat (g)"
          value={saturatedFat}
          keyboardType="numeric"
          maxLength={6}
          onChangeText={val => this.handleChange({ saturatedFat: val })}
          ref={(c) => { this.inputSatFatRef = c; }}
          returnKeyType="next"
          onSubmitEditing={() => { this.inputCarbsRef.focus(); }}
          blurOnSubmit={false}
        />
        <TextInput
          label="Carbohydrates (g)"
          value={carbohydrates}
          keyboardType="numeric"
          maxLength={6}
          onChangeText={val => this.handleChange({ carbohydrates: val })}
          ref={(c) => { this.inputCarbsRef = c; }}
          returnKeyType="next"
          onSubmitEditing={() => { this.inputSugarRef.focus(); }}
          blurOnSubmit={false}
        />
        <TextInput
          label="Sugar (g)"
          value={sugar}
          keyboardType="numeric"
          maxLength={6}
          onChangeText={val => this.handleChange({ sugar: val })}
          ref={(c) => { this.inputSugarRef = c; }}
          returnKeyType="next"
          onSubmitEditing={() => { this.inputFiberRef.focus(); }}
          blurOnSubmit={false}
        />
        <TextInput
          label="Fiber (g)"
          value={fiber}
          keyboardType="numeric"
          maxLength={6}
          onChangeText={val => this.handleChange({ fiber: val })}
          ref={(c) => { this.inputFiberRef = c; }}
          returnKeyType="next"
          onSubmitEditing={() => { this.inputProteinsRef.focus(); }}
          blurOnSubmit={false}
        />
        <TextInput
          label="Proteins (g)"
          value={proteins}
          keyboardType="numeric"
          maxLength={6}
          onChangeText={val => this.handleChange({ proteins: val })}
          ref={(c) => { this.inputProteinsRef = c; }}
          returnKeyType="next"
          onSubmitEditing={() => { this.inputSaltRef.focus(); }}
          blurOnSubmit={false}
        />
        <TextInput
          label="Salt (g)"
          value={salt}
          keyboardType="numeric"
          maxLength={6}
          onChangeText={val => this.handleChange({ salt: val })}
          ref={(c) => { this.inputSaltRef = c; }}
        />
        <TextInput
          label="Serving size (g)"
          value={serving}
          keyboardType="numeric"
          maxLength={6}
          onChangeText={val => this.handleChange({ serving: val })}
          ref={(c) => { this.inputServingRef = c; }}
        />
      </View>
    );
  }
}

export default ProductEdit;
