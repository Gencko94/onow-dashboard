import {
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  AreaChart,
  Area,
} from "recharts";
import Box from "../../reusable/Box/Box";
import Paragraph from "../../StyledComponents/Paragraph";
import Flex from "../../StyledComponents/Flex";
import Heading from "../../StyledComponents/Heading";
const OrdersOverview = () => {
  // const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  // const RADIAN = Math.PI / 180;
  // const renderCustomizedLabel = ({
  //   cx,
  //   cy,
  //   midAngle,
  //   innerRadius,
  //   outerRadius,
  //   percent,
  //   index,
  // }: any) => {
  //   const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  //   const x = cx + radius * Math.cos(-midAngle * RADIAN);
  //   const y = cy + radius * Math.sin(-midAngle * RADIAN);

  //   return (
  //     <text
  //       x={x}
  //       y={y}
  //       fill="white"
  //       textAnchor={x > cx ? "start" : "end"}
  //       dominantBaseline="central"
  //     >
  //       {`${(percent * 100).toFixed(0)}%`}
  //     </text>
  //   );
  // };
  const data = [
    {
      name: "2021-7-21",
      "Daily Orders": 5,
    },
    {
      name: "2021-7-22",
      "Daily Orders": 10,
    },
    {
      name: "2021-7-23",
      "Daily Orders": 21,
    },
    {
      name: "2021-7-24",
      "Daily Orders": 25,
    },
    {
      name: "2021-7-25",
      "Daily Orders": 17,
    },
    {
      name: "2021-7-26",
      "Daily Orders": 20,
    },
  ];
  return (
    <Box
    //  type="titled"
    // boxTitle="Orders Per Day"
    >
      <Flex margin="0 0 1rem 0">
        <Heading tag="h6" type="small-title">
          Orders per day
        </Heading>
      </Flex>
      <ResponsiveContainer width="100%" aspect={1} height="400px">
        <AreaChart
          data={data}
          margin={{
            top: 25,
            // right: 30,
            left: -30,
            // bottom: -25,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis dataKey="Daily Orders" />
          <Tooltip content={CustomTooltip} />
          <Legend />
          {/* <CustomArea /> */}
          <Area
            // fill="#fff"
            type="monotone"
            dataKey="Daily Orders"
            // stroke="#1d60db"
            strokeWidth="4px"
            activeDot={{ r: 6 }}
            dot={true}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default OrdersOverview;

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <Box>
        <Paragraph fontSize="0.9rem">{`Orders on this day: ${payload[0].value} orders`}</Paragraph>
        <Paragraph fontSize="0.9rem">{`${label}`}</Paragraph>
        {/* <p className="intro">{getIntroOfPage(label)}</p> */}
        {/* <p className="desc">Anything you want can be displayed here.</p> */}
      </Box>
    );
  }

  return null;
};
// const CustomArea = styled(Area)`
//   stroke: ${(props) => props.theme.secondary};
// `;
