import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { ActivityIndicator, Dimensions, StyleSheet, Text, View } from 'react-native';
import {
    PieChart
  } from "react-native-chart-kit";


export default class Pie extends Component {
    constructor(props)
    {
        super(props);
        let ospitiRsa, sanitari, nonSanitari, over, scolastico, forzeArmate, altro;
        ospitiRsa = sanitari = nonSanitari = over = scolastico = forzeArmate = altro = 0;
        for (let index = 0; index < this.props.data.length; index++) {
            ospitiRsa += (this.props.data[index].categoria_ospiti_rsa);
            sanitari += (this.props.data[index].categoria_operatori_sanitari_sociosanitari);
            nonSanitari += (this.props.data[index].categoria_personale_non_sanitario);
            forzeArmate += (this.props.data[index].categoria_forze_armate);
            altro += (this.props.data[index].categoria_altro);
            over += (this.props.data[index].categoria_over80);
            scolastico += (this.props.data[index].categoria_personale_scolastico);
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
        this.state = {
            data : dataB,
            totale : this.props.totale
        }
        this.names = this.names.bind(this);
    }
    names() {
        return this.state.data.map((category) =>  {
            return(
                <View key={category.color} style={{width: "100%", justifyContent:"flex-start", flexDirection: 'row', alignItems: "center"}}>
                    <View style={{
                        width: 20,
                        height: 20,
                        flexDirection: 'row',
                        alignItems: "center",
                        borderRadius: 20,
                        backgroundColor: category.color
                    }}></View>
                    <View style={{paddingLeft: 10}}><Text style={{color: 'white'}}numberOfLines={1}>{Math.round(category.population * 100 / this.state.totale)+ "% " + category.name}</Text></View>
                </View>
            )   
        })
    }
    render() {
        const chartConfig = {
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            strokeWidth: 1, // optional, default 3
            barPercentage: 0.5,
            useShadowColorFromDataset: false // optional
        };
        return (
            <View style={styles.box}>
                <View style={{marginBottom: 10}}>
                    <Text  style={{fontWeight:"200", color: 'white', fontSize: 23}}>somministrazioni per categoria</Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <PieChart
                        data={this.state.data}
                        width={150}
                        height={150}
                        chartConfig={chartConfig}
                        accessor={"population"}
                        backgroundColor={"transparent"}
                        paddingLeft={"10"}
                        center={[30, 0]}
                        hasLegend = {false}
                        absolute
                    />
                    <View style={styles.sideBox}>
                        {this.names()}
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    box: {
      width: Dimensions.get("window").width / 100 * 90, 
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
      shadowRadius: 3.84,
    },
    ball: {
        width: 30,
        height: 30,
        flexDirection: 'row',
        alignItems: "center",  
        borderRadius: 20,
        backgroundColor: "red"
    },
    sideBox: {
        width: 150,
        backgroundColor: "#203a4c",
        elevation: 1,
        borderRadius: 15,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.84,
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 10
      }
  });