import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Image, StyleSheet } from 'react-native';
import api from '../api/api';

export default function ProductDetailScreen({ route }) {
  const { id } = route.params;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  const formatPrice = (value) =>
    `R$ ${value.toFixed(2).replace('.', ',')}`;

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/products/${id}`);
      setProduct(res.data);
    } catch {
      console.log('Erro');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  if (loading) return <ActivityIndicator size="large" />;
  if (!product) return null;

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />

      <Text style={styles.title}>{product.title}</Text>

      <Text style={styles.category}>{product.category}</Text>

      <Text style={styles.description}>{product.description}</Text>

      <Text style={styles.price}>{formatPrice(product.price)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },

  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222', // cor do nome
    marginBottom: 10,
  },

  category: {
    fontWeight: 'bold',
    color: '#555', // cor diferente
    marginBottom: 5,
  },

  description: {
    color: '#555', // mesma cor da categoria
    marginBottom: 15,
  },

  price: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
});