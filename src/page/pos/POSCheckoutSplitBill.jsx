import { Button, Card, Dialog, DialogHeader, DialogBody, DialogFooter, IconButton, List, ListItem,
	ListItemPrefix, ListItemSuffix, Navbar, Option, Spinner, Switch, Select, Typography,
} from "@material-tailwind/react";
import { useCallback, useContext, useState, useRef, useEffect } from "react";
import {ArrowRightIcon,ChevronLeftIcon,CubeIcon,MinusCircleIcon,ArchiveBoxIcon,
} from "@heroicons/react/24/outline";
import { AppContext } from "../../AppContext";
import { ItemCheckoutModel } from "../../model/item";
import { draftPos } from "../../api/Pos";
import { formatThousandSeparator, SetItemUnit } from "../../util/formatter";
import { getMatchUnitAndPrice } from "../../util/itemConversion";
import { dictionary } from "../../constant/appDictionary";
import { topic } from "../../constant/appTopics";
import { useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";
import { IKImage } from "imagekitio-react";
import { IMAGEKIT_URL_ENDPOINT } from "../../constant/appCommon";
import InputNumber from "../../lib/InputNumber";
import InputSimple from "../../lib/InputSimple";
import { getDiscount } from "../../api/Discount";
import { getTax } from "../../api/Tax";
import { getTable, saveTable, deleteTable } from "../../api/Table";
import { getCustomers, saveCustomer } from "../../api/Customer";
import { set } from "date-fns/fp/set";
import { cloneDeep, filter } from "lodash";

export default function POSCheckoutBill() {
	const { currency, itemsCheckout, setItemsCheckout, lang, setMoney, setTotalPay, totalPay, pajakGlobal,
		setPajakGlobal, diskonGlobal, setDiskonGlobal, catatanGlobal, setCatatanGlobal, tableGlobal,
		setTableGlobal, cookies, customerGlobal, setCustomerGlobal,semiDesktopMode, 
		setItemsCheckoutBill, setTotalPaySplitBill, setBill, pajakGlobalJSON, setPajakGlobalJSON, setTotalPriceBill, totalPriceBill} = useContext(AppContext);
	const navigate = useNavigate();
	const DiscountRef = useRef(null);
	const [showDiscount, setShowDiscount] = useState(false);
	const [readonly, setReadonly] = useState(false);
	const [diskon, setDiskon] = useState(0);
	const [checkoutById, setCheckoutById] = useState({});
	const [diskons, setDiskons] = useState({});
	const [diskonsGlobal, setDiskonsGlobal] = useState({});
	const [taxs, setTaxs] = useState([]);
	const [tables, setTables] = useState({});
	const [isNominal, setIsNominal] = useState(false);
	const [isNominalGlobal, setIsNominalGlobal] = useState(false);
	const [diskonSelect, setDiskonSelect] = useState("");
	const [open, setOpen] = useState(false);
	const [switchValue, setSwitchValue] = useState(false);
	const [switchValueGlobal, setSwitchValueGlobal] = useState(false);
	const [switchValueCustomer, setSwitchValueCustomer] = useState(false);
	const [pajakGlobalNama, setPajakGlobalNama] = useState("");
	const [pajakGlobalId, setPajakGlobalId] = useState("");
	const [totalQty, setTotalQty] = useState(0);
	const [totalPrice, setTotalPrice] = useState(0);
	const [customers, setCustomers] = useState([]);
	const [customerNew, setCustomerNew] = useState("");
	const [tmpHeight, setTmpHeight] = useState(false);
	const [splitBillArray, setSplitBillArray] = useState(["Bill-1","Bill-2","Bill-3","Bill-4","Bill-5"]);
	const [checkHeight, setCheckHeight] = useState([]);
	const [checkWidth, setCheckWidth] = useState(0);
	const [pajakBill, setPajakBill] = useState([]);
	const [diskonBill, setDiskonBill] = useState([]);
	function handleOpen(item) {
		setOpen(!open);
		setDiskonSelect(item.diskon==0?"":item.diskon)
	}

	const takeItem = useCallback(
		(item = ItemCheckoutModel()) => {
			let foundItem = false;
			let _itemsCheckout = itemsCheckout.map((_item) => {
				if (_item.itm_id === item.itm_id && _item.konvidx === item.konvidx) {
					_item.qty =
						Number(_item.pakaistok) == 1
							? Number(_item.stok) - _item.qty > 0
								? _item.qty + 1
								: _item.qty
							: _item.qty + 1;
					foundItem = true;
				}
				return _item;
			});
			if (!foundItem) {
				item.qty = 1;
				_itemsCheckout.push(item);
			}
			initItems({
				diskon,
				diskonSelect,
				isNominal,
				itemsCheckout: _itemsCheckout,
			});
		},
		[itemsCheckout]
	);

	const cancelItem = useCallback(
		(item = ItemCheckoutModel()) => {
			let indexToRemove = -1;
			let _itemsCheckout = itemsCheckout.map((_item, index) => {
				if (_item.itm_id === item.itm_id && _item.konvidx === item.konvidx) {
					if (_item.qty > 1) {
						_item.qty--;
					} else {
						indexToRemove = index;
					}
				}
				return _item;
			});
			if (indexToRemove >= 0) {
				_itemsCheckout.splice(indexToRemove, 1);
			}
			initItems({
				diskon,
				diskonSelect,
				isNominal,
				itemsCheckout: _itemsCheckout,
			});
		},
		[itemsCheckout]
	);

	const cancelPajak = useCallback(() => {
		setPajakGlobal(0);
	}, [pajakGlobal]);

	const initItems = useCallback(
		//({ diskon = 0, diskonSelect = "", isNominal = false, itemsCheckout = [], diskonGlobal=0, pajakGlobal=0, pajakGlobalJSON={} }) => {
		({ itemsCheckout = [], diskonGlobal=0, pajakGlobal=0, newItemCheckout=[]}) => {
		let _totalQty = 0;
		let _totalPrice = 0;
		itemsCheckout.forEach((item) => {
		//_totalPrice += item.qty * item.total;
		_totalPrice += item.qty * item.satuan0hrg * (1 - Number(item.diskon) / 100);
		item.total = item.qty * item.satuan0hrg * (1 - Number(item.diskon) / 100);
		_totalQty += item.qty;
		});
		setTotalPrice(_totalPrice);
		setTotalQty(_totalQty);
		setItemsCheckout(itemsCheckout);

		let totalCheckouts=[];
		let totalPays=[];
		let totalBill=[];
		let totalPriceBill=[];
		let pajakBillNew=[];
		let pajakBillNew2=[];
		splitBillArray.map((i, index) => {
			let splitCheckouts=[];
			let splitTotal=0;
			let totalNew=0;
			itemsCheckout.map((_item) => {
				if (_item.split_bill === i ) {
					splitCheckouts.push(_item);
					console.log(pajakGlobal)
					totalNew=totalNew+_item.total;
					_item.total=_item.total * (1 - parseInt(diskonGlobal==''?0:diskonGlobal) / 100)+ ((_item.total * (1 - parseInt(diskonGlobal==''?0:diskonGlobal) / 100)) * (parseInt(pajakGlobal) / 100))
					splitTotal=splitTotal+_item.total;
				}
			});
			if(splitCheckouts.length>0){
				totalCheckouts.push(splitCheckouts);
				totalPays.push(splitTotal);
				totalPriceBill.push(totalNew);
				totalBill.push(i);
				pajakBillNew.push({bill:i,value:((totalNew * (1 - parseInt(diskonGlobal==""?0:diskonGlobal) / 100)) * (parseInt(pajakGlobal) / 100))})
				pajakBillNew2.push({bill:i,value:((totalNew * (1 - parseInt(diskonGlobal==""?0:diskonGlobal) / 100)) * (parseInt(pajakGlobal) / 100))})

			}
		})
		if(pajakGlobal>0)
		setPajakBill(pajakBillNew)
		setTotalPaySplitBill(totalPays);
		setItemsCheckoutBill(totalCheckouts);
		setBill(totalBill);
		setTotalPriceBill(totalPriceBill);
		console.log(pajakBillNew2)
		//setPajakGlobalId(pajakGlobalJSON)
		
		const _totalAllPrice =
		//_totalPrice * (1 - parseInt(diskonGlobal) / 100) + _totalPrice * (parseInt(pajakGlobal) / 100);
		_totalPrice * (1 - parseInt(diskonGlobal==""?0:diskonGlobal) / 100) + ((_totalPrice * (1 - parseInt(diskonGlobal==""?0:diskonGlobal) / 100)) * (parseInt(pajakGlobal) / 100));
		setTotalPay(_totalAllPrice);
		},
		//[checkoutById, diskon, diskonSelect, diskonGlobal, pajakGlobal, pajakGlobalJSON]
		[checkoutById, diskonGlobal, pajakGlobal]
	);

	useEffect(() => {
		const initdiskon = async () => {
			setDiskons([]);
			const { data, error } = await getDiscount({
				lok_id: cookies.lok_id,
				dis_global: "all",
			});
			if (data.length >= 1) {
				let cekDiskonGlobal = data.filter(function (object) {
					return object.dis_global === "true";
				});
				let cekDiskonGlobalNew = data.filter(function (object) {
					return object.dis_global !== "true";
				});
				if (cekDiskonGlobal) {
					setSwitchValueGlobal(true);
					setIsNominalGlobal(true);
					setDiskonsGlobal(cekDiskonGlobal);
				}
				if (cekDiskonGlobalNew) {
					setIsNominal(false);
					setDiskons(cekDiskonGlobalNew);
					setSwitchValue(true);
				}
			}
			else{
				setSwitchValue(false);
				setIsNominal(true);
			}
			
		};
		const initpajak = async () => {
			setTaxs([]);
			const { data, error } = await getTax({
				lok_id: cookies.lok_id,
			});
			if (data.length >= 1) {
				setTaxs(data);
			}
		};
		const inittable = async () => {
			setTaxs([]);
			const { data, error } = await getTable({
				lok_id: cookies.lok_id,
				//mej_status: 'Kosong'
			});
			if (data.length >= 1) {
				setTables(data);
			}
		};
		const initcustomer = async () => {
			const { data, error } = await getCustomers({ com_id: cookies.com_id });
			if (error) {
				alert("Data tidak ditemukan");
			} else {
				setCustomers(data);
			}
		};
		initcustomer();
		initdiskon();
		initpajak();
		inittable();
		initItems({
			pajakGlobal,
			diskonGlobal,
			itemsCheckout,
		});
		if(pajakGlobalJSON.paj_id){
			setPajakGlobalId(pajakGlobalJSON.paj_id)
		}
	}, []);

	const handleSplit= (value, item, index) => {
		const _itemsCheckout = cloneDeep(itemsCheckout);
		_itemsCheckout[index].split_bill=value;
		
		initItems({
			diskon: diskon,
			diskonGlobal: diskonGlobal,
			pajakGlobal:pajakGlobal,
			itemsCheckout: _itemsCheckout,
		});
	};

	const handleDiskonInput = (evt) => {
		const diskonVal = evt.target.value;
		setDiskon(diskonVal);
		let _itemsCheckout = itemsCheckout.map((_item) => {
			if (_item.itm_id === checkoutById.itm_id && _item.konvidx === checkoutById.konvidx) {
				_item.diskon = Number(diskonVal);
			}
			return _item;
		});
		initItems({
			diskonGlobal: diskonGlobal,
			pajakGlobal:pajakGlobal,
			itemsCheckout: _itemsCheckout,
		});
	};

	const handleDiskonSelect = (value) => {
		const diskonVal = value;
		setDiskon(diskonVal);
		let _itemsCheckout = itemsCheckout.map((_item) => {
		if (_item.itm_id === checkoutById.itm_id && _item.konvidx === checkoutById.konvidx) {
			_item.diskon = Number(diskonVal);
		}
		return _item;
		});
		initItems({
		diskonGlobal: diskonGlobal,
		pajakGlobal:pajakGlobal,
		itemsCheckout: _itemsCheckout,
		});
	};

	const handlePajakGlobal = (value) => {
		let getValue = taxs.filter(function (object) {
		  return object.paj_id === value;
		});
		setPajakGlobal(getValue[0].paj_value);
		setPajakGlobalJSON(getValue[0]);
		initItems({
		  diskonGlobal: diskonGlobal,
		  pajakGlobal: getValue[0].paj_value,
		  pajakGlobalJSON:getValue[0],
		  itemsCheckout: itemsCheckout,
		});
	};

	const handleDiskonGlobal = (evt) => {
		setDiskonGlobal(evt.target.value);
		initItems({
		  pajakGlobal:pajakGlobal,
		  diskonGlobal: evt.target.value,
		  itemsCheckout: itemsCheckout,
		});
	};

	const handleCatatanGlobal = (evt) => {
		setCatatanGlobal(evt.target.value);
	};

	useEffect(() => {
		if (taxs.length) {
			const tax = taxs.find((_taxs) => {
				if (Number(_taxs.paj_id) === Number(pajakGlobalId)) {
					return true;
				}
				return false;
			});
			if (tax) {
				setPajakGlobalNama(tax.paj_nama);
				setPajakGlobal(tax.paj_value);
			}
		}
	}, [taxs, pajakGlobalId]);

	const handleDraft = useCallback(async () => {
		let filterProps = {};
		if (tableGlobal != "") {
			filterProps = {
				mej_id_new: parseInt(tableGlobal),
				resto_type: parseInt(cookies.resto_type),
				lok_type: cookies.lok_type,
			};
		}
		if (customerNew != "") {
			const initcustomer = async () => {
				const { data, error } = await saveCustomer({
					cus_id: -1,
					cus_com_id: cookies.com_id,
					cus_nama: customerNew,
					cus_wa: "",
				});
				if (!error) {
					setCustomerGlobal(data.cus_id);
				}
			};
			initcustomer();
		}
		const { data, error } = await draftPos({
			rows: itemsCheckout,
			total: totalPrice,
			kas_id: cookies.kas_id,
			kas_nama: cookies.kas_nama,
			lok_id: cookies.lok_id,
			cus_id: customerGlobal == "" ? 0 : parseInt(customerGlobal),
			cus_nama: "",
			catatan: catatanGlobal,
			diskon: diskonGlobal,
			disnom: 0,
			mej_id: tableGlobal == "" ? 0 : parseInt(tableGlobal),
			pajak: pajakGlobal,
			pajak_json:JSON.stringify(pajakGlobalJSON),
			...filterProps,
		});
		if (error) {
			alert("Gagal login");
		} else {
			navigate(topic.cashier.route);
			setItemsCheckout([]);
			setMoney(0);
			setTotalPay(0);
			setPajakGlobal(0);
			setDiskonGlobal(0);
			setTableGlobal("");
			setCustomerGlobal("");
		}
	}, [itemsCheckout, tableGlobal, customerGlobal,pajakGlobalJSON]);

	const handleCustomerNew = (evt) => {
		setCustomerNew(evt.target.value);
	};
	const handleCalculator = useCallback(() => {
		if (customerNew != "") {
			const initcustomer = async () => {
				const { data, error } = await saveCustomer({
					cus_id: -1,
					cus_com_id: cookies.com_id,
					cus_nama: customerNew,
					cus_wa: "",
				});
				if (!error) {
					setCustomerGlobal(data.cus_id);
				}
			};
			initcustomer();
		}
		if(diskonGlobal=='')
			setDiskonGlobal(0);
		cookies.role_update.length==0&&cookies.role_dst.length==0?navigate(topic.cashier.calculator_splitbill.route):(
			(cookies.role_dst.findIndex(a=>a=='ALL')>=0?
			navigate(topic.cashier.calculator_splitbill.route):(cookies.role_update.findIndex(a=>a=='POS')>= 0?
			navigate(topic.cashier.calculator_splitbill.route):null))
		)
	}, [customerNew,itemsCheckout, diskonGlobal, pajakGlobal]);

	if (!itemsCheckout || !itemsCheckout[0]) {
		return (
			<div className="h-screen-adapt flex flex-col justify-center">
				<div className="mx-auto mb-6">{dictionary.cashier.checkout.noItems[lang]}</div>
				<div className="mx-auto">
					<Button color="teal" size="lg" onClick={() => navigate(topic.cashier.route)}>
						{dictionary.cashier.checkout.back[lang]}
					</Button>
				</div>
			</div>
		);
	}

	const ActionButton = () => {
		return (
		  <div
			className={`action-area ${
			  semiDesktopMode ? "fixed bottom-3 inset-x-4 max-w-[50%]" : "w-full my-6"
			} flex gap-2 mx-auto`}
			>
			<Button
			  size="lg"
			  variant="outlined"
			  color="green"
			  className="relative bg-white w-[20%] max-w-[60px]"
			  onClick={() => handleDraft()}
			>
			  <span className="absolute text-[10px] top-[0%] left-1/2 -translate-x-1/2">Draft</span>
			  <span className="absolute left-1/2 top-[85%] -translate-x-1/2 -translate-y-[85%] transition-colors">
				<ArchiveBoxIcon className="w-7 h-7" />
			  </span>
			</Button>
	
			<Button
			  size="lg"
			  variant="gradient"
			  color="green"
			  className="group w-full relative flex items-center gap-3 overflow-hidden pr-[60px] pl-3 mx-auto"
			  onClick={handleCalculator}
			>
			  <span className="flex-grow text-left">{totalQty} item</span>
			  <span>
				<div className="text-sm text-right">
				  {currency} {formatThousandSeparator(totalPrice)}
				  {/* {currency} {formatThousandSeparator(totalPrice + totalPrice * (parseInt(pajakGlobal) / 100))} */}
				</div>
				<div style={{fontSize:11}}>
				
				  {/* {Number(diskonGlobal) <= 0
					? ""
					: ` (Disc ${Number(diskonGlobal)}% : ${currency} ${formatThousandSeparator(
						totalPrice * (1 - parseInt(diskonGlobal) / 100) + totalPrice * (parseInt(pajakGlobal) / 100)
					  )})`} */}
				  {Number(diskonGlobal) <= 0
				  ? ""
				  : ` (Disc ${Number(diskonGlobal)}% : ${currency} ${formatThousandSeparator(
					  totalPrice * (1 - parseInt(diskonGlobal) / 100)
					)})`}
				</div>
				<div style={{fontSize:11}}>
				  {/* {Number(diskonGlobal) <= 0
					? ""
					: ` (Disc ${Number(diskonGlobal)}% : ${currency} ${formatThousandSeparator(
						totalPrice * (1 - parseInt(diskonGlobal) / 100) + totalPrice * (parseInt(pajakGlobal) / 100)
					  )})`} */}
				  {Number(pajakGlobal) <= 0
				  ? ""
				  : `(+${pajakGlobalJSON.paj_nama} ${Number(pajakGlobal)}% : ${currency} ${formatThousandSeparator(
					totalPay
					)})`}
				</div>
			  </span>
			  <span className="absolute right-0 grid h-full w-12 place-items-center bg-green-500 transition-colors group-hover:bg-green-600">
				<ArrowRightIcon className="w-5 h-5" />
			  </span>
			  {/* <span className="absolute right-0 grid h-full w-12 place-items-center bg-teal-500 transition-colors group-hover:bg-teal-600">
				<ArrowRightIcon className="w-5 h-5" />
			  </span> */}
			</Button>
		  </div>
		);
	  };
	let newindex = 0;
	return (
		<div className="h-screen-adapt bg-gray-50 overflow-hidden relative">
			<div className="p-2 top-0 inset-x-0 fixed z-10">
				<div className="top-0 inset-x-0 fixed bg-gradient-to-b from-gray-50 h-20" />
				<Navbar className="px-2 py-3 relative" blurred={false}>
					<div className="flex items-center">
						<IconButton variant="text" size="md" onClick={() => navigate(topic.cashier.route)}>
							<ChevronLeftIcon className="h-6 w-6 stroke-2" />
						</IconButton>
						<div className="mx-2 flex-grow">
							<Typography color="gray" variant="h5">
								{dictionary.cashier.checkout.title[lang]}
							</Typography>
						</div>
					</div>
				</Navbar>
			</div>

			<div className="h-full mx-auto px-2 py-20 overflow-hidden overflow-y-auto lg:flex lg:gap-3 lg:justify-center">
				<List
					className={`item-list ${
						tmpHeight ? "" : "mobile:max-h-[350px] overflow-y-auto"
					} lg:h-full lg:overflow-y-auto divide-y divide-dashed divide-gray-400 lg:w-[30%] lg:px-0`}
				>
					{itemsCheckout.map((i, index) => {
						const unit = i.satuan0;
						const price = i.satuan0hrg;
						const pricecut = i.satuan0hrg * (1 - parseInt(i.diskon) / 100);
						const image = i.itm_urlimage0;

						return (
							<div key={index} className="mb-2 flex flex-col gap-2 bg-light-blue-50 rounded-md">
								<ListItem  className="relative min-h-[88px] lg:min-h-[80px] bg-light-blue-50 overflow-x-hidden pb-3">
									<ListItemPrefix className="mr-2">
										<div className="rounded-full bg-gray-50 w-12 h-12 overflow-hidden">
											{!image ? (
												<CubeIcon className="h-7 w-7 mx-auto my-2.5" />
											) : (
												<IKImage
													urlEndpoint={IMAGEKIT_URL_ENDPOINT}
													path={image}
													transformation={[
														{
															height: "100",
															width: "100",
														},
													]}
													className="object-contain"
													loading="lazy"
												/>
											)}
										</div>
									</ListItemPrefix>

									<div
										className="w-[100%] flex flex-col gap-1"
										onClick={() => takeItem(i)}
										onContextMenu={() => {
											handleOpen(i);
											setCheckoutById(i);
										}}
										// onContextMenu={(evt)=>{
										//     evt.preventDefault();
										//     handleCollapse(i);
										// }}
									>
										<div className="w-[90%] text-[14px] whitespace-nowrap overflow-hidden text-ellipsis font-semibold">
											{i.itm_nama}
										</div>

										<div className="flex items-center gap-1">
											<div className="w-max py-[2px] px-2 text-[12px] font-semibold bg-yellow-100 rounded-md">
												{i.kode}
											</div>
											<div className="w-max py-[2px] px-2 text-[12px] font-semibold bg-purple-50 rounded-md">
												{SetItemUnit(unit.toUpperCase())}
											</div>
										</div>

										<div className="w-max py-[2px] px-2 text-[12px] font-semibold bg-green-100 rounded-md">
											<div className="text-right">
												{`${i.qty}x`}{" "}
												{formatThousandSeparator(price)}
											</div>
											<div className="text-xs">
												{Number(i.diskon) <= 0
													? ""
													: ` (Disc ${Number(i.diskon)}% : ${currency} ${formatThousandSeparator(pricecut)}) `}
											</div>
										</div>
									</div>

									<ListItemSuffix>
										<IconButton variant="text" color="blue-gray" onClick={() => cancelItem(i)}>
											<MinusCircleIcon className="h-6 w-6 text-red-500" />
										</IconButton>
									</ListItemSuffix>
								</ListItem>
								{/* {i.new_itm_service_level ? ( */}
									<div
										className={`px-3 pb-3`}
										style={{ top: checkHeight[newindex] + "px", left: checkWidth + "px" }}
									>
										<Select
											label="Bill"
											value={`${i.split_bill}`}
											onChange={(value) => {
												handleSplit(value, i, index);
											}}
										>
											{splitBillArray.map((p) => (
												<Option value={p} key={p}>
													{p}
												</Option>
											))}
										</Select>
									</div>
								{/* ) : null} */}
							</div>
						);
					})}
					{pajakBill.map((j, jindex) => {

						return (
							
							<ListItem className="">
								<div className="grid grid-cols-2 gap-2 p-1 w-full">
									<div className="col-span-2 text-">
										<b>{pajakGlobalJSON.paj_nama} {j.bill}</b>
									</div>
									<div className="">{`${pajakGlobal}%`}</div>
									<div className="text-right">{formatThousandSeparator(j.value)}</div>
								</div>
								<ListItemSuffix>
									<IconButton variant="text" color="blue-gray" onClick={cancelPajak}>
										<MinusCircleIcon className="h-6 w-6 text-red-500" />
									</IconButton>
								</ListItemSuffix>
							</ListItem>
							)}
						)
					}
					
				</List>

				<div
					className={`show-all ${
						itemsCheckout.length < 4 && "hidden"
					} w-[95%] lg:hidden mx-auto my-2 py-1 px-3 rounded-bl-xl rounded-br-xl bg-light-blue-50 text-gray-700 font-semibold text-center text-sm`}
					onClick={() => setTmpHeight(!tmpHeight)}
				>
					{tmpHeight ? "sembunyikan ..." : "tampilkan semua ..."}
				</div>

				<div className="input-area flex flex-col gap-3 p-2 lg:w-[40%]">
					<div className="Input-Item Pajak">
						{!taxs.length ? (
							<InputNumber label="Pajak" disabled={true} />
						) : (
							<Select
								className="h-10 min-w-[200px]"
								value={`${pajakGlobalId}`}
                				onChange={handlePajakGlobal}
								color="teal"
								label="Pajak"
							>
								{taxs.map((p) => (
									<Option value={p.paj_id} key={p.paj_id}>
										{p.paj_nama}
									</Option>
								))}
							</Select>
						)}
					</div>

					<div className="Input-Item Catatan">
						<InputSimple
							value={catatanGlobal}
							label="Catatan"
							onChange={(evt) => {
								evt.preventDefault();
								handleCatatanGlobal(evt);
							}}
						/>
					</div>

					<div className="flex gap-2 items-center justify-between">
						<div className="Input-Item Diskon-Global w-[80%] lg:w-[80%]">
							{isNominalGlobal ? (
								<InputNumber
									value={diskonGlobal}
									label="Diskon Global"
									onChange={(evt) => {
										evt.preventDefault();
										handleDiskonGlobal(evt);
									}}
									icon="%"
								/>
							) : (
								<>
									{!diskonsGlobal.length ? (
										<InputNumber label="Diskon Global" disabled={true} />
									) : (
										<Select
											className="h-10"
											id="customer"
											value={`${diskonGlobal}`}
											onChange={setDiskonGlobal}
											color="teal"
											label="Pilih Diskon"
										>
											{diskonsGlobal.map((p) => (
												<Option value={p.dis_value} key={p.dis_id}>
													{p.dis_nama}
												</Option>
											))}
										</Select>
									)}
								</>
							)}
						</div>

						<div className="Input-Item Mode-Persentase h-[40px] w-[30%] lg:w-[20%] pr-2">
							<div className="text-[10px] text-gray-700 text-end mb-[2px]">Persen (%)</div>
							<div className="flex justify-end">
								{!switchValueGlobal ? (
									<Switch value={false} color="light-blue" defaultChecked disabled={true} />
								) : (
									<Switch color="light-blue" onChange={() => setIsNominalGlobal(!isNominalGlobal)} />
								)}
							</div>
						</div>
					</div>

					<div className="flex gap-2 items-center justify-between">
						<div className="Input-Item Customer-Name w-[80%] lg:w-[80%]">
							{switchValueCustomer ? (
								<InputSimple
									value={customerNew}
									label="Pelanggan Baru"
									onChange={(evt) => {
										evt.preventDefault();
										handleCustomerNew(evt);
									}}
								/>
							) : (
								<>
									{!customers.length ? (
										<InputNumber label="Pelanggan" disabled={true} />
									) : (
										<Select
											id="customer"
											value={`${customerGlobal}`}
											onChange={setCustomerGlobal}
											color="teal"
											label={`Pilih ${dictionary.customer.sidebar[lang]}`}
										>
											{customers.map((p) => (
												<Option value={p.cus_id} key={p.cus_id}>
													{p.cus_nama}
												</Option>
											))}
										</Select>
									)}
								</>
							)}
						</div>

						<div className="Input-Item Customer-Mode h-[40px] w-[30%] lg:w-[20%] pr-2">
							<div className="text-[10px] text-gray-700 text-end mb-[2px]">Baru</div>
							<div className="flex justify-end">
								<Switch color="light-blue" onChange={() => setSwitchValueCustomer(!switchValueCustomer)} />
							</div>
						</div>
					</div>

					{cookies.lok_type == "resto" && (
						<div className="Input-Item Meja">
							{!tables.length ? (
								<InputNumber label="Meja" disabled={true} />
							) : (
								<Select
									className="h-10"
									id="table"
									value={`${tableGlobal}`}
									onChange={setTableGlobal}
									color="teal"
									label="Meja"
								>
									{tables.map((p) => (
										<Option
											disabled={p.mej_status == "Terisi" ? true : false}
											value={p.mej_id}
											key={p.mej_id}
										>{`${p.mej_nama}`}</Option>
									))}
								</Select>
							)}
						</div>
					)}

					<ActionButton mobile={false} />
				</div>

			</div>

			<Dialog open={open} handler={handleOpen} size="md">
				<DialogHeader className="border-b-2">DIskon</DialogHeader>
				<DialogBody className="overflow-auto pb-10">
					<div className="grid grid-cols-5 gap-6 p-2 h-32">
						<div className="col-span-3">
							{isNominal ? (
								<InputNumber
									value={diskon}
									label="Diskon"
									onChange={(evt) => {
										evt.preventDefault();
										handleDiskonInput(evt);
									}}
									disabled={readonly}
									icon="%"
								/>
							) : (
								<div>
									{!diskons.length ? (
										<InputNumber label="Diskon" disabled={true} />
									) : (
										<Select
											className="h-10"
											id="customer"
											value={`${diskonSelect}`}
											onChange={handleDiskonSelect}
											color="teal"
											label="Diskon"
										>
											{diskons.map((p) => (
												<Option value={p.dis_value} key={p.dis_id}>
													{p.dis_nama}
												</Option>
											))}
										</Select>
									)}
								</div>
							)}
						</div>
						<div className="col-span-2">
							<div className="text-xs ml-2 text-center">Mode Persentase</div>
							<div className="flex justify-center">
								{!switchValue ? (
									<Switch color="teal" defaultChecked disabled={true} />
								) : (
									<Switch color="teal" onChange={() => setIsNominal(!isNominal)} />
								)}
							</div>
						</div>
					</div>
				</DialogBody>
				<DialogFooter className="border-t-2">
					<Button variant="gradient" color="red" onClick={() => setOpen(false)} className="mr-1">
						<span>Back</span>
					</Button>
				</DialogFooter>
			</Dialog>
		</div>
	);
}
