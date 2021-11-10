import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { theme } from '../common/color';
import { NEWS_API_KEY } from '../common/config';

export default function News() {

  const [category, setCategory] = useState('business');

  const getNews = async () => {
    await fetch(`https://newsapi.org/v2/top-headlines?country=kr&category=${category}&apiKey=${NEWS_API_KEY}`);
  }

  useEffect(() => {
    
  }, [category]);
 
  const onChangeCategory = e => {
    console.log(e);
  }


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onChangeCategory}>
          {/* <Text style={{ ...styles.btnText, color: working ? 'white' : theme.grey}}>Todo</Text> */}
          <Text style={{color: 'white'}} name='business' >경제</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          {/* <Text style={{ ...styles.btnText, color: !working ? 'white' : theme.grey}}>Travel</Text> */}
          <Text style={{color: 'white'}}>연예</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          {/* <Text style={{ ...styles.btnText, color: !working ? 'white' : theme.grey}}>Travel</Text> */}
          <Text style={{color: 'white'}}>건강</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          {/* <Text style={{ ...styles.btnText, color: !working ? 'white' : theme.grey}}>Travel</Text> */}
          <Text style={{color: 'white'}}>과학</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          {/* <Text style={{ ...styles.btnText, color: !working ? 'white' : theme.grey}}>Travel</Text> */}
          <Text style={{color: 'white'}}>스포츠</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          {/* <Text style={{ ...styles.btnText, color: !working ? 'white' : theme.grey}}>Travel</Text> */}
          <Text style={{color: 'white'}}>기술</Text>
        </TouchableOpacity>
      </View>
    </View>
  )

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#161B22',
  },
  header: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 10,
  },
});