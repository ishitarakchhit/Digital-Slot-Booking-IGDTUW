import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Spinner from "../components/shared/Spinner";
import { useNavigate } from "react-router-dom";
import API from "../services/API";
import moment from "moment";
import Header from "../components/shared/Layout/Header";
import { TiTick } from "react-icons/ti";
import { ImCross } from "react-icons/im";

const AdminDashboard = () => {
  const { loading, error, user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);
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
    getSlotRecords(); // Fetch records whenever status changes or on mount
  }, [status]);

  const getSlotRecords = async () => {
    try {
      const response = await API.get(`/slot/get-slots/${status}`);
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

  const updateSlotStatus = async (slotId, newStatus) => {
    try {
      const response = await API.put(`/slot/update-status/${slotId}`, {
        status: newStatus,
      });
      if (response.data?.success) {
        toast.success("Slot status updated successfully");
        getSlotRecords(); // Refresh the slot records
      }
    } catch (error) {
      console.log(
        "API Error:",
        error.response ? error.response.data : error.message
      );
      toast.error("Failed to update slot status");
    }
  };

  return (
    <>
      {user?.role === "student" && navigate("/userDashboard")}
      {error && <span>{toast.error(error)}</span>}
      {loading ? (
        <Spinner />
      ) : (
        <div className="container">
          <div className="header">
            <Header />
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
                  <th scope="col">Change Status</th>
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
                      {record.status === "pending" ? (
                        <div className="flex-row">
                          <TiTick
                            onClick={() =>
                              updateSlotStatus(record._id, "approved")
                            }
                            style={{
                              cursor: "pointer",
                              color: "green",
                              marginRight: "10px",
                            }}
                          />
                          <ImCross
                            onClick={() =>
                              updateSlotStatus(record._id, "declined")
                            }
                            style={{ cursor: "pointer", color: "red" }}
                          />
                        </div>
                      ) : (
                        <span
                          style={{
                            color:
                              record.status === "approved" ? "green" : "red",
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
      )}
    </>
  );
};

export default AdminDashboard;
