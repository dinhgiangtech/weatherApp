/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  TextInput,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const App = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [temp, setTemp] = useState('');
  const [city, setCity] = useState('Hanoi');
  const [name, setName] = useState('');
  const [icon, setIcon] = useState('');
  const [desc, setDesc] = useState('');
  const [main, setMain] = useState('');
  const [humidity, setHumidity] = useState('');
  const [pressure, setPressure] = useState('');
  const [visibility, setVisibility] = useState('');
  
  const fetchWeather = () => {
    const fetch = require('node-fetch');

    fetch(
      'http://api.openweathermap.org/data/2.5/weather?q=' +
        city +
        '&appid=f38230d9232f45a40a77cc8adef9e40b',
    )
      .then(response => response.json())
      .then(json => {
        setData(json),
          setTemp((json.main.temp - 273.35).toFixed(2) + ' C'),
          setIcon(json.weather[0].icon),
          setDesc(json.weather[0].description),
          setMain(json.weather[0].main),
          setHumidity(json.main.humidity),
          setPressure(json.main.pressure),
          setName(json.name),
          setVisibility((json.main.temp - 273.35).toFixed(2) + ' C');
      })
      .catch(error => Alert(console.error()));
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    <SafeAreaView>
      <KeyboardAvoidingView behavior="height" style={styles.container}>
        
          <ImageBackground
            style={styles.imgBG}
            source={require('./src/img/pexels-photo-1921336.jpeg')}>
            <View style={styles.searchView}>
              <TextInput
                placeholder="Search"
                placeholderTextColor="#fff"
                style={styles.search_box}
                onChangeText={text => setCity(text)}
              />
              <TouchableOpacity
                onPress={fetchWeather}
                style={styles.button_touch}>
                <Text>Search</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.weather_box_main}>
              <View style={styles.weather_holder_view}>
                <Image
                  tintColor="#FFF"
                  source={{
                    uri: 'http://openweathermap.org/img/wn/' + icon + '@2x.png',
                  }}
                  style={styles.Weather_Image}
                />
                <View>
                  <Text style={styles.temprature_text}>{temp}</Text>
                  <Text style={styles.city_text}>{name}</Text>
                </View>
              </View>
            </View>
            <View style={styles.Info_Box_View}>
              <View style={styles.Info_Holder_Veiw}>
                <Text style={styles.Main_Weather_Text}>{main}</Text>
                <Text style={styles.description_text}>{desc}</Text>
                <Text style={styles.humidity_text}>Humidity : {humidity}</Text>
                <Text style={styles.other_text}>Pressure : {pressure}</Text>
                <Text style={styles.other_text}>Visibility : {visibility}</Text>
              </View>
            </View>
          </ImageBackground>
        
      </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  imgBG: {
    width: '100%',
    height: '100%',
  },
  searchView: {
    height: '10%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  search_box: {
    height: '85%',
    width: '80%',
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 15,
    color: '#fff',
    paddingHorizontal: 15,
  },
  button_touch: {
    marginLeft: '5%',
    height: '35%',
    width: '8%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  weather_box_main: {
    height: '30%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  weather_holder_view: {
    height: '80%',
    width: '90%',
    borderRadius: 15,
    backgroundColor: 'rgba(255,255,255,0.3)',
    alignItems: 'center',
    flexDirection: 'row',
  },
  Weather_Image: {
    height: '80%',
    width: '50%',
  },
  temprature_text: {
    fontSize: 30,
    color: '#FFF',
    marginLeft: '5%',
  },
  city_text: {
    fontSize: 20,
    color: '#FFF',
    marginLeft: '5%',
    marginTop: '3%',
  },
  Info_Box_View: {
    height: '60%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Info_Holder_Veiw: {
    margin: 10,
    height: '80%',
    width: '90%',
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    borderRadius: 15,
  },
  Main_Weather_Text: {
    fontSize: 28,
    color: '#464646',
    marginLeft: '8%',
    marginTop: '8%',
    fontWeight: 'bold',
  },
  description_text: {
    fontSize: 20,
    color: '#121212',
    marginLeft: '8%',
    marginTop: '3%',
  },
  humidity_text: {
    fontSize: 18,
    color: '#121212',
    marginLeft: '8%',
    marginTop: '5%',
  },
  other_text: {
    fontSize: 18,
    color: '#121212',
    marginLeft: '15%',
    marginTop: '2%',
  },
});

export default App;
