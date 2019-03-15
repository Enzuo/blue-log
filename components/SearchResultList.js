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
    paddingTop:20,
    // flexDirection: 'column',
    // alignItems:'stretch',
  },
  surface: {
    flex: 1,
    elevation:4,
    // flexGrow: 1,
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

// var spacerAnim = new Animated.Value(300);


/* SearchResultList
============================================================================= */

class SearchResultList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openList: false,
      spacerAnim: new Animated.Value(300),
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
          useNativeDriver: true,
        }).start();
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({ openList: true });
      }
      if (shouldClose) {
        Animated.timing(spacerAnim, {
          toValue: 300,
          easing: Easing.in(Easing.ease),
          duration: 300,
          useNativeDriver: true,
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

  onScroll = (event, b) => {
    const { spacerAnim, openList } = this.state;

    // console.log(event, b)
    // var newSpacer = 100 - event.nativeEvent.contentOffset.y;
    // if(newSpacer<0) newSpacer = 0;
    // this.setState({spacerAnim: newSpacer})
    if(event.nativeEvent.contentOffset.y > 1){
      Animated.timing(spacerAnim, {
        toValue: 0,
        easing: Easing.linear(Easing.ease),
        duration: 100,
        useNativeDriver: true,
      }).start();
    }
  }

  render() {
    const { results } = this.props;
    const { spacerAnim } = this.state;

    return (
      <View style={styles.container}>
        <Animated.View
          style={{
            height: 300,
            transform: [{
              translateY: spacerAnim,
            }],
            backgroundColor:'#00F',
          }}
        >
          <Surface style={styles.surface}>
            <FlatList
              contentContainerStyle={styles.contentContainer}
              data={results}
              renderItem={item => this.renderProduct(item)}
              keyboardShouldPersistTaps="handled"
              scrollEnabled={true}
              ListFooterComponent={this.renderFooter}
              onScroll={this.onScroll}
            />
          </Surface>
        </Animated.View>
      </View>

    );
  }
}

export default SearchResultList;
