import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getStatusBarHeight } from "react-native-status-bar-height";
import {
  Fontisto,
  FontAwesome,
  Feather,
  SimpleLineIcons,
  MaterialCommunityIcons
} from '@expo/vector-icons';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import moment from 'moment';
import 'moment/locale/ko'

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const API_KEY = 'faaaddda964c72c3f28ac3f09fd4e83d';

const icons = {
  Clouds: 'cloudy',
  Clear: 'day-sunny',
  Atmosphere: 'cloudy-gusts',
  Snow: 'snow',
  Rain: 'rains',
  Drizzle: 'rain',
  Thunderstorm: 'lightning',
};

export default function Weather() {
  const [city, setCity] = useState('Loading...');
  const [days, setDays] = useState([]);
  const [ok, setOk] = useState(true);
  const [helper, setHelper] = useState(true);
  const [modalVisible, setModalVisible] = useState(true);

  const getWeather = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) {
      setOk(false);
    }
    const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync({ accuracy: 5 });
    const location = await Location.reverseGeocodeAsync(
      { latitude, longitude },
      { useGoogleMaps: false }
    );

    setCity(location[0].city);

    // const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alert&appid=${API_KEY}&units=metric`);
    // const json = await response.json();
    // setDays(json.daily);
    // console.log(json.daily);
  }

  useEffect(() => {
    moment.locale('ko');
    getWeather();
  }, []);

  const saveHelper = () => {

  }

  const windDirection = (deg) => {

    let result;

    if (deg < 90)
      result = { text: '북동풍', rotate: 180 };
    else if (deg === 90)
      result = { text: '동풍', rotate: 225 };
    else if (deg > 90 && deg < 180)
      result = { text: '남동풍', rotate: 270 };
    else if(deg === 180)
      result = { text: '남풍', rotate: 315 };
    else if(deg > 180 && deg < 270)
      result = { text: '남서풍', rotate: 0 };
    else if (deg === 270)
      result = { text: '서풍', rotate: 45 };
    else if (deg > 270 && deg < 360)
      result = { text: '북서풍', rotate: 90 };
    else if(deg === 360)
      result = { text: '북풍', rotate: 135 };  

    return result;
  }

  const ultraViolet = (uvi) => {
    let result;
    if (uvi < 3)
      result = '매우 낮음'
    else if (uvi < 5)
      result = '낮음'
    else if (uvi < 7)
      result = '보통'
    else if (uvi < 9)
      result = '강함'
    else
      result = '매우 강함'

    return result;
  }

  return (
    <View style={styles.container}>
      <StatusBar style='light' />
      <View style={{height:getStatusBarHeight()}}></View>
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
      </View>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.weather}
      >
        {/* {helper ? 
          <Modal>
            <View style={{ flex: 1 }}>
              <Text>I am the modal content!</Text>
            </View>
          </Modal> : null
        } */}
        {
          days.length === 0 ?
            (<View style={{ ...styles.day, alignItems: 'center', justifyContent:'center' }}>
              <ActivityIndicator color='white' size='large' style={{ marginTop: 20 }}/>
            </View>) :
            (
              days.map((day, index) => 
                <View key={index} style={styles.day}>
                  <View style={styles.shortly}>
                    <Text style={styles.tinyText}>{moment(day.dt * 1000).format('MMMM Do dddd')}</Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: "center",
                        width: "100%",
                        justifyContent: 'space-between'
                      }}
                    >
                      <Text style={styles.temp}>
                        {parseFloat(day.temp.day).toFixed(1)}
                        <Text style={styles.tempDetail}>°C</Text>
                      </Text>
                      <Fontisto
                          name={icons[day.weather[0].main]}
                          size={68}
                          color="white"
                          style={{alignItems: 'center'}}
                        />
                    </View>
                    <Text style={styles.description}>{day.weather[0].main}</Text>
                  </View>
                  <ScrollView style={{flex: 0.2}}>
                    <View style={styles.shortly}>
                      <Text style={styles.tinyText}>최고 / 최저</Text>
                      <View style={styles.details}>
                        <FontAwesome style={styles.tinyIcon} name="long-arrow-up" size={28} color="red" />
                        <Text style={styles.detailsText}>
                          {parseFloat(day.temp.max).toFixed(1)}°C
                        </Text>
                        <FontAwesome style={styles.tinyIcon} name="long-arrow-down" size={28} color="#46bcf3" />
                        <Text style={styles.detailsText}>
                          {parseFloat(day.temp.min).toFixed(1)}°C
                        </Text>
                      </View>
                    </View>
                    <View style={styles.shortly}>
                      <Text style={styles.tinyText}>일출 / 일몰</Text>
                      <View style={styles.details}>
                        <Feather style={styles.tinyIcon} name="sunrise" size={28} color="white" /> 
                        <Text style={styles.detailsText}>
                          {moment(day.sunrise * 1000).format('HH:mm')}
                        </Text>
                        <MaterialCommunityIcons style={styles.tinyIcon} name="weather-sunset" size={28} color="white" /> 
                        <Text style={styles.detailsText}>
                          {moment(day.sunset * 1000).format('HH:mm')}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.shortly}>
                      <Text style={styles.tinyText}>풍향 / 풍속</Text>
                      <View style={styles.details}>
                        <FontAwesome style={{ ...styles.tinyIcon, transform: [{rotate: `${windDirection(day.wind_deg).rotate}deg`}] }} name="location-arrow" size={28} color="white" />
                          <Text style={styles.detailsText}>
                            {windDirection(day.wind_deg).text}
                          </Text>
                        <Feather style={styles.tinyIcon} name="wind" size={28} color="white" />
                        <Text style={styles.detailsText}>
                          {day.wind_speed}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.shortly}>
                      <Text style={styles.tinyText}>습도</Text>
                      <View style={{ ...styles.details, width:'50%' }}>
                        <SimpleLineIcons style={styles.tinyIcon} name="drop" size={28} color="white" />
                        <Text style={styles.detailsText}>
                          {day.humidity}%
                        </Text>
                      </View>
                    </View>
                    <View style={styles.shortly}>
                      <Text style={styles.tinyText}>자외선지수</Text>
                      <View style={{ ...styles.details, width:'50%' }}>
                        <MaterialCommunityIcons style={styles.tinyIcon} name="weather-sunny-alert" size={28} color="white" />
                        <Text style={styles.detailsText}>
                          {ultraViolet(day.uvi)}
                        </Text>
                      </View>
                    </View>
                  </ScrollView>
                </View>
              )
            )
        }
      </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#161B22',
  },
  city: {
    flex: 0.5,
    flexDirection:'row',
    justifyContent: "center",
    alignItems: 'center',
  },
  cityName: {
    fontSize: 58,
    fontWeight: "500",
    color: "white",
  },
  weather: {
  },
  day: {
    flex: 0.5,
    width: SCREEN_WIDTH,
    paddingHorizontal: 20,
  },
  shortly: {
    backgroundColor: '#ffffff6a',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 10
  },
  temp: {
    marginTop: 10,
    fontWeight: "600",
    fontSize: 82,
    color: "white",
  },
  tempDetail: {
    fontSize: 25,
  },
  description: {
    // marginTop: 10,
    fontSize: 30,
    color: "white",
    fontWeight: "500",
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  tinyText: {
    fontSize: 25,
    color: "white",
    fontWeight: "500",
  },
  tinyIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8
  },
  detailsText: {
    fontSize: 34,
    color: 'white'
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    minWidth: 200,
    maxWidth: 220,
    // paddingVertical: 30,
    paddingHorizontal: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    marginHorizontal: 10,
    elevation: 2
  },
  buttonDelete: {
    backgroundColor: '#DF2525',
  },
  buttonClose: {
    backgroundColor: '#2196F3'
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  modalText: {
    marginBottom: 15,
    fontSize: 25,
    textAlign: 'center'
  }
});
