import React from "react";
import { useSelector } from "react-redux";
import Layout from "../components/shared/Layout/Layout";
import { toast } from "react-toastify";
import Spinner from "../components/shared/Spinner";

const UserDashboard = () => {
  const { loading, error } = useSelector((state) => state.auth);

  return (
    <Layout>
      {error && <span>{toast.error(error)}</span>}
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="container">
            <div className="row">
              <div className="col"></div>
              <div className="col">2 of 3 (wider)</div>
              <div className="col-6">3 of 3</div>
            </div>
          </div>
        </>
      )}
    </Layout>
  );
};

export default UserDashboard;
