import { Avatar, Button, TextField } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import "./style.css";
import { useLocalContext } from "../../context/context";
import { Announcment } from "..";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const Main = ({ classData }) => {
  const { loggedInMail } = useLocalContext();

  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInput] = useState("");
  const [linkValue, setLinkValue] = useState(""); // Add this line
  const [image, setImage] = useState(null);
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
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

    // Fetch announcements
    const fetchAnnouncements = async () => {
      try {
        const snapshot = await db.collection("publications").get();
        const announcementsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAnnouncements(announcementsData);
      } catch (error) {
        console.error("Error fetching announcements: ", error);
      }
    };

    fetchAnnouncements();
  }, []);

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
        link: linkValue, // Add the link value
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
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
                <em className="main__code">Code :</em>
                <div className="main__id">{classData.id}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="main__announce">
          <div className="main__status">
            <p>Liste  </p>
            <p className="main__subText">Visioconférences</p>
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
                    <TextField
                      id="filled-link-input"
                      label="Link"
                      variant="filled"
                      value={linkValue}
                      onChange={(e) => setLinkValue(e.target.value)}
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
                    <div>Annoncez prochaines Visioconférence</div>
                  </div>
                )}
              </div>
              {announcements.map((announcement) => (
                <div className="pb" key={announcement.id}>
                  <div className="announcement__header">
                    <Avatar src={announcement.authorProfilePicture} />
                    <div>{announcement.authorName}</div>
                  </div>
                  <div className="announcement__content-box">
                    {" "}
                    {/* Added container div */}
                    <p>{announcement.content}</p>
                    {announcement.link && (
                      <a
                        href={announcement.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Visite Lien
                      </a>
                    )}
                  </div>
                  <p>{formatDate(announcement.date)}</p>
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
