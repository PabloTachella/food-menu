import React from "react";
import { searchDishes } from "../utils/getData";

const DishesFinder = () => {
  searchDishes('ris')
  return (
    <h2>Dishes Finder</h2>
  )
}

export default DishesFinder