import { ResponsiveBar } from "@nivo/bar";
import { formatNumber } from "../../util/formatter";

const ReenChart = ({ type, data, x_label = "X Label" }) => {
  const isMobile = window.innerWidth < 600;
  const datakeys = ["total"];
  const legend = [
    {
      dataFrom: "keys",
      anchor: "bottom",
      direction: "row",
      justify: false,
      translateX: 0,
      translateY: 80,
      itemsSpacing: 0,
      itemWidth: 100,
      itemHeight: 20,
      itemDirection: "left-to-right",
      itemOpacity: 0.85,
      symbolSize: 16,
      effects: [
        {
          on: "hover",
          style: {
            itemOpacity: 1,
          },
        },
      ],
    },
  ];

  const CustomTooltip = ({ value, color }) => {
    return (
      <div className={`font-semibold text-sm text-white px-2 py-1 rounded-md`} style={{ backgroundColor: color }}>
        {formatNumber(value)}
      </div>
    );
  };

  const tickValuesFromData = () => {
    let existingData = [];
    const filteredData = data.filter((el) => el.total > 0);
    filteredData.forEach((el) => existingData.push(el.total));
    existingData.sort((a, b) => a - b);

    const first = existingData[0];
    const last = existingData[existingData.length - 1];
    const middle = last / 2;

    if (existingData.length > 2) {
      return [first, middle, last];
    } else {
      return [first, last];
    }
  };

  return (
    <ResponsiveBar
      data={data}
      keys={datakeys}
      indexBy={type === "monthly" ? "bulan" : "perhari"}
      margin={{ top: 0, right: isMobile ? 0 : 24, bottom: 110, left: 42 }}
      padding={0.3}
      groupMode="grouped"
      layout="horizontal"
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={{ scheme: "accent" }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "red",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "green",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      borderColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        tickValues: tickValuesFromData(),
        legend: x_label,
        legendPosition: "middle",
        legendOffset: 42,
        truncateTickAt: 0,
        format: formatNumber,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legendPosition: "middle",
        legendOffset: -60,
        truncateTickAt: 0,
        format: formatNumber,
      }}
      labelSkipWidth={100}
      labelSkipHeight={50}
      valueFormat={formatNumber}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      tooltip={CustomTooltip}
      legends={datakeys.length > 1 ? legend : []}
      role="application"
      ariaLabel="statistik penjualan"
    />
  );
};

export default ReenChart;
