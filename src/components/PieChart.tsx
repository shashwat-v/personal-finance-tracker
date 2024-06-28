import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
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
        // "rgba(255, 99, 132, 1)", // Red
        // "rgba(54, 162, 235, 1)", // Blue
        // "rgba(255, 206, 86, 1)", // Yellow
        // "rgba(75, 192, 192, 1)", // Green
        // "rgba(153, 102, 255, 1)", // Purple
        "rgba(255, 255, 255, 1)", // White border
      ],
      borderWidth: 4,
    },
  ],
};
// Custom plugin to display the amount in the center of the doughnut chart
const centerTextPlugin = {
  id: "centerText",
  afterDraw: function (chart) {
    const { ctx, width, height } = chart;
    ctx.save();
    const amount = "₹1,00,000"; // Change this to dynamically fetch the amount if needed
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
      enabled: false, // Enable tooltips
      // callbacks: {
      //   label: function (context) {
      //     const label = data.labels[context.dataIndex];
      //     const value = data.datasets[0].data[context.dataIndex];
      //     return `${label}: ${value}%`;
      //   },
      // },
    },
    centerText: {}, // Register the custom plugin
  },
};
function PieChart() {
  return (
    <div className="flex flex-col items-center">
      <div className="w-80 h-80 relative">
        <Doughnut data={data} options={options} plugins={[centerTextPlugin]} />
      </div>
      <ul className="mt-4 w-full max-w-sm space-y-2 list-none px-4">
        {data.labels.map((label, index) => (
          <React.Fragment key={index}>
            {/* Fragment to provide unique index to each ele*/}
            <li className="flex items-center justify-between border-b border-gray-200 py-2">
              <div className="flex items-center space-x-2">
                <span
                  className="inline-block w-4 h-4 rounded"
                  style={{
                    backgroundColor: data.datasets[0].backgroundColor[index],
                  }}
                ></span>
                <span className="text-sm font-medium">{label}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">
                  {data.datasets[0].data[index]}%
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
