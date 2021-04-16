import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { ActivityIndicator, Modal, ScrollView, TouchableOpacity, Image, TouchableWithoutFeedback, StyleSheet, Text, View, Dimensions} from 'react-native';
import Pie from "./piechart.js";
import Bar from "./barchart.js";
import Gender from "./gender.js";
import Bezier from "./bezier.js";
import NumberFormat from 'react-number-format';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

/*
  <Bar data = {this.state.data} />
  <Gender data={this.state.data} />
  <Bezier data={this.state.bigdata} time={this.state.rawTime} />
*/

class Home extends Component {
  constructor(props)
  {
    super(props);
  }

  render() 
  {
    const { navigation, route } = this.props;
    const {
      somministrazioni,
      vaccinati,
      time,
      rawTime,
      female,
      male,
      mean,
      second,
      dataAge,
      dataBezier,
      dataPie,
    } = this.props.route.params;
    return (
    <View style={styles.container} >
      <ScrollView  contentContainerStyle={{alignItems: 'center'}}>
          <StatusBar backgroundColor="#1a2a34" style='light'/>
        <View style={styles.titleView}>
            <Text style={styles.title}>Vaccini Covid-19</Text>
          <TouchableOpacity>
            <FontAwesomeIcon icon={faBars} size={30} color={"white"} onPress={() => navigation.openDrawer()}/>
          </TouchableOpacity>
        </View>
        <View style={styles.box}>
          <Text style={{fontWeight:"200", color: 'white', fontSize: 21}}>
            vaccinati in italia
          </Text>
          <View style={{margin: 0, padding: 0}}>
            <NumberFormat thousandSeparator={true} displayType={'text'} value={vaccinati} renderText={formattedValue => <Text numberOfLines={1} style={{fontWeight:"200", color: 'white', fontSize: 40, margin: 0}}>{formattedValue}</Text>}/>
          </View>
          <Text style={{ fontWeight:"100", color: 'white', fontSize: 13, alignSelf: "flex-end"}}>
            ultimo aggiornamento: {time}
          </Text>
        </View>
        <View style={{...styles.box,...{backgroundColor: "#C14953"}}}>
          <Text style={{fontWeight:"200", color: 'white', fontSize: 21}}>
            totale somministrazioni
          </Text>
          <View style={{margin: 0, padding: 0}}>
            <NumberFormat thousandSeparator={true} displayType={'text'} value={somministrazioni} renderText={formattedValue => <Text numberOfLines={1} style={{fontWeight:"200", color: 'white', fontSize: 40, margin: 0}}>{formattedValue}</Text>}/>
          </View>
        </View>
        <View style={{...styles.box,...{backgroundColor: "#fff59d"}}}>
          <Text style={{fontWeight:"200", color: '#171f24', fontSize: 21}}>
            solo prima dose
          </Text>
          <View style={{margin: 0, padding: 0}}>
            <NumberFormat thousandSeparator={true} displayType={'text'} value={somministrazioni - vaccinati} renderText={formattedValue => <Text numberOfLines={1} style={{fontWeight:"200", color: '#171f24', fontSize: 40, margin: 0}}>{formattedValue}</Text>}/>
          </View>
        </View>
        <Pie data={dataPie} totale={somministrazioni} />
        <Bar data = {dataAge} />
        <Gender male={male} female={female} />
        <Bezier data={dataBezier} mean={mean} second={second} time={rawTime} />
      </ScrollView>
    </View>
    );
  }
}

export default function(props) {
    const navigation = useNavigation();
    const route = useRoute();
    return <Home {...props} navigation={navigation} route={route}/>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#171f24',
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
  },
  titleView: {
    flexDirection: 'row',
    width: "100%",
    height: 60,
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingLeft: "5%",
    paddingRight: "5%",
    marginTop: 20,
    marginBottom: 10
  },
  title: {
    color: "white",
    textAlignVertical:'bottom',
    fontSize: 28,
    paddingLeft: 10,
    fontWeight: 'bold'
  },
  box: {
    width: "90%", 
    backgroundColor: "#1a2a34",
    elevation: 2,
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84
  },
  centeredView: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  modalView: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width / 100 * 60,
    justifyContent: 'center'
  }
});
