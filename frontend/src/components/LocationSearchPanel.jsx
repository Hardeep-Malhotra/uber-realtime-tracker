import React, { useEffect, useState } from "react";
import axios from "axios";

const LocationSearchPanel = ({
  query,
  setPickup,
  setDestination,
  activeField,
}) => {

  const [suggestions, setSuggestions] = useState([]);

useEffect(() => {

  if (!query || query.trim() === "") {
    setSuggestions([]); // clear suggestions
    
    return;
  }

  const fetchSuggestions = async () => {

    try {

// sir ye backend se data a rha but     "http://localhost:4000/maps/get-suggestions" rout pr api lgi hui h 
      const res = await axios.get(
        "http://localhost:4000/maps/get-suggestions",
        {
          params: { input: query },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      setSuggestions(res.data);

    } catch (error) {
      console.log(error);
    }

  };

  fetchSuggestions();

}, [query]);
  return (
    <div>

      {suggestions.map((elem, index) => (

        <div
          key={index}
          onClick={() => {

            if (activeField === "pickup") {
              setPickup(elem.description);
            } else {
              setDestination(elem.description);
            }

          }}
          className="flex gap-3 rounded-xl border-gray-200 active:border-black border-2 p-3 my-2 items-center justify-start"
        >

          <h2 className="bg-[#eee] rounded-full h-6 w-9 mr-3 flex items-center justify-center">
            <i className="ri-map-pin-line text-xl"></i>
          </h2>

          <h4 className="font-medium">{elem.description}</h4>

        </div>

      ))}

    </div>
  );
};

export default LocationSearchPanel;