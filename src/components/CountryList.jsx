import React from "react";
import CountryItem from "./CountryItem";
// import Message from "./Message";
import Spinner from "./Spinner";
import styles from "./CountryList.module.css";
import { useCities } from "../Context/CitiesContext";
function CityList() {
  //   console.log(cities, isLoading);
  const { cities, isLoading } = useCities();
  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );

  const countries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country))
      return [...arr, { country: city.country, emoji: city.emoji }];
    else return arr;
  }, []);

  return (
    <ul className={styles.cityList}>
      {cities.map((country) => (
        <CountryItem country={country} key={country.id} />
      ))}
    </ul>
  );
}

export default CityList;
