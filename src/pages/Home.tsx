/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import axios from 'axios';
import React, {useCallback, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import Repo from '../components/Repo';
import api from '../services/api';
import {Repository} from '../utils/types';

const Home = () => {
  // useState -> atribui uma variável no estado
  const [repoInfo, setRepoInfo] = useState<Repository[]>([]);
  const [search, setSearch] = useState('');

  const loadRepositories = useCallback(() => {
    if (search.trim()) {
      api.get(`users/${search}/repos`).then((res) => {
        console.log(res.data);
        return setRepoInfo(res.data);
      });
    }
  }, [search]);
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={styles.sectionContainer}>
            <TextInput
              style={{borderWidth: 1, padding: 25, borderColor: 'black'}}
              value={search}
              onChangeText={(text) => setSearch(text)}
            />
            <TouchableOpacity
              style={{borderWidth: 1, padding: 25, borderColor: 'black'}}
              onPress={loadRepositories}>
              <Text style={{fontSize: 20}}>Clique em mim</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.body}>
            {repoInfo.length ? (
              repoInfo.map((repo) => <Repo key={repo.id} repo={repo} />)
            ) : (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 20,
                }}>
                <ActivityIndicator size="large" color="#0000ff" />
              </View>
            )}
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

export default Home;
