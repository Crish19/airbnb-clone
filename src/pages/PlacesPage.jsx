import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AccountLinks from "../AccountLinks";
import axios from "axios";

function PlacesPage() {
  const [places, setPlaces] = useState([]);

  // Fetch the list of places from the API when the component mounts
  useEffect(() => {
    async function fetchPlaces() {
      try {
        const response = await axios.get("/user-places");
        setPlaces(response.data);
      } catch (error) {
        console.error("Error fetching places:", error);
      }
    }
    fetchPlaces();
  }, []);

  return (
    <div>
      <AccountLinks />
      <div className="text-center">
        <Link
          to="/account/places/new"
          className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
              clipRule="evenodd"
            />
          </svg>
          Add new place
        </Link>
      </div>
      <div className=" mt-4">
        {places.length > 0 &&
          places.map((place) => (
            <Link
              key={place.id} // revisar esto si va o no . 
              to={"/account/places/" + place._id}
              className=" flex cursor-pointer gap-4 bg-gray-100 p-4 rounded-2xl"
            >
              <div className=" flex w-32 h-32 bg-gray-300 flex-shrink-0">
                {place.photos?.length > 0 && (
                  <img
                    className=" object-cover w-full h-full"
                    src={"http://localhost:4000/uploads/" + place.photos[0]}
                    alt=""
                  />
                )}
              </div>
              <div className=" grow-0">
                <h2 className=" text-xl">{place.title}</h2>
                <p className=" text-sm mt-2">{place.description}</p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}

export default PlacesPage;
