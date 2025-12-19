import {LineChart} from '@mui/x-charts-pro/LineChart';

function Line() {
    return (
        <section className="c-section">
            <LineChart
                xAxis={[{ data: [1, 2, 3, 5, 8, 20] }]}
                series={[
                    {
                        data: [2, 5.5, 2, 8.5, 1.5, 20],
                    },
                ]}
                margin={{top: 0, right: 25, bottom: 0, left: 0}}
                grid={{ vertical: true, horizontal: true }}
                height={200}
            />
        </section>

    );
}

export default Line;