import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { ActivityIndicator, Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import {
    LineChart
  } from "react-native-chart-kit";


export default class Pie extends Component {
    constructor(props)
    {
        super(props);
        //Giorno attuale
        var result = [];
        for (var i=7; i>=1; i--) {
            var d = new Date(this.props.time);
            d.setDate(d.getDate() - i);
            result.push({date : d.toString().substr(0, 15), value : 0, secondaDose : 0});
        }
        for (let index = 0; index < this.props.data.length; index++) {
            var tmp_date = new Date(this.props.data[index].data_somministrazione);
            var tmp_string = tmp_date.toString().substr(0, 15);
            for (let i = 0; i < result.length; i++)
            {
                if (result[i].date == tmp_string)
                {
                    result[i].value += this.props.data[index].totale;
                    result[i].secondaDose += this.props.data[index].seconda_dose;
                }
            }
        }
        const data = {
            labels: [],
            datasets: [{
                data: []
            }]
        }
        var media = 0;
        var dose2 = 0;
        result.forEach(element => {
            data.labels.push(element.date.substr(8,2) + "-" + element.date.substr(4,3));
            data.datasets[0].data.push(element.value);
            media += element.value;
            dose2 += element.secondaDose;
        });
        this.state = {
            data : data,
            mean : Math.round(media/7),
            seconde: Math.round(dose2/7)
        }
        
    }
    render() {
        const chartConfig = {
            backgroundGradientFrom: "#ffffff",
            backgroundGradientFromOpacity: 0,
            backgroundGradientTo: "#ffffff",
            backgroundGradientToOpacity: 0,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            strokeWidth: 1, // optional, default 3
            decimalPlaces: 0,
            useShadowColorFromDataset: false, // optional
        };
        return (
        <View style={styles.box}>
            <View style={{marginBottom: 15}}>
                <Text  style={{fontWeight:"200", color: 'white', fontSize: 22}}>somministrazioni giornaliere</Text>
                <Text  style={{fontWeight:"200", color: 'white', fontSize: 15}}>ultimi 7 giorni</Text>
            </View>
            <ScrollView  horizontal={true}>
                <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                    <ScrollView >
                        <LineChart
                            data={this.state.data}
                            width={450}
                            height={220}
                            chartConfig={chartConfig}
                            bezier
                        />
                    </ScrollView>
                </View>
            </ScrollView>
            <View style={{marginTop: 10}}>
                <Text  style={{fontWeight:"200", color: 'white', fontSize: 15}}>media ultimi 7 giorni:</Text>
                <Text  style={{fontWeight:"200", color: 'white', fontSize: 12}}>{this.state.mean} somministrazioni al giorno</Text>
                <Text  style={{fontWeight:"200", color: 'white', fontSize: 12}}>+{this.state.seconde} vaccinati al giorno</Text>
            </View>
        </View>
        );
    }
}

const styles = StyleSheet.create({
    box: {
      width: Dimensions.get("window").width / 100 * 90, 
      backgroundColor: "#C14953",
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
      alignItems: 'flex-start',
      justifyContent: 'center'
    }
  });