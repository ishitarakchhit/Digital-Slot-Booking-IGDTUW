import React, { useState } from "react";
import Layout from "../components/shared/Layout/Layout";
import Spinner from "../components/shared/Spinner";
import AllVenue from "../components/shared/Layout/AllVenue";
import { toast } from "react-toastify";
import VenueData from "../components/shared/Layout/VenueData";

const Venue = () => {
  // Load venues data from the imported file
  const [venueList, setVenueList] = useState(VenueData);

  // Simulating loading state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <Layout>
      {error && <span>{toast.error(error)}</span>}
      {loading ? (
        <Spinner />
      ) : (
        <div className="container">
          <div className="row">
            <AllVenue venues={venueList} />
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Venue;
