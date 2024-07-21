import React, { useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { RiArrowDownCircleFill } from "react-icons/ri";
import Modal from "./Modal";
import { ResponseData } from "../interfaces/types";

ChartJS.register(ArcElement, Tooltip, Legend);

const initialData = {
  labels: ["Stocks", "Bonds", "Real Estate", "Cyprtocurrecy", "More"],
  datasets: [
    {
      label: "Portfolio",
      data: [48, 21, 16, 14, 1],
      backgroundColor: [
        "rgba(255, 99, 132)", // Red
        "rgba(54, 162, 235)", // Blue
        "rgba(255, 206, 86)", // Yellow
        "rgba(75, 192, 192)", // Green
        "rgba(153, 102, 255)", // Purple
      ],
      borderColor: [
        "rgba(255, 255, 255, 1)", // White border
      ],
      borderWidth: 4,
      totalAmount: "₹0"
    },
  ],
};

// Custom plugin to display the amount in the center of the doughnut chart
const centerTextPlugin = {
  id: "centerText",
  afterDraw: function (chart) {
    const { ctx, width, height } = chart;
    ctx.save();
    const amount = chart.config.data.datasets[0].totalAmount; // Change this to dynamically fetch the amount if needed
    ctx.font = "bold 24px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#000"; // Color of the text
    ctx.fillText(amount, width / 2, height / 2);
    ctx.restore();
  },
};

// Chart options to hide the default legend
const options = {
  cutout: "75%", // Increase inner radius to 70% of the total radius
  plugins: {
    legend: {
      display: false, // Hide default legend
    },
    tooltip: {
      enabled: false,
    },
    centerText: {}, // Register the custom plugin
  },
};

function PieChart() {
  const [showModal, setShowModal] = useState(false);
  const [chartData, setChartData] = useState(initialData);

  const handleCloseModal = () => {
    console.log("Close button clicked");
    setShowModal(false);
  };

  const handleDataUpdate = (newData: ResponseData) => {
    console.log("Data received from modal:", newData);

    // const labels = newData.holdings.map((holding) => holding.symbol);
    const cleanedLabels = newData.holdings.map((holding) => holding.symbol.replace(/^(NSE:|BSE:)/, '').replace(/-[A-Z]+$/, ''));
    const totalValue = newData.overall.total_current_value;

    const holdings = newData.holdings.map((holding) => ({
      label: holding.symbol,
      value: Math.round((holding.marketVal / totalValue) * 100),
    }));
    
    holdings.sort((a, b) => b.value - a.value);
    const sortedData = holdings.map((holding) => holding.value);

    const totalAmount = `₹${newData.overall.total_current_value.toFixed(2)}`;

    const updatedData = {
      labels: cleanedLabels,
      datasets: [
        {
          label: "Portfolio",
          data: sortedData,
          backgroundColor: [
            "rgba(255, 99, 132)", // Red
            "rgba(54, 162, 235)", // Blue
            "rgba(255, 206, 86)", // Yellow
            "rgba(75, 192, 192)", // Green
            "rgba(153, 102, 255)", // Purple
          ],
          borderColor: ["rgba(255, 255, 255, 1)"], // White border
          borderWidth: 4,
          totalAmount: totalAmount,
        },
      ],
    };

    setChartData(updatedData);
  };

  return (
    <div className="flex flex-col items-center">
      <div>
        <button onClick={() => setShowModal(true)}>
          <RiArrowDownCircleFill size={35} />
        </button>
        {showModal && (
          <Modal onClose={handleCloseModal} onDataUpdate={handleDataUpdate} />
        )}
      </div>
      <div className="w-80 h-80 relative">
        <Doughnut data={chartData} options={options} plugins={[centerTextPlugin]} />
      </div>
      <ul className="mt-4 w-full max-w-sm space-y-2 list-none px-4">
        {chartData.labels.map((label, index) => (
          <React.Fragment key={index}>
            {/* Fragment to provide unique index to each ele*/}
            <li className="flex items-center justify-between border-b border-gray-200 py-2">
              <div className="flex items-center space-x-2">
                <span
                  className="inline-block w-4 h-4 rounded"
                  style={{
                    backgroundColor: chartData.datasets[0].backgroundColor[index],
                  }}
                ></span>
                <span className="text-sm font-medium">{label}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">
                  {chartData.datasets[0].data[index]}%
                </span>
              </div>
            </li>
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
}

export default PieChart;
