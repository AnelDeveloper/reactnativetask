import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useEffect } from "react";
import { Image, RefreshControl, ScrollView, StyleSheet, View } from "react-native";
import { Appbar, DataTable, FAB } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import { selectors, actions } from "./store/inventory";
import { RootState } from "./store";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackScreenProps } from "@react-navigation/stack";
import { FlatList } from "react-native-gesture-handler";
import { Card } from "react-native-paper";
import { Text } from "react-native-paper";
import { Product } from "./Product";
import { Categories } from "./Categories";
export default (props: StackScreenProps<{}>) => {
  const fetching = useSelector((state: RootState) => state.inventory.fetching);
  const inventory = useSelector(selectors.selectInventory);

  const dispatch = useDispatch();



  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      dispatch(actions.fetchInventory());
    });
    return unsubscribe;
  }, [props.navigation]);

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header style={styles.header} >
        <Appbar.Content style={styles.tit} title="Inventory" />

      </Appbar.Header>

      <ScrollView
        style={{ flex: 1 }}
        refreshControl={
          <RefreshControl
            refreshing={fetching}
            onRefresh={() => dispatch(actions.fetchInventory())}
          />
        }
      >

        <View style={styles.products}>

          <Product {...props} />
        </View>
      </ScrollView>


      <SafeAreaView style={styles.fab}>
        <FAB
          icon={() => (
            <MaterialCommunityIcons
              name="barcode"
              size={24}
              color="#0B5549"
            />
          )}
          label="Scan Product"
          onPress={() => props.navigation.navigate("Camera")}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    bottom: 16,
    width: "100%",
    flex: 1,
    alignItems: "center"
  },


  header: {
    height: 90, width: "100%",


  },



  tit: {
    justifyContent: 'center', alignItems: 'center', top: 8, fontWeight: '100'



  },

  products: {
    justifyContent: 'center', alignItems: 'center', flex: 1, width: 'auto', height: 'auto', padding: 8
  }





});
