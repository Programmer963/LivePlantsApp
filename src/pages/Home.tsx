import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { useAuth } from '../context/AppContext';

const plantsData = [
  {
    id: 1,
    name: 'Ficus',
    details: 'Ficus is a genus of about 850 species of woody trees, shrubs, vines, epiphytes, and hemiepiphytes.',
    image: null,
  },
  {
    id: 2,
    name: 'Monstera',
    details: 'Monstera is a genus of 45 species of flowering plants in the arum family, Araceae, native to tropical regions of the Americas.',
    image: null,
  },
  {
    id: 3,
    name: 'Aloe Vera',
    details: 'Aloe Vera is a succulent plant species of the genus Aloe. It grows wild in tropical, semi-tropical, and arid climates around the world.',
    image: null,
  },
];

export default function Home({ navigation }: any) {
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState(plantsData);
  const { logout } = useAuth() 

  const handleSearch = () => {
    const filteredData = plantsData.filter(plant =>
      plant.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setData(filteredData);
    logout();
  };

  const handleSort = () => {
    const sortedData = [...data].sort((a, b) => a.name.localeCompare(b.name));
    setData(sortedData);
  };

  const handleCardPress = (item: any) => {
    navigation.navigate('Detail', { item });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search for plants..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <View style={styles.buttonsContainer}>
        <Button title="Search" onPress={handleSearch} />
        <Button title="Sort" onPress={handleSort} />
      </View>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => handleCardPress(item)}>
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.cardDetails}>{item.details}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
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
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardDetails: {
    fontSize: 14,
    color: '#666',
  },
});
