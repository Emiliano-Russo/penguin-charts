import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import React from "react";
import { userData } from "../../models/Types";

Chart.register(...registerables);

interface props {
  labels: string[];
  dataList: userData[];
  width: number;
  height: number;
}

export const UserChart: React.FC<props> = (props) => {
  return (
    <div>
      <Bar
        width={props.width}
        height={props.height}
        data={{
          datasets: props.dataList,
          labels: props.labels,
        }}
      />
    </div>
  );
};
