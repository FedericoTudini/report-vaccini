import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { ActivityIndicator, ScrollView, Dimensions, StyleSheet, Text, View } from 'react-native';
import {
    BarChart
  } from "react-native-chart-kit";


export default class Bar extends Component {
    constructor(props)
    {
        super(props);
        const data = {
            labels: [],
            datasets: [
              {
                data: []
              }
            ]
          };
        for (let index = this.props.data.length - 1; index >= 0; index--) {
            data.labels.push(this.props.data[index].fascia_anagrafica);
            data.datasets[0].data.push(this.props.data[index].totale);
        }
        this.state = {
            data : data
        }
    }
    render() {
        const chartConfig = {
            backgroundGradientFrom: "#ffffff",
            backgroundGradientFromOpacity: 0,
            backgroundGradientTo: "#ffffff",
            backgroundGradientToOpacity: 0,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            strokeWidth: 2, // optional, default 3
            barPercentage: 0.5,
            useShadowColorFromDataset: false, // optional
        };
        return (
            <View style={styles.box}>
                <View style={{marginBottom: 10}}>
                    <Text  style={{fontWeight:"200", color: 'white', fontSize: 23}}>somministrazioni per età</Text>
                </View>
                <ScrollView  horizontal={true}>
                    <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                    <BarChart
                        style={chartConfig}
                        data={this.state.data}
                        width={600}
                        height={250}
                        chartConfig={chartConfig}
                        showValuesOnTopOfBars
                        withHorizontalLabels={false}
                    />
                    </View>
                </ScrollView>
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
  });