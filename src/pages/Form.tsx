import React, {useState} from 'react';
import {View, TextInput, Button, Alert, Text} from 'react-native';
import * as Yup from 'yup';
import {ErrorMessage, Formik} from 'formik';
export default function Form() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //function handleSubmit() {
  //Alert.alert(JSON.stringify({email, password}));
  //}
  return (
    <View
      style={{alignItems: 'center', justifyContent: 'center', marginTop: 30}}>
      <Formik
        initialValues={{email: '', password: ''}}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .required('Campo necessário')
            .email('Email inválido'),
          password: Yup.string()
            .required('Campo necessário')
            .min(6, 'Minímo 6 caracteres'),
        })}
        onSubmit={(values) => Alert.alert(JSON.stringify(values))}>
        {({handleChange, handleBlur, handleSubmit, values}) => (
          <View>
            <TextInput
              style={{
                height: 40,
                width: 200,
                marginTop: 30,
                marginBottom: 30,
                borderColor: 'gray',
                borderWidth: 1,
              }}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
            />
            <Text style={{color: 'red'}}>
              <ErrorMessage name="email" />
            </Text>
            <TextInput
              style={{
                height: 40,
                width: 200,
                marginTop: 30,
                marginBottom: 30,
                borderColor: 'gray',
                borderWidth: 1,
              }}
              secureTextEntry
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
            />
            <Text style={{color: 'red'}}>
              <ErrorMessage name="password" />
            </Text>
            <Button onPress={handleSubmit} title="Submit" />
          </View>
        )}
      </Formik>
      {/*
      <View>
        <TextInput
          style={{
            height: 40,
            width: 200,
            marginTop: 30,
            marginBottom: 30,
            borderColor: 'gray',
            borderWidth: 1,
          }}
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
        <TextInput
          style={{
            height: 40,
            width: 200,
            marginTop: 30,
            marginBottom: 30,
            borderColor: 'gray',
            borderWidth: 1,
          }}
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
        <Button onPress={handleSubmit} title="Submit" />
      </View>
        */}
    </View>
  );
}
