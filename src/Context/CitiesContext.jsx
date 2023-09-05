import { useContext, useState, useEffect, createContext } from "react";

const CitiesContext = createContext();

const base_url = "http://localhost:8000";

function CitiesProvider({ children }) {
  const [cities, setCities] = useState({});
  const [isLoading, setisLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(() => {
    async function fetchCities() {
      try {
        setisLoading(true);
        const res = await fetch(`${base_url}/cities`);
        const data = await res.json();
        setCities(data);
        // console.log(data);
      } catch (error) {
        alert("something went Wrong ");
      } finally {
        setisLoading(false);
      }
    }

    fetchCities();
  }, []);
  //// get city function

  async function getCity(id) {
    try {
      setisLoading(true);
      const res = await fetch(`${base_url}/cities/${id}`);
      const data = await res.json();
      setCurrentCity(data);
      console.log(data);
    } catch (error) {
      alert("something went Wrong ");
    } finally {
      setisLoading(false);
    }
  }

  async function createCity(newCity) {
    try {
      const res = await fetch(`${base_url}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      //   console.log(data);
      setCities((cities) => [...cities, data]);
    } catch (err) {
      console.log(err);
      alert("something went Wrong ");
    }
  }

  async function deleteCity(id) {
    try {
      setisLoading(true);
      await fetch(`${base_url}/cities/${id}`, {
        method: "DELETE",
      });

      setCities((cities) => cities.filter((city) => city.id !== id));
    } catch (error) {
      alert("something went Wrong ");
    } finally {
      setisLoading(false);
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === "undefined") throw new Error("Cities Provider in Undefined");
  return context;
}
export { CitiesProvider, useCities };
