import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import HomeScreen from './home.js';
import RegionScreen from './region.js';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { render } from 'react-dom';
import { ActivityIndicator, Dimensions, Image, StyleSheet, Text, View } from 'react-native';

const Drawer = createDrawerNavigator();

export default class App extends Component {
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
      bigdata: null,
      regiondata: null,
      male : 0,
      female : 0,
      mean: 0,
      second: 0,
      dataAge : null,
      dataBezier : null,
      dataPie: null
    }
  }

  async componentDidMount() {
    this.fetchData();
  }


  fetchData = async () => {
    //Fetch dati
    const response = await fetch("https://raw.githubusercontent.com/italia/covid19-opendata-vaccini/master/dati/anagrafica-vaccini-summary-latest.json");
    const res = await fetch("https://raw.githubusercontent.com/italia/covid19-opendata-vaccini/master/dati/somministrazioni-vaccini-summary-latest.json");
    const regRes = await fetch("https://raw.githubusercontent.com/italia/covid19-opendata-vaccini/master/dati/vaccini-summary-latest.json");
    //Risposte
    const data = await response.json();
    const bigdata = await res.json();
    const regiondata = await regRes.json();
    const dataregion = regiondata.data;
    //Vaccini totali e somministrazioni totali
    let aux = 0;
    let somministrazioni = 0;
    for (let index = 0; index < data.data.length; index++) {
      aux += (data.data[index].seconda_dose);
      somministrazioni += (data.data[index].totale);
    }
    //Tempo
    const time = data.data[0].ultimo_aggiornamento;
    //Genere
    let male, female;
    male = female = 0;
    for (let index = 0; index < data.data.length; index++) {
        female += (data.data[index].sesso_femminile);
        male += (data.data[index].sesso_maschile);
    }
    //somministrazioni per età
    const dataAge = {
      labels: [],
      datasets: [
        {
          data: []
        }
      ]
    };
    for (let index = data.data.length - 1; index >= 0; index--) {
        dataAge.labels.push(data.data[index].fascia_anagrafica);
        dataAge.datasets[0].data.push(data.data[index].totale);
    }
    //DataPie
    let ospitiRsa, sanitari, nonSanitari, over, scolastico, forzeArmate, altro;
    ospitiRsa = sanitari = nonSanitari = over = scolastico = forzeArmate = altro = 0;
    for (let index = 0; index < data.data.length; index++) {
        ospitiRsa += (data.data[index].categoria_ospiti_rsa);
        sanitari += (data.data[index].categoria_operatori_sanitari_sociosanitari);
        nonSanitari += (data.data[index].categoria_personale_non_sanitario);
        forzeArmate += (data.data[index].categoria_forze_armate);
        altro += (data.data[index].categoria_altro);
        over += (data.data[index].categoria_over80);
        scolastico += (data.data[index].categoria_personale_scolastico);
    }
    const dataB = [
            {
              name: "ospiti rsa",
              population: ospitiRsa,
              color: "#ffb037",
              legendFontColor: "#7F7F7F",
              legendFontSize: 15
            },
            {
                name: "sanitario",
                population: sanitari,
                color: "#f8f5f1",
                legendFontColor: "#7F7F7F",
                legendFontSize: 15
            },
            {
                name: "non sanitario",
                population: nonSanitari,
                color: "#e9896a",
                legendFontColor: "#7F7F7F",
                legendFontSize: 15
            },
            {
                name: "forze armate",
                population: forzeArmate,
                color: "#387c6d",
                legendFontColor: "#7F7F7F",
                legendFontSize: 15
            },
            {
                name: "scolastico",
                population: scolastico,
                color: "#C73E1D",
                legendFontColor: "#7F7F7F",
                legendFontSize: 15
            },
            {
                name: "over 80",
                population: over,
                color: "#B2DBBF",
                legendFontColor: "#7F7F7F",
                legendFontSize: 15
            },
            {
                name: "altro",
                population: altro,
                color: "#98ddca",
                legendFontColor: "#7F7F7F",
                legendFontSize: 15
            },
    ];
    //Data Bezier
    //Giorno attuale
    var result = [];
    for (var i=7; i>=1; i--) {
        var d = new Date(time);
        d.setDate(d.getDate() - i);
        result.push({date : d.toString().substr(0, 15), value : 0, secondaDose : 0});
    }
    for (let index = 0; index < bigdata.data.length; index++) {
        var tmp_date = new Date(bigdata.data[index].data_somministrazione);
        var tmp_string = tmp_date.toString().substr(0, 15);
        for (let i = 0; i < result.length; i++)
        {
            if (result[i].date == tmp_string)
            {
                result[i].value += bigdata.data[index].totale;
                result[i].secondaDose += bigdata.data[index].seconda_dose;
            }
        }
    }
    const dataBezier = {
        labels: [],
        datasets: [{
            data: []
        }]
    }
    var media = 0;
    var dose2 = 0;
    result.forEach((element) => {
        dataBezier.labels.push(element.date.substr(8,2) + "-" + element.date.substr(4,3));
        dataBezier.datasets[0].data.push(element.value);
        media += element.value;
        dose2 += element.secondaDose;
    });


    this.setState({
      time : time.substr(8,2) + "-" + time.substr(5,2) + "-" + time.substr(0,4),
      vaccinati: aux, 
      isLoaded: true,
      somministrazioni : somministrazioni,
      data: data.data,
      rawTime : time,
      bigdata: bigdata.data,
      region : dataregion,
      female : female,
      male : male,
      dataAge: dataAge,
      dataPie: dataB,
      dataBezier : dataBezier,
      mean : Math.round(media/7),
      second: Math.round(dose2/7)
    });
  }

  filterRegion(bigdata, region, str) {
    var data = null;
    var nomeArea = "";
    if (str == "TRE")
    {
      data = bigdata.filter((obj) => obj.area == "PAT" || obj.area == "PAB");
      nomeArea = "Trentino-Alto Adige";
    }
    else {
      data = bigdata.filter((obj) => obj.area == str);
      nomeArea = data[0].nome_area
    }
    var vaccinati = 0;
    var somministrazioni = 0;
    data.forEach((obj) => {
      somministrazioni += obj.prima_dose;
      vaccinati += obj.seconda_dose;
    });
    const abitantiRegione = {
      "ABR" : 1293941,
      "BAS" : 553254,
      "CAL" : 1894110,
      "CAM" : 5712143,
      "EMR" : 4464119,
      "FVG" : 1206216,
      "LAZ" : 5755700,
      "LIG" : 1524826,
      "LOM" : 10027602,
      "MAR" : 1512672,
      "MOL" : 300516,
      "PIE" : 4311217,
      "PUG" : 3953305	,
      "SAR" : 1611621	,
      "SIC" : 4875290,
      "TOS" : 3692555,
      "TRE" : 1078069	,
      "UMB" : 870165,
      "VDA" : 125034,
      "VEN" : 4879133
    }
    const obj = {
      nomeArea: nomeArea,
      vaccinati: vaccinati,
      somministrazioni: somministrazioni,
      abitanti: abitantiRegione[str]
    }
    return obj;
  }
  
  render() {
    if(!this.state.isLoaded)
      return(
        <View style={{alignItems: 'center', justifyContent: 'center', backgroundColor: '#171f24', height: Dimensions.get("window").height}}>
          <StatusBar backgroundColor="#1a2a34" style='light'/>
          <Text style={{
            color: "white",
            textAlignVertical:'bottom',
            fontSize: 28,
            paddingLeft: 10,
            fontWeight: 'bold'
          }}>Report Vaccini</Text>
          <ActivityIndicator style={{marginTop: 20}} size="large" color="#ffffff" />
          <Image source={require('./images/syringe.png')} style={{position: "absolute", bottom: 50, width: 50, height: 50}} resizeMode="contain"/>
        </View>
    )
    return (
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen name="Home" component={HomeScreen} initialParams={{
              somministrazioni : this.state.somministrazioni,
              vaccinati : this.state.vaccinati,
              time : this.state.time,
              rawTime : this.state.rawTime,
              female : this.state.female,
              male : this.state.male,
              mean: this.state.mean,
              second: this.state.second,
              dataAge: this.state.dataAge,
              dataBezier : this.state.dataBezier,
              dataPie: this.state.dataPie,
            }} />
          <Drawer.Screen name="Abruzzo" component={RegionScreen} initialParams={{data : this.filterRegion(this.state.bigdata, this.state.region, "ABR"), path: require("./images/regioni/abruzzo.png")}}/>
          <Drawer.Screen name="Basilicata" component={RegionScreen} initialParams={{data : this.filterRegion(this.state.bigdata, this.state.region, "BAS"), path: require("./images/regioni/basilicata.png")}}/>
          <Drawer.Screen name="Calabria" component={RegionScreen} initialParams={{data : this.filterRegion(this.state.bigdata, this.state.region, "CAL"), path: require("./images/regioni/calabria.png")}}/>
          <Drawer.Screen name="Campania" component={RegionScreen} initialParams={{data : this.filterRegion(this.state.bigdata, this.state.region, "CAM"), path: require("./images/regioni/campania.png")}}/>
          <Drawer.Screen name="Emilia-Romagna" component={RegionScreen} initialParams={{data : this.filterRegion(this.state.bigdata, this.state.region, "EMR"), path: require("./images/regioni/emilia.png")}}/>
          <Drawer.Screen name="Friuli Venezia Giulia" component={RegionScreen} initialParams={{data : this.filterRegion(this.state.bigdata, this.state.region, "FVG"), path: require("./images/regioni/friuli.png")}}/>
          <Drawer.Screen name="Lazio" component={RegionScreen} initialParams={{data : this.filterRegion(this.state.bigdata, this.state.region, "LAZ"), path: require("./images/regioni/lazio.png")}}/>
          <Drawer.Screen name="Liguria" component={RegionScreen} initialParams={{data : this.filterRegion(this.state.bigdata, this.state.region, "LIG"), path: require("./images/regioni/liguria.png")}}/>
          <Drawer.Screen name="Lombardia" component={RegionScreen} initialParams={{data : this.filterRegion(this.state.bigdata, this.state.region, "LOM"), path: require("./images/regioni/lombardia.png")}}/>
          <Drawer.Screen name="Marche" component={RegionScreen} initialParams={{data : this.filterRegion(this.state.bigdata, this.state.region, "MAR"), path: require("./images/regioni/marche.png")}}/>
          <Drawer.Screen name="Molise" component={RegionScreen} initialParams={{data : this.filterRegion(this.state.bigdata, this.state.region, "MOL"), path: require("./images/regioni/molise.png")}}/>
          <Drawer.Screen name="Piemonte" component={RegionScreen} initialParams={{data : this.filterRegion(this.state.bigdata, this.state.region, "PIE"), path: require("./images/regioni/piemonte.png")}}/>
          <Drawer.Screen name="Puglia" component={RegionScreen} initialParams={{data : this.filterRegion(this.state.bigdata, this.state.region, "PUG"), path: require("./images/regioni/puglia.png")}}/>
          <Drawer.Screen name="Sardegna" component={RegionScreen} initialParams={{data : this.filterRegion(this.state.bigdata, this.state.region, "SAR"), path: require("./images/regioni/sardegna.png")}}/>
          <Drawer.Screen name="Sicilia" component={RegionScreen} initialParams={{data : this.filterRegion(this.state.bigdata, this.state.region, "SIC"), path: require("./images/regioni/sicilia.png")}}/>
          <Drawer.Screen name="Toscana" component={RegionScreen} initialParams={{data : this.filterRegion(this.state.bigdata, this.state.region, "TOS"), path: require("./images/regioni/toscana.png")}}/>
          <Drawer.Screen name="Trentino-Alto Adige" component={RegionScreen} initialParams={{data : this.filterRegion(this.state.bigdata, this.state.region, "TRE"), path: require("./images/regioni/trentino.png")}}/>
          <Drawer.Screen name="Umbria" component={RegionScreen} initialParams={{data : this.filterRegion(this.state.bigdata, this.state.region, "UMB"), path: require("./images/regioni/lazio.png")}}/>
          <Drawer.Screen name="Valle d'Aosta" component={RegionScreen} initialParams={{data : this.filterRegion(this.state.bigdata, this.state.region, "VDA"), path: require("./images/regioni/valledaosta.png")}}/>
          <Drawer.Screen name="Veneto" component={RegionScreen} initialParams={{data : this.filterRegion(this.state.bigdata, this.state.region, "VEN"), path: require("./images/regioni/veneto.png")}}/>
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
}