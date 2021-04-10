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
import { useNavigation } from '@react-navigation/native';


class Home extends Component {
  constructor(props)
  {
    super(props);
    this.state = {
      data : [],
      vaccinati: 0,
      isLoaded: false, 
      time: null,
      somministrazioni: 0,
      rawTime: null,
      bigdata: null
    }
  }

  async componentDidMount() {
    this.fetchData();
  }


  fetchData = async () => {
    const response = await fetch("https://raw.githubusercontent.com/italia/covid19-opendata-vaccini/master/dati/anagrafica-vaccini-summary-latest.json");
    const res = await fetch("https://raw.githubusercontent.com/italia/covid19-opendata-vaccini/master/dati/somministrazioni-vaccini-summary-latest.json");
    const regRes = await fetch("https://raw.githubusercontent.com/italia/covid19-opendata-vaccini/master/dati/vaccini-summary-latest.json");
    const data = await response.json();
    const bigdata = await res.json();
    const regiondata = await regRes.json();
    let aux = 0;
    let somministrazioni = 0;
    for (let index = 0; index < data.data.length; index++) {
      aux += (data.data[index].seconda_dose);
      somministrazioni += (data.data[index].totale);
    }
    let time = data.data[0].ultimo_aggiornamento;
    this.setState({time : time.substr(8,2) + "-" + time.substr(5,2) + "-" + time.substr(0,4), vaccinati: aux, 
                        isLoaded: true, somministrazioni : somministrazioni, data: data.data,rawTime : time, bigdata: bigdata.data});
  }

  render() 
  {
    const { navigation } = this.props;
    if(!this.state.isLoaded)
      return(
        <View style={{alignItems: 'center', justifyContent: 'center', backgroundColor: '#171f24', height: Dimensions.get("window").height}}>
          <StatusBar backgroundColor="#1a2a34" style='light'/>
          <Text style={styles.title}>Report Vaccini</Text>
          <ActivityIndicator style={{marginTop: 20}} size="large" color="#ffffff" />
          <Image source={require('./images/syringe.png')} style={{position: "absolute", bottom: 50, width: 50, height: 50}} resizeMode="contain"/>
        </View>
    )
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
          <Text style={{fontWeight:"200", color: 'white', fontSize: 23}}>
            vaccinati in italia
          </Text>
          <View style={{margin: 0, padding: 0}}>
            <NumberFormat thousandSeparator={true} displayType={'text'} value={this.state.vaccinati} renderText={formattedValue => <Text numberOfLines={1} style={{fontWeight:"200", color: 'white', fontSize: 50, margin: 0}}>{formattedValue}</Text>}/>
          </View>
          <Text style={{ fontWeight:"100", color: 'white', fontSize: 13, alignSelf: "flex-end"}}>
            ultimo aggiornamento: {this.state.time}
          </Text>
        </View>
        <View style={{...styles.box,...{backgroundColor: "#C14953"}}}>
          <Text style={{fontWeight:"200", color: 'white', fontSize: 23}}>
            totale somministrazioni
          </Text>
          <View style={{margin: 0, padding: 0}}>
            <NumberFormat thousandSeparator={true} displayType={'text'} value={this.state.somministrazioni} renderText={formattedValue => <Text numberOfLines={1} style={{fontWeight:"200", color: 'white', fontSize: 50, margin: 0}}>{formattedValue}</Text>}/>
          </View>
        </View>
        <Pie data = {this.state.data} totale={this.state.somministrazioni} />
        <Bar data = {this.state.data} />
        <Gender data={this.state.data} />
        <Bezier data={this.state.bigdata} time={this.state.rawTime} />
      </ScrollView>
    </View>
    );
  }
}

export default function(props) {
    const navigation = useNavigation();

    return <Home {...props} navigation={navigation} />;
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
