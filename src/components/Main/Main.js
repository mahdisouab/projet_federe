import { Avatar, Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import "./style.css";
import { useLocalContext } from "../../context/context";
import { Announcment } from "..";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const Main = ({ classData }) => {
  const { loggedInMail } = useLocalContext();

  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInput] = useState("");
  const [image, setImage] = useState(null);
  const [announcements, setAnnouncements] = useState([]);


  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    console.log("tessst");

    if (inputValue.trim() !== "") {
      const firebaseConfig = {
        apiKey: "AIzaSyC1h8BknJCqXNES4fxshGTbPqxbtyiImpY",
        authDomain: "projet-federe.firebaseapp.com",
        projectId: "projet-federe",
        storageBucket: "projet-federe.appspot.com",
        messagingSenderId: "817947843477",
        appId: "1:817947843477:web:8db3072d492f28e9ecf49c",
        measurementId: "G-1XJMPKWX60",
      };

      // Initialize Firebase
      if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
      }

      // Create Firestore instance
      const db = firebase.firestore();

      const publication = {
        content: inputValue,
        date: new Date().toISOString(),
        published: true,
      };

      db.collection("publications")
        .add(publication)
        .then((docRef) => {
          console.log("Publication added with ID: ", docRef.id);
          setInput("");
          setImage(null);
        })
        .catch((error) => {
          console.error("Error adding publication: ", error);
        });
    }
  };

  return (
    <div className="main">
      <div className="main__wrapper">
        <div className="main__content">
          <div className="main__wrapper1">
            <div className="main__bgImage">
              <div className="main__emptyStyles" />
            </div>
            <div className="main__text">
              <h1 className="main__heading main__overflow">
                {classData.className}
              </h1>
              <div className="main__section main__overflow">
                {classData.section}
              </div>
              <div className="main__wrapper2">
                <em className="main__code">Class Code :</em>
                <div className="main__id">{classData.id}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="main__announce">
          <div className="main__status">
            <p>Upcoming</p>
            <p className="main__subText">No work due</p>
          </div>
          <div className="main__announcements">
            <div className="main__announcementsWrapper">
              <div className="main__ancContent">
                {showInput ? (
                  <div className="main__form">
                    <TextField
                      id="filled-multiline-flexible"
                      multiline
                      label="Announce Something to class"
                      variant="filled"
                      value={inputValue}
                      onChange={(e) => setInput(e.target.value)}
                    />
                    <div className="main__buttons">
                      <div />

                      <div>
                        <Button onClick={() => setShowInput(false)}>
                          Cancel
                        </Button>

                        <Button
                          onClick={handleSubmit}
                          color="primary"
                          variant="contained"
                        >
                          Post
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    className="main__wrapper100"
                    onClick={() => setShowInput(true)}
                  >
                    <Avatar />
                    <div>Announce Something to class</div>
                  </div>
                )}
              </div>
              {announcements.map((announcement) => (
                <div key={announcement.date}>
                  {/* Render the announcement content */}
                  <p>{announcement.content}</p>
                  <p>{announcement.date}</p>
                </div>
              ))}
            </div>
            <Announcment classData={classData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
