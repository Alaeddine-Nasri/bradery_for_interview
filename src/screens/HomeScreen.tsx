import React, { useCallback, useEffect, useState } from "react";
import {
  Dimensions,
  View,
  Image,
  SafeAreaView,
  TextInput,
  Platform,
  StatusBar as StatusB,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import { debounce } from "lodash";
import { StatusBar } from "expo-status-bar";
import { theme } from "../theme";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { CalendarDaysIcon, MapPinIcon } from "react-native-heroicons/solid";
import * as Progress from "react-native-progress";
import { getData, storageData } from "../storage/asyncStorage";
import { Location, Weather, WeatherImages, WeatherPT } from "../util/types";

import SearchBar from "../components/home/SearchBar";
import WeatherInfo from "../components/home/WeatherInfo";
import DailyForecast from "../components/home/DailyForecast";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import TopBar from "../components/home/TopBar";
import ProductBox from "../components/home/ProductBox";
import ProductBoxContainer from "../components/home/ProductBoxContainer";
import AdsBoxScroller from "../components/home/AdsBoxScroller";
import { productsStat } from "../@types/products";
import { Product } from "../@types/product";
import { fetchProducts } from "../api/productAPI";
import axios from "axios";
import { colors } from "../theme/sizes";
import Filtre from "../components/home/Filtre";
// import { fetchProducts } from "../api/productAPI";

export const HomeScreen: React.FC = () => {
  const [showSearch, toggleSearch] = React.useState(false);
  const [locations, setLocation] = React.useState([]);
  const [weather, setWeather] = React.useState<Weather>({} as Weather);
  const [loading, setLoading] = React.useState(true);
  const [productslist, setProducts] = useState<Product[]>([]); // State to store products

  const handleSearch = (value: string) => {
    // if (value.length > 2) {
    // fetchProducts().then((data) => {
    //   setLocation(data);
    // });
    // }
  };
  const [selectedFilter, setSelectedFilter] = React.useState<string>("");

  const handleFilterPress = (filter: string) => {
    // console.log(`Filter pressed: ${filter}`);
    setSelectedFilter(filter);
  };

  useEffect(() => {
    console.log("klfkslf");
    axios
      .get("http://localhost:3000/api/product")
      .then((response) => {
        console.log("klfksf");
        console.log(response.data);
      })
      .catch((error) => {
        console.log("klfkslf");
        console.log(error);
      });
    fetchMyWeatherData();
    // fetchProducts();
  }, []);

  const fetchMyWeatherData = async () => {
    try {
      let myCity = await getData("city");
      let cityName = myCity ? myCity : "Paris";

      // const data = await featchWeatherForescast({
      //   cityName: cityName,
      //   days: "7",
      // });

      // setWeather(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setLoading(false);
    }
  };
  // useEffect(() => {
  //   // Fetch products when the component mounts
  //   fetchProducts()
  //     .then((data) => {
  //       setProducts(data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching products:", error);
  //     });

  //   // Fetch weather data (rest of your code remains the same)
  // }, []);

  const handleTextDebouce = useCallback(
    debounce((value: string) => handleSearch(value), 1200),
    []
  );
  const { current, location } = weather;
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <SafeAreaView
        style={{
          flex: 1,
          marginTop: 4,
          paddingTop: Platform.OS === "android" ? StatusB.currentHeight : 0,
        }}
      >
        <TopBar current={current} />
        <View style={styles.MainScreenContainer}>
          <AdsBoxScroller products={productsStat} />
          <SearchBar
            showSearch={showSearch}
            toggleSearch={toggleSearch}
            handleTextDebouce={handleTextDebouce}
          />
          {/* <ScrollView> */}
          {/* <ProductBoxContainer products={productsStat} /> */}
          <Filtre
            onFilterPress={handleFilterPress}
            selectedFilter={selectedFilter}
          />
          <ProductBoxContainer products={productsStat} />
          {/* </ScrollView> */}
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "auto",
    flex: 1,
    width: "100%",
    backgroundColor: "Transparent",
    flexDirection: "column",
  },
  MainScreenContainer: {
    height: "auto",
    flex: 1,
    width: "100%",
    paddingHorizontal: "2%",
    backgroundColor: colors.maingrey,
    flexDirection: "column",
  },
  ProductContainer: {
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  loadingContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
