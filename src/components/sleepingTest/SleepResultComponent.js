import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";
import { useSelector } from "react-redux";

const publicUrl = process.env.PUBLIC_URL + '/';

const SleepResultComponent = () => {
  const [latestSleepQuality, setLatestSleepQuality] = useState(null);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchSleepQuality = async () => {
      try {
        const response = await axios.get(`${baseUrl}/sleep-quality`);
        const sleepData = response?.data?.data;

        // Filter the data to match the logged-in user's ID
        const userSleepData = sleepData.filter(item => item?.userId?._id === user._id);

        // Sort the data by createdAt and get the latest post
        if (userSleepData.length > 0) {
          const latestPost = userSleepData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];
          setLatestSleepQuality(latestPost);
        }
      } catch (error) {
        console.error("Error fetching sleep quality data:", error);
      }
    };

    if (user && user._id) {
      fetchSleepQuality();
    }
  }, [user]);
console.log(latestSleepQuality);
  return (
    <div className="container">
      <div className="row">
        {latestSleepQuality ? (
          <>
            <div className="col-xl-4 col-lg-4">
              <div className="col-xl-12 col-lg-12 wow fadeInUp p-2 pb-4" data-wow-delay="100ms">
                <div className="blog-three__single mb-0">
                  <div className="blog-three__img">
                    <img src={`${publicUrl}assets/images/quality.jpg`} alt="sleeping" style={{ height: "350px" }} />
                  </div>
                  <div className="blog-three__content">
                    <ul className="list-unstyled blog-three__meta"></ul>
                    <p>Sleeping Quality</p>
                    <h3 className="blog-three__title">
                      <span>{latestSleepQuality?.quality || "--"}</span>
                    </h3>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-4 col-lg-4">
              <div className="col-xl-12 col-lg-12 wow fadeInUp p-2 pb-4" data-wow-delay="100ms">
                <div className="blog-three__single mb-0">
                  <div className="blog-three__img">
                    <img src={`${publicUrl}assets/images/resone.jpg`} alt="sleeping" style={{ height: "350px" }} />
                  </div>
                  <div className="blog-three__content">
                    <ul className="list-unstyled blog-three__meta"></ul>
                    <p>Resone</p>
                    <h3 className="blog-three__title">
                      <span>{latestSleepQuality?.reason || "--"}</span>
                    </h3>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-4 col-lg-4">
              <div className="col-xl-12 col-lg-12 wow fadeInUp p-2 pb-4" data-wow-delay="100ms">
                <div className="blog-three__single mb-0">
                  <div className="blog-three__img">
                    <img src={`${publicUrl}assets/images/soluation.jpg`} alt="sleeping" style={{ height: "350px" }} />
                  </div>
                  <div className="blog-three__content">
                    <ul className="list-unstyled blog-three__meta"></ul>
                    <p>Solution</p>
                    <h3 className="blog-three__title">
                      <span>{latestSleepQuality?.solve || "--"}</span>
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="col-12">
            <p>No sleep quality data available.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SleepResultComponent;
