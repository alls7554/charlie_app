import React, { useRef, useState } from 'react';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Animated, Button, Image, ScrollView, Text, View, StyleSheet, Dimensions, } from 'react-native';


const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function Helper() {

  const HELPER_KEY = '@helper';

  const [visible, setVisible] = useState(true);

  const scrollX = useRef(new Animated.Value(0)).current;
  const helperSource = new Array(
    <Image source={require('../../assets/helper_1.gif')} style={styles.helper} />,
    <Image source={require('../../assets/helper_2.gif')} style={styles.helper} />,
  );

  const neverViewModal = async () => {
    setVisible(false);
    await AsyncStorage.setItem(HELPER_KEY, JSON.stringify(false));
  }

  const closeModal = () => {
    setVisible(false);
  }

  return (
    <Modal
      isVisible={visible}
      scrollHorizontal
      propagateSwipe
      style={styles.centeredView}
    >
      <View style={styles.modalView}>
        <Text style={{fontSize: 28, textAlign:'center', fontWeight: '600'}}>사용법</Text>
        <ScrollView
          horizontal={true}
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event([
            {
              nativeEvent: {
                contentOffset: {
                  x: scrollX
                }
              }
            }
          ], {useNativeDriver: false})}
          scrollEventThrottle={1}
        >
          {helperSource.map((source, sourceKey) => {
            return (
              <View style={styles.modalInnerView} key={sourceKey}>
                {source}
              </View>
            );
          })}
        </ScrollView>
        <View style={styles.indicatorContainer}>
          {helperSource.map((source, imageIndex) => {
            const width = scrollX.interpolate({
              inputRange: [
               SCREEN_WIDTH * (imageIndex - 1),
               SCREEN_WIDTH * imageIndex,
               SCREEN_WIDTH * (imageIndex + 1)
              ],
              outputRange: [8, 16, 8],
              extrapolate: "clamp"
            });
            return (
              <Animated.View
                key={imageIndex}
                style={[styles.normalDot, { width }]}
              />
            );
          })}
        </View>
        <View style={styles.modalBottomView}>
          <Button title="다시 보지 않기" onPress={neverViewModal} />
          <Button title="닫기" onPress={closeModal} />
        </View>
      </View>
    </Modal>
  )
}


const styles = StyleSheet.create({
  centeredView: {
    top: 0,
    left: SCREEN_WIDTH > 768 ? (SCREEN_WIDTH/2)-(500/2) : 0,
    right: 0,
    padding: 10,
    margin: 0,
    marginHorizontal: 0,
    width: SCREEN_WIDTH > 768 ? 500 : '100%',
    justifyContent: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    flex: 0.5,
    paddingVertical: 20,
    paddingHorizontal: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalInnerView: {
    width: SCREEN_WIDTH > 768 ? 460 :SCREEN_WIDTH-40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalBottomView: {
    width: SCREEN_WIDTH > 768 ? 460 :SCREEN_WIDTH-40,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  helper: {
    flex: 1,
    width: 130,
    height: null,
    resizeMode: 'contain'
  },
  normalDot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: '#007AFF',
    marginHorizontal: 4
  },
  indicatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  }
})

