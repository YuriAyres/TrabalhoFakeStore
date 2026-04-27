import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing } from '../styles/theme';

export default function InfoScreen() {
  return (
    <View style={styles.container}>
      
      <Text style={styles.title}>Equipe do Projeto</Text>

      <View style={styles.card}>
        <Text style={styles.name}>Yuri Ayres de Paula</Text>
        <Text style={styles.ra}>RA: 1134790</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.name}>Thaís Lodi Pinheiro</Text>
        <Text style={styles.ra}>RA: 1134874</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.name}>Thiago Corrêa Medeiros</Text>
        <Text style={styles.ra}>RA: 1134836</Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.large,
  },

  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.large,
    textAlign: 'center',
  },

  card: {
    backgroundColor: colors.white,
    padding: spacing.medium,
    borderRadius: 10,
    marginBottom: spacing.medium,
    elevation: 3,
  },

  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
  },

  ra: {
    fontSize: 14,
    color: colors.text,
    marginTop: 4,
  },
});