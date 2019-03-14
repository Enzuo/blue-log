import React from 'react';
import { StyleSheet, View, Animated, FlatList, Easing, ScrollView } from 'react-native';
import { Surface, Colors, List, TouchableRipple, Button } from 'react-native-paper';

/* StyleSheet
============================================================================= */

const styles = StyleSheet.create({
  container: {
    flex:1,
    // flexDirection:'row',
    backgroundColor: 'rgba(0.5,0,0.5,0.5)',
  },
  contentContainer: {
    flexDirection: 'column',
    // alignItems:'stretch',
  },
  surface: {
    flex: 1,
    flexGrow: 1,
    backgroundColor:'#F0F',
    // width:'100%',
  },
  bottom: {
    marginBottom: '48dp',
  },
});


/* Helpers
============================================================================= */

function getColorForSource(sourceType) {
  switch (sourceType) {
    case 1: // previous logs
      return Colors.blue500;
    case 2: // ingredient base
      return Colors.orange500;
    case 3: // recipes
      return Colors.green500;
    default:
      return null;
  }
}

function spacerElem(){
  return ;
}

/* SearchResultList
============================================================================= */

class SearchResultList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spacerAnim: new Animated.Value(300),
      openList: false,
    };
  }

  componentDidUpdate(prevProps) {
    const { spacerAnim, openList } = this.state;
    const { results: prevResults } = prevProps;
    const { results } = this.props;


    if (results !== prevResults) {
      const shouldOpen = results && !openList;
      const shouldClose = !results && openList;

      if (shouldOpen) {
        Animated.timing(spacerAnim, {
          toValue: 100,
          easing: Easing.out(Easing.ease),
          duration: 300,
        }).start();
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({ openList: true });
      }
      if (shouldClose) {
        Animated.timing(spacerAnim, {
          toValue: 300,
          easing: Easing.in(Easing.ease),
          duration: 300,
        }).start();
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({ openList: false });
      }
    }
  }

  renderProduct = (data) => {
    const { item } = data;
    console.log(item);
    const desc = `${item.energy} kcal`;
    const color = getColorForSource(item.source);
    const { onResultClick } = this.props;
    return (
      <TouchableRipple onPress={() => { onResultClick(item); }}>
        <List.Item
          title={item.name}
          description={desc}
          right={props => <List.Icon style={{ fontSize: 5 }} {...props} icon="lens" color={color} />}
        />
      </TouchableRipple>
    );
  }

  renderFooter = () => {
    return (
      <View>
        <Button>Create</Button>
      </View>
    )
  }

  render() {
    const { results } = this.props;
    const { spacerAnim } = this.state;

    return (
      <ScrollView keyboardShouldPersistTaps="handled" style={styles.container} contentContainerStyle={styles.contentContainer}>
        <Animated.View style={{ height: spacerAnim }} />
        <Surface style={styles.surface}>
          <FlatList
            data={results}
            renderItem={item => this.renderProduct(item)}
            keyboardShouldPersistTaps="handled"
            scrollEnabled={false}
            ListFooterComponent={this.renderFooter}
          />
        </Surface>
      </ScrollView>

    );
  }
}

export default SearchResultList;
