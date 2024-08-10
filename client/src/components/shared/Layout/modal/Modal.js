import React, { useState } from "react";
import { useSelector } from "react-redux";
import API from "../../../../services/API";
import { toast } from "react-toastify";
import InputType from "../../Form/InputType";

const Modal = ({ venueName }) => {
  const { user } = useSelector((state) => state.auth);
  const [email] = useState(user?.email || "");
  const [issuerName] = useState(user?.name || "");
  const [venue] = useState(venueName);
  const [society, setSociety] = useState("");
  const [eventName, setEventName] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [equipments, setEquipments] = useState([]);
  const [status] = useState("pending");

  console.log("User State:", user);
  const handleEquipmentChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setEquipments([...equipments, value]);
    } else {
      setEquipments(equipments.filter((equipment) => equipment !== value));
    }
  };

  const handleModalSubmit = async () => {
    console.log("Email:", email);
    console.log("Issuer Name:", issuerName);
    console.log("Venue:", venue);
    console.log("Society:", society);
    console.log("Event Name:", eventName);
    console.log("Date:", date);
    console.log("Start Time:", startTime);
    console.log("End Time:", endTime);
    console.log("Equipments:", equipments);
    console.log("Status:", status);

    try {
      if (
        !venue ||
        !society ||
        !eventName ||
        !date ||
        !startTime ||
        !endTime ||
        equipments.length === 0 || // Ensure equipments is not an empty array
        !status
      ) {
        return toast.error("Please Provide All Fields");
      }

      const payload = {
        email,
        venue,
        society,
        eventName,
        date,
        startTime,
        endTime,
        issuerName,
        equipments,
        status,
      };

      console.log("Payload:", payload); // Log the payload to ensure correct data is being sent

      const { data } = await API.post("/slot/create-slot", payload);

      if (data?.success) {
        toast.success("New Slot Created");
        //navigate to /venue
        window.location.href = "/userdashboard";
      } else {
        toast.error(data?.message || "Slot creation failed");
      }
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Slot creation failed");
    }
  };

  return (
    <div
      className="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex={-1}
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="staticBackdropLabel">
              Event Details
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div className="modal-body">
            {/* Other input fields like Society, Event Name, etc. */}
            <InputType
              labelText={"Society"}
              labelFor={"forSociety"}
              inputType={"text"}
              value={society}
              onChange={(e) => setSociety(e.target.value)}
            />
            <InputType
              labelText={"Event Name"}
              labelFor={"forEventName"}
              inputType={"text"}
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
            />
            <InputType
              labelText={"Date"}
              labelFor={"forDate"}
              inputType={"date"}
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <InputType
              labelText={"Start Time"}
              labelFor={"forStartTime"}
              inputType={"time"}
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
            <InputType
              labelText={"End Time"}
              labelFor={"forEndTime"}
              inputType={"time"}
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />

            <div className="mb-3">
              <label className="form-label">Equipments</label>
              <div>
                {["Podium", "Projector", "Screen", "AC", "Mic"].map(
                  (equipment) => (
                    <div key={equipment} className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={equipment}
                        value={equipment}
                        onChange={handleEquipmentChange}
                      />
                      <label className="form-check-label" htmlFor={equipment}>
                        {equipment}
                      </label>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleModalSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
