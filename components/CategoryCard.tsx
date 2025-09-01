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

const categoryData: Record<string, { colors: string[]; image: string }> = {
  Sofas: { 
    colors: ['#8b5a3c', '#6b4423'], 
    image: 'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg' 
  },
  Beds: { 
    colors: ['#4f46e5', '#3730a3'], 
    image: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg' 
  },
  Chairs: { 
    colors: ['#059669', '#047857'], 
    image: 'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg' 
  },
  Tables: { 
    colors: ['#dc2626', '#b91c1c'], 
    image: 'https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg' 
  },
  Storage: { 
    colors: ['#7c3aed', '#6d28d9'], 
    image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg' 
  },
  Decor: { 
    colors: ['#ea580c', '#c2410c'], 
    image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg' 
  },
};

export const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  const { theme } = useTheme();
  const dispatch = useDispatch();

  const handlePress = () => {
    dispatch(setSelectedCategory(category));
    router.push('/search');
  };

  const categoryInfo = categoryData[category] || { 
    colors: [theme.colors.primary, theme.colors.accent],
    image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg'
  };

  return (
    <Animatable.View animation="fadeInRight" duration={800} delay={200}>
      <TouchableOpacity onPress={handlePress} style={styles.container}>
        <View style={styles.card}>
          <Image source={{ uri: categoryInfo.image }} style={styles.categoryImage} />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.6)']}
            style={styles.overlay}
          />
          <View style={styles.textContainer}>
            <Text style={styles.title}>{category}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: 12,
  },
  card: {
    width: 140,
    height: 100,
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  categoryImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  textContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});