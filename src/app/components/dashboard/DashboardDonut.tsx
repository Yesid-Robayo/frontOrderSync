// components/DonutChart.js
import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useTranslations } from 'next-intl';
import { CityWithMostOrdersDTO } from '@/app/utils/DTOS';

ChartJS.register(ArcElement, Tooltip, Legend);


const options = {
  plugins: {
    legend: {

      position: 'top' as const,
    },
  },
};
interface DashboardDonutProps {
  cityData: CityWithMostOrdersDTO;
}

const DashboardDonut: React.FC<DashboardDonutProps> = ({ cityData }) => {
  const t = useTranslations('metrics');

  const labels = [cityData.city, t('otherCities')]
  const dataPoints = [cityData.orders, cityData.total_orders - cityData.orders]

  const data = {
    labels: labels,
    datasets: [
      {
        label: t('sells'),
        data:dataPoints,
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(102, 91, 96, 0.19)',

        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(102, 91, 96, 0.19)',

        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div style={{ height: '200px', width: '200px' }}>
      <Doughnut data={data} options={options} />
    </div>
  )


}
export default DashboardDonut;