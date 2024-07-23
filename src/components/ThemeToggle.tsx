import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme(); // Здесь useTheme должен работать корректно

  return (
    <TouchableOpacity onPress={toggleTheme} style={styles.themeToggle}>
      <Text style={styles.themeToggleText}>
        {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  themeToggle: {
    marginRight: 10,
  },
  themeToggleText: {
    fontSize: 16,
    color: 'blue',
  },
});
