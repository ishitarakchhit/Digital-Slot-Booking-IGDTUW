import React from "react";
import Modal from "./modal/Modal";

const AllVenue = ({ venues }) => {
  return (
    <div className="row">
      {venues.map((venue) => (
        <div key={venue.id} className="col-md-4 mb-4">
          <div className="card">
            <img
              src={venue.pictureUrl}
              alt={venue.name}
              className="card-img-top"
            />
            <div className="card-body flex-row">
              <h5 className="card-title">{venue.name}</h5>
              <p
                className="ms-4"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
                style={{ cursor: "pointer" }}
              >
                Book
              </p>
              <Modal venueName={venue.name} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllVenue;
