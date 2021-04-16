import React, { Component } from 'react';
import { ActivityIndicator, StatusBar, Modal, ScrollView, TouchableOpacity, Image, TouchableWithoutFeedback, StyleSheet, Text, View, Dimensions} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import NumberFormat from 'react-number-format';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBars, faChevronLeft, faTimes } from '@fortawesome/free-solid-svg-icons';

class Region extends Component {
  constructor(props)
  {
    super(props);
  }
  /**
   *<TouchableOpacity>
      <FontAwesomeIcon icon={faBars} size={30} color={"white"} onPress={() => navigation.openDrawer()}/>
    </TouchableOpacity>
   * 
   */
  render() 
  {
    const { navigation, route } = this.props;
    const { data, path } = this.props.route.params;
    return (
      <View style={styles.container} >
        <StatusBar backgroundColor="#C14953" style='light'/>
        <View style={styles.topbar}>
          <TouchableOpacity style={{paddingRight: 20}}>
            <FontAwesomeIcon icon={faChevronLeft} size={30} color={"white"} onPress={() => navigation.goBack()}/>
          </TouchableOpacity>
          <TouchableOpacity >
            <FontAwesomeIcon icon={faBars} size={30} color={"white"} onPress={() => navigation.openDrawer()}/>
          </TouchableOpacity>
        </View>
        <View style={{...styles.topbar, ...{ marginTop: 0, paddingBottom: 5}}}>
          <Text style={{...styles.title, ...{fontSize: 40}}} numberOfLines={1}>{data.nomeArea}</Text>
        </View>
        <ScrollView  contentContainerStyle={{width: Dimensions.get("window").width, alignItems:'center'}}>
          <View style={styles.header}>
            <View style={{flex:1}}>
              <View style={{flex:1, flexDirection:'row', alignItems: "flex-end"}}>
                <Text style={{fontSize: 22, color: 'white', fontWeight: 'bold'}}>{data.abitanti}</Text>
                <Text style={{fontSize: 16, color: 'white'}}> abitanti</Text>
              </View>
              <View style={{flex:1, flexDirection:'row',alignItems: "flex-end"}}>
                <Text style={{fontSize: 22, color: 'white', fontWeight: 'bold'}}>{data.vaccinati}</Text>
                <Text style={{fontSize: 16, color: 'white'}}> vaccinati</Text>
              </View>
              <View style={{flex:1, flexDirection:'row', alignItems: "flex-end"}}>
                <Text style={{fontSize: 22, color: 'white', fontWeight: 'bold'}}>{data.somministrazioni}</Text>
                <Text style={{fontSize: 16, color: 'white'}}> somministrazioni</Text>
              </View>
            </View>
            <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
              <Image source={path} style={{height: 150 , width: undefined, aspectRatio: 1, opacity: 1}} resizeMode={"contain"}/>
            </View>
          </View>
          <View style={{width: Dimensions.get("window").width, height: Dimensions.get("window").height}}></View>
        </ScrollView>
      </View>
    );
  }
}

export default function(props) {
    const navigation = useNavigation();
    const route = useRoute();
    return <Region {...props} navigation={navigation} route={route}/>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#171f24',
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  header : {
    backgroundColor: "#C14953",
    justifyContent: 'space-between',
    width: Dimensions.get("window").width,
    height: 170,
    flexDirection: 'row',
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    paddingLeft : '5%',
    paddingRight: '5%',
    paddingBottom: '5%',
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: 'white'
  },
  topbar: {
    width: Dimensions.get("window").width,
    height: 50,
    marginTop: StatusBar.currentHeight,
    backgroundColor: "#C14953",
    paddingLeft : '5%',
    paddingRight: '5%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  subtitle: {
    width: "40%",
    alignItems: 'flex-start',
    backgroundColor: 'orange',
    margin: 10,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3
  },
  txt: {
    fontSize: 22,
    fontWeight:"bold",
    color: 'white'
  }
});
