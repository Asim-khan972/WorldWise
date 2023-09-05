import {
  useContext,
  useState,
  useEffect,
  createContext,
  useReducer,
} from "react";

const CitiesContext = createContext();

const base_url = "http://localhost:8000";

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };

    case "cities/loaded":
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };

    case "city/loaded":
      return { ...state, isLoading: false, currentCity: action.payload };

    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };

    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };

    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      throw new Error("Unknown action type");
  }
}
function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  );
  //   const [cities, setCities] = useState({});
  //   const [isLoading, setisLoading] = useState(false);
  //   const [currentCity, setCurrentCity] = useState({});

  useEffect(() => {
    async function fetchCities() {
      dispatch({ type: "loading" });
      try {
        // setisLoading(true);
        const res = await fetch(`${base_url}/cities`);
        const data = await res.json();
        // setCities(data);
        // console.log(data);
        dispatch({ type: "cities/loaded", payload: data });
      } catch (error) {
        dispatch({ type: "rejected", payload: "something went Wrong " });
      }
    }

    fetchCities();
  }, []);
  //// get city function

  async function getCity(id) {
    if (Number(id) === currentCity.id) return;
    try {
      dispatch({ type: "loading" });
      const res = await fetch(`${base_url}/cities/${id}`);
      const data = await res.json();
      //   setCurrentCity(data);
      //   console.log(data);
      dispatch({ type: "city/loaded", payload: data });
    } catch (error) {
      dispatch({ type: "rejected", payload: "something went Wrong " });
    }
  }

  async function createCity(newCity) {
    try {
      dispatch({ type: "loading" });
      const res = await fetch(`${base_url}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      //   console.log(data);
      //   setCities((cities) => [...cities, data]);
      dispatch({ type: "city/created", payload: data });
    } catch (err) {
      console.log(err);
      dispatch({ type: "rejected", payload: "something went Wrong " });
    }
  }

  async function deleteCity(id) {
    try {
      dispatch({ type: "loading" });
      await fetch(`${base_url}/cities/${id}`, {
        method: "DELETE",
      });

      //   setCities((cities) => cities.filter((city) => city.id !== id));
      dispatch({ type: "city/deleted", payload: id });
    } catch (error) {
      console.log(error);
      dispatch({ type: "rejected", payload: "something went Wrong " });
    }
  }

  console.log(cities, isLoading, error);
  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        error,
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
