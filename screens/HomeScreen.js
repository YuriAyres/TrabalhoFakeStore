import React, { useEffect, useState, useLayoutEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Button,
  Image,
  TouchableOpacity,
} from 'react-native';
import api from '../api/api';

export default function HomeScreen({ navigation }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const formatPrice = (value) =>
    `R$ ${value.toFixed(2).replace('.', ',')}`;

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await api.get('/products');
      setProducts(res.data);
    } catch {
      console.log('Erro');
    } finally {
      setLoading(false);
    }
  };

  const fetchByCategory = async (category) => {
    try {
      setLoading(true);

      if (!category) {
        fetchProducts();
        return;
      }

      const res = await api.get(`/products/category/${category}`);
      setProducts(res.data);
    } catch {
      console.log('Erro');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Button title="Logout" onPress={() => navigation.replace('Login')} />
      ),
      headerTitle: 'Produtos',
      headerRight: () => (
        <Button title="Info" onPress={() => navigation.navigate('Info')} />
      ),
    });
  }, []);

  if (loading) return <ActivityIndicator size="large" />;

  return (
    <View>
      {/* Filtros */}
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        <Button title="Todos" onPress={() => fetchByCategory()} />
        <Button title="Electronics" onPress={() => fetchByCategory('electronics')} />
        <Button title="Jewelery" onPress={() => fetchByCategory('jewelery')} />
        <Button title="Men" onPress={() => fetchByCategory("men's clothing")} />
        <Button title="Women" onPress={() => fetchByCategory("women's clothing")} />
      </View>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Detail', { id: item.id })}
          >
            <View style={{ padding: 10, borderBottomWidth: 1 }}>
              <Image
                source={{ uri: item.image }}
                style={{ width: 100, height: 100 }}
              />
              <Text>{item.title}</Text>
              <Text>{formatPrice(item.price)}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}