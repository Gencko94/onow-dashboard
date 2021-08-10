import styled from "styled-components";
import Flex from "../../StyledComponents/Flex";
import Heading from "../../StyledComponents/Heading";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";
const OrdersOverview = () => {
  const data = [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
    { name: "Group D", value: 200 },
  ];
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  return (
    <Container>
      <div className="head">
        <Heading tag="h6">Orders Overview</Heading>
      </div>
      {/* <div style={{ width: "100%", height: "100%", display: "block" }}> */}
      <ResponsiveContainer width="100%" height="90%" maxHeight={600}>
        <PieChart width={200} height={200}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      {/* </div> */}
    </Container>
  );
};

export default OrdersOverview;
const Container = styled.div`
  border: ${(props) => props.theme.border};
  overflow: hidden;
  border-radius: 6px;
  background-color: ${(props) => props.theme.accent1};
  position: relative;
  .head {
    border-bottom: ${(props) => props.theme.border};
    padding: 1rem 0.75rem;
  }
`;
