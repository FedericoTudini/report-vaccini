import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { ActivityIndicator, Dimensions, StyleSheet, Text, View } from 'react-native';
import {
    PieChart
  } from "react-native-chart-kit";
import { useNavigation, useRoute } from '@react-navigation/native';


class Pie extends Component {
    constructor(props)
    {
        super(props);
        this.names = this.names.bind(this);
    }
    names() {
        return this.props.data.map((category) =>  {
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
                    <View style={{paddingLeft: 10}}><Text style={{color: 'white'}} numberOfLines={1}>{Math.round(category.population * 100 / this.props.totale)+ "% " + category.name}</Text></View>
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
                        data={this.props.data}
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

export default function(props) {
    const navigation = useNavigation();
    const route = useRoute();
    return <Pie {...props} navigation={navigation} route={route}/>;
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