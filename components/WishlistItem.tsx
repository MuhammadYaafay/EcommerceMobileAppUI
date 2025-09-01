import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Heart, ShoppingCart, Star } from 'lucide-react-native';
import * as Animatable from 'react-native-animatable';
import { router } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';
import { WishlistItem as WishlistItemType } from '@/store/slices/wishlistSlice';
import { ARPreviewButton } from './ARPreviewButton';

interface WishlistItemProps {
  item: WishlistItemType;
  onRemove: (id: string) => void;
  onAddToCart: (item: WishlistItemType) => void;
}

export const WishlistItem: React.FC<WishlistItemProps> = ({ item, onRemove, onAddToCart }) => {
  const { theme } = useTheme();

  const handleProductPress = () => {
    router.push(`/product/${item.id}`);
  };

  return (
    <Animatable.View animation="fadeInUp" duration={600} delay={100}>
      <TouchableOpacity
        onPress={handleProductPress}
        style={[styles.container, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}
      >
        <Image source={{ uri: item.image }} style={styles.image} />
        
        <View style={styles.content}>
          <Text style={[styles.name, { color: theme.colors.text }]} numberOfLines={2}>
            {item.name}
          </Text>
          
          <View style={styles.ratingContainer}>
            <Star size={14} color={theme.colors.warning} fill={theme.colors.warning} />
            <Text style={[styles.rating, { color: theme.colors.textSecondary }]}>
              {item.rating}
            </Text>
          </View>
          
          <Text style={[styles.price, { color: theme.colors.text }]}>
            ${item.price.toFixed(2)}
          </Text>
          
          {/* AR Preview */}
          <View style={styles.arContainer}>
            <ARPreviewButton productName={item.name} />
          </View>
          
          <View style={styles.actions}>
            <TouchableOpacity
              onPress={() => onAddToCart(item)}
              style={[styles.addToCartButton, { backgroundColor: theme.colors.primary }]}
            >
              <ShoppingCart size={16} color="#fff" />
              <Text style={styles.addToCartText}>Add to Cart</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              onPress={() => onRemove(item.id)}
              style={[styles.removeButton, { backgroundColor: theme.colors.background, borderColor: theme.colors.border }]}
            >
              <Heart size={16} color={theme.colors.accent} fill={theme.colors.accent} />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 12,
    marginRight: 16,
  },
  content: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
    lineHeight: 22,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  rating: {
    fontSize: 15,
    marginLeft: 4,
  },
  price: {
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 12,
  },
  arContainer: {
    marginBottom: 12,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  addToCartButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    gap: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  addToCartText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
  },
  removeButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});