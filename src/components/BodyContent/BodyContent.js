import React, { useState } from "react";
import "./BodyContent.css";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import MonoStackedBar from "mono-stacked-bar";
import "mono-stacked-bar/dist/index.css";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAS1q1wbjslh0jHXCtAVDaY9q5Dp2eHSCg",
  authDomain: "dtb-aoc.firebaseapp.com",
  projectId: "dtb-aoc",
  storageBucket: "dtb-aoc.appspot.com",
  messagingSenderId: "452641821255",
  appId: "1:452641821255:web:b2463423b8d964c88f9762",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function BodyContent() {
  const [username, setUsername] = useState("");
  const [data, setData] = useState({});
  const [dataGraph, setDataGraph] = useState([]);

  const handleUsername = async () => {
    setData({});
    console.log(username);
    const docRef = doc(db, "users", username);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setData(docSnap.data());
      let graphdata = [];
      //Create an array with all data.durations and data.times
      for (let i = 0; i < docSnap.data().durations.length; i++) {
        console.log("date: ", docSnap.data().durations[i].date);
        console.log("time: ", docSnap.data().durations[i].time);
        graphdata.push(
          {
            name: docSnap.data().durations[i].date,
            uv: docSnap.data().durations[i].time,
            pv: 2400,
            amt: 2400,
          },
        );
      }
      setDataGraph(graphdata);
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
      setData({});
      setDataGraph([]);
    }
  };

  return (
    <div className="container-bodycontent">
      <div className="username-bodycontent">
        <div className="username-inputDiv-bodycontent">
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="username-input-bodycontent"
          />
          <button
            className="username-submit-button-bodycontent"
            onClick={() => handleUsername()}
          >
            Submit
          </button>
        </div>
      </div>
      {data.wins !== undefined ? (
        <div className="main-div-content" style={{ marginTop: "3rem" }}>
          <div className="ration-win-rate">
            <MonoStackedBar
              data={[
                { value: data.wins, color: "green", caption: "Wins" },
                { value: data.loses, color: "orange", caption: "LOSES" },
              ]}
              radius={5}
              width={1000000000}
            />
          </div>
          <center>
            {dataGraph.length === 0 ? (
              <div>
                <h1>No graph data found</h1>
              </div>
            ) : (
              <>
                <h3 style={{ marginTop: "3rem" }}>
                  Here is your wins according to time
                </h3>
                <LineChart width={800} height={400} data={dataGraph}>
                  <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                  <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                  <XAxis dataKey="name" stroke="#8884d8" />
                  <YAxis stroke="#8884d8" />
                  <Tooltip />
                </LineChart>
              </>
            )}
          </center>
        </div>
      ) : (
        <h2 style={{ textAlign: "center" }}>Please enter a known username!</h2>
      )}
    </div>
  );
}

export default BodyContent;
