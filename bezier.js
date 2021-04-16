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
                            data={this.props.data}
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
                <Text  style={{fontWeight:"200", color: 'white', fontSize: 12}}>+{this.props.mean} somministrazioni al giorno</Text>
                <Text  style={{fontWeight:"200", color: 'white', fontSize: 12}}>+{this.props.second} nuovi vaccinati al giorno</Text>
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