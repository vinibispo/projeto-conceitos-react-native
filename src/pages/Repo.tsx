/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {RouteProp, useRoute} from '@react-navigation/native';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import api from '../services/api';
type RootStackParamList = {
  Repo: {name: string; owner: string; image: string};
};
type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'Repo'>;
const Repo = () => {
  const [sizeOfCommits, setSizeOfCommits] = useState(0);
  // useState -> atribui uma variável no estado
  const {params} = useRoute<ProfileScreenRouteProp>();
  useEffect(() => {
    console.log(params);
  }, [params]);
  useEffect(() => {
    api
      .get(`repos/${params.owner}/${params.name}/commits`)
      .then((res) => setSizeOfCommits(res.data.length));
  }, [params.owner, params.name]);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Image
              source={{uri: params.image}}
              style={{width: 200, height: 200}}
            />
            <Text style={{fontSize: 16}}>{params.owner}</Text>
            <Text style={{fontSize: 32}}>Número de commits</Text>
            <Text style={{fontSize: 60}}>{sizeOfCommits}</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.white,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 36,
    fontWeight: '600',
    color: Colors.black,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  sectionButton: {
    fontSize: 30,
    fontWeight: '600',
    color: Colors.black,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default Repo;
