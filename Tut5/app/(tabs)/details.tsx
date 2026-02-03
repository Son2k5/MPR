import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Stack } from 'expo-router';

export default function ProductDetailScreen() {
  const {
    id = 'N/A',
    name = 'Unknown',
    price = '0',
    description = 'No description',
  } = useLocalSearchParams();

  return (
    <>
        <TouchableOpacity
      style={styles.backButton}
      onPress={() => router.back()}
    >
      <Text style={styles.backButtonText}>← Back To Product List</Text>
    </TouchableOpacity>
      <Stack.Screen options={{ title: 'Product Details' }} />

      <ScrollView style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.price}>${price}</Text>

          <View style={styles.divider} />

          <Text style={styles.label}>Description</Text>
          <Text style={styles.desc}>{description}</Text>

          <View style={styles.divider} />

          <Text>ID: {id}</Text>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  card: {
    backgroundColor: '#fff',
    margin: 15,
    padding: 20,
    borderRadius: 10,
  },
  name: { fontSize: 26, fontWeight: 'bold' },
  price: { fontSize: 22, color: '#2196F3', marginVertical: 10 },
  divider: { height: 1, backgroundColor: '#ddd', marginVertical: 15 },
  label: { fontSize: 18, fontWeight: 'bold' },
  desc: { fontSize: 16, color: '#666' },
  backButton: {
  marginBottom: 15,
},
backButtonText: {
  fontSize: 16,
  color: '#1082df',
  fontWeight: '600',
},

});
