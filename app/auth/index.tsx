import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Animatable from 'react-native-animatable';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';

const { height } = Dimensions.get('window');

export default function AuthIndex() {
  const { theme } = useTheme();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && user) {
      router.replace('/(tabs)');
    }
  }, [user, isLoading]);

  if (isLoading) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Text style={[styles.loadingText, { color: theme.colors.text }]}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <SafeAreaView style={styles.safeArea}>
        <Animatable.View animation="fadeInUp" duration={1000} style={styles.content}>
          {/* Hero Image */}
          <Animatable.View animation="fadeInDown" duration={1200} delay={300} style={styles.heroContainer}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg' }}
              style={styles.heroImage}
            />
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.3)']}
              style={styles.heroOverlay}
            />
          </Animatable.View>

          <View style={styles.textContainer}>
            <Animatable.Text 
              animation="fadeInUp" 
              duration={1000} 
              delay={600}
              style={[styles.title, { color: theme.colors.text }]}
            >
              Transform Your Space
            </Animatable.Text>
            <Animatable.Text 
              animation="fadeInUp" 
              duration={1000} 
              delay={800}
              style={[styles.subtitle, { color: theme.colors.textSecondary }]}
            >
              Discover premium furniture with AR preview technology
            </Text>
          </View>

          <Animatable.View 
            animation="fadeInUp" 
            duration={1000} 
            delay={1000}
            style={styles.buttonContainer}
          >
            <TouchableOpacity
              style={[styles.button, styles.primaryButton, { backgroundColor: theme.colors.primary }]}
              onPress={() => router.push('/auth/login')}
            >
              <Text style={[styles.primaryButtonText, { color: '#fff' }]}>Sign In</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.secondaryButton, { borderColor: theme.colors.border, backgroundColor: theme.colors.surface }]}
              onPress={() => router.push('/auth/register')}
            >
              <Text style={[styles.secondaryButtonText, { color: theme.colors.text }]}>Create Account</Text>
            </TouchableOpacity>
          </Animatable.View>
        </Animatable.View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  heroContainer: {
    height: height * 0.4,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 40,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  heroOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 36,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 42,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 26,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    gap: 16,
  },
  button: {
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  primaryButton: {
    // backgroundColor handled in component
  },
  secondaryButton: {
    borderWidth: 2,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '700',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '700',
  },
  loadingText: {
    fontSize: 16,
    textAlign: 'center',
  },
});

  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#fff',
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
  loadingText: {
    fontSize: 16,
    textAlign: 'center',
  },
});