import React, { useState } from "react";
import { baseUrl } from "../../utils/baseUrl";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const SleepQualityComponent = ({ userId }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const predefinedReasons = [
    { "reason": "fever", "solve": "Take paracetamol, drink plenty of fluids, and rest." },
    { "reason": "headache", "solve": "Take a pain reliever such as ibuprofen, rest in a dark, quiet room, and stay hydrated." },
    { "reason": "stomach ache", "solve": "Drink ginger tea, avoid spicy foods, and rest." },
    { "reason": "cold", "solve": "Drink warm fluids, use a humidifier, and rest." },
    { "reason": "sore throat", "solve": "Gargle with salt water, drink warm tea with honey, and use throat lozenges." },
    { "reason": "muscle pain", "solve": "Apply a warm compress, stretch gently, and take an over-the-counter pain reliever." },
    { "reason": "allergies", "solve": "Take antihistamines, avoid allergens, and use a nasal spray." },
    { "reason": "cough", "solve": "Drink warm honey and lemon tea, use cough drops, and avoid irritants like smoke." }
  ];

  const [formData, setFormData] = useState({
    userId: user ? user?._id : "",
    sleepTime: "",
    wakeUp: "",
    quality: "",
    reason: "--",
    solve: "--",
    qn1: 0,
    qn2: 0,
    qn3: 0,
    qn4: 0,
    qn5: 0,
    qn6: 0,
    qn7: 0,
    qn8: 0,
    qn9: 0,
    qn10: 0,
    qn11: 0,
    qn12: 0,
    qn13: 0,
    qn14: 0,
    qn15: 0,
    qn16: 0
  });

  const {
    sleepTime,
    wakeUp,
    reason,
    solve,
    qn1,
    qn2,
    qn3,
    qn4,
    qn5,
    qn6,
    qn7,
    qn8,
    qn9,
    qn10,
    qn11,
    qn12,
    qn13,
    qn14,
    qn15,
    qn16
  } = formData;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Calculate the sums for each state
    const stateOne = parseInt(qn1) + parseInt(qn16);
    const stateTwo = parseInt(qn10) + parseInt(qn13);
    const stateThree = parseInt(qn2);
    const stateFour = 2;
    const stateFive =
      parseInt(qn4) +
      parseInt(qn5) +
      parseInt(qn6) +
      parseInt(qn7) +
      parseInt(qn8) +
      parseInt(qn9) +
      parseInt(qn10) +
      parseInt(qn11) +
      parseInt(qn12);
    const stateSix = parseInt(qn13);
    const stateSeven = parseInt(qn15) + parseInt(qn16);

    // Calculate the final state value
    const finalStateValue =
      stateOne +
      stateTwo +
      stateThree +
      stateFour +
      stateFive +
      stateSix +
      stateSeven;

    // Determine the quality based on the final state value
    let qualityValue = "Bad";
    if (finalStateValue >= 0 && finalStateValue <= 4) {
      qualityValue = "Good";
    } else if (finalStateValue >= 5 && finalStateValue <= 10) {
      qualityValue = "Fairly Good";
    } else if (finalStateValue >= 11 && finalStateValue <= 15) {
      qualityValue = "Fairly Bad";
    } else {
      qualityValue = "Bad";
    }
    let selectedReason = reason;
    let selectedSolve = solve;
  if (qualityValue === "Bad" || qualityValue === "Fairly Bad") {
    const randomIndex = Math.floor(Math.random() * predefinedReasons.length);
    selectedReason = predefinedReasons[randomIndex].reason;
    selectedSolve = predefinedReasons[randomIndex].solve;
  }

    try {
      const response = await fetch(`${baseUrl}/sleep-quality`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId: formData.userId,
          sleepTime: formData.sleepTime,
          wakeUp: formData.wakeUp,
          quality: qualityValue,
          reason: selectedReason,
          solve: selectedSolve
        })
      });
      if (response.ok) {
        // Handle success
        console.log("Sleep quality data submitted successfully");
        navigate("/result"); // Assuming you want to navigate after successful submission
      } else {
        // Handle error
        console.error("Submission failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSelectChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <section className="p-5 mt-5 sleep-quality__personal-info-box">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-6 col-lg-6">
              <div className="sleep-quality__left p-0 m-0">
                <div className="sleep-quality__form">
                  <form onSubmit={handleSubmit} className="comment-one__form sleep-quality-form-validated" noValidate>
                    <div className="row">
                      <div className="col-xl-12">
                        <div className="comment-form__input-box">
                          <input type="text" placeholder="Sleep Time" name="sleepTime" value={sleepTime} onChange={handleChange} />
                        </div>
                      </div>
                      <div className="col-xl-12">
                        <div className="comment-form__input-box">
                          <input type="text" placeholder="Wake Up Time" name="wakeUp" value={wakeUp} onChange={handleChange} />
                        </div>
                      </div>
                      <div className="col-xl-12">
                        <div className="comment-form__input-box">
                          <label>During the past month, how long (in minutes) has it usually taken you to fall asleep each night?</label>
                          <select name="qn1" value={qn1} onChange={handleSelectChange}>
                            <option value="0">{"<= 15 minutes"}</option>
                            <option value="1">{"16-30 minutes"}</option>
                            <option value="2">{"31-60 minutes"}</option>
                            <option value="3">{">60 minutes"}</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-xl-12">
                        <div className="comment-form__input-box">
                          <label>During the past month, how many hours of actual sleep did you get at night? (This may be different than the number of hours you spent in bed.)</label>
                          <select name="qn2" value={qn2} onChange={handleSelectChange}>
                            <option value="0">{">7 hours"}</option>
                            <option value="1">{"6-7 hours"}</option>
                            <option value="2">{"5-6 hours"}</option>
                            <option value="3">{"< 5 hours"}</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-xl-12">
                        <div className="comment-form__input-box">
                          <label>During the past month, how often have you had trouble sleeping because you cannot get to sleep within 30 minutes?</label>
                          <select name="qn3" value={qn3} onChange={handleSelectChange}>
                            <option value="0">{"Not during the past month"}</option>
                            <option value="1">{"Less than once a week"}</option>
                            <option value="2">{"Once or twice a week"}</option>
                            <option value="3">{"Three or more times a week"}</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-xl-12">
                        <div className="comment-form__input-box">
                          <label>During the past month, how often have you had trouble sleeping because you wake up in the middle of the night or early morning?</label>
                          <select name="qn4" value={qn4} onChange={handleSelectChange}>
                            <option value="0">{"Not during the past month"}</option>
                            <option value="1">{"Less than once a week"}</option>
                            <option value="2">{"Once or twice a week"}</option>
                            <option value="3">{"Three or more times a week"}</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-xl-12">
                        <div className="comment-form__input-box">
                          <label>During the past month, how often have you had trouble sleeping because you have to get up to use the bathroom?</label>
                          <select name="qn5" value={qn5} onChange={handleSelectChange}>
                            <option value="0">{"Not during the past month"}</option>
                            <option value="1">{"Less than once a week"}</option>
                            <option value="2">{"Once or twice a week"}</option>
                            <option value="3">{"Three or more times a week"}</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-xl-12">
                        <div className="comment-form__input-box">
                          <label>During the past month, how often have you had trouble sleeping because you cannot breathe comfortably?</label>
                          <select name="qn6" value={qn6} onChange={handleSelectChange}>
                            <option value="0">{"Not during the past month"}</option>
                            <option value="1">{"Less than once a week"}</option>
                            <option value="2">{"Once or twice a week"}</option>
                            <option value="3">{"Three or more times a week"}</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-xl-12">
                        <div className="comment-form__input-box">
                          <label>During the past month, how often have you had trouble sleeping because you cough or snore loudly?</label>
                          <select name="qn7" value={qn7} onChange={handleSelectChange}>
                            <option value="0">{"Not during the past month"}</option>
                            <option value="1">{"Less than once a week"}</option>
                            <option value="2">{"Once or twice a week"}</option>
                            <option value="3">{"Three or more times a week"}</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-xl-12">
                        <div className="comment-form__input-box">
                          <label>During the past month, how often have you had trouble sleeping because you feel too cold?</label>
                          <select name="qn8" value={qn8} onChange={handleSelectChange}>
                            <option value="0">{"Not during the past month"}</option>
                            <option value="1">{"Less than once a week"}</option>
                            <option value="2">{"Once or twice a week"}</option>
                            <option value="3">{"Three or more times a week"}</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-xl-12">
                        <div className="comment-form__input-box">
                          <label>During the past month, how often have you had trouble sleeping because you feel too hot?</label>
                          <select name="qn9" value={qn9} onChange={handleSelectChange}>
                            <option value="0">{"Not during the past month"}</option>
                            <option value="1">{"Less than once a week"}</option>
                            <option value="2">{"Once or twice a week"}</option>
                            <option value="3">{"Three or more times a week"}</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-xl-12">
                        <div className="comment-form__input-box">
                          <label>During the past month, how often have you had trouble sleeping because you have bad dreams?</label>
                          <select name="qn10" value={qn10} onChange={handleSelectChange}>
                            <option value="0">{"Not during the past month"}</option>
                            <option value="1">{"Less than once a week"}</option>
                            <option value="2">{"Once or twice a week"}</option>
                            <option value="3">{"Three or more times a week"}</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-xl-12">
                        <div className="comment-form__input-box">
                          <label>During the past month, how often have you had trouble sleeping because you have pain?</label>
                          <select name="qn11" value={qn11} onChange={handleSelectChange}>
                            <option value="0">{"Not during the past month"}</option>
                            <option value="1">{"Less than once a week"}</option>
                            <option value="2">{"Once or twice a week"}</option>
                            <option value="3">{"Three or more times a week"}</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-xl-12">
                        <div className="comment-form__input-box">
                          <label>During the past month, how often have you had trouble sleeping because you have other reasons?</label>
                          <select name="qn12" value={qn12} onChange={handleSelectChange}>
                            <option value="0">{"Not during the past month"}</option>
                            <option value="1">{"Less than once a week"}</option>
                            <option value="2">{"Once or twice a week"}</option>
                            <option value="3">{"Three or more times a week"}</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-xl-12">
                        <div className="comment-form__input-box">
                          <label>During the past month, how often have you taken medicine to help you sleep (prescribed or “over the counter”)?</label>
                          <select name="qn13" value={qn13} onChange={handleSelectChange}>
                            <option value="0">{"Not during the past month"}</option>
                            <option value="1">{"Less than once a week"}</option>
                            <option value="2">{"Once or twice a week"}</option>
                            <option value="3">{"Three or more times a week"}</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-xl-12">
                        <div className="comment-form__input-box">
                          <label>During the past month, how often have you had trouble staying awake while driving, eating meals, or engaging in social activity?</label>
                          <select name="qn14" value={qn14} onChange={handleSelectChange}>
                            <option value="0">{"Not during the past month"}</option>
                            <option value="1">{"Less than once a week"}</option>
                            <option value="2">{"Once or twice a week"}</option>
                            <option value="3">{"Three or more times a week"}</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-xl-12">
                        <div className="comment-form__input-box">
                          <label>During the past month, how much of a problem has it been for you to keep up enough enthusiasm to get things done?</label>
                          <select name="qn15" value={qn15} onChange={handleSelectChange}>
                            <option value="0">{"No problem at all"}</option>
                            <option value="1">{"Only a slight problem"}</option>
                            <option value="2">{"Somewhat of a problem"}</option>
                            <option value="3">{"A very big problem"}</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-xl-12">
                        <div className="comment-form__input-box">
                          <label>During the past month, how would you rate your sleep quality overall?</label>
                          <select name="qn16" value={qn16} onChange={handleSelectChange}>
                            <option value="0">{"Very good"}</option>
                            <option value="1">{"Fairly good"}</option>
                            <option value="2">{"Fairly bad"}</option>
                            <option value="3">{"Very bad"}</option>
                          </select>
                        </div>
                      </div>
                   
                      <div className="col-xl-12">
                        <div className="comment-form__btn-box d-flex justify-content-center">
                          <button type="submit" className="thm-btn comment-form__btn full_button">Submit Sleep Quality</button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SleepQualityComponent;
