import { Fragment, useCallback, useContext, useEffect, useRef, useState } from "react";
import { saveGeneralSetting } from "../../api/GeneralSetting";
import { AppContext } from "../../AppContext";
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter, IconButton, Input, List, 
	ListItem, Navbar, Option, Select as SelectTailwind, Tooltip, Typography} from "@material-tailwind/react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import LoadingOverlay from "../../lib/LoadingOverlay";
import { clone, cloneDeep } from "lodash";
import { getItems, getItemsnew } from "../../api/Item";
import { getTransaction } from "../../api/Transaction";
import { bayarPos } from "../../api/Pos";
import { dictionary } from "../../constant/appDictionary";
import { convertItemListToCheckout } from "../../model/item";
import { formatBackToNumber, formatThousandSeparator } from "../../util/formatter";
import Select  from 'react-select';
import CreatableSelect from 'react-select/creatable';
import makeAnimated from 'react-select/animated';

export default function GeneralSettingList() {
	const { setMenuOpen, currency, cookies, setCookies, lang, setLanguage } = useContext(AppContext);
	const [listPadding, setListPadding] = useState("20px");
	const [loading, setLoading] = useState(false);
	const [generalSettings, setGeneralSettings] = useState([]);
	const [generalSettingsTemp, setGeneralSettingsTemp] = useState([]);
	const [generalSettingContains, setGeneralSettingContains] = useState([
		{ gen_id: 1, gen_nama: "Maximum Draft", gen_value: cookies.max_draft, gen_prop: "gen_set_max_draft" },
		{ gen_id: 2, gen_nama: "Auto Logout", gen_value: cookies.auto_logout, gen_prop: "gen_set_auto_logout" },
		{ gen_id: 3, gen_nama: "Maximum Piutang", gen_value: cookies.max_piutang, gen_prop: "gen_set_max_piutang" },
		{ gen_id: 4, gen_nama: "Tipe Bisnis", gen_value: cookies.lok_type, gen_prop: "gen_set_lok_type" },
		{ gen_id: 5, gen_nama: "Tipe Resto", gen_value: cookies.resto_type, gen_prop: "gen_set_resto_type" },
		{
			gen_id: 6,
			gen_nama: "Mode Scan",
			gen_value: cookies.scan_mode == true ? "true" : cookies.scan_mode == false ? "false" : cookies.scan_mode,
			gen_prop: "gen_set_scan_mode"
		},
		{
			gen_id: 7,
			gen_nama: "Piutang",
			gen_value: cookies.dp_0 == true ? "true" : cookies.dp_0 == false ? "false" : cookies.dp_0,
			gen_prop: "gen_set_dp_0"
		},
		{
			gen_id: 8,
			gen_nama: "Split Bill",
			gen_value: cookies.split_bill == true ? "true" : cookies.split_bill == false ? "false" : cookies.split_bill,
			gen_prop: "gen_set_split_bill"
		},
		{
			gen_id: 9,
			gen_nama: "Join Bill",
			gen_value: cookies.join_bill == true ? "true" : cookies.join_bill == false ? "false" : cookies.join_bill,
			gen_prop: "gen_set_join_bill"
		},
		{
			gen_id: 10,
			gen_nama: "Always Print",
			gen_value: cookies.always_print == true ? "true" : cookies.always_print == false ? "false" : cookies.always_print,
			gen_prop: "gen_set_always_print"
		},
		{
			gen_id: 11,
			gen_nama: "Stok inside Master Item",
			gen_value: cookies.stokitem == true ? "true" : cookies.stokitem == false ? "false" : cookies.stokitem,
			gen_prop: "gen_set_stokitem"
		},
		{
			gen_id: 12,
			gen_nama: "Bahasa",
			gen_value: lang,
			gen_prop: "gen_set_language"
		},
	]);
	const animatedComponents = makeAnimated();
	const [incData, setIncData] = useState([]);
	const [oncData, setOncData] = useState([]);
	const navbarRef = useRef();
	const [open, setOpen] = useState(false);
	const [openNotif, setOpenNotif] = useState(false);
	const [genIndex, setGenIndex] = useState(-1);
	const [generalById, setGeneralById] = useState({});
	const [truefalse, setTruefalse] = useState(["true", "false"]);
	const [restoRetail, setRestoRetail] = useState(["resto", "retail", "laundry"]);
	const [restoTypeRetail, setRestoTypeRetail] = useState(["1", "2"]);
	const [mode, setMode] = useState(0);
	const [keyword, setKeyword] = useState("");
	const [generalSelect, setGeneralSelect] = useState("");
	const [generalInput, setGeneralInput] = useState(0);
	const [countnota, setCountnota] = useState(0);
	const [openIncomeOutcome, setOpenIncomeOutcome] = useState(false);
	const [valueIncome, setValueIncome] = useState({label:"Masukkan Income Baru",value:""});
	const [valueOutcome, setValueOutcome] = useState({label:"Masukkan Outcome Baru",value:""});
	const [langopt, setLangopt] = useState(["ID", "EN"]);
	function handleOpen(item, set, index) {
		setOpen(!open);
		setGeneralSettingsTemp(generalSettings);
		setGeneralById(item);
		setGenIndex(index);
		setGeneralSelect(item.gen_value);
		setGeneralInput(item.gen_value);

		if (item.gen_id > 3) setMode(2);
		else setMode(1);
	}
	function handleIncomeOutcome() {
		let _incomeoutcome=cloneDeep(cookies.income_outcome);
		let str=JSON.stringify(_incomeoutcome);
		let _str=str.replaceAll('ion_nama', 'label').replaceAll('ion_id', 'value');
		let arrstr=JSON.parse(_str)
		console.log(arrstr)
		let _income = arrstr.filter(function (object) {
			return object.ion_type === "income";
		});
		let _outcome = arrstr.filter(function (object) {
			return object.ion_type === "outcome";
		});
		setIncData(_income);
		setOncData(_outcome);
		setOpenIncomeOutcome(true);
		
	}
	const cancelData = useCallback(async () => {
		setOpen(false);
		setGeneralSettings(generalSettingContains);
	}, [generalSettings]);

	function handleChange(evt,id) {
		setGeneralInput(formatBackToNumber(evt.target.value));
	}

	const saveData = useCallback(async () => {
		console.log(generalById)
		console.log(generalSettings)
		console.log(generalInput)
		const _newGeneralSettings = cloneDeep(generalSettings);
		_newGeneralSettings[genIndex].gen_value = generalInput;
		let _newerGeneralSettings = "";
		_newGeneralSettings.map((item, index) => {
			_newerGeneralSettings = _newerGeneralSettings + item.gen_value + ",";
		});
		console.log(_newGeneralSettings)
		let approve=true;
		if(_newGeneralSettings[7].gen_value=="true"&&_newGeneralSettings[3].gen_value=="laundry")
			{alert("Fitur split bill belum tersedia untuk laundry"); setOpen(false);approve=false;}
		if(_newGeneralSettings[7].gen_value=="true"&&_newGeneralSettings[8].gen_value=="true")
			{alert("Fitur split bill tidak boleh aktif bersama join bill"); setOpen(false);approve=false;}
		if(generalById.gen_id==12){
			setLanguage(generalInput);
			setGeneralSettings(_newGeneralSettings);
			setOpen(false);approve=false;
		}
		// if (changeforce) {
		// 	const init = async () => {
		// 		const { data, error } = await saveGeneralSetting({ 
		// 			lok_id: cookies.lok_id,
		// 			gen_id: cookies.gen_id,
		// 			gen_prop:genIndex==3?_newGeneralSettings[7].gen_prop:_newGeneralSettings[3].gen_prop,
		// 			gen_value:genIndex==3?"false":"resto" });
		// 		if (error) {
		// 			alert(dictionary.universal.notfound[lang]);
		// 		} else {
		// 			let splitgeneral=data.split('-');
		// 			setCookies(splitgeneral[0].replace("gen_set_", ""), splitgeneral[1]);
		// 			_newGeneralSettings[genIndex].gen_value = splitgeneral[1];
		// 			setGeneralSettingContains(_newGeneralSettings);
		// 		}
		// 	};
		// 	init();
		// }
		if(approve){
			const { data, error } = await saveGeneralSetting({
				lok_id: cookies.lok_id,
				gen_id: cookies.gen_id,
				gen_prop:_newGeneralSettings[genIndex].gen_prop,
				gen_value:generalInput
			});
			if (error) {
				alert(dictionary.universal.notfound[lang]);
			} else {
				setLoading(true);
				let splitgeneral=data.split('-');
				setCookies(splitgeneral[0].replace("gen_set_", ""), splitgeneral[1]);
				_newGeneralSettings[genIndex].gen_value = splitgeneral[1];
				setGeneralSettingContains(_newGeneralSettings);
				setOpen(false);
				setLoading(false);
			}
		}
	}, [generalById, generalSettings, generalInput]);

	const handleOffline = useCallback(async () => {
		setLoading(true);
		const { data, error } = await getItems({
			lok_id: cookies.lok_id,
			sellable: "true",
        });
		if (error) {
			alert(dictionary.universal.notfound[lang]);
		} else {
			let arrTotalItem=[];
			let arrItem=[];
			convertItemListToCheckout(data).map((item, index) => {
				if(index%20==0&&index>0){
					arrTotalItem.push(arrItem)
					arrItem=[];
				}
				if(index==convertItemListToCheckout(data).length-1){
					arrTotalItem.push(arrItem)
					arrItem=[];
				}
				arrItem.push(item)
			});
			let count=0;
			arrTotalItem.forEach(i =>{
				count++;
				console.log(i)
				localStorage.setItem(
					"pos_item_"+count,
					JSON.stringify({
					key: "pos_item",
					value: i,
					})
				);
			});
			const init = async () => {
				const { data, error } = await getTransaction({
					lok_id: cookies.lok_id,
					loaditems: "yes",
				});
				if (error) {
					alert(dictionary.universal.notfound[lang]);
				} else {
					
					let arrTotalNota=[];
					let arrNota=[];
					data.map((item, index) => {
						if(index%20==0&&index>0){
							arrTotalNota.push(arrNota)
							arrNota=[];
						}
						if(index==data.length-1){
							arrTotalNota.push(arrNota)
							arrNota=[];
						}
						arrNota.push(item)
					});
					let countnota=0;
					arrTotalNota.forEach(i =>{
						countnota++;
						console.log(i)
						localStorage.setItem(
							"transaksi_"+countnota,
							JSON.stringify({
							key: "transaksi",
							value: i,
							})
						);
					});
					alert("Data item pos dan transaksi sudah tersimpan di lokal")
					setLoading(false);
				}
			}
			init();
			
		}
	}, [generalById, generalSettings, generalInput]);

	const handleOnline = useCallback(async () => {
		
		

		if(!localStorage.getItem("pos_save"))
			alert('Tidak ada data nota yang bisa diupload')
		else{
			setOpenNotif(true);
			setCountnota(JSON.parse(JSON.parse(localStorage.getItem("pos_save")).value).length);
		}




		// const { data, error } = await getItems({
		// 	lok_id: cookies.lok_id,
		// 	sellable: "true",
        // });
		// if (error) {
		// 	alert(dictionary.universal.notfound[lang]);
		// } else {
			// for(let i=0;i<Math.ceil(convertItemListToCheckout(data).length/20);  i++){
			// 	localStorage.removeItem("pos_item_"+(i+1));
					
			// } 
			console.log(localStorage.getItem("pos_save"))
			console.log(JSON.parse(JSON.parse(localStorage.getItem("pos_save")).value))
		//}
		
		
		// setLoading(true);
		// const { data, error } = await getItems({
		// 	lok_id: cookies.lok_id,
		// 	sellable: "true",
        // });
		// if (error) {
		// 	alert(dictionary.universal.notfound[lang]);
		// } else {
		// 	console.log(data.length)
		// 	// localStorage.setItem(
		// 	// 	"pos_item",
		// 	// 	JSON.stringify({
		// 	// 	  key: "pos_item",
		// 	// 	  value: convertItemListToCheckout(data),
		// 	// 	})
		// 	// );
		// 	// let splitgeneral=data.split('-');
		// 	// setCookies(splitgeneral[0].replace("gen_set_", ""), splitgeneral[1]);
		// 	// _newGeneralSettings[genIndex].gen_value = splitgeneral[1];
		// 	// setGeneralSettingContains(_newGeneralSettings);
		// 	// setChangeforce(false)
		// 	// setOpen(false);
		// 	setLoading(false);
		// }
	}, [generalById, generalSettings, generalInput]);
	const handleOnlineAccept = useCallback(async () => {
		// JSON.parse(JSON.parse(localStorage.getItem("pos_save")).value).map((i, index) => {
		// 	const initbayar = async () => {
		// 		const { data, error } = await bayarPos(i);
		// 		if (error) {
		// 			alert(dictionary.universal.notfound[lang]);
		// 		} else {
		// 			let splitgeneral=data.split('-');
		// 			setCookies(splitgeneral[0].replace("gen_set_", ""), splitgeneral[1]);
		// 			_newGeneralSettings[genIndex].gen_value = splitgeneral[1];
		// 			setGeneralSettingContains(_newGeneralSettings);
		// 		}
		// 	};
		// 	initbayar();
		// })
		// const { data, error } = await getItems({
		// 	lok_id: cookies.lok_id,
		// 	sellable: "true",
        // });
		// if (error) {
		// 	alert(dictionary.universal.notfound[lang]);
		// } else {
			// for(let i=0;i<Math.ceil(convertItemListToCheckout(data).length/20);  i++){
			// 	localStorage.removeItem("pos_item_"+(i+1));
					
			// } 
			console.log(localStorage)
			console.log(JSON.parse(JSON.parse(localStorage.getItem("pos_save")).value)[0])
		//}
		let tasks = [];
		let k=0;
		const dataSave=cloneDeep(JSON.parse(JSON.parse(localStorage.getItem("pos_save")).value))
		for (let i = 0; i < dataSave.length; i++) {
			const delay = 1500 * i;
			tasks.push(new Promise(async function(resolve) {
				await new Promise(res => setTimeout(res, delay));
				let result = await new Promise(r => {
					bayarPos(dataSave[k]);
					r(delay);
				});
				resolve(result);
				k++
			}));
		}
		setLoading(true);
		Promise.all(tasks).then(results => {
			setLoading(false);
			setOpenNotif(false);
			localStorage.removeItem("pos_save");
		});
		
		// setLoading(true);
		// const { data, error } = await getItems({
		// 	lok_id: cookies.lok_id,
		// 	sellable: "true",
        // });
		// if (error) {
		// 	alert(dictionary.universal.notfound[lang]);
		// } else {
		// 	console.log(data.length)
		// 	// localStorage.setItem(
		// 	// 	"pos_item",
		// 	// 	JSON.stringify({
		// 	// 	  key: "pos_item",
		// 	// 	  value: convertItemListToCheckout(data),
		// 	// 	})
		// 	// );
		// 	// let splitgeneral=data.split('-');
		// 	// setCookies(splitgeneral[0].replace("gen_set_", ""), splitgeneral[1]);
		// 	// _newGeneralSettings[genIndex].gen_value = splitgeneral[1];
		// 	// setGeneralSettingContains(_newGeneralSettings);
		// 	// setChangeforce(false)
		// 	// setOpen(false);
		// 	setLoading(false);
		// }
	}, [generalById, generalSettings, generalInput]);
	const handleIncomeOutcomeSave = useCallback(async () => {
		let dataion=[];
		oncData?.map((i, index) => {
			i.ion_id=index+1;
			i.ion_nama=i.label;
			i.ion_status=true;
			dataion.push(i);
		})
		incData?.map((i, index) => {
			i.ion_id=oncData.length+index+1;
			i.ion_nama=i.label;
			i.ion_status=true;
			dataion.push(i);
		})
		dataion?.map((i, index) => {
			delete i.label;
			delete i.value;
		})
		const { data, error } = await saveGeneralSetting({
			lok_id: cookies.lok_id,
			gen_id: cookies.gen_id,
			gen_prop:"gen_json_income_outcome",
			gen_value:JSON.stringify(dataion)
		});
		if (error) {
			alert(dictionary.universal.notfound[lang]);
		} else {
			setLoading(true);
			let splitgeneral=data.split('-');
			setCookies("income_outcome", splitgeneral[1]);
			setOpenIncomeOutcome(false);
			// _newGeneralSettings[genIndex].gen_value = splitgeneral[1];
			// setGeneralSettingContains(_newGeneralSettings);
			// setOpen(false);
			setLoading(false);
		}
		
	}, [oncData,incData]);
	useEffect(() => {
		if (keyword && keyword.length > 1) {
			const newFilters = cloneDeep(generalSettingContains);
			const _newfilter = newFilters.filter(function (object) {
				return object.gen_nama.toLowerCase().indexOf(keyword) !== -1;
			});
			setGeneralSettings(_newfilter);
		} else if (!keyword) {
			setGeneralSettings(generalSettingContains);
		}
	}, [keyword, cookies]);
	useEffect(() => {
		if(valueOutcome&&valueOutcome.value!=""){
			let newinc=[...oncData];
			newinc.push({value:-1,label:valueOutcome.label,ion_type:'outcome'});
			setOncData(newinc);
			setValueOutcome({value:"",label:"Masukkan Outcome Baru"});
		}
	}, [valueOutcome]);
	useEffect(() => {
		if(valueIncome&&valueIncome.value!=""){
			let newinc=[...incData];
			newinc.push({value:-1,label:valueIncome.label,ion_type:'income'});
			setIncData(newinc);
			setValueIncome({value:"",label:"Masukkan Income Baru"});
		}
	}, [valueIncome]);
	useEffect(() => {
		if (navbarRef.current) {
			setListPadding(`${navbarRef.current.offsetHeight + 20}px`);
		}
	}, [generalSettings, navbarRef]);

	const CustomSelectOption = (option) => {
		console.log(generalById)
		if (generalById.gen_nama === "Mode Scan") return option === "true" ? "Pakai Scanner" : "Tidak Pakai Scanner";
		else if (generalById.gen_nama === "Tipe Bisnis") return option === "resto" ? "Resto" : (option === "retail" ? "Retail":"Laundry");
		else if (generalById.gen_nama === "Tipe Resto")
			return parseInt(option) === 1 ? "Resto Bayar Langsung" : "Resto Bayar Setelah Makan";
		else if (generalById.gen_nama === "Piutang"||generalById.gen_nama === "Split Bill"||generalById.gen_nama === "Join Bill"||generalById.gen_nama === "Always Print"||generalById.gen_nama === "Stok inside Master Item") return option === "true" ? "Aktif" : "Tidak Aktif";
		else if (generalById.gen_nama === "Bahasa")return option === "ID" ? "Bahasa Indonesia" : "English";
		else return option;
	};

	const CustomList = (nama, value) => {
		if (nama === "Mode Scan") return value === "true" ? "Pakai Scanner" : "Tidak Pakai Scanner";
		else if (nama === "Tipe Bisnis") return value === "resto" ? "Resto" : (value === "retail" ? "Retail":"Laundry");
		else if (nama === "Tipe Resto") return parseInt(value) === 1 ? "Resto Bayar Langsung" : "Resto Bayar Setelah Makan";
		else if (nama === "Piutang"||nama === "Split Bill"||nama === "Join Bill"||nama === "Always Print"||nama === "Stok inside Master Item") return value === "true" ? "Aktif" : "Tidak Aktif";
		else if (nama === "Auto Logout") return value + " Jam";
		else if (nama === "Maximum Piutang") return value==0?(currency+" 0"):(currency + " " + formatThousandSeparator(value));
		else if (nama === "Bahasa")return value === "ID" ? "Bahasa Indonesia" : "English";
		else return value;
	};

	// useEffect(() => {
	// 	if(generalSettings[genIndex]){
	// 		const _newGeneralSettings = cloneDeep(generalSettings);
	// 		if(generalSettings[genIndex].gen_id==4){
	// 			if(generalInput=="laundry"){
	// 				_newGeneralSettings[7].gen_value="false";
	// 				setChangeforce(true)
	// 			}
	// 		}
	// 		if(generalSettings[genIndex].gen_id==8){
	// 			if(generalInput=="true"){
	// 				_newGeneralSettings[3].gen_value="resto"
	// 				setChangeforce(true)
	// 			}
	// 		}
	// 		setGeneralSettings(_newGeneralSettings)
	// 	}
	// }, [generalInput]);
	return (
		<Fragment>
			{!loading ? null : <LoadingOverlay white />}
			<div className="h-screen-adapt bg-gray-50 overflow-hidden relative">
				<div className="top-0 inset-x-0 fixed bg-gradient-to-b from-gray-50 h-20" />
				<div className="p-2 top-0 inset-x-0 fixed z-50 mx-auto desktop:max-w-[60%]">
					<Navbar ref={navbarRef} className={`pt-2 px-2 py-2 relative`} blurred={false}>
						<div className="flex gap-3 items-center">
							<IconButton variant="text" size="md" onClick={() => setMenuOpen(true)}>
								<div className="justify-items-center lowercase">
								<Bars3Icon className="h-6 w-6 stroke-2" />
								<div style={{fontSize:"10px",padding:"0px"}}>
									Menu
								</div>
								</div>
							</IconButton>
							<div className="text-base font-semibold text-[#606060]">Pengaturan</div>
						</div>
					</Navbar>
				</div>

				<div className="pb-20 overflow-auto h-full" style={{ paddingTop: listPadding }}>
					<List className="divide-y divide-dashed divide-gray-400">
						{generalSettings?.map((i, index) => {
							return (
								<ListItem key={index} className={index==4&&generalSettings[3].gen_value!='resto'?"hidden":""}>
									<div className="w-full pr-2" onClick={() => handleOpen(i, false, index)}>
										<div></div>
										<div className="flex items-center justify-between">
											<Typography variant="small" color="gray" className="font-normal">
												<b>{i.gen_nama}</b>
											</Typography>
											<Typography color="gray" className="font-normal">
												{CustomList(i.gen_nama, i.gen_value)}
											</Typography>
										</div>
									</div>
								</ListItem>
							);
						})}
						{
							<ListItem key="5a" className="">
							<div className="w-full pr-2">
								
								<div className="flex items-center justify-between">
									<Typography variant="small" color="gray" className="font-normal p-2">
									<Tooltip content="Mengeset Biaya Tambahan" placement="right" className="border border-teal-500 bg-white text-teal-500">
										<Button variant="gradient" color="green" onClick={handleIncomeOutcome} className="w-full flex-1">
											<span>Set Income Outcome</span>
										</Button>
									</Tooltip>
						
									</Typography>
								</div>
							</div>
							</ListItem>
						}
					</List>
				</div>

				<Dialog open={open} dismiss={{ outsidePress: cancelData }} handler={handleOpen}>
					<DialogHeader>{dictionary.dialogheader.changesettingvalue[lang]}</DialogHeader>

					<DialogBody>
						<div className="mb-4">
							{mode == 1 ? (
								<Input
									value={generalInput}
									label={generalById.gen_nama}
									onChange={(evt) => {
										evt.preventDefault();
										handleChange(evt,generalById.gen_nama);
									}}
								/>
							) : (
								<SelectTailwind
									id="select_general"
									value={`${generalInput}`}
									onChange={setGeneralInput}
									color="teal"
									label={generalById.gen_nama}
								>
									{generalById.gen_id == 4
										? restoRetail.map((p) => (
												<Option value={p} key={p}>
													{CustomSelectOption(p)}
												</Option>
											))
										: generalById.gen_id == 5
										? restoTypeRetail.map((p) => (
												<Option value={p} key={p}>
													{CustomSelectOption(p)}
												</Option>
											))
										: generalById.gen_id == 12
										? langopt.map((p) => (
												<Option value={p} key={p}>
													{CustomSelectOption(p)}
												</Option>
											))
										: truefalse.map((p) => (
												<Option value={p} key={p}>
													{CustomSelectOption(p)}
												</Option>
											))}
								</SelectTailwind>
							)}
							{/* <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={generalById.gen_value} onChange={handleChange} id="gen_value" name="gen_value" type="number" placeholder="Value" />  */}
						</div>
					</DialogBody>

					<DialogFooter className="flex gap-3 justify-between">
						<Button variant="gradient" color="blue-gray" onClick={cancelData} className="w-full flex-1">
							<span>{dictionary.universal.cancel[lang]}</span>
						</Button>
						<Button variant="gradient" color="green" onClick={saveData} className="w-full flex-1">
							<span>{dictionary.universal.change[lang]}</span>
						</Button>
					</DialogFooter>
				</Dialog>

				<Dialog open={openNotif} handler={handleOpen}>
					<DialogHeader>{dictionary.dialogheader.changesettingvalue[lang]}</DialogHeader>

					<DialogBody>
						<div className="mb-4">
							Data yang tersimpan di lokal ada {countnota}. Proses untuk upload?
						</div>
					</DialogBody>

					<DialogFooter className="flex gap-3 justify-between">
						<Button variant="gradient" color="blue-gray" onClick={()=>{setOpenNotif(false)}} className="w-full flex-1">
							<span>{dictionary.universal.cancel[lang]}</span>
						</Button>
						<Button variant="gradient" color="green" onClick={handleOnlineAccept} className="w-full flex-1">
							<span>Setuju</span>
						</Button>
					</DialogFooter>
				</Dialog>
				<Dialog open={openIncomeOutcome} handler={()=>setOpenIncomeOutcome(false)}>
					<DialogHeader>Income Outcome</DialogHeader>

					<DialogBody>
						<div className="flex justify-between">
							<div className="w-1/2">
								<CreatableSelect 
									isClearable 
									options={incData}
									value={valueIncome}
									onChange={setValueIncome} 
									getOptionLabel={(inc) => inc.label}
									getOptionValue={(inc) => inc.value}
								/>
							</div>
							<div className="w-1/2">
								<CreatableSelect 
									isClearable 
									options={oncData}
									value={valueOutcome}
									onChange={setValueOutcome} 
									getOptionLabel={(ouc) => ouc.label}
									getOptionValue={(ouc) => ouc.value}
								/>
							</div>
						</div>
					</DialogBody>

					<DialogFooter className="flex gap-3 justify-between">
						<Button variant="gradient" color="blue-gray" onClick={()=>{setOpenIncomeOutcome(false)}} className="w-full flex-1">
							<span>{dictionary.universal.cancel[lang]}</span>
						</Button>
						<Button variant="gradient" color="green" onClick={handleIncomeOutcomeSave} className="w-full flex-1">
							<span>Setuju</span>
						</Button>
					</DialogFooter>
				</Dialog>
			</div>
		</Fragment>
	);
}
