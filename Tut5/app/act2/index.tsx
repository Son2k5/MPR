import { use, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
  ScrollView,
} from 'react-native';
import { usePathname, useRouter } from 'expo-router';
import { Stack } from 'expo-router';
import { navigate } from 'expo-router/build/global-state/routing';

export interface Product {
  id: string,
  name: string,
  price: string,
  description: string
}
export default function ProductListScreen(){
  const [nextId, setNextId] = useState(4);
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: 'iPhone 15 Pro',
      price: '999',
      description: 'Latest iPhone with A17 Pro chip, titanium design, and advanced camera system.',
    },
    {
      id: '2',
      name: 'Samsung Galaxy S24',
      price: '899',
      description: 'Flagship Android phone with AI features, excellent display, and powerful performance.',
    },
    {
      id: '3',
      name: 'MacBook Pro M3',
      price: '1,999',
      description: 'Professional laptop with M3 chip, stunning Retina display, and all-day battery life.',
    },
  ]);
  const [newProduct, setNewProduct] = useState({
    name:'',
    price: '',
    description: ''
  })
  const navigateToDetail = (item: Product) =>{
    router.push({
      pathname: "/productDetail", 
      params: { 
        id: item.id,
        name: item.name, 
        price: item.price, 
        description: item.description 
  }
    }
    )
  }
  const handleAddProduct = () =>{
    if (!newProduct.name || !newProduct.price || !newProduct.description) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }
    const product : Product ={
      id: nextId.toString(),
      name: newProduct.name,
      price: newProduct.price,
      description: newProduct.description
    };
    setNextId(nextId + 1);
    setProducts([...products, product]);
    setNewProduct({name:'', price:'', description:''})
  }
  return(
    <>
      <Stack.Screen options={{title: 'Product List'}}/>

      <ScrollView style={styles.container}>
        <View style={styles.list}>
          <Text style={styles.title}>
            Product List ({products.length})
          </Text>
          {products.map((item) =>(
            <TouchableOpacity key={item.id} style={styles.card} onPress={() => navigateToDetail(item)}>
              <View>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.price}>${item.price}</Text>
              </View>
              <Text style={styles.arrow}>→</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.form}>
          <Text style={styles.title}> Add Product</Text>
          <TextInput placeholder='Name' style={styles.input} value={newProduct.name} onChangeText={(text) => setNewProduct({...newProduct, name: text})} />
          <TextInput placeholder='Price' style={styles.input} keyboardType='numeric' value={newProduct.price} onChangeText={(text) => setNewProduct({...newProduct, price: text})} />
          <TextInput placeholder='Description' style={styles.input} value={newProduct.description} onChangeText={(text) => setNewProduct({...newProduct, description: text})} />
            <TouchableOpacity style={styles.addBtn} onPress={handleAddProduct}>
              <Text style={styles.addBtnText}> Add Product</Text>
            </TouchableOpacity>

        </View>
      </ScrollView>
    </>
  )
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  form: {
    backgroundColor: '#fff',
    margin: 15,
    padding: 20,
    borderRadius: 10,
  },
  list: {
    backgroundColor: '#fff',
    margin: 15,
    padding: 20,
    borderRadius: 10,
  },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 15 },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  textArea: { height: 80 },
  addBtn: {
    backgroundColor: '#2196F3',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  addBtnText: { color: '#fff', fontWeight: 'bold' },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 10,
  },
  name: { fontSize: 18, fontWeight: '600' },
  price: { color: '#2196F3', fontWeight: 'bold' },
  arrow: { fontSize: 22 },
});