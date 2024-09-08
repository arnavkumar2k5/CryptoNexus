import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import Conf from "../Conf/Conf";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { chartDays } from "../Conf/data";
import { Button, CircularProgress } from "@mui/material";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
} from 'chart.js'

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
)

function CoinInfo() {
  const [chartData, setChartData] = useState();
  const [days, setDays] = useState(1);
  const { id } = useParams();
  const currency = useSelector((state) => state.cryptoAuth.currency);
  const symbol = useSelector((state) => state.cryptoAuth.symbol);

  useEffect(() => {
    fetch(
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}&apikey=${Conf.apiKey}`
    )
      .then((res) => res.json())
      .then((res) => setChartData(res.prices))
      .catch((err) => console.log(err));
  }, [currency, days, id]);

  console.log(chartData);

  return (
    <div className="w-full">
      {!chartData ? (
        <CircularProgress
          style={{
            color: "gold",
          }}
          className="ml-96"
          size={250}
          thickness={1}
        />
      ) : (
        <>
          <Line
            data={{
              labels: chartData.map((coin) => {
                let date = new Date(coin[0]);
                let time =
                  date.getHours() > 12
                    ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                    : `${date.getHours()}:${date.getMinutes()} AM`;
                return days === 1 ? time : date.toLocaleDateString();
              }),

              datasets: [
                {
                  data: chartData.map((coin) => coin[1]),
                  label: `Price ( Past ${days} Days) in ${currency}`,
                  borderColor: "#EEBC1D",
                },
              ],
            }}
            options={{
              elements: {
                point: {
                  radius: 1,
                },
              },
            }}
          />
          <div className="flex justify-center mt-5">
            {chartDays.map((day) => (
              <Button style={{
                border: "2px solid #FFD700",
                color: days === day.value ? "#FFFFFF" : "#FFD700",
                backgroundColor: days === day.value ? "#FFD700" : "transparent",
                margin: 5,
              }}
              className="md:w-[10vw]"
                key={day.value}
                onClick={() => setDays(day.value)}
                onSelect={day.value === days}
              >
                {day.label}
              </Button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default CoinInfo;
