import React, { useState } from "react";
import { baseUrl } from "../../utils/baseUrl";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const SleepResultComponent = ({ userId }) => {

  

  return (
    <>
      <section className="p-5 mt-5 sleep-quality__personal-info-box">
        <h1>Result</h1>
      </section>
    </>
  );
};

export default SleepResultComponent;
