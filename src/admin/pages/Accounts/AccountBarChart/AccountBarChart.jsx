import React from 'react';
import { Bar } from 'react-chartjs-2';

const data = {
    labels: ['Day-1', 'Day-2', 'Day-3', 'Day-4', 'Day-5', 'Day-6', 'Day-7'],
    datasets: [
        {
            label: 'Number of Views',
            data: [4, 6, 12, 5, 2, 7, 9],
            backgroundColor: [
                'rgba(96, 96, 96, 0.3)',
                'rgba(96, 96, 96, 0.3)',
                'rgba(34, 34, 34, 1)',
                'rgba(96, 96, 96, 0.3)',
                'rgba(96, 96, 96, 0.3)',
                'rgba(96, 96, 96, 0.3)',
                'rgba(96, 96, 96, 0.3)'

            ],
            borderWidth: 1,
        },
    ],
};

const options = {
    scales: {
        yAxes: [
            {
                ticks: {
                    beginAtZero: true,
                },
            },
        ],
    },
};

const AccountBarChart = () => {


    return (
        <>
            <Bar data={data} options={options} width={100} height={70} />
        </>
    )
}

export default AccountBarChart
