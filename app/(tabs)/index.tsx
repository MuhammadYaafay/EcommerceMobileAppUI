import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { router } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { ProductCard } from '@/components/ProductCard';
import { CategoryCard } from '@/components/CategoryCard';
import { HeroBanner } from '@/components/HeroBanner';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const { theme } = useTheme();
  const { user, isLoading } = useAuth();
  const { featuredProducts, categories } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace('/auth');
    }
  }, [user, isLoading]);

  if (isLoading) {
    return (
      <View style={[styles.centered, { backgroundColor: theme.colors.background }]}>
        <Text style={[styles.loadingText, { color: theme.colors.text }]}>
          Loading...
        </Text>
      </View>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Animatable.ScrollView 
        animation="fadeIn" 
        duration={800}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Animatable.View animation="fadeInDown" duration={1000} style={styles.header}>
          <View style={styles.headerContent}>
            <View>
              <Text style={[styles.welcomeText, { color: theme.colors.textSecondary }]}>
                Welcome back,
              </Text>
              <Text style={[styles.nameText, { color: theme.colors.text }]}>
                {user.name}
              </Text>
            </View>
            <View style={[styles.profileAvatar, { backgroundColor: theme.colors.surface }]}>
              <Text style={[styles.avatarText, { color: theme.colors.primary }]}>
                {user.name.charAt(0).toUpperCase()}
              </Text>
            </View>
          </View>
        </Animatable.View>

        {/* Hero Banner */}
        <HeroBanner />

        {/* Categories */}
        <Animatable.View animation="fadeInLeft" duration={1000} delay={400} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Shop by Category
            </Text>
            <TouchableOpacity onPress={() => router.push('/search')}>
              <Text style={[styles.seeAllText, { color: theme.colors.primary }]}>
                View All
              </Text>
            </TouchableOpacity>
          </View>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            style={styles.horizontalScroll}
            contentContainerStyle={styles.categoriesContent}
          >
            {categories.map((category, index) => (
              <CategoryCard key={index} category={category} />
            ))}
          </ScrollView>
        </Animatable.View>

        {/* Featured Products */}
        <Animatable.View animation="fadeInRight" duration={1000} delay={600} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Featured Products
            </Text>
            <TouchableOpacity onPress={() => router.push('/search')}>
              <Text style={[styles.seeAllText, { color: theme.colors.primary }]}>
                See All
              </Text>
            </TouchableOpacity>
          </View>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            style={styles.horizontalScroll}
            contentContainerStyle={styles.productsContent}
          >
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </ScrollView>
        </Animatable.View>

        {/* Deals Section */}
        <Animatable.View animation="fadeInUp" duration={1000} delay={800} style={styles.section}>
          <View style={[styles.dealsBanner, { backgroundColor: theme.colors.surface }]}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg' }}
              style={styles.dealsImage}
            />
            <LinearGradient
              colors={[theme.colors.gradient.start, theme.colors.gradient.end]}
              style={styles.dealsOverlay}
            >
              <Text style={styles.dealsBannerTitle}>Winter Sale</Text>
              <Text style={styles.dealsBannerSubtitle}>Up to 40% off on bedroom furniture</Text>
              <TouchableOpacity
                style={styles.dealsButton}
                onPress={() => router.push('/search')}
              >
                <Text style={styles.dealsButtonText}>Shop Sale</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </Animatable.View>

        {/* Admin Quick Access */}
        {user.role === 'admin' && (
          <Animatable.View animation="fadeInUp" duration={1000} delay={1000} style={styles.section}>
            <TouchableOpacity
              style={[styles.adminButton, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}
              onPress={() => router.push('/admin')}
            >
              <Text style={[styles.adminButtonText, { color: theme.colors.primary }]}>
                Admin Panel
              </Text>
            </TouchableOpacity>
          </Animatable.View>
        )}
      </Animatable.ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    fontWeight: '500',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 16,
    fontWeight: '400',
  },
  nameText: {
    fontSize: 28,
    fontWeight: '700',
    marginTop: 2,
  },
  profileAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: '700',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
  },
  seeAllText: {
    fontSize: 16,
    fontWeight: '600',
  },
  horizontalScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  categoriesContent: {
    paddingRight: 20,
  },
  productsContent: {
    paddingRight: 20,
  },
  dealsBanner: {
    height: 200,
    borderRadius: 24,
    overflow: 'hidden',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  dealsImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    position: 'absolute',
  },
  dealsOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  dealsBannerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#fff',
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  dealsBannerSubtitle: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginTop: 8,
    opacity: 0.9,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  dealsButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 30,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  dealsButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#8b5a3c',
  },
  adminButton: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 2,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  adminButtonText: {
    fontSize: 18,
    fontWeight: '600',
  },
});