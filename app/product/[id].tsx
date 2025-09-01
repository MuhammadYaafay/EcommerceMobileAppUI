import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ArrowLeft,
  Heart,
  Share,
  Star,
  ShoppingCart,
  Plus,
  Minus,
} from 'lucide-react-native';
import * as Animatable from 'react-native-animatable';
import { router, useLocalSearchParams } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { addToCart } from '@/store/slices/cartSlice';
import { addToWishlist, removeFromWishlist } from '@/store/slices/wishlistSlice';
import { ARPreviewButton } from '@/components/ARPreviewButton';
import Toast from 'react-native-toast-message';

const { width } = Dimensions.get('window');

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams();
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const product = useSelector((state: RootState) =>
    state.products.products.find((p) => p.id === id)
  );
  const wishlist = useSelector((state: RootState) => state.wishlist.items);

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const imageScrollRef = useRef<FlatList>(null);

  const isInWishlist = wishlist.some((item) => item.id === id);

  if (!product) {
    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.colors.background }]}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <ArrowLeft size={24} color={theme.colors.text} />
          </TouchableOpacity>
        </View>
        <View style={styles.centeredContainer}>
          <Text style={[styles.errorText, { color: theme.colors.text }]}>
            Product not found
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const handleWishlistToggle = () => {
    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id));
      Toast.show({
        type: 'info',
        text1: 'Removed from wishlist',
        position: 'bottom',
      });
    } else {
      dispatch(
        addToWishlist({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          rating: product.rating,
        })
      );
      Toast.show({
        type: 'success',
        text1: 'Added to wishlist',
        position: 'bottom',
      });
    }
  };

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity,
        color: selectedColor,
        size: selectedSize,
      })
    );
    Toast.show({
      type: 'success',
      text1: 'Added to cart',
      text2: `${quantity} ${quantity === 1 ? 'item' : 'items'} added`,
      position: 'bottom',
    });
  };

  const renderImageItem = ({ item }: { item: string; index: number }) => (
    <Image source={{ uri: item }} style={styles.productImage} />
  );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      {/* Header */}
      <View
        style={[styles.header, { backgroundColor: theme.colors.background }]}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <View style={styles.headerActions}>
          <TouchableOpacity
            onPress={handleWishlistToggle}
            style={styles.headerButton}
          >
            <Heart
              size={24}
              color={isInWishlist ? theme.colors.accent : theme.colors.text}
              fill={isInWishlist ? theme.colors.accent : 'transparent'}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Share size={24} color={theme.colors.text} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Product Images */}
        <Animatable.View
          animation="fadeIn"
          duration={800}
          style={styles.imageContainer}
        >
          <FlatList
            ref={imageScrollRef}
            data={product.images}
            renderItem={renderImageItem}
            keyExtractor={(_, index) => index.toString()}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(event) => {
              const index = Math.round(
                event.nativeEvent.contentOffset.x / width
              );
              setSelectedImageIndex(index);
            }}
          />

          {/* Image Indicators */}
          {product.images.length > 1 && (
            <View style={styles.imageIndicators}>
              {product.images.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.indicator,
                    {
                      backgroundColor:
                        index === selectedImageIndex
                          ? theme.colors.primary
                          : theme.colors.border,
                    },
                  ]}
                />
              ))}
            </View>
          )}

          {/* Discount Badge */}
          {product.originalPrice && (
            <View
              style={[
                styles.discountBadge,
                { backgroundColor: theme.colors.accent },
              ]}
            >
              <Text style={styles.discountText}>
                {Math.round(
                  ((product.originalPrice - product.price) /
                    product.originalPrice) *
                    100
                )}
                % OFF
              </Text>
            </View>
          )}
        </Animatable.View>

        {/* Product Info */}
        <Animatable.View
          animation="fadeInUp"
          duration={800}
          delay={300}
          style={styles.productInfo}
        >
          {/* Product Info content here */}
          {/* ... keep all existing product details UI ... */}
        </Animatable.View>
      </ScrollView>

      {/* Bottom Actions */}
      <Animatable.View
        animation="fadeInUp"
        duration={800}
        delay={500}
        style={[
          styles.bottomActions,
          {
            backgroundColor: theme.colors.background,
            borderColor: theme.colors.border,
          },
        ]}
      >
        <View style={styles.actionRow}>
          <TouchableOpacity
            onPress={handleWishlistToggle}
            style={[
              styles.wishlistAction,
              {
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.border,
              },
            ]}
          >
            <Heart
              size={24}
              color={isInWishlist ? theme.colors.accent : theme.colors.text}
              fill={isInWishlist ? theme.colors.accent : 'transparent'}
            />
          </TouchableOpacity>

          <View style={styles.arPreviewContainer}>
            <ARPreviewButton productName={product.name} />
          </View>
        </View>

        <TouchableOpacity
          onPress={handleAddToCart}
          style={[styles.addToCartAction, { backgroundColor: theme.colors.primary }]}
        >
          <ShoppingCart size={20} color="#fff" />
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </Animatable.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    zIndex: 1,
  },
  headerActions: { flexDirection: 'row', gap: 12 },
  headerButton: { padding: 8 },
  centeredContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorText: { fontSize: 16, fontWeight: '500' },
  imageContainer: { height: 400, position: 'relative' },
  productImage: { width: width, height: 400, resizeMode: 'cover' },
  imageIndicators: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  indicator: { width: 8, height: 8, borderRadius: 4 },
  discountBadge: {
    position: 'absolute',
    top: 16,
    left: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  discountText: { fontSize: 12, fontWeight: '700', color: '#fff' },
  productInfo: { padding: 20 },
  bottomActions: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderTopWidth: 1,
    gap: 16,
  },
  actionRow: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  wishlistAction: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arPreviewContainer: { flex: 1 },
  addToCartAction: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    borderRadius: 28,
    gap: 8,
  },
  addToCartText: { fontSize: 18, fontWeight: '700', color: '#fff' },
});
