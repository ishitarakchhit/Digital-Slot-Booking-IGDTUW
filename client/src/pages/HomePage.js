import React from "react";
import { useSelector } from "react-redux";
import Layout from "../components/shared/Layout/Layout";
import Spinner from "../components/shared/Spinner";
import { toast } from "react-toastify";

export const HomePage = () => {
  const { loading, error } = useSelector((state) => state.auth);
  console.log(loading);
  console.log(error);
  return (
    <Layout>
      {error && <span>{toast.error(error)}</span>}
      {loading ? (
        <Spinner />
      ) : (
        <>
          <h1>HomePage</h1>
        </>
      )}
    </Layout>
  );
};
