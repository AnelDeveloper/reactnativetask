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

import { useState } from "react";



export const Product = (props: StackScreenProps<{}>) => {

    const fetching = useSelector((state: RootState) => state.inventory.fetching);
    const inventory = useSelector(selectors.selectInventory);

    const [data, setData] = useState();


    const dispatch = useDispatch();



    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            dispatch(actions.fetchInventory());
        });
        return unsubscribe;
    }, [props.navigation]);

    const currentMonth = new Date();
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    console.log(months[currentMonth.getMonth()]);


    var date = new Date();

    // add a day
    date.setDate(date.getDate() - 7);


    return (

        <FlatList
            data={inventory}
            renderItem={({ item }) =>

                <Card style={styles.card}>
                    <Image style={styles.img} source={{ uri: item.fields["Product Image"] ? item.fields["Product Image"] : "https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png?w=640" }}

                    />
                    <View style={styles.productWhole}>
                        <View style={styles.NameAndDate}>



                            <View style={styles.productName}>
                                <Text style={styles.name}>
                                    {item.fields["Product Name"]}
                                </Text>
                                <Text style={styles.productDate}>
                                    {new Date(item.fields.Posted).toDateString()}{" "}
                                </Text>
                            </View>



                        </View>

                        <View style={styles.new}>

                        </View>







                        <View style={styles.ProductCategorie}>
                            {item.fields["Product Categories"]?.replace(/[^a-zA-Z ]/g, "")?.split(" ", 3).map((category) =>
                                <Text style={styles.nameOfCategories}>
                                    {category}

                                </Text>
                            )}
                        </View>
                    </View>
                </Card>
            }
        />


    );
}

const styles = StyleSheet.create({

    // <Text style={styles.name}>{item.fields["Product Name"]}</Text>

    name: {

        fontFamily: 'Roboto',
        fontSize: 20,
        fontStyle: 'normal',
        fontWeight: '900',
        lineHeight: 22,
        color: '#1a2532',


    },

    card: {
        flexDirection: 'row', alignItems: 'flex-start', padding: 8, backgroundColor: '#F8F9FC', borderRadius: 4, margin: 6, width: 'auto', height: 130,
    },

    img: {
        height: 113, width: 85, position: "absolute", justifyContent: 'flex-start', alignItems: 'flex-start'
    },



    productWhole: {
        flexDirection: 'column', justifyContent: 'flex-start', padding: 7, alignItems: 'flex-end'

    },

    productDate: {

        marginTop: 3, fontSize: 12, fontWeight: '400',
    },




    NameAndDate: {
        width: 230,



    },

    productName: {
        fontFamily: 'Roboto', fontWeight: '900', paddingBottom: 4

    },

    ProductCategorie: {

        justifyContent: "center",


        alignItems: "center",







    }

    ,
    nameOfCategories: {
        marginBottom: 5,


        backgroundColor: "#D5E6FF",
        borderRadius: 48,
        padding: 4,
        alignItems: "center"




    }

});



