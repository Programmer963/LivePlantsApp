import React from 'react';
import { View, Text, Image, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useAuth } from '../context/AuthContext';

export default function Profile({ navigation }: any) {
  const { user, logout } = useAuth();

  const handleEditProfile = () => {
    navigation.navigate('EditProfile');
  };

  const handleLogout = () => {
    logout();
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <Image
          source={{ uri: user?.imageUrl || 'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg' }}
          style={styles.profileImage}
        />
        <TouchableOpacity style={styles.changeImageButton}>
          <Text style={styles.changeImageText}>Change Image</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.userName}>{user?.firstName} {user?.lastName}</Text>
      <Text style={styles.userEmail}>{user?.email}</Text>
      <View style={styles.buttonContainer}>
        <Button title="Edit Profile" onPress={handleEditProfile} />
        <Button title="Logout" onPress={handleLogout} color="red" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f4f8',
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#ddd',
  },
  changeImageButton: {
    marginTop: 10,
  },
  changeImageText: {
    color: '#007bff',
    fontSize: 16,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  userEmail: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
