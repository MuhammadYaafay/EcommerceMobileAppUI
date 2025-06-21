import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';
import { useDispatch } from 'react-redux';
import { setSelectedCategory } from '@/store/slices/productsSlice';

interface CategoryCardProps {
  category: string;
}

const categoryColors: Record<string, string[]> = {
  Electronics: ['#3b82f6', '#1d4ed8'],
  Wearables: ['#10b981', '#059669'],
  Accessories: ['#f59e0b', '#d97706'],
  Fashion: ['#ec4899', '#be185d'],
  Home: ['#8b5cf6', '#7c3aed'],
};

export const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  const { theme } = useTheme();
  const dispatch = useDispatch();

  const handlePress = () => {
    dispatch(setSelectedCategory(category));
    router.push('/search');
  };

  const colors = categoryColors[category] || [theme.colors.primary, theme.colors.accent];

  return (
    <TouchableOpacity onPress={handlePress} style={styles.container}>
      <LinearGradient
        colors={colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
      >
        <Text style={styles.title}>{category}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: 12,
  },
  card: {
    width: 120,
    height: 80,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
  },
});