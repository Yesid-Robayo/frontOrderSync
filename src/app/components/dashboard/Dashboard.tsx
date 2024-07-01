
import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';
import { GetServerSideProps } from 'next';
import { RevenueDateAndCountDTO } from '@/app/utils/DTOS';
import { summaryApi } from '@/app/services/summaryApi';
import { useTranslations } from 'next-intl';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

interface DashboardProps {
    revenueData: RevenueDateAndCountDTO[];
    width: string;
    height: string;
}

const Dashboard: React.FC<DashboardProps> = ({ revenueData, height, width }) => {
    const labels = revenueData.map(item => item.date);
    const t = useTranslations('metrics');
    const dataPoints = revenueData.map(item => item.order_count);

    const data = {
        labels: labels,
        datasets: [
            {
                label: t('sellsForDay'),
                data: dataPoints,
                fill: true,
                backgroundColor: 'rgba(75,192,192,0.2)',
                borderColor: 'rgba(75,192,192,1)',
                tension: 0.4,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: t('last30Days'),
                font: {
                    size: 16,
                },
            },
            legend: {
                display: false,
                position: 'top' as const,
            },
        },
        scales: {
            x: {
                ticks: {
                    autoSkip: true,
                    maxTicksLimit: 10,
                    maxRotation: 0,
                    minRotation: 0,
                }
            },
            y: {
                beginAtZero: true,
                ticks: {
                    callback: function (value: any) {
                        if (Number.isInteger(value)) {
                            return value;
                        }
                    }
                }
            },
        },
    };

    return (
        <div>
            <div style={{ height: height, width: width }}>
                <Line data={data} options={options} />
            </div>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async () => {
    const revenueData = await summaryApi.getRevenueDateAndCount();
    return {
        props: {
            revenueData,
        },
    };
};

export default Dashboard;
