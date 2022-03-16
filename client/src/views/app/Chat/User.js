/*eslint-disable*/
import React, { useEffect, useState } from "react";
import Img from "../../../Images/lap-consul/1.JPG";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "firebase";

const User = ({ user1, user, selectUser, chat }) => {
  const user2 = user?.uid;
  const [data, setData] = useState("");

  useEffect(() => {
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
    let unsub = onSnapshot(doc(db, "lastMsg", id), (doc) => {
      setData(doc.data());
    });
    return () => unsub();
  }, []);

  return (
    <>
      <div
        className={`user_wrapper ${chat.name === user.name && "selected_user"}`}
        onClick={() => selectUser(user)}
      >
        <div className="user_info">
          <div className="user_detail">
            <img src={user.avatar || Img} alt="avatar" className="avatar" />
            <h4 style={{textTransform:'capitalize',marginRight:'3px'}}>{user.name}</h4>
            <h6 style={{textTransform:'capitalize',textAlign:'right',paddingLeft:'3px',fontSize:'12px'}}>{user.conType}</h6>
            {data?.from !== user1 && data?.unread && (
              <small className="unread">New</small>
            )}

          </div>
          <div
            className={`user_status ${user.isOnline ? "online" : "offline"}`}
          ></div>
        </div>
        {data && (
          <p className="truncate">
            <strong>{data.from === user1 ? "Me:" : null}</strong>
            {data.text}
          </p>
        )}
      </div>
      <div
        onClick={() => selectUser(user)}
        className={`sm_container ${chat.name === user.name && "selected_user"}`}
      >
        <img
          src={user.avatar || Img}
          alt="avatar"
          className="avatar sm_screen"
        />
      </div>
    </>
  );
};

export default User;
