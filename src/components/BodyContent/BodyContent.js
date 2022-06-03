import React, { useState } from "react";
import "./BodyContent.css";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import MonoStackedBar from "mono-stacked-bar";
import "mono-stacked-bar/dist/index.css";
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

  const handleUsername = async () => {
    console.log(username);
    const docRef = doc(db, "users", username);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setData(docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
      setData({});
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
      {data ? (
        <div className="main-div-content">
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
        </div>
      ) : (
        <div>Unknown user!</div>
      )}
    </div>
  );
}

export default BodyContent;
