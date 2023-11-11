import React, { useCallback, useEffect } from "react";
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
import { featchLocations, featchWeatherForescast } from "../api/weather";
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
import MyComponent from "../components/home/ProductBoxContainer";
import { productsStat } from "../@types/products";

export const HomeScreen: React.FC = () => {
  const [showSearch, toggleSearch] = React.useState(false);
  const [locations, setLocation] = React.useState([]);
  const [weather, setWeather] = React.useState<Weather>({} as Weather);
  const [loading, setLoading] = React.useState(true);

  const handleLocation = (item: Location) => {
    setLocation([]);
    toggleSearch(false);
    storageData("city", item.name);
    setLoading(true);
    featchWeatherForescast({
      cityName: item.name,
      days: "7",
    })
      .then((data) => {
        setWeather(data);
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSearch = (value: string) => {
    if (value.length > 2) {
      featchLocations({ cityName: value }).then((data) => {
        setLocation(data);
      });
    }
  };

  useEffect(() => {
    fetchMyWeatherData();
  }, []);

  const fetchMyWeatherData = async () => {
    try {
      let myCity = await getData("city");
      let cityName = myCity ? myCity : "Paris";

      const data = await featchWeatherForescast({
        cityName: cityName,
        days: "7",
      });

      setWeather(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setLoading(false);
    }
  };

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
            locations={locations}
            handleLocation={handleLocation}
          />
          {/* <ScrollView> */}
          {/* <ProductBoxContainer products={productsStat} /> */}
          <MyComponent products={productsStat} />
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
    backgroundColor: "#A8A8A8",
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
