import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, TouchableOpacity, Text, StyleSheet, Image, Pressable } from 'react-native';
import { useTranslation } from 'react-i18next';
import { usePlants } from '../context/PlantsContext';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconIonicons from 'react-native-vector-icons/Ionicons';

export default function Plants({ navigation }: any) {
  const [searchQuery, setSearchQuery] = useState('');
  const { t } = useTranslation();
  const { plants, filteredPlants, searchPlants, sortPlants, addPlant, deletePlant } = usePlants();

  const handleCardPress = (item: any) => {
    navigation.navigate('Detail', { item });
  };

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <View style={styles.passwordContainer}>
          <Pressable onPress={() => searchPlants(searchQuery)}>
            <IconIonicons style={styles.icon} name="search" size={20} color="#8AA47C"/>
          </Pressable>
          <TextInput
              style={styles.passwordInput}
              placeholder={t('Search for plants')}
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitEditing={() => searchPlants(searchQuery)}
            />
        </View>
        <Pressable style={styles.filterButton} onPress={() => navigation.navigate('Filter')}>
          <IconFontAwesome style={styles.icon} name="filter" size={20} color="#8AA47C"/>
        </Pressable>
      </View>
      <FlatList
        data={filteredPlants}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => handleCardPress(item)}>
            <Image source={{ uri: item.imageUrl }} style={styles.cardImage}/>
            <View style={styles.cardRight}>
              <View>
                <Text style={styles.cardTitle}>{t(item.name)}</Text>
                <Text style={styles.cardDetails}>{t(item.species)}</Text>
              </View>
              <View style={styles.actions}>
                <TouchableOpacity onPress={() => navigation.navigate('Edit')}>
                  <IconIonicons name="create" size={30} color="#1e90ff" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deletePlant(item.id)}>
                  <IconIonicons name="trash" size={30} color="#ff6347" />
                </TouchableOpacity>
              </View>
            </View>
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
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  passwordContainer: {
    width: '90%',
    height: 35,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    borderColor: '#8AA47C',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 5
  },
  passwordInput: {
      flex: 1,
      paddingHorizontal: 15,
  },
  icon: {
      // paddingHorizontal: 10,
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    // paddingHorizontal: 10,
    // marginBottom: 16,
  },
  filterButton: {
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    // padding: 5,
    paddingHorizontal: 8,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    borderColor: '#8AA47C',
    borderWidth: 1,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    textAlign: 'right',
  },
  cardDetails: {
    fontSize: 14,
    color: '#666',
    textAlign: 'right',
  },
  cardImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginRight: 16,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  cardRight: {
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 10
  },
});
