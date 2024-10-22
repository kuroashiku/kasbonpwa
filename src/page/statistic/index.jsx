import { useContext, useEffect, useRef, useState } from "react";
import { IconButton, Navbar } from "@material-tailwind/react";
import { AdjustmentsVerticalIcon, Bars3Icon } from "@heroicons/react/24/outline";
import { AppContext } from "../../AppContext";
import { getStatistic } from "../../api/Transaction";
import { formatRupiah, monthConverter } from "../../util/formatter";
import CustomLoading from "../../component/loading";
import ReenChart from "./chart";
import FilterBox from "./filterbox";
import LoadingOverlay from "../../lib/LoadingOverlay";

function Statistic() {
  const { isMenuOpen, setMenuOpen, cookies } = useContext(AppContext);
  const navbarRef = useRef();
  const currentdate = new Date();
  const currentMonth = currentdate.getMonth() + 1;
  const currentYear = currentdate.getFullYear();

  const [openFilter, setOpenFilter] = useState(false);
  const [loading, setLoading] = useState(true);
  const [monthlyStatistics, setMonthlyStatistics] = useState([]);
  const [dailyStatistics, setDailyStatistics] = useState([]);
  const [year, setYear] = useState();
  const [month, setMonth] = useState();

  useEffect(() => {
    initDate();
    return () => {
      // console.log("clear filters");
      localStorage.removeItem("month_stat");
      localStorage.removeItem("year_stat");
    };
  }, []);

  useEffect(() => {
    if (month && year) {
      getStatistics();
    }
  }, [year, month]);

  const initDate = () => {
    if (localStorage.getItem("month_stat")) {
      setMonth(JSON.parse(localStorage.getItem("month_stat")).value);
    } else {
      setMonth(currentMonth);
    }

    if (localStorage.getItem("year_stat")) {
      setYear(JSON.parse(localStorage.getItem("year_stat")).value);
    } else {
      setYear(currentYear);
    }
  };

  const getStatistics = async () => {
    try {
      setLoading(true);
      await Promise.all([getMonthlyStatistic(), getDailyStatistic()]);
      setTimeout(() => setLoading(false), 1500);
    } catch (error) {
      console.error("Error fetching statistics", error);
      setLoading(false);
    }
  };

  const handleData = (data, type) => {
    if (type === "monthly") {
      /** set all month data */
      const bulanMapping = {
        1: "Jan",
        2: "Feb",
        3: "Mar",
        4: "Apr",
        5: "Mei",
        6: "Jun",
        7: "Jul",
        8: "Agu",
        9: "Sep",
        10: "Okt",
        11: "Nov",
        12: "Des",
      };

      /** create array data which only has total value */
      const existingData = data.reduce((acc, item) => {
        acc[item.perbulan] = item;
        return acc;
      }, {});

      /** create & set all data annualy from 12 month */
      const formattedData = Object.keys(bulanMapping).map((bulan) => {
        if (existingData[bulan]) {
          return {
            ...existingData[bulan],
            bulan: bulanMapping[bulan],
            label_total: formatRupiah(existingData[bulan].total),
          };
        } else {
          return {
            bulan: bulanMapping[bulan],
            perbulan: bulan,
            total: 0,
            label_total: "0",
          };
        }
      });
      // console.log(formattedData);

      /** dismiss all array if all of the item has no total value */
      const noTransaction = formattedData.every((item) => item.total === 0);
      if (noTransaction) {
        setMonthlyStatistics([]);
      } else {
        setMonthlyStatistics(formattedData);
      }
    } else {
      /** get total days in certain month */
      const daysInMonth = new Date(year, 6, 0).getDate();

      /** create new array for item which has total value */
      const dataMap = data.reduce((acc, curr) => {
        acc[`${curr.perhari}-${curr.perbulan}-${curr.pertahun}`] = curr.total;
        return acc;
      }, {});

      /** create final array data of all days in a month */
      const resultdata = [];
      for (let day = 1; day <= daysInMonth; day++) {
        const key = `${day}-${month}-${year}`;
        resultdata.push({
          perhari: day.toString(),
          perbulan: month.toString(),
          pertahun: year.toString(),
          total: dataMap[key] || 0,
        });
      }
      // console.log(resultdata);

      /** dismiss all array if all of the item has no total value */
      const noTransaction = resultdata.every((item) => item.total === 0);
      if (noTransaction) {
        setDailyStatistics([]);
      } else {
        setDailyStatistics(resultdata);
      }
    }
  };

  const handleResponse = ({ type, data, error }) => {
    if (error) {
      alert("Terjadi Kesalahan");
    } else {
      handleData(data, type);
    }
  };

  const getMonthlyStatistic = async () => {
    const { data, error } = await getStatistic({
      lok_id: cookies.lok_id,
      thn: year,
      monthly: "yes",
    });
    handleResponse({ type: "monthly", data, error });
  };

  const getDailyStatistic = async () => {
    const { data, error } = await getStatistic({
      lok_id: cookies.lok_id,
      bln: month,
      thn: year,
      dayly: "yes",
    });
    handleResponse({ type: "daily", data, error });
  };

  const ShowContent = () => {
    if (loading) {
      return (
        <LoadingOverlay white />
        // <div className="loading-area absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        //   <CustomLoading loading={true} size={80} type={"hash"} color={"#009688"} />
        // </div>
      );
    } else {
      if (dailyStatistics.length > 0 || monthlyStatistics.length > 0) {
        return (
          <div
            className={`container-area ${
              (openFilter || isMenuOpen) && "filter blur-2xl"
            } h-[100%] w-full px-4 pt-[80px] pb-8`}
          >
            <div className="content-area lg:flex lg:flex-row lg:gap-3 overflow-y-auto h-full">
              <div
                className={`chartbox border border-solid border-gray-300 rounded-lg mb-4 pr-4 lg:px-0 ${
                  dailyStatistics.length > 0 ? "h-[900px] lg:h-[800px]" : "h-[200px]"
                } w-full text-center`}
              >
                <div className="label font-semibold text-gray-700 mt-3">{monthConverter(month)}</div>
                {dailyStatistics.length > 0 ? (
                  <ReenChart type={"daily"} data={dailyStatistics} x_label={"Penjualan (dalam Rupiah)"} />
                ) : (
                  <div className="blank">
                    <i className="fa-solid fa-ghost text-[72px] text-gray-500 mt-8 my-4"></i>
                    <div className="text-[16px] text-gray-500">Tidak Ada Transaksi Penjualan</div>
                  </div>
                )}
              </div>
              <div className="chartbox border border-solid border-gray-300 rounded-lg pr-4 lg:px-0 h-[500px] w-full text-center">
                <div className="label font-semibold text-gray-700 mt-3">{year}</div>
                <ReenChart type={"monthly"} data={monthlyStatistics} x_label={"Penjualan (dalam Rupiah)"} />
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div className={`content-area px-4 pt-[100px] h-[90%] text-center`}>
            <div className="blank h-full flex flex-col justify-center align-middle gap-4">
              <i className="fa-solid fa-ghost text-[100px] text-gray-500"></i>
              <div className="text-[16px] text-gray-500">Tidak Ada Transaksi Penjualan</div>
            </div>
          </div>
        );
      }
    }
  };

  const ShowNavbarTitle = () => {
    return (
      <div className="text-black font-semibold">
        Statistik - {monthConverter(month)} {year}
      </div>
    );
  };

  return (
    <div className="h-screen-adapt bg-gray-50 overflow-hidden relative">
      <div className="p-2 top-0 inset-x-0 fixed z-10 mx-auto desktop:max-w-[60%]">
        <Navbar ref={navbarRef} className={`max-w-full py-2 px-2 relative`} blurred={false}>
          <div className="flex items-center justify-between">
            <IconButton variant="text" size="md" onClick={() => setMenuOpen(true)}>
              <Bars3Icon className="h-6 w-6 stroke-2" />
            </IconButton>
            <ShowNavbarTitle />
            <IconButton size="md" variant="text" onClick={() => setOpenFilter(true)}>
              <AdjustmentsVerticalIcon className="h-6 w-6 stroke-2" />
            </IconButton>
          </div>
        </Navbar>
      </div>

      <ShowContent />

      <FilterBox
        open={openFilter}
        month={month}
        setMonth={setMonth}
        year={year}
        setYear={setYear}
        setOpenFilter={setOpenFilter}
      />
    </div>
  );
}

export default Statistic;
