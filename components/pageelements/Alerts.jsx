import React, { useState, useEffect } from "react";

const Alert = ({ alert, alertMode }) => {
  return (
    <div className={`user_update_pg alert_box_style alert_${alertMode}`}>
      {alert}
    </div>
  );
};

export default Alert;
