import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Layout from "../components/shared/Layout/Layout";
import { toast } from "react-toastify";
import Spinner from "../components/shared/Spinner";
import { useNavigate } from "react-router-dom";
import API from "../services/API";
import moment from "moment";
import { RiDeleteBin6Line } from "react-icons/ri";

const UserDashboard = () => {
  const { loading, error, user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);
  const [counts, setCounts] = useState({});
  const navigate = useNavigate();
  const [status, setStatus] = useState(
    localStorage.getItem("status") || "pending"
  );

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    localStorage.setItem("status", newStatus); // Store status in localStorage
  };

  useEffect(() => {
    const savedStatus = localStorage.getItem("status");
    if (savedStatus) {
      setStatus(savedStatus);
    }
    getSlotRecords();
    getSlotCounts(); // Fetch counts whenever status changes or on mount
  }, [status]);

  const getSlotRecords = async () => {
    try {
      const userId = user?._id; // Ensure user ID is available
      const response = await API.get(`/slot/get-slots/${status}`, {
        params: {
          userId,
        },
      });
      if (response.data?.success) {
        setData(response.data?.slots); // Ensure the response key is correct
      }
    } catch (error) {
      console.log(
        "API Error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const getSlotCounts = async () => {
    try {
      const response = await API.get("/slot/get-slot-count");
      if (response.data?.success) {
        setCounts(response.data?.counts);
      }
    } catch (error) {
      console.log(
        "API Error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleCancelSlot = async (slotId) => {
    try {
      const response = await API.put(`/slot/update-status/${slotId}`, {
        status: "cancelled",
      });
      if (response.data?.success) {
        toast.success("Your Booked Slot is Removed Successfully");
        getSlotRecords(); // Refresh slot records
        getSlotCounts(); // Refresh counts
      } else {
        toast.error("Failed to update slot status");
      }
    } catch (error) {
      console.log(
        "API Error:",
        error.response ? error.response.data : error.message
      );
      toast.error("Error updating slot status");
    }
  };

  return (
    <Layout>
      {user?.role === "admin" && navigate("/adminDashboard")}
      {error && <span>{toast.error(error)}</span>}
      {loading ? (
        <Spinner />
      ) : (
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="status-table-container">
                <div className="box">
                  <h4>Status Counts</h4>
                  <p>Pending: {counts.pendingCount || 0}</p>
                  <p>Approved: {counts.approvedCount || 0}</p>
                  <p>Declined: {counts.declinedCount || 0}</p>
                  <p>Cancelled: {counts.cancelledCount || 0}</p>
                </div>
                <div className="table-container">
                  <div className="flex-row">
                    <span
                      onClick={() => handleStatusChange("pending")}
                      style={{
                        cursor: "pointer",
                        fontWeight: status === "pending" ? "bold" : "normal",
                      }}
                    >
                      Pending
                    </span>
                    <span
                      onClick={() => handleStatusChange("approved")}
                      style={{
                        cursor: "pointer",
                        fontWeight: status === "approved" ? "bold" : "normal",
                      }}
                    >
                      Approved
                    </span>
                    <span
                      onClick={() => handleStatusChange("declined")}
                      style={{
                        cursor: "pointer",
                        fontWeight: status === "declined" ? "bold" : "normal",
                      }}
                    >
                      Declined
                    </span>
                    <span
                      onClick={() => handleStatusChange("cancelled")}
                      style={{
                        cursor: "pointer",
                        fontWeight: status === "cancelled" ? "bold" : "normal",
                      }}
                    >
                      Cancelled
                    </span>
                  </div>
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">Date</th>
                        <th scope="col">Event Name</th>
                        <th scope="col">Society</th>
                        <th scope="col">Issuer Name</th>
                        <th scope="col">Venue</th>
                        <th scope="col">Equipments Required</th>
                        <th scope="col">Start Time</th>
                        <th scope="col">End Time</th>
                        <th scope="col">Update Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data?.map((record) => (
                        <tr key={record._id}>
                          <td>{moment(record.date).format("DD/MM/YYYY")}</td>
                          <td>{record.eventName}</td>
                          <td>{record.society}</td>
                          <td>{record.issuerName} (ML)</td>
                          <td>{record.venue}</td>
                          <td>{record.equipments.join(", ")}</td>
                          <td>{record.startTime}</td>
                          <td>{record.endTime}</td>
                          <td>
                            {status === "pending" ? (
                              <RiDeleteBin6Line
                                onClick={() => handleCancelSlot(record._id)}
                                style={{ cursor: "pointer", color: "red" }}
                              />
                            ) : (
                              <span
                                style={{
                                  color:
                                    record.status === "approved"
                                      ? "green"
                                      : record.status === "declined"
                                      ? "red"
                                      : record.status === "cancelled"
                                      ? "gray"
                                      : "black",
                                }}
                              >
                                {record.status.charAt(0).toUpperCase() +
                                  record.status.slice(1)}
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default UserDashboard;
