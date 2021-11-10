import React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';

export default function Info() {

  return (
    <View style={styles.container}>
      <View style={styles.infoTitle}>
        <Text style={styles.infoTitleText}>Weather & Todo</Text>
      </View>
      <View style={styles.infoDesc}>
        <Text style={styles.infoDescText}></Text>
        <Text style={styles.infoDescText}>경성대학교 소프트웨어학과</Text>
        <Text style={styles.infoDescText}>2015742054 박철오</Text>
        <Text style={styles.infoDescText}>모바일웹프로그래밍</Text>

        <Text style={styles.infoDescText}>날씨 API : OpenWeather</Text>
      </View>
      <View style={styles.copy}>
        <Text style={styles.copyright}>2021 &copy; 박철오</Text>
      </View>
    </View>
  )

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#161B22',
  },
  infoTitle: {
    flex: 1,
    flexDirection:'row',
    justifyContent: "center",
    alignItems: 'center',
  },
  infoDesc: {
    flex: 3,
    // backgroundColor:'tomato',
    justifyContent: "center",
    alignItems: 'center',
  },
  infoTitleText: {
    color: 'white',
    fontSize: 48,
  },
  infoDescText: {
    color: 'white',
    fontSize: 28,
    fontWeight: '500'
  },
  copy: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical:20,
  },
  copyright: {
    color: 'white',
  }
});