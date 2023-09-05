import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./Pages/HomePage";
import PageNotFound from "./Pages/PageNotFound";
import AppLayout from "./Pages/AppLayout";
import Product from "./Pages/Product";
import Pricing from "./Pages/Pricing";
import Login from "./Pages/Login";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";

import { CitiesProvider } from "./Context/CitiesContext";

function App() {
  return (
    <>
      <CitiesProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/app" element={<AppLayout />} />
            <Route path="/product" element={<Product />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/app" element={<AppLayout />}>
              <Route index element={<Navigate replace to="cities" />} />
              <Route path="cities" element={<CityList />} />
              <Route path="cities/:id" element={<City />} />
              <Route path="countries" element={<CountryList />} />
              <Route path="form" element={<Form />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </CitiesProvider>
    </>
  );
}

export default App;
