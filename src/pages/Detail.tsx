import React, { useState } from 'react';
import { View, Text, Button, Image, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { loginBackground } from '../assets';
import { defaultPlantIcon } from '../assets';
import { t } from 'i18next';

export default function Detail({ route }: any) {
  const { item } = route.params;
  const [image, setImage] = useState(item.image);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.imageContainer}>
          <Image 
            source={image ? { uri: defaultPlantIcon } : {uri: loginBackground}}
            style={styles.image}
          />
          <Pressable onPress={pickImage} style={styles.uploadButton}>
          </Pressable>
        </View>
        <Text style={styles.title}>{t(item.name)}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.detailsTitle}>{t('Details')}:</Text>
        <Text style={styles.details}>{t(item.details)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f4f8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  imageContainer: {
    position: 'relative',
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 16,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  uploadButton: {
    width: 30,
    height: 30,
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: 'darkcyan',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    flex: 1,
  },
  detailsContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  detailsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  details: {
    fontSize: 16,
    color: '#666',
  },
});
