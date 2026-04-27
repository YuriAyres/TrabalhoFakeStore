import React from 'react';
import { View, Text } from 'react-native';

export default function InfoScreen() {
  return (
    <View style={{ padding: 20 }}>
      <Text>Integrantes do Grupo:</Text>

      <Text>Nome: Yuri Ayres de Paula</Text>
      <Text>RA: 1134790</Text>

      <Text>Nome: Thaís Lodi Pinheiro</Text>
      <Text>RA: 1133333</Text>

      <Text>Nome: Thiago Correia Medeiros</Text>
      <Text>RA: 1133333</Text>
    </View>
  );
}