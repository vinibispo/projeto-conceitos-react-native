import produce from 'immer';
import React, {useEffect, useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import {
//uniqueNamesGenerator,
//Config,
//names,
//starWars,
//} from 'unique-names-generator';
//const config: Config = {
//dictionaries: [names],
//};
//const configEmail: Config = {
//dictionaries: [starWars],
//};
//export default function Imutabilidade() {
//const [user, setUser] = useState({name: '', email: '', password: ''});
//function handleRandomName() {
//setUser((usr) =>
//produce(usr, (draft) => {
//draft.name = uniqueNamesGenerator(config);
//draft.email = uniqueNamesGenerator(configEmail);
//}),
//);
//}
//return (
//<View style={{alignItems: 'center', justifyContent: 'center'}}>
//<Text style={{fontSize: 30}}>{user.name || 'Indefinido'}</Text>
//<Text style={{fontSize: 20}}>{user.email || 'Indefinido'}</Text>
//<Text style={{fontSize: 10}}>{user.password || 'Indefinido'}</Text>
//<TouchableOpacity onPress={handleRandomName}>
//<Text style={{fontSize: 20}}>Clique aqui</Text>
//</TouchableOpacity>
//</View>
//);
//}
//
export default function Imutabilidade() {
  const [list, setList] = useState<string[]>([]);
  const [name, setName] = useState('');
  async function storeData(object: any) {
    const stringifiedData = JSON.stringify(object);
    try {
      await AsyncStorage.setItem('@AwesomeProject/items', stringifiedData);
    } catch (err) {
      console.log(err);
    }
  }
  function addItemToList(item: string) {
    setList((l) =>
      produce(l, (draft) => {
        draft.push(item);
        storeData([...l, item]);
      }),
    );
    setName('');
  }
  useEffect(() => {
    AsyncStorage.getItem('@AwesomeProject/items').then((value) => {
      if (value) {
        setList(JSON.parse(value));
      }
    });
  }, []);
  return (
    <View
      style={{alignItems: 'center', justifyContent: 'center', marginTop: 30}}>
      <TextInput
        style={{
          height: 40,
          width: 200,
          marginTop: 30,
          marginBottom: 30,
          borderColor: 'gray',
          borderWidth: 1,
        }}
        onChangeText={(t) => setName(t)}
        value={name}
      />
      <TouchableOpacity onPress={() => addItemToList(name)}>
        <Text style={{fontSize: 20}}>Adicionar item</Text>
      </TouchableOpacity>
      <View
        style={{
          backgroundColor: 'white',
          width: 200,
          minHeight: 400,
          marginTop: 10,
          alignItems: 'center',
        }}>
        {list.map((item, index) => (
          <Text key={index.toString()} style={{fontSize: 20}}>
            {item}
          </Text>
        ))}
      </View>
    </View>
  );
}
