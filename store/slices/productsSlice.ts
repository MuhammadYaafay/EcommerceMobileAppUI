import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  description: string;
  rating: number;
  reviews: number;
  category: string;
  tags: string[];
  inStock: boolean;
  colors?: string[];
  sizes?: string[];
}

interface ProductsState {
  products: Product[];
  featuredProducts: Product[];
  categories: string[];
  loading: boolean;
  searchQuery: string;
  selectedCategory: string;
  selectedTags: string[];
}

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Modern Sectional Sofa',
    price: 1299.99,
    originalPrice: 1599.99,
    image: 'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg',
    images: [
      'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg',
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
    ],
    description: 'Luxurious sectional sofa with premium fabric upholstery and ergonomic design. Perfect for modern living rooms.',
    rating: 4.8,
    reviews: 1250,
    category: 'Sofas',
    tags: ['modern', 'sectional', 'luxury'],
    inStock: true,
    colors: ['Charcoal', 'Beige', 'Navy'],
  },
  {
    id: '2',
    name: 'King Size Platform Bed',
    price: 899.99,
    image: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg',
    images: [
      'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg',
      'https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg',
    ],
    description: 'Minimalist platform bed with solid wood construction and built-in nightstands.',
    rating: 4.6,
    reviews: 890,
    category: 'Beds',
    tags: ['platform', 'wood', 'minimalist'],
    inStock: true,
    colors: ['Walnut', 'Oak', 'Espresso'],
  },
  {
    id: '3',
    name: 'Ergonomic Office Chair',
    price: 449.99,
    originalPrice: 599.99,
    image: 'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg',
    images: [
      'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg',
      'https://images.pexels.com/photos/4050302/pexels-photo-4050302.jpeg',
    ],
    description: 'Premium ergonomic office chair with lumbar support and adjustable height.',
    rating: 4.7,
    reviews: 456,
    category: 'Chairs',
    tags: ['ergonomic', 'office', 'adjustable'],
    inStock: true,
    colors: ['Black', 'Grey', 'White'],
  },
  {
    id: '4',
    name: 'Dining Table Set',
    price: 799.99,
    image: 'https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg',
    images: [
      'https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg',
      'https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg',
    ],
    description: 'Elegant dining table set with 6 chairs, perfect for family gatherings.',
    rating: 4.5,
    reviews: 723,
    category: 'Tables',
    tags: ['dining', 'family', 'elegant'],
    inStock: true,
    colors: ['Natural Wood', 'Dark Walnut', 'White'],
  },
];

const initialState: ProductsState = {
  products: mockProducts,
  featuredProducts: mockProducts.slice(0, 3),
  categories: ['Sofas', 'Beds', 'Chairs', 'Tables', 'Storage', 'Decor'],
  loading: false,
  searchQuery: '',
  selectedCategory: '',
  selectedTags: [],
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    },
    setSelectedTags: (state, action: PayloadAction<string[]>) => {
      state.selectedTags = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.products.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
    deleteProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter(p => p.id !== action.payload);
    },
  },
});

export const {
  setProducts,
  setSearchQuery,
  setSelectedCategory,
  setSelectedTags,
  setLoading,
  addProduct,
  updateProduct,
  deleteProduct,
} = productsSlice.actions;

export default productsSlice.reducer;