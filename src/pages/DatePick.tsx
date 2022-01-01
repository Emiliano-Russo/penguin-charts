import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { DatePicker, TimePicker, Select, Space, Button } from "antd";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

/*const location = useLocation();
  console.log(location);
  const users: string[] | undefined = Array.isArray(location.state)
    ? location.state
    : undefined;*/

export const DatePick = (props: any) => {
  const { Option } = Select;
  const [type, setType] = useState("year");
  const [animOpacity, setAnimOpacity] = useState([0, 1]);
  const [date, setDate] = useState<string>("");
  const navigate = useNavigate();

  const location = useLocation();

  const users: string[] | undefined = Array.isArray(location.state)
    ? location.state
    : undefined;

  const onChange = (date: any, dateString: any) => {
    setDate(dateString);
  };

  const PickerWithType = (obj: any) => {
    if (obj.type === "time") return <TimePicker onChange={onChange} />;
    if (obj.type === "date") return <DatePicker onChange={onChange} />;
    return <DatePicker picker={obj.type} onChange={onChange} />;
  };

  const nextHandler = () => {
    setAnimOpacity([1, 0]);
    setTimeout(() => navigate("/chart", { state: { users, date } }), 1000);
  };

  return (
    <motion.div animate={{ opacity: animOpacity }}>
      <h1>Select Date</h1>
      <Space>
        <Select value={type} onChange={setType}>
          <Option value="month">Month</Option>
          <Option value="year">Year</Option>
        </Select>
        <PickerWithType
          type={type}
          onChange={(value: any) => console.log(value)}
        />
      </Space>
      <br></br>
      <Button style={{ marginTop: "2rem" }} onClick={nextHandler}>
        Next
      </Button>
    </motion.div>
  );
};
