import React, { useState } from 'react';
import { View, TextInput, Image, Text, ActivityIndicator } from 'react-native';
import api from '../api/api';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { colors, spacing } from '../styles/theme';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError('');

      const users = await api.get('/users');

      const userExists = users.data.find(
        (u) => u.username === username && u.password === password
      );

      if (!userExists) {
        setError('Usuário ou senha inválidos');
        return;
      }

      await api.post('/auth/login', { username, password });

      navigation.replace('Home');
    } catch (err) {
      setError('Erro ao conectar com a API');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>

  <Image
      source={require('../assets/favicon.png')}
      style={styles.logo}
    />

  <TextInput
    placeholder="Username"
    style={styles.input}
    onChangeText={setUsername}
  />

  <TextInput
    placeholder="Password"
    secureTextEntry
    style={styles.input}
    onChangeText={setPassword}
  />

  {loading ? (
    <ActivityIndicator color={colors.primary} />
  ) : (
    <TouchableOpacity style={styles.button} onPress={handleLogin}>
      <Text style={styles.buttonText}>Login</Text>
    </TouchableOpacity>
  )}

  {error ? <Text style={styles.error}>{error}</Text> : null}
</View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    padding: spacing.large,
  },

  input: {
    backgroundColor: colors.white,
    padding: spacing.medium,
    marginBottom: spacing.medium,
    borderRadius: 8,
  },

  button: {
    backgroundColor: colors.primary,
    padding: spacing.medium,
    borderRadius: 8,
    alignItems: 'center',
  },

  buttonText: {
    color: colors.white,
    fontWeight: 'bold',
  },

  error: {
    color: colors.danger,
    marginTop: spacing.small,
    textAlign: 'center',
  },
  
  logo: {
  width: 120,
  height: 120,
  alignSelf: 'center',
  marginBottom: 30,
  resizeMode: 'contain',
},
});
