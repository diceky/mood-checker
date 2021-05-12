import React, { useState, useEffect } from "react";
import Styles from "./BarChart.module.css";
import { Bar, defaults } from "react-chartjs-2";

const options = {
  maintainAspectRatio: true,
  scales: {
    y: {
      min: 0,
      max: 100,
      stepSize: 10,
      ticks: {
        font: {
          size: 14,
        },
      },
    },
    x: {
      ticks: {
        font: {
          size: 8,
        },
      },
    },
  },
};

const BarChart = ({ messages, socketId }) => {
  defaults.animation = false;
  const [barData, setBarData] = useState({
    labels: [],
    datasets: [
      {
        label: "Participant mood",
        data: [],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  });

  const average = (arr) => arr.reduce((p, c) => p + c, 0) / arr.length;

  useEffect(() => {
    if (messages && !messages.content.body.x) {
      // remove admin socketId from clients array
      const clients = messages.clients.filter((item) => item !== socketId);
      const index = clients.indexOf(messages.content.senderId);

      let newData = { ...barData };

      newData.labels = clients;
      newData.datasets[0].data[index] = parseInt(messages.content.body);

      setBarData(newData);
    }
  }, [messages]);

  return (
    <div className={Styles.wrapper}>
      <h2 className={Styles.title}>Mood Slider</h2>
      <p className={Styles.average}>{`Average Mood:${parseInt(
        average(barData.datasets[0].data)
      )}`}</p>
      <Bar
        data={barData}
        options={options}
        className={Styles.chart}
        height={80}
      />
    </div>
  );
};

export default BarChart;
