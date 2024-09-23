"use client";

import { useState } from "react";
import "../globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { PostList, Post, NotificationComponent } from "../../components";
import { PostPayload, Notification } from "../../interface/index";
import { Provider } from "react-redux";
import { store } from "../../services/store";

function App() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [editObj, setEditObj] = useState<PostPayload>({
    userId: 0,
    title: "",
    completed: false,
    id: 0,
  });
  const [notification, setNotification] = useState<Notification>({
    msg: "",
    color: "",
  });
  const [postList, setPostList] = useState<PostPayload[]>([]);

  return (
    <div className="App">
      <Provider store={store}>
        <PostList
          setIsOpen={setIsOpen}
          setEditObj={setEditObj}
          setNotification={setNotification}
          setPostList={setPostList}
          postList={postList}
        />
        <Post
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          editObj={editObj}
          setEditObj={setEditObj}
          setNotification={setNotification}
          setPostList={setPostList}
          postList={postList}
        />
        {notification.msg && (
          <NotificationComponent
            setNotification={setNotification}
            notification={notification}
          />
        )}
      </Provider>
    </div>
  );
}

export default App;
