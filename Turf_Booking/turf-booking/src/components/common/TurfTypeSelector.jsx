import React, { useState, useEffect } from "react";
import { getTurfLocations } from "../utils/ApiFunctions"; 

const TurfTypeSelector = ({ handleTurfInputChange, newTurf }) => {
  const [turfLocations, setTurfLocations] = useState([""]);
  const [showNewTurfLocationInput, setShowNewTurfLocationInput] = useState(false);
  const [newTurfLocation, setNewTurfLocation] = useState("");

  // Fetch turf types from API
  useEffect(() => {
    getTurfLocations().then((data) => { 
      setTurfLocations(data);
    });
  }, []);

  // Handle new turf type input change
  const handleNewTurfLocationInputChange = (e) => {
    setNewTurfLocation(e.target.value);
  };

  // Add a new turf type to the list
  const handleAddNewTurfLocation = () => {
    if (newTurfLocation !== "") {
      setTurfLocations([...turfLocations, newTurfLocation]);
      setNewTurfLocation(""); // Clear input after adding
      setShowNewTurfLocationInput(false); // Hide input field after adding
    }
  };

  return (
    <>
      {turfLocations.length > 0 && (
        <div>
          <select
            required
            className="form-select"
            name="turfLocation"
            value={newTurf.turfLocation}
            onChange={(e) => {
              const selectedValue = e.target.value;
              if (selectedValue === "Add New") {
                setShowNewTurfLocationInput(true);
              } else {
                handleTurfInputChange(e);
              }
            }}
          >
            <option value="">Select a turf location</option>
            <option value="Add New">Add New</option>
            {turfLocations.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>

          {showNewTurfLocationInput && (
            <div className="mt-2">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter New Turf Location"
                  value={newTurfLocation}
                  onChange={handleNewTurfLocationInputChange}
                />
                <button
                  className="btn btn-turf"
                  type="button"
                  onClick={handleAddNewTurfLocation}
                >
                  Add
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default TurfTypeSelector;
