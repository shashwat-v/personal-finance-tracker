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
        "rgba(255, 99, 132, 1)", // Red
        "rgba(54, 162, 235, 1)", // Blue
        "rgba(255, 206, 86, 1)", // Yellow
        "rgba(75, 192, 192, 1)", // Green
        "rgba(153, 102, 255, 1)", // Purple
      ],
      borderWidth: 1,
    },
  ],
};
// Chart options to hide the default legend
const options = {
  cutout: "70%", // Increase inner radius to 70% of the total radius
  plugins: {
    legend: {
      display: false, // Hide default legend
    },
    tooltip: {
      enabled: false, // Hide default tooltips
    },
  },
};
function PieChart() {
  return (
    <div className="flex flex-col items-center">
      <div className="w-80 h-80">
        <Doughnut data={data} options={options} />
      </div>
      <ul className="mt-4 space-y-2 max-w-sm list-none">
        {data.labels.map((label, index) => (
          <React.Fragment key={index}>
            {/* Fragment to provide unique index to element */}
            <hr />
            <li className="flex justify-between">
              <div className="flex items-center">
                <span
                  className="inline-block w-4 h-4 rounded-full mr-2"
                  style={{
                    backgroundColor: data.datasets[0].backgroundColor[index],
                  }}
                ></span>
                <span>{label}</span>
              </div>
              <span>{data.datasets[0].data[index]}%</span>
            </li>
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
}

export default PieChart;
