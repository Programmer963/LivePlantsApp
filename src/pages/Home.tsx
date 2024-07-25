import React, { useState } from 'react';
import { View, FlatList, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { usePlants } from '../context/PlantsContext';
import { useAuth } from '../context/AuthContext';

export default function Home({ navigation }: any) {
  const { plants } = usePlants();
  const { logout } = useAuth();
  
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Ваши растения</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Plants')}>
          <Text style={styles.text}>Показать все</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={plants.slice(0, 5)}
        style={styles.list}
        horizontal
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.imageUrl }} style={styles.image}/>
            <Text style={styles.cardTitle}>{item.name}</Text>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f4f8',
  },
  list: {
    width: '100%',
    marginTop: 15,
  },
  card: {
    maxHeight: 300,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
    textAlign: 'center',
    color: '#333',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#538c81',
    borderRadius: 25,
    cursor: 'pointer',
    // outline: 'none',
  },
  title: {
    fontSize: 20,
    fontWeight: 600,
  },
  text: {
    fontSize: 14,
    fontWeight: 600,
    color: '#16f59b'
  }
});
