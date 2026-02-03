import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useProducts } from './productContext';

export default function AddProductScreen() {
  const router = useRouter();
  const { addProduct } = useProducts();

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
  });

  const handleSubmit = () => {
    if (!formData.name || !formData.price || !formData.description) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    addProduct(formData);
    Alert.alert('Success', 'Product added!', [
      { text: 'OK', onPress: () => router.push('/') },
    ]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>

      <View style={styles.form}>
        <TouchableOpacity
  style={styles.backButton}
  onPress={() => router.back()}
>
  <Text style={styles.backButtonText}>← Back to Product List</Text>
</TouchableOpacity>
        <TextInput
          placeholder="Product Name"
          style={styles.input}
          value={formData.name}
          onChangeText={(text) =>
            setFormData({ ...formData, name: text })
          }
        />

        <TextInput
          placeholder="Price"
          style={styles.input}
          value={formData.price}
          onChangeText={(text) =>
            setFormData({ ...formData, price: text })
          }
        />

        <TextInput
          placeholder="Description"
          style={[styles.input, styles.textArea]}
          multiline
          value={formData.description}
          onChangeText={(text) =>
            setFormData({ ...formData, description: text })
          }
        />

        <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
          <Text style={styles.btnText}>Add Product</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  form: { backgroundColor: '#fff', padding: 20, borderRadius: 12 },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    borderRadius: 8,
    marginBottom: 12,
  },
  textArea: { height: 100 },
  btn: {
    backgroundColor: '#1e9bee',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  btnText: { color: '#fff', fontWeight: 'bold' },
  backButton: {
  marginBottom: 15,
},
backButtonText: {
  fontSize: 16,
  color: '#2196F3',
  fontWeight: '600',
},

});
