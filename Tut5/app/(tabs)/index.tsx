import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Stack } from 'expo-router';
import { useProducts } from './productContext';

export default function ProductListScreen() {
  const router = useRouter();
  const { products } = useProducts();

  const goToAddProduct = () => {
    router.push('/(tabs)/addProduct');
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Product List',
        }}
      />

      <View style={styles.container}>

        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.productCard}
              onPress={() =>
                router.push({
                  pathname: '/(tabs)/details',
                  params: item,
                })
              }
            >
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.price}>{item.price}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
                <TouchableOpacity style={styles.addButton} onPress={goToAddProduct}>
                  <Text style={styles.addButtonText}>+ Add Product</Text>
                </TouchableOpacity>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  addButton: {
    backgroundColor: '#00c3ff',
    padding: 14,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  productCard: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 8,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
  },
  price: {
    color: '#00b7ff',
    fontSize: 16,
  },
});
