import { Tabs } from 'expo-router';
import { Chrome as Home, Search, ShoppingCart, Heart, User } from 'lucide-react-native';
import * as Animatable from 'react-native-animatable';
import { useTheme } from '@/contexts/ThemeContext';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { View, Text, StyleSheet } from 'react-native';

function TabBarBadge({ count }: { count: number }) {
  const { theme } = useTheme();
  
  if (count === 0) return null;

  return (
    <View style={[styles.badge, { backgroundColor: theme.colors.accent }]}>
      <Text style={[styles.badgeText, { color: '#fff' }]}>
        {count > 99 ? '99+' : count}
      </Text>
    </View>
  );
}

export default function TabLayout() {
  const { theme } = useTheme();
  const cartItemCount = useSelector((state: RootState) => state.cart.itemCount);
  const wishlistItemCount = useSelector((state: RootState) => state.wishlist.items.length);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.border,
          borderTopWidth: 1,
          height: 70,
          paddingBottom: 12,
          paddingTop: 12,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 8,
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarLabelStyle: {
          fontSize: 13,
          fontWeight: '600',
          marginTop: 4,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size, focused }) => (
            <Animatable.View animation={focused ? 'pulse' : undefined} duration={300}>
              <Home color={color} size={focused ? size + 2 : size} />
            </Animatable.View>
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color, size, focused }) => (
            <Animatable.View animation={focused ? 'pulse' : undefined} duration={300}>
              <Search color={color} size={focused ? size + 2 : size} />
            </Animatable.View>
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart',
          tabBarIcon: ({ color, size, focused }) => (
            <Animatable.View animation={focused ? 'pulse' : undefined} duration={300}>
              <ShoppingCart color={color} size={focused ? size + 2 : size} />
              <TabBarBadge count={cartItemCount} />
            </Animatable.View>
          ),
        }}
      />
      <Tabs.Screen
        name="wishlist"
        options={{
          title: 'Wishlist',
          tabBarIcon: ({ color, size, focused }) => (
            <Animatable.View animation={focused ? 'pulse' : undefined} duration={300}>
              <Heart color={color} size={focused ? size + 2 : size} />
              <TabBarBadge count={wishlistItemCount} />
            </Animatable.View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size, focused }) => (
            <Animatable.View animation={focused ? 'pulse' : undefined} duration={300}>
              <User color={color} size={focused ? size + 2 : size} />
            </Animatable.View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    right: -10,
    top: -6,
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '600',
    textAlign: 'center',
  },
});