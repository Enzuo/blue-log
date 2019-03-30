import React from 'react';
import { StyleSheet, View, ScrollView, FlatList, Text } from 'react-native';
import { TextInput, FAB } from 'react-native-paper';
import KeyboardSpacer from 'react-native-keyboard-spacer';


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
      log: {
        date: Date.now(),
        qty: 100,
      },
    };
  }

  async componentDidMount() {
    const { navigation } = this.props;
    const recipeLogParam = navigation.getParam('recipeLog', null);

    const { log: defaultLog } = this.state;
    const log = { ...defaultLog, ...recipeLogParam };
    this.setState({ log });
  }

  renderItem = (data) => {
    return (
      <View>
        <Text>{data.item.name}</Text>
      </View>
    );
  }

  render() {
    const { log } = this.state;
    const { products, name } = log;

    console.log('recipe log', log)

    return (
      <View style={styles.view}>
        <View style={styles.view}>
          <ScrollView style={styles.scrollView}>

            <TextInput
              value={name}
              onChangeText={val => this.setState({ log: { name: val, ...log } })}
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

export default RecipeLogEdit;
