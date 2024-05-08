// chart.js
import { Chart as ChartJS } from 'chart.js';
import {
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Register the necessary components with ChartJS
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
);

export default ChartJS;
