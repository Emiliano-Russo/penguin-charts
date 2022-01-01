import React from "react";
import { useLocation } from "react-router-dom";
import { UserChart } from "../components/UserChart/UserChart";
import { usersData } from "../rawData/UsersData";
import { setLabel, setData } from "../logic/PresetsBuilder";

export const Chart = () => {
  const location = useLocation();
  const state: any = location.state === undefined ? undefined : location.state;
  if (state === undefined) return <h1>No data available...</h1>;
  const date = state.date;

  //const dataList = setData(state.users,date) <=

  return (
    <React.Fragment>
      <h1>Chart</h1>
      <UserChart
        dataList={setData(state.users, date)}
        labels={setLabel(date)}
        width={900}
        height={400}
      />
    </React.Fragment>
  );
};
