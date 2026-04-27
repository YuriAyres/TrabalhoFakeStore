import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Image } from 'react-native';
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
    <View style={{ padding: 20 }}>
      <Image
        source={{ uri: product.image }}
        style={{ width: 200, height: 200 }}
      />
      <Text>{product.title}</Text>
      <Text>{product.category}</Text>
      <Text>{product.description}</Text>
      <Text>{formatPrice(product.price)}</Text>
    </View>
  );
}