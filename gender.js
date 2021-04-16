import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { ActivityIndicator, Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import NumberFormat from 'react-number-format';

export default class Gender extends Component {
    constructor(props)
    {
        super(props);
    }
    render() {
        return(
            <View style={styles.container}>
                <View style={styles.card}>
                    <Image source={require("./images/M.png")} style={{width: 100, height: 100}} resizeMode="contain"/>
                    <NumberFormat thousandSeparator={true} displayType={'text'} value={this.props.male}  renderText={formattedValue => <Text numberOfLines={1} style={styles.num}>{formattedValue}</Text>}/>
                </View>
                <View style={styles.card}>
                    <Image source={require("./images/F.png")} style={{width: 100, height: 100}} resizeMode="contain"/>
                    <NumberFormat thousandSeparator={true} displayType={'text'} value={this.props.female} renderText={formattedValue => <Text numberOfLines={1} style={styles.num}>{formattedValue}</Text>}/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      width: Dimensions.get("window").width / 100 * 90, 
      padding: 15,
      marginBottom: 15,
      flexDirection: 'row',
      justifyContent: "space-between"
    },
    card: {
        height: 180,
        width: "45%",
        alignItems: 'center',
        backgroundColor: "#eeeeee",
        borderRadius: 30,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 3,
        justifyContent: 'space-evenly'
    },
    num: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#171f24"
    }
});