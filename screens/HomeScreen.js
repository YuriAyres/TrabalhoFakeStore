import React, { useEffect, useState, useLayoutEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Button,
  Image,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import { colors } from '../styles/theme';
import api from '../api/api';

export default function HomeScreen({ navigation }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

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
      setSelectedCategory(category || null); // 🔥 marca o ativo
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
      headerTitleAlign: 'center',
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.replace('Login')}
          style={[styles.headerBtn, { marginLeft: 10 }]}
        >
          <Text style={styles.headerText}>Logout</Text>
        </TouchableOpacity>
      ),

      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('Info')}
          style={[styles.headerBtnInfo, { marginRight: 10 }]}
        >
          <Text style={styles.headerText}>Info</Text>
        </TouchableOpacity>
      ),
    });
  }, []);

  if (loading) return <ActivityIndicator size="large" />;

  return (
    <View>
      {/* Filtros */}
      <View style={styles.filterContainer}>

        <TouchableOpacity
          style={[
            styles.filterBtn,
            selectedCategory === null && styles.filterActive
          ]}
          onPress={() => fetchByCategory()}
        >
          <Text style={styles.filterText}>Todos</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterBtn,
            selectedCategory === 'electronics' && styles.filterActive
          ]}
          onPress={() => fetchByCategory('electronics')}
        >
          <Text style={styles.filterText}>Electronics</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterBtn,
            selectedCategory === 'jewelery' && styles.filterActive
          ]}
          onPress={() => fetchByCategory('jewelery')}
        >
          <Text style={styles.filterText}>Jewelery</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterBtn,
            selectedCategory === "men's clothing" && styles.filterActive
          ]}
          onPress={() => fetchByCategory("men's clothing")}
        >
          <Text style={styles.filterText}>Men</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterBtn,
            selectedCategory === "women's clothing" && styles.filterActive
          ]}
          onPress={() => fetchByCategory("women's clothing")}
        >
          <Text style={styles.filterText}>Women</Text>
        </TouchableOpacity>

      </View>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Detail', { id: item.id })}
          >
            <View style={styles.card}>
              <Image
                source={{ uri: item.image }}
                style={styles.image}
              />
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.price}>{formatPrice(item.price)}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    margin: 10,
    padding: 10,
    borderRadius: 10,
    elevation: 3,
  },

  image: {
    width: '100%',
    height: 120,
    resizeMode: 'contain',
  },

  title: {
    color: '#333',
    fontWeight: '600',
    marginTop: 8,
  },

  price: {
    color: '#4CAF50',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 4,
  },

  filterContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    gap: 8, // 🔥 espaçamento automático
  },

  filterBtn: {
    backgroundColor: colors.secondary,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 20,
  },

  filterAll: {
    backgroundColor: colors.primary,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 20,
  },

  filterText: {
    color: '#FFF',
    fontSize: 12,
  },

  headerBtn: {
    backgroundColor: '#E53935',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
    minWidth: 70, // 🔥 importante
    alignItems: 'center',
  },

  headerBtnInfo: {
    backgroundColor: '#2196F3',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
    minWidth: 70, // 🔥 importante
    alignItems: 'center',
  },

  headerText: {
    color: '#FFF',
    fontSize: 12,
  },

  filterActive: {
    backgroundColor: '#4CAF50', // verde
  },
});