import React from 'react';
import { StyleSheet, View, Animated, FlatList, Easing, ScrollView } from 'react-native';
import { Surface, Colors, List, TouchableRipple } from 'react-native-paper';

/* StyleSheet
============================================================================= */

const styles = StyleSheet.create({
  container: {
    // flex:1,
    // flexDirection:'row',
    // backgroundColor: 'rgba(0.5,0,0.5,0.5)',
  },
  contentContainer: {
    flexGrow: 1,
    // backgroundColor: '#0F0',
  },
  surface: {
    // flex: 0,
    // minHeight:'100%',
    elevation: 8,
    // paddingTop:70,
    flexGrow: 1,
    // backgroundColor: 'rgba(1,0,1,0.5)',
    // width:'100%',
  },
  topGap: {
    height: 100,
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

/* SearchResultList
============================================================================= */

class SearchResultList extends React.Component {
  scrollView = null;

  constructor(props) {
    super(props);
    this.state = {
      openList: false,
      hiddenList: true,
      panelOffsetAnim: new Animated.Value(300),
      topGapHeight: 100,
    };
  }


  componentDidUpdate(prevProps) {
    const { panelOffsetAnim, openList } = this.state;
    const { results: prevResults } = prevProps;
    const { results } = this.props;


    if (results !== prevResults) {
      const shouldOpen = results && !openList;
      const shouldClose = !results && openList;

      if (shouldOpen) {
        Animated.timing(panelOffsetAnim, {
          toValue: 0,
          easing: Easing.out(Easing.ease),
          duration: 300,
          useNativeDriver: true,
        }).start();
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({ openList: true, hiddenList: false });
      }
      if (shouldClose) {
        Animated.timing(panelOffsetAnim, {
          toValue: 300,
          easing: Easing.in(Easing.ease),
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          this.setState({ hiddenList: true });
        });
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({ openList: false });
      }
    }
  }

  renderProduct = (data) => {
    const { item } = data;
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
    const { onCreateClick, search } = this.props;
    const desc = `create item ${search}`;
    return (
      <TouchableRipple onPress={() => { onCreateClick(); }}>
        <List.Item
          title={search}
          description={desc}
          right={props => <List.Icon {...props} icon="add-box" />}

        />
      </TouchableRipple>
    );
  }

  onScrollEndSnapToEdge = (event) => {
    const { topGapHeight } = this.state;

    const scrollY = event.nativeEvent.contentOffset.y;

    if (this.scrollView && scrollY < topGapHeight && scrollY > topGapHeight / 2) {
      this.scrollView.scrollTo({ y: topGapHeight });
    }

    if (this.scrollView && scrollY < topGapHeight && scrollY < topGapHeight / 2) {
      this.scrollView.scrollTo({ y: 0 });
    }
  }

  render() {
    const { results } = this.props;
    const { panelOffsetAnim, hiddenList } = this.state;

    if (hiddenList) {
      return null;
    }

    return (
      <ScrollView
        onScroll={this.onScroll}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
        onMomentumScrollEnd={this.onScrollEndSnapToEdge}
        ref={(scrollView) => { this.scrollView = scrollView; }}
      >
        <View style={styles.topGap} />
        <Animated.View
          style={{
            flexGrow: 1,
            transform: [{
              translateY: panelOffsetAnim,
            }],
          }}
        >
          <Surface style={styles.surface}>
            <FlatList
              data={results}
              renderItem={item => this.renderProduct(item)}
              keyboardShouldPersistTaps="handled"
              ListFooterComponent={this.renderFooter}
              onScroll={this.onScroll}
            />
          </Surface>
        </Animated.View>
      </ScrollView>
    );
  }
}

export default SearchResultList;
