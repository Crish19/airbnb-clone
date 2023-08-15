import React, { useEffect, useState } from "react";
import Perks from "../Perks";
import axios from "axios";
import AccountLinks from "../AccountLinks";
import ImgUploader from "../ImgUploader";
import { Navigate, useParams } from "react-router-dom";
 
function PlacesFormPage() {
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [price, setPrice] = useState(100);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/places/" + id).then((response) => {
      const { data } = response;
      setTitle(data.title);
      setAddress(data.address);
      setAddedPhotos(data.photos);
      setDescription(data.description);
      setPerks(data.perks);
      setExtraInfo(data.extraInfo);
      setCheckIn(data.checkIn);
      setCheckOut(data.checkOut);
      setMaxGuests(data.maxGuests);
      setPrice(data.price);
    });
  }, [id]);

  async function savePlace(ev) {
    ev.preventDefault();
    const placeData = {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    };
    if (id) {
      // update
      await axios.put("/places", {
        id,
        ...placeData,
      });
      setRedirect(true);
    } else {
      // new place
      await axios.post("/places", placeData);
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={"/account/places"} />;
  }

  return (
    <div>
      <AccountLinks />
      <form onSubmit={savePlace}>
        {/* Title */}
        <div>
          <h2 className="text-2xl mt-4">Title</h2>
          <p className="text-gray-500 text-sm">Title for your place</p>
          <input
            type="text"
            value={title}
            onChange={(ev) => setTitle(ev.target.value)}
            placeholder="title, for example: My lovely apt"
          />
        </div>

        {/* Address */}
        <div>
          <h2 className="text-2xl mt-4">Address</h2>
          <p className="text-gray-500 text-sm">Address to this place</p>
          <input
            type="text"
            value={address}
            onChange={(ev) => setAddress(ev.target.value)}
            placeholder="address"
          />
        </div>

        {/* Photos */}
        <ImgUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
        {/* Description */}
        <div>
          <h2 className="text-2xl mt-4">Description</h2>
          <p className="text-gray-500 text-sm">description of the place</p>
          <textarea
            value={description}
            onChange={(ev) => setDescription(ev.target.value)}
          />
        </div>

        {/* Perks */}
        <div>
          <h2 className="text-2xl mt-4">Perks</h2>
          <p className="text-gray-500 text-sm">
            select the perks of your place
          </p>
          <Perks selected={perks} onChange={setPerks} />
        </div>

        {/* Extra info */}
        <div>
          <h2 className="text-2xl mt-4">Extra info</h2>
          <p className="text-gray-500 text-sm">house rules, etc</p>
          <textarea
            value={extraInfo}
            onChange={(ev) => setExtraInfo(ev.target.value)}
          />
        </div>

        {/* Check in & out times */}
        <div>
          <h2 className="text-2xl mt-4">Check in &amp; out times</h2>
          <p className="text-gray-500 text-sm">
            add check-in and check-out times
          </p>
          {/* Check in and out times inputs */}
          <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-4">
            <div>
              <h3 className="mt-2 -mb-1">Check in time</h3>
              <input
                type="text"
                value={checkIn}
                onChange={(ev) => setCheckIn(ev.target.value)}
                placeholder="14"
              />
            </div>
            <div>
              <h3 className="mt-2 -mb-1">Check out time</h3>
              <input
                type="text"
                value={checkOut}
                onChange={(ev) => setCheckOut(ev.target.value)}
                placeholder="11"
              />
            </div>

            {/* Max number of guests */}
            <div>
              <h3 className="mt-2 -mb-1">Max number of guests</h3>
              <input
                type="number"
                value={maxGuests}
                onChange={(ev) => setMaxGuests(ev.target.value)}
              />
            </div>
             {/* Price */}
             <div>
              <h3 className="mt-2 -mb-1">Price per night</h3>
              <input
                type="number"
                value={price}
                onChange={(ev) => setPrice(ev.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Save button */}
        <button className="primary my-4">Save</button>
      </form>
    </div>
  );
}

export default PlacesFormPage;
