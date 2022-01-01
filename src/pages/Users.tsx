import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { dictionary } from "../models/Discord_ID_Name";

export const Users = () => {
  const [animOpacity, setAnimOpacity] = useState([0, 1]);
  const [useresIncluded, setUseresIncluded] = useState<string[]>([]);
  const navigate = useNavigate();

  const checkBoxHandler = (userId: string, check: boolean) => {
    if (check) addUser(userId);
    else removeUser(userId);
  };

  const addUser = (userId: string) => {
    setUseresIncluded((prev) => {
      prev.push(userId);
      return prev;
    });
  };

  const removeUser = (userId: string) => {
    setUseresIncluded((prev) => {
      prev.forEach((element, index) => {
        if (element == userId) prev.splice(index, 1);
      });
      return prev;
    });
  };

  const makeUserListFromLocalStorage = () => {
    const rawData: string | null = window.localStorage.getItem("data");
    if (rawData !== null) {
      const data: any = JSON.parse(rawData);
      let UsersId: string[] = [];
      for (let id in data.Usuarios) UsersId.push(id);
      let userList = [];
      for (let i = 0; i < UsersId.length; i++)
        userList.push(
          <div key={i}>
            <input
              type="checkbox"
              value={UsersId[i]}
              onChange={(e) => checkBoxHandler(UsersId[i], e.target.checked)}
            ></input>
            <label style={{ marginLeft: "2rem" }}>
              {UsersId[i] in dictionary ? dictionary[UsersId[i]] : UsersId[i]}
            </label>
          </div>
        );
      return userList;
    }
  };

  const nextHandler = () => {
    setAnimOpacity([1, 0]);
    setTimeout(() => navigate("/date", { state: useresIncluded }), 1000);
  };

  return (
    <motion.div animate={{ opacity: animOpacity }}>
      <h2 style={{ marginTop: "2rem" }}>Users</h2>
      <div
        style={{
          overflowY: "scroll",
          height: "22rem",
          width: "15rem",
          padding: "2rem",
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          background: "white",
        }}
      >
        {makeUserListFromLocalStorage()}
      </div>
      <Button style={{ marginTop: "5rem" }} onClick={nextHandler}>
        Next
      </Button>
    </motion.div>
  );
};
