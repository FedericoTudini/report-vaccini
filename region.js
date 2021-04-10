import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { ActivityIndicator, Modal, ScrollView, TouchableOpacity, Image, TouchableWithoutFeedback, StyleSheet, Text, View, Dimensions} from 'react-native';
import { useNavigation } from '@react-navigation/native';

class Region extends Component {
  constructor(props)
  {
    super(props);
  }

  render() 
  {
    const { navigation } = this.props;
    return (
        <View style={styles.container} >
            <Text style={{color: 'white', fontSize: 20}}>Ciaoooooprovaaaa</Text>
        </View>
    );
  }
}

export default function(props) {
    const navigation = useNavigation();
    return <Region {...props} navigation={navigation} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#171f24',
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
