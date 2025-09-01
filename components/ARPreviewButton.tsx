import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { Camera } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';

interface ARPreviewButtonProps {
  productName: string;
  onPress?: () => void;
}

export const ARPreviewButton: React.FC<ARPreviewButtonProps> = ({ 
  productName, 
  onPress 
}) => {
  const { theme } = useTheme();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      Alert.alert(
        'AR Preview',
        `AR preview for ${productName} would open here. This feature uses your device's camera to place the furniture in your space.`,
        [{ text: 'OK' }]
      );
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[styles.button, { backgroundColor: theme.colors.accent }]}
    >
      <Camera size={18} color="#fff" />
      <Text style={styles.buttonText}>AR Preview</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
  },
});