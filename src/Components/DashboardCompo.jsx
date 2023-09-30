import React from "react";
import { useSelector } from "react-redux";
import { Line } from "react-chartjs-2";
import { Chart as ChartJs } from "chart.js/auto";
import { Button, Center, Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router";
function DashboardCompo() {
  const chartData = useSelector((store) => {
    return store.auth.user.scores;
  });

  const navigate = useNavigate();
  const data = {
    labels: chartData.map((_, index) => `Attempt ${index + 1}`),
    datasets: [
      {
        label: "Score in Each Attempt",
        data: chartData,
        backgroundColor: "salmon",
        borderColor: ["orange", "red", "green"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <>
      {chartData.length >= 1 ? (
        <>
          <Center margin={"40px"}>
            <Heading color={"blue.400"} as={"h2"}>
              Avarage-
              {Math.ceil(
                chartData.reduce((acc, crr) => {
                  return acc + crr;
                }, 0) /
                  chartData.length +
                  1
              )}
            </Heading>
          </Center>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ width: "600px" }}>
              <Line data={data} options={options} />
            </div>
          </div>
        </>
      ) : (
        <Center gap={"40px"} flexDirection={"column"} margin={"60px"}>
          <Heading>Complete Atleast Two Quiz To View Data</Heading>
        </Center>
      )}
      <Center>
        <Button
          margin={"40px"}
          colorScheme="blue"
          onClick={() => {
            navigate("/");
          }}
        >
          Go to Quiz
        </Button>
      </Center>
    </>
  );
}

export default DashboardCompo;
