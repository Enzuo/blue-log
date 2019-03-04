import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { connect } from 'react-redux'

import { addLog } from '../actions'




class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasFailed : false,
      itemId : null,
      itemLabel : null,
    }
  }

  async componentDidMount () {
    const { navigation } = this.props;
    const itemId = navigation.getParam('itemId', null);
    this.setState({
      itemId : itemId
    })
    return await this.getItemFromOpenFoodFact(itemId);
  }

  cancel = () => {
    const { navigation } = this.props;
    this.props.navigation.pop()

  }

  render() {

    return (
      <View style={styles.container}>
        <Text>Searching for {this.state.itemId} on open food fact...</Text>
        <Text>Name : {this.state.itemLabel}</Text>
        <SearchStatus hasFailed={this.state.hasFailed} onPress={this.cancel}></SearchStatus>
      </View>
    );
  }

  async getItemFromOpenFoodFact (id)  {
    console.log('get item', id);
    try {
      let response = await fetch(
        `https://world.openfoodfacts.org/api/v0/product/${id}.json`,
      );
      let responseJson = await response.json();
      if(responseJson.status === 0){
        return this.setState({
          hasFailed : true
        })
      }
      this.setState({
        itemLabel : responseJson.product.product_name
      })
      this.props.addLog({ name : responseJson.product.product_name })
      return responseJson;
    } catch (error) {
      console.error(error);
    }
  }
}


function SearchStatus(props) {
  const hasFailed = props.hasFailed;
  if (hasFailed) {
    return (
      <View>
        <Text>Search for scanned item failed</Text><Button title="Ok" onPress={props.onPress}/>
      </View>
    );
  }
  return <Button title="Abort" onPress={props.onPress}/>;
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


const mapStateToProps = state => ({
  items: state.logs
})

const mapDispatchToProps = dispatch => ({
  addLog: productLog => dispatch(addLog(productLog))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search)
