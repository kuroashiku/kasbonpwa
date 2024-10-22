import { useCallback, useContext, useEffect, useState, useRef } from "react";
import { AppContext } from "../../AppContext";
import { ChevronLeftIcon, BackspaceIcon, CheckIcon, CheckBadgeIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { topic } from "../../constant/appTopics";
import { Button, Card, CardBody, Dialog, DialogBody, DialogHeader, Input, Option, Select, Spinner, Typography} from "@material-tailwind/react";
import { formatThousandSeparator, formatBackToNumber } from "../../util/formatter";
import { dictionary } from "../../constant/appDictionary";
import { paymentModes } from "../../constant/appEnum";
import { getAmountRecommendations, moneyList } from "../../util/smartRecomAmount";
import { getMatchUnitAndPrice } from "../../util/itemConversion";
import { FilterItemModel } from "../../model/filter";
import { bayarPos } from "../../api/Pos";
import { getCredit, saveCredit } from "../../api/Transaction";
import POSSuccess from "./POSSuccess";
import POSSuccessSplitBill from "./POSSuccessSplitBill";
import { DayPicker } from "react-day-picker";
import { cloneDeep, filter } from "lodash";
import { deleteDraftPos } from "../../api/Pos";
export default function POSCalculatorSplitBill() {
	const navigate = useNavigate();
	const { totalPay, setTotalPay, itemsCheckout, money, setMoney, currency, lang, defaultPayment, cookies,
		pajakGlobal, diskonGlobal, tableGlobal, catatanGlobal, customerGlobal, setCustomerGlobal, setDiskonGlobal, 
		setTableGlobal, setPajakGlobal, itemsCheckoutBill, totalPaySplitBill, moneySplitBill, setMoneySplitBill, bill
	} = useContext(AppContext);

	const [customerId, setCustomerId] = useState("");
	const [moneyFormat, setMoneyFormat] = useState("0");
	const [totalPayFormat, setTotalPayFormat] = useState("0");
	const [paymentMode, setPaymentMode] = useState(defaultPayment);
	const [recommendations, setRecommendations] = useState([]);
	const [success, setSuccess] = useState(false);
	const [payLoading, setPayLoading] = useState(false);
	const [kasid, setKasid] = useState(1);
	const [kasnama, setKasnama] = useState("Admin");
	const [showCalendar, setShowCalendar] = useState(false);
	const [modePiutang, setModePiutang] = useState(false);
	const calendarRef = useRef(null);
	const [piutangOpen, setPiutangOpen] = useState(false);
	const [piutangDate, setPiutangDate] = useState(null);
	const [dateFilter, setDateFilter] = useState(null);
	const [paymentModesNew, setPaymentModesNew] = useState(paymentModes);
	const [splitBillArray, setSplitBillArray] = useState(["Bill-1","Bill-2","Bill-3","Bill-4","Bill-5"]);
	const [splitCount, setSplitCount] = useState(0);
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (calendarRef.current && !calendarRef.current.contains(event.target)) {
				setShowCalendar(false);
			}
		};
		document.addEventListener("click", handleClickOutside, true);
		return () => {
			document.removeEventListener("click", handleClickOutside, true);
		};
	}, [calendarRef]);

	useEffect(() => {
		if (itemsCheckout.length <= 0) {
			navigate(topic.cashier.route);
		}
		setTotalPayFormat(formatThousandSeparator(totalPaySplitBill[splitCount]));
		const options = getAmountRecommendations(totalPaySplitBill[splitCount]);
		setRecommendations(options);
		setPiutangDate(null);
	}, [splitCount]);

	useEffect(() => {
		if (paymentMode == "CIL") {
			// setPiutangOpen(true)
			setModePiutang(true);
		} else setModePiutang(false);
	}, [paymentMode]);

	const onAppend = (numberStr) => {
		const newStr = formatThousandSeparator(`${moneyFormat}${numberStr}`);
		const number = formatBackToNumber(newStr);
		setMoneyFormat(newStr);
		setMoney(number);
	};

	const onClear = () => {
		setMoneyFormat("0");
		setMoney(0);
	};

	// const diff = money - totalPay;
	const diff = money - totalPaySplitBill[splitCount];
	const moneyBack = diff > 0 ? diff : 0;

	const setPay = useCallback(async () => {
		let filterProps = {};
		setPayLoading(true);
		if(tableGlobal!=''){ 
            filterProps={
                mej_id:parseInt(tableGlobal),
				resto_type:parseInt(cookies.resto_type),
				lok_type:cookies.lok_type
            }
        }
		const _moneySplit = [...moneySplitBill];
		setMoneySplitBill([..._moneySplit, money]);	
		console.log([..._moneySplit, money])
		const { data, error } = await bayarPos({
			//rows: itemsCheckout
			//total: totalPay,
			rows: itemsCheckoutBill[splitCount],
			total: totalPaySplitBill[splitCount],
			kas_id: kasid,
			kas_nama: kasnama,
			dibayar: money,
			kembalian: paymentMode == "CIL" ? diff : moneyBack,
			cus_id: customerGlobal,
			lok_id: cookies.lok_id,
			catatan: catatanGlobal,
			diskon: diskonGlobal,
			disnom: 0,
			carabayar: paymentMode,
			sft_id: 0,
			dicicil: paymentMode == "CIL" ? 1 : 0,
			pajak: pajakGlobal,
			jatuhtempo: piutangDate,
			not_status:bill[splitCount],
			...filterProps
		});
		setPayLoading(false);
		if (error) {
			alert(dictionary.cashier.calculator.failed[lang]);
		} else {
			setTableGlobal('');
			setCustomerGlobal('');
			if(itemsCheckout[0].dot_id!=0){
				const init = async () => {
					const { data, error } = await deleteDraftPos({ dot_id: parseInt(itemsCheckout[0].dot_id) });
				};
				init();
			}
			if(itemsCheckoutBill[splitCount+1])
			{
				setMoneyFormat("0")
				setMoney(0)
				setSplitCount(splitCount+1);
			}
			else{
				let totalmoney=0;
				let totalpay=0;
				moneySplitBill.map((i,index) => {
					if(index>=totalPaySplitBill.length)
					totalmoney=totalmoney+parseFloat(i);
				});
				totalPaySplitBill.map((j) => {
					totalpay=totalpay+parseFloat(j);
				});
				setTotalPay(totalpay);
				setMoney(totalmoney);
				setSuccess(true);
			}
		}
	}, [itemsCheckout, totalPay, money, paymentMode, customerId, piutangDate, itemsCheckoutBill, splitCount,moneySplitBill]);

	const onBackspace = () => {
		const newStr = formatThousandSeparator(moneyFormat.slice(0, -1));
		const number = formatBackToNumber(newStr);
		setMoneyFormat(newStr ? newStr : "0");
		setMoney(number ? number : 0);
	};

	const onExact = (pay) => {
		setMoneyFormat(formatThousandSeparator(pay));
		setMoney(pay);
	};

	function formatDate(date) {
		let datePart = [date.getFullYear(), date.getMonth() + 1, date.getDate()]
			.map((n, i) => n.toString().padStart(i === 0 ? 4 : 2, "0"))
			.join("-");
		return datePart;
	}

	const onDateChange = useCallback(
		(date = new Date()) => {
			setPiutangDate(formatDate(date));
			const newFilter = FilterItemModel();
			newFilter.key = "date";
			newFilter.value = date;
			setDateFilter(newFilter);
			setPiutangOpen(false);
			const _paymentModesNew = cloneDeep(paymentModesNew);
			const indexOfId = _paymentModesNew.findIndex((a) => a.code == "CIL");
			_paymentModesNew[indexOfId].desc = "Piutang deadline " + formatDate(date);
			setPaymentModesNew(_paymentModesNew);
			setModePiutang(true);
			// setFilters(_newfilter);
		},
		[piutangDate, modePiutang]
	);

	if (success) {
		return <POSSuccessSplitBill paymentMode={paymentMode} />;
	}

	return (
		<div className="h-screen-adapt flex flex-col gap-4 bg-gray-50 overflow-auto p-2">
			<div className="value-area">
				<div className="header px-2 pb-2">
					<div className="flex items-center pb-4">
						<div onClick={() => navigate(topic.cashier.route)}>
							<ChevronLeftIcon className="h-6 w-6 stroke-2" />
						</div>
						<div className="flex-grow ml-3 pl-2 border-l">
							<Typography color="gray" variant="h5">
								{dictionary.cashier.calculator.totalPay[lang]}
							</Typography>
						</div>
						<Typography color="teal" variant="h5" className="lg:text-[36px]">
							{`${currency} ${totalPayFormat}`}
						</Typography>
					</div>
					<div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
						<Select
							id="payment"
							value={paymentMode}
							onChange={setPaymentMode}
							size="lg"
							color="teal"
							label={dictionary.cashier.calculator.payWith[lang]}
						>
							{paymentModesNew.map((p) => (
								<Option value={p.code} key={p.code}>
									{p.desc}
								</Option>
							))}
						</Select>
						<Input
							color="teal"
							value={bill[splitCount]}
							label="Info Split Bill"
							disabled={true}
						/>
						<Dialog open={piutangOpen}>
							<DialogHeader>Tanggal Jatuh Tempo Piutang</DialogHeader>
							<DialogBody>
								<Card className="my-0 mx-auto w-8/12">
									<CardBody>
										<DayPicker
											mode="single"
											selected={dateFilter ? dateFilter.value : null}
											onSelect={onDateChange}
											captionLayout="dropdown"
											fromYear={2010}
											toYear={new Date().getFullYear()}
										/>
									</CardBody>
								</Card>
							</DialogBody>
						</Dialog>
						{/* <div>
									<DayPicker
										mode="single"
										selected={dateFilter ? dateFilter.value : null}
										onSelect={onDateChange}
										captionLayout="dropdown"
										fromYear={2010}
										toYear={new Date().getFullYear()}
									/>
								</div> */}
					</div>
				</div>

				<div className="py-3 pl-2 pr-1 flex">
					<div className="flex-grow pr-3">
						<Typography variant="small">{dictionary.cashier.calculator.money[lang]}</Typography>
						<div className="mb-3 flex justify-between border-b-2">
							<Typography variant="h4">{currency}</Typography>
							<Typography variant="h4">{moneyFormat}</Typography>
						</div>
						<Typography variant="small">{dictionary.cashier.calculator.moneyBack[lang]}</Typography>
						<div className="flex justify-between border-b-2">
							<Typography>{currency}</Typography>
							<Typography>{formatThousandSeparator(moneyBack)}</Typography>
						</div>
					</div>

					<Button
						className="px-2"
						color="teal"
						disabled={!money || (money < totalPaySplitBill[splitCount] && !modePiutang) || (money >= totalPaySplitBill[splitCount] && modePiutang)}
						onClick={() => setPay()}
					>
						{payLoading ? (
							<Spinner className="h-14 w-14 text-white" color="light-green" />
						) : (
							<CheckBadgeIcon className="h-14 w-14" />
						)}
					</Button>
				</div>
			</div>

			<div className="grid grid-cols-4 gap-2">
				<Button className="min-h-12" variant="outlined" color="teal" onClick={() => onAppend(7)}>
					<Typography variant="h3">7</Typography>
				</Button>
				<Button className="min-h-12" variant="outlined" color="teal" onClick={() => onAppend(8)}>
					<Typography variant="h3">8</Typography>
				</Button>
				<Button className="min-h-12" variant="outlined" color="teal" onClick={() => onAppend(9)}>
					<Typography variant="h3">9</Typography>
				</Button>
				<Button className="min-h-12" variant="outlined" color="teal" onClick={onClear}>
					<Typography variant="h3">C</Typography>
				</Button>
				<Button className="min-h-12" variant="outlined" color="teal" onClick={() => onAppend(4)}>
					<Typography variant="h3">4</Typography>
				</Button>
				<Button className="min-h-12" variant="outlined" color="teal" onClick={() => onAppend(5)}>
					<Typography variant="h3">5</Typography>
				</Button>
				<Button className="min-h-12" variant="outlined" color="teal" onClick={() => onAppend(6)}>
					<Typography variant="h3">6</Typography>
				</Button>
				<Button className="min-h-12 p-0" variant="outlined" color="teal" onClick={onBackspace}>
					<BackspaceIcon className="h-10 w-10 stroke-2 mx-auto" />
				</Button>
				<Button className="min-h-12" variant="outlined" color="teal" onClick={() => onAppend(1)}>
					<Typography variant="h3">1</Typography>
				</Button>
				<Button className="min-h-12" variant="outlined" color="teal" onClick={() => onAppend(2)}>
					<Typography variant="h3">2</Typography>
				</Button>
				<Button className="min-h-12" variant="outlined" color="teal" onClick={() => onAppend(3)}>
					<Typography variant="h3">3</Typography>
				</Button>
				<Button className="row-span-2 p-0" variant="outlined" color="teal" onClick={() => onExact(totalPaySplitBill[splitCount])}>
					<Typography variant="h5">{dictionary.cashier.calculator.exactMoney[lang]}</Typography>
				</Button>
				<Button className="min-h-12 p-0" variant="outlined" color="teal" onClick={() => onAppend("00")}>
					<Typography variant="h3">00</Typography>
				</Button>
				<Button className="min-h-12" variant="outlined" color="teal" onClick={() => onAppend(0)}>
					<Typography variant="h3">0</Typography>
				</Button>
				<Button className="min-h-12 p-0" variant="outlined" color="teal" onClick={() => onAppend("000")}>
					<Typography variant="h4">000</Typography>
				</Button>
				{recommendations.map((r, idx) => (
					<Button
						className="min-h-12 p-0 col-span-2"
						variant="outlined"
						color="teal"
						onClick={() => onExact(r)}
						key={idx}
					>
						<Typography variant="h4">{formatThousandSeparator(r)}</Typography>
					</Button>
				))}
			</div>
		</div>
	);
}
