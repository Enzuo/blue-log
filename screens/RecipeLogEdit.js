import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, ScrollView, FlatList, Text } from 'react-native';
import { TextInput, FAB } from 'react-native-paper';
import KeyboardSpacer from 'react-native-keyboard-spacer';

import { deleteLogs, addRecipeLog } from '../redux/logs';


/* StyleSheet
============================================================================= */

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  view: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    padding: 5,
    backgroundColor: '#F0F',
  },
});


/* Helpers
============================================================================= */


/* RecipeLogEdit
============================================================================= */

class RecipeLogEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipeLog: {
        date: Date.now(),
        qty: 100,
      },
    };
  }

  async componentDidMount() {
    const { navigation } = this.props;
    const recipeLogParam = navigation.getParam('recipeLog', null);

    const { recipeLog: defaultLog } = this.state;
    const recipeLog = { ...defaultLog, ...recipeLogParam };
    this.setState({ recipeLog });
  }

  renderItem = (data) => {
    return (
      <View>
        <Text>{data.item.name}</Text>
      </View>
    );
  }

  submit = () => {
    const { navigation, deleteLogsAction, addRecipeLogAction } = this.props;
    const { recipeLog } = this.state;

    // delete product log if necessary (added to the recipe group)
    if (recipeLog.products) {
      const productLogToDelete = recipeLog.products.map(product => product.id);
      deleteLogsAction(productLogToDelete);
    }

    console.log('RECIPE LOOGO', recipeLog);

    addRecipeLogAction(recipeLog);
    navigation.popToTop();
  }

  render() {
    const { recipeLog } = this.state;
    const { products, name } = recipeLog;

    console.log('recipe log', recipeLog)

    return (
      <View style={styles.view}>
        <View style={styles.view}>
          <ScrollView style={styles.scrollView}>

            <TextInput
              value={name}
              onChangeText={val => this.setState({ recipeLog: { name: val, ...recipeLog } })}
            />
            <FlatList
              data={products}
              renderItem={item => this.renderItem(item)}
              keyExtractor={(item, index) => index.toString()}
            />

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
  { deleteLogsAction: deleteLogs, addRecipeLogAction: addRecipeLog },
)(RecipeLogEdit);
