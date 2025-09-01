import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Minus, Plus, Trash2 } from 'lucide-react-native';
import * as Animatable from 'react-native-animatable';
import { useTheme } from '@/contexts/ThemeContext';
import { CartItem as CartItemType } from '@/store/slices/cartSlice';
import { ARPreviewButton } from './ARPreviewButton';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

export const CartItem: React.FC<CartItemProps> = ({ item, onUpdateQuantity, onRemove }) => {
  const { theme } = useTheme();

  const handleQuantityChange = (change: number) => {
    const newQuantity = item.quantity + change;
    if (newQuantity > 0) {
      onUpdateQuantity(item.id, newQuantity);
    } else {
      onRemove(item.id);
    }
  };

  return (
    <Animatable.View animation="fadeInUp" duration={600} delay={100}>
      <View style={[styles.container, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
        <Image source={{ uri: item.image }} style={styles.image} />
        
        <View style={styles.content}>
          <Text style={[styles.name, { color: theme.colors.text }]} numberOfLines={2}>
            {item.name}
          </Text>
          
          {item.color && (
            <Text style={[styles.variant, { color: theme.colors.textSecondary }]}>
              Color: {item.color}
            </Text>
          )}
          
          {item.size && (
            <Text style={[styles.variant, { color: theme.colors.textSecondary }]}>
              Size: {item.size}
            </Text>
          )}
          
          <Text style={[styles.price, { color: theme.colors.text }]}>
            ${item.price.toFixed(2)}
          </Text>
          
          {/* AR Preview */}
          <View style={styles.arContainer}>
            <ARPreviewButton productName={item.name} />
          </View>
          
          <View style={styles.controls}>
            <View style={styles.quantityContainer}>
              <TouchableOpacity
                onPress={() => handleQuantityChange(-1)}
                style={[styles.quantityButton, { backgroundColor: theme.colors.background, borderColor: theme.colors.border }]}
              >
                <Minus size={16} color={theme.colors.text} />
              </TouchableOpacity>
              
              <Text style={[styles.quantity, { color: theme.colors.text }]}>
                {item.quantity}
              </Text>
              
              <TouchableOpacity
                onPress={() => handleQuantityChange(1)}
                style={[styles.quantityButton, { backgroundColor: theme.colors.background, borderColor: theme.colors.border }]}
              >
                <Plus size={16} color={theme.colors.text} />
              </TouchableOpacity>
            </View>
            
            <TouchableOpacity
              onPress={() => onRemove(item.id)}
              style={[styles.removeButton, { backgroundColor: theme.colors.error }]}
            >
              <Trash2 size={16} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
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
    width: 100,
    height: 100,
    borderRadius: 12,
    marginRight: 16,
  },
  content: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
    lineHeight: 22,
  },
  variant: {
    fontSize: 15,
    marginBottom: 4,
  },
  price: {
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 12,
  },
  arContainer: {
    marginBottom: 12,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 36,
    height: 36,
    borderRadius: 12,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  quantity: {
    fontSize: 18,
    fontWeight: '700',
    marginHorizontal: 20,
    minWidth: 28,
    textAlign: 'center',
  },
  removeButton: {
    width: 36,
    height: 36,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
});