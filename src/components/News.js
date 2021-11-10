import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity, ScrollView, Dimensions, ActivityIndicator, Image } from 'react-native';
import { theme } from '../common/color';
import { NEWS_API_KEY } from '../common/config';
import usePromise from '../common/usePromise';

const categories = [
  {
    name: 'all',
    text: '전체'
  },
  {
    name: 'business',
    text: '경제'
  },
  {
    name: 'entertainment',
    text: '연예'
  },
  {
    name: 'health',
    text: '건강'
  },
  {
    name: 'science',
    text: '과학'
  },
  {
    name: 'sports',
    text: '스포츠'
  },
  {
    name: 'technology',
    text: '기술'
  },
];

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function News() {

  const [currentCategory, setCurrentCategory] = useState('all');

  const [loading, response, error] = usePromise(() => {
    const query = currentCategory === 'all' ? '' : `&category=${currentCategory}`;
    return axios.get(
      `https://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=a0268e16656e44959deb0c2ad9ec3936`
    );
  }, [currentCategory]);
 
  const onChangeCategory = (category) => {
    setCurrentCategory(category);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {categories.map((category) =>
          <TouchableOpacity onPress={() => onChangeCategory(`${category.name}`)} key={category.name}>
            <Text style={{ ...styles.btnText, color: currentCategory === `${category.name}` ? 'white' : theme.grey }}>{category.text}</Text>
          </TouchableOpacity>
        )}
      </View>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContainer}
      >
        {loading ?
          <ActivityIndicator color='white' size='large' style={{ marginTop: 20 }} /> :
          response.data.articles.map(article => (
            <View key={article.url} style={styles.content}>
              {article.urlToImage && (
                <Image source={{ uri: `${article.urlToImage}` }}
                  style={{ width: 60, height: 60 }} />
              )}
              <View style={styles.titleContainer}>
                <Text style={styles.title}>{article.title}</Text>
              </View>
            </View>
          ))
        } 
      </ScrollView>
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
    paddingHorizontal: 15,
    marginVertical: 10
  },
  btnText: {
    fontSize: 18,
    fontWeight: '600',
  },
  scrollViewContainer: {
    width: SCREEN_WIDTH,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 20,
    marginVertical: 10
  },
  titleContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
  },
  title: {
    color: 'white',
    paddingHorizontal: 10
  }
});