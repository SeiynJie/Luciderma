import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";

const Dashboard = () => {
  const { aToken, dashData, getDashboardData, cancelAppointment } =
    useContext(AdminContext);


  // Get dash data on load
  useEffect(() => {
    if (aToken) {
      getDashboardData();
    }
  }, [aToken]);
  return (
    <div>
      <p>Dashboard</p>
    </div>
  );
};

export default Dashboard;
