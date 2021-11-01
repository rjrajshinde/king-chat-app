import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { ChatEngine } from "react-chat-engine";

import { useAuth } from "../contexts/AuthContext";

import { auth } from "../firebase";

const Chats = () => {
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  //todo - we are getting user data from the AuthContext where we use context to save the data
  const { user } = useAuth();

  //! after sign out we redirect to the sign in page
  const handleLogout = async () => {
    await auth.signOut();
    history.push("/");
  };

  const getFile = async (url) => {
    let response = await fetch(url);
    //todo -  this blog contains our image here it basically convert the image into the binary format
    let data = await response.blob();
    return new File([data], "test.jpg", { type: "image/jpeg" });
  };

  useEffect(() => {
    if (!user || user === null) {
      //! if there is no user then it redirects to the main login page
      history.push("/");
      return;
    } //! if the user is present then send the data of the user to the chatEngine project
    axios
      .get("https://api.chatengine.io/users/me/", {
        headers: {
          "project-id": process.env.REACT_APP_CHAT_ENGINE_ID,
          "user-name": user.email,
          "user-secret": user.uid,
        },
      })
      .then(() => setLoading(false))
      .catch((e) => {
        let formdata = new FormData();
        formdata.append("email", user.email);
        formdata.append("username", user.email);
        formdata.append("secret", user.uid);

        getFile(user.photoURL).then((avatar) => {
          formdata.append("avatar", avatar, avatar.name);
          axios
            .post("https://api.chatengine.io/users/", formdata, {
              headers: {
                "private-key": process.env.REACT_APP_CHAT_ENGINE_KEY,
              },
            })
            .then(() => setLoading(false))
            .catch((e) => console.log("e", e.response));
        });
      });
  }, [user, history]);

  if (!user || loading) return "Loading ....";

  return (
    <div className="chats-page">
      <div className="nav-bar">
        <div className="logo-tab">KingChat</div>
        <div onClick={handleLogout} className="logout-tab">
          Logout
        </div>
      </div>
      {/* it's a built in components from chat engine where you only need to
      create a project in chatengine website and give the details like projectId
      and secret to this components and then it's good to go */}
      <ChatEngine
        height="calc(100vh - 66px)"
        projectID={process.env.REACT_APP_CHAT_ENGINE_ID}
        userName={user.email}
        userSecret={user.uid}
      />
    </div>
  );
};

export default Chats;
