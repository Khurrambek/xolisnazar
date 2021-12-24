import React from 'react';
import { Line } from 'react-chartjs-2';



const LineChart = () => {
    const data = {
        labels: ['Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma', 'Shanba', 'Yakshanba'],
        datasets: [
            {
                label: "This Month:",
                lineTension: 0.5,
                backgroundColor: 'teal',
                borderColor: 'teal',
                fill: false,
                data: [60, 73, 78, 62, 80, 63],
            },
            {
                label: "Last Month",
                lineTension: 0.5,
                backgroundColor: 'coral',
                data: [50, 64, 55, 74, 75 ]
            }
        ]
    }
    const options = {

        scales: {
            yAxes: [
                {
                    type: 'linear',
                    display: true,
                    position: 'left'
                },
                {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    id: 'y-axis-2',
                    gridLines: {
                        drawOnArea: false,
                    },
                },
            ],

        }
    }
    return (
        <>
            <Line options={options} data={data} />
        </>
    )
}

export default LineChart
