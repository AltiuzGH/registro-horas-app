import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Typography from '@material-ui/core/Typography';

// Generate Sales Data
function createData(time, amount) {
    return { time, amount };
  }
  
  const data = [
    createData('Enero', 50),
    createData('Febrero', 100),
    createData('Marzo', 150),
    createData('Abril', 700),
    createData('Mayo', 250),
    createData('Junio', 500),
    createData('Septiembre', undefined),
  ];

export const ChartMonthHours = () => {
const theme = useTheme();

  return (
    <React.Fragment>
              <Typography component="h2" variant="h6" color="primary" gutterBottom>
            Total Horas Registradas
        </Typography>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis dataKey="time" stroke={theme.palette.text.secondary} />
          <YAxis stroke={theme.palette.text.secondary}>
            <Label
              angle={270}
              position="left"
              style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
            >
              Horas
            </Label>
          </YAxis>
          <Line type="monotone" dataKey="amount" stroke={theme.palette.primary.main} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
