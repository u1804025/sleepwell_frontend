import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { baseUrl } from "../../utils/baseUrl";
import "./appointment.css";

const PatientAppointmentComponent = () => {
  const { user } = useSelector((state) => state.auth);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { data } = await axios.get(`${baseUrl}/bookings`);
        setAppointments(data?.data);
      } catch (error) {
      }
    };

    if (user) {
      fetchAppointments();
    }
  }, [user]);

  return (
    <div className="container p-5">
      {appointments.length > 0 ? (
        <div>
          <div className="d-flex align-items-center justify-content-center">
            <table className="styled-table">
              <thead>
                <tr>
                  <th>Patient Name</th>
                  <th> Age</th>
                  <th>Reason</th>
                  <th>Appointment Time</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appointment) => (
                  user?._id === appointment.doctor?._id && (
                    <tr key={appointment.id}>
                      <td>{appointment?.patient?.name}</td>
                      <td>{appointment?.patient?.age}</td>
                      <td>{appointment?.reason}</td>
                      <td>{new Date(appointment?.appointmentTime).toLocaleString()}</td>
                    </tr>
                  )
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <p className="pt-5">No appointments found.</p>
      )}
    </div>
  );
};

export default PatientAppointmentComponent;
