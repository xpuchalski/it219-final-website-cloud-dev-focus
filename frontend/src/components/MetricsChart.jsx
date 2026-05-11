import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function MetricsChart({ metrics }) {
  const labels = metrics.labels;
  const data = {
    labels,
    datasets: [
      {
        label: 'CPU Usage',
        data: metrics.cpu,
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59,130,246,0.15)',
        tension: 0.35
      },
      {
        label: 'Memory Usage',
        data: metrics.memory,
        borderColor: '#f97316',
        backgroundColor: 'rgba(249,115,22,0.15)',
        tension: 0.35
      },
      {
        label: 'Latency (ms)',
        data: metrics.latency,
        borderColor: '#14b8a6',
        backgroundColor: 'rgba(20,184,166,0.15)',
        tension: 0.35
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom'
      },
      title: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: '#cbd5e1'
        },
        grid: {
          color: 'rgba(148,163,184,0.16)'
        }
      },
      x: {
        ticks: {
          color: '#94a3b8'
        },
        grid: {
          display: false
        }
      }
    }
  };

  return <Line data={data} options={options} />;
}

export default MetricsChart;
