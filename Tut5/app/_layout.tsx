import { Stack } from 'expo-router';
import { ProductProvider } from './(tabs)/productContext';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';

export default function RootLayout() {
  const WhiteTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#ffffff',
      card: '#ffffff',
    },
  };

  return (
    <ProductProvider>
      <ThemeProvider value={WhiteTheme}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen 
            name="productDetail" 
            options={{ 
              headerShown: true, 
              title: 'Product Details',
              headerBackTitle: 'Back' 
            }} 
          />
        </Stack>
      </ThemeProvider>
    </ProductProvider>
  );
}