import React, {useState} from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native"

interface Product{
  id: string,
  name: string,
  price: string,
  description: string
}

const example_product : Product[] =[
    {
    id: "1",
    name: "Apple iPhone 14",
    price: "799",
    description: "Smartphone by Apple",
    },

    {
    id: "2",
    name: "Samsung Galaxy S23",
    price: "699",
    description: "Flagship phone by Samsung",
    },

    {
    id: "3",
    name: "Sony WH-1000XM5",
    price: "399",
    description: "Noise-canceling headphones",
    },
];
export default function App(){
  const[products, setProducts]= useState<Product[]>(example_product);
  const [nextId, setNextId] = useState<number>(4);
  const[name, setName] = useState("");
  const[price, setPrice] = useState("");
  const[description, setDescription] = useState("");

  const handleAddProduct = () =>{
    if (!name.trim() || !price.trim()) {
      alert("Please enter both product name and price");
      return;
    }
    const newProduct: Product ={
      id: nextId.toString(),
      name : name.trim(),
      price: price.trim(),
      description: description.trim(),

    }
    setProducts([...products, newProduct]);
    setNextId(nextId + 1);
    setName("");
    setPrice("");
    setDescription("");
  }


  return(
    <View style={styles.container}>
      <ScrollView
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        >
          {products.map(item => (
            <View key={item.id} style={styles.productItem}>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productPrice}>${item.price}</Text>
              <Text style={styles.productDescription}>{item.description}</Text>
            </View>
          ))}

      </ScrollView>
      <View style={styles.formContainer}>
        <Text style={styles.formTitle}>Add New Product</Text>
          <TextInput style={styles.input} placeholder="Enter the product name" 
                      value={name} onChangeText={setName} ></TextInput>
          <TextInput style={styles.input} placeholder="Enter the product price" 
                      value={price} onChangeText={setPrice} ></TextInput>
          <TextInput style={styles.input} placeholder="Enter the product description" 
                      value={description} onChangeText={setDescription} ></TextInput>

          <Pressable style={({pressed}) =>[
            styles.addButton,
            pressed && styles.addButtonPressed,
          ]} onPress={handleAddProduct}
          >
            <Text style={styles.addButtonText}>Add product</Text>
          </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  header: {
    backgroundColor: "#1e293b",
    paddingVertical: 20,
    paddingHorizontal: 16,
    paddingTop: Platform.OS === "ios" ? 60 : 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  listContainer: {
    padding: 16,
    paddingBottom: 8,
  },
  productItem: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: 6,
  },
  productPrice: {
    fontSize: 16,
    color: "#16a34a",
    fontWeight: "600",
    marginBottom: 4,
  },
  productDescription: {
    fontSize: 14,
    color: "#64748b",
  },
  formContainer: {
    backgroundColor: "white",
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    fontSize: 16,
    backgroundColor: "#f8fafc",
    color: "#1e293b",
  },
  addButton: {
    backgroundColor: "#1e293b",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  addButtonPressed: {
    backgroundColor: "#334155",
    transform: [{ scale: 0.98 }],
  },
  addButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

