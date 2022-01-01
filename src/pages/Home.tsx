import React, { useState } from "react";
import { Input, Button } from "antd";
import { motion } from "framer-motion";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

const axios = require("axios");

export const Home = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [animOpacity, setAnimOpacity] = useState([0, 1]);
  const navigate = useNavigate();

  const clickHandler = () => {
    setIsDownloading(true);
    const htmlInput = document.getElementById("input_id") as HTMLInputElement;
    let url: string | undefined =
      process.env.REACT_APP_URL_DATA + htmlInput.value + ".json";
    if (url !== undefined)
      fetchData(url)
        .then(function (response: any) {
          if (response.data === null) {
            setIsDownloading(false);
            message.error("Wrong server id");
          } else {
            window.localStorage.setItem("data", JSON.stringify(response.data));
            message.success("Data downloaded successfully");
            setAnimOpacity([1, 0]);
            setTimeout(() => navigate("users"), 1000);
          }
        })
        .catch(function (error: any) {
          console.log(error);
          alert("error!");
        });
  };

  const fetchData = (url: string): Promise<any> => {
    return axios.get(url);
  };

  return (
    <motion.div animate={{ opacity: animOpacity }}>
      <Input
        id="input_id"
        placeholder="Discord Sever Id"
        style={{ width: "15rem" }}
      />
      <Button type="primary" onClick={clickHandler} loading={isDownloading}>
        Go!
      </Button>
    </motion.div>
  );
};
