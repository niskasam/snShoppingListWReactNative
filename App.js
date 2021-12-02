import React, { useState } from "react";
import { Alert, FlatList, StyleSheet, View } from "react-native";
import { Header, Input, Button, ListItem, Icon } from "react-native-elements";

export default function App() {
  /* APP ICON BY Freepik */
  /* const input = React.createRef(); */

  const [shoppingData, setShoppingData] = useState([]);
  const [product, setProduct] = useState("");
  const [amount, setAmount] = useState("");

  const saveProduct = () => {
    if (product && amount) {
      setShoppingData([
        ...shoppingData,
        {
          id: shoppingData.length + 1,
          product: product,
          amount: amount,
        },
      ]);
    } else {
      Alert.alert("You need to give product and/or amount");
    }
  };

  const deleteProduct = (id) => {
    let filteredList = shoppingData.filter(function (item) {
      return item.id !== id;
    });
    setShoppingData(filteredList);
  };

  const deleteAllProducts = () => {
    Alert.alert("Warning!", "Are you sure you want to delete all products?", [
      {
        text: "No",
      },
      { text: "Yes I am sure", onPress: () => setShoppingData([]) },
    ]);
  };

  const clear = () => {
    setProduct("");
    setAmount("");
  };

  return (
    <View style={styles.container}>
      <Header
        leftComponent={{ icon: "menu", color: "#fff" }}
        centerComponent={{
          text: "Shopping list",
          style: { color: "#fff", fontSize: 18 },
        }}
        rightComponent={{
          icon: "home",
          color: "#fff",
        }}
      />
      <View style={styles.inputContainer}>
        <Input
          placeholder="Insert a product"
          label="Product"
          onChangeText={(product) => setProduct(product)}
          value={product}
        />

        <Input
          placeholder="Insert amount"
          label="Amount"
          onChangeText={(amount) => setAmount(amount)}
          value={amount}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          buttonStyle={styles.saveButton}
          raised
          icon={{ name: "save", color: "white" }}
          onPress={saveProduct}
          title="Save"
        />

        <Button
          buttonStyle={styles.clearButton}
          raised
          onPress={clear}
          title="Clear inputs"
        />
        <Button
          buttonStyle={styles.deleteButton}
          raised
          onPress={deleteAllProducts}
          title="Delete all products"
        />
      </View>
      <View style={styles.flatListContainer}>
        <FlatList
          keyExtractor={(item) => item.id}
          data={shoppingData}
          renderItem={({ item }) => (
            <ListItem bottomDivider>
              <ListItem.Content>
                <ListItem.Title>{item.product}</ListItem.Title>
                <ListItem.Subtitle>{item.amount}</ListItem.Subtitle>
              </ListItem.Content>
              <ListItem.Content style={styles.iconRight}>
                <Icon
                  onPress={() => deleteProduct(item.id)}
                  type="ionicon"
                  name="trash-outline"
                  color="#EB7E6F"
                />
              </ListItem.Content>
            </ListItem>
          )}
        ></FlatList>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    marginTop: 40,
  },

  inputContainer: {
    marginTop: 30,
    width: "100%",
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
  },

  clearButton: {
    backgroundColor: "black",
    marginLeft: 10,
  },

  deleteButton: {
    backgroundColor: "#EB7E6F",
    marginLeft: 10,
  },

  flatListContainer: {
    flex: 1,
    width: "100%",
    margin: 0,
  },

  iconRight: {
    alignItems: "flex-end",
    marginRight: 20,
  },
});
