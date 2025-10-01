import { Fragment, useCallback, useContext, useEffect, useRef, useState } from "react";
import { getTable, saveTable, deleteTable } from "../../api/Table";
import { getRole, readRoleNew } from "../../api/Login";
import { getLokcom, saveRole, deleteRole, addUser, saveUser, savePassword, updateLokasi, readCompany, 
	readLokasi, saveCompany, saveLokasi, saveKasir, setOtp, verify, login } from "../../api/Login";
import { AppContext } from "../../AppContext";
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter, IconButton, Input, List, ListItem, 
	ListItemSuffix, Navbar, Option, Select as SelectTailwind, Spinner, Typography, 
} from "@material-tailwind/react";
import SearchNavbar from "../../lib/SearchNavbar";
import { AdjustmentsVerticalIcon, Bars3Icon, PlusCircleIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";
import FilterChips from "../../lib/FilterChips";
import { TableListModel } from "../../model/table";
import { LokcomListModel } from "../../model/kasir";
import { dictionary } from "../../constant/appDictionary";
import { useNavigate } from "react-router-dom";
import LoadingOverlay from "../../lib/LoadingOverlay";
import { topic } from "../../constant/appTopics";
import { TIME_SEARCH_DEBOUNCE } from "../../constant/appCommon";
import InputSimple from "../../lib/InputSimple";
import InputNumber from "../../lib/InputNumber";
import { formatSentenceCase } from "../../util/formatter";
import { cloneDeep } from "lodash";
import { CheckCircleIcon, PencilSquareIcon, XCircleIcon } from "@heroicons/react/16/solid";
import { funCodes, roleName } from "../../constant/appEnum";
import Select  from 'react-select';
import makeAnimated from 'react-select/animated';
import CreatableSelect from 'react-select/creatable';
import { useForm, ValidationError } from '@formspree/react';
import OtpInput from 'react-otp-input';
import { createClient } from "smtpexpress"
export default function tableList() {
	const { setMenuOpen, filters, setFilters, lang, cookies, setCookies } = useContext(AppContext);
	const [listPadding, setListPadding] = useState("20px");
	const [loading, setLoading] = useState(true);
	const [newLoading, setNewLoading] = useState(false);
	const [lokcoms, setLokcoms] = useState([LokcomListModel()]);
	const [itemDisplay, setItemDisplay] = useState(TableListModel());
	const navbarRef = useRef();
	const [open, setOpen] = useState(false);
	const [openAdd, setOpenAdd] = useState(false);
	const [openOtp, setOpenOtp] = useState(false);
	const [newOpen, setNewOpen] = useState(false);
	const [readonly, setReadonly] = useState(false);
	const [userById, setUserById] = useState({});
	const [txtTitle, settxtTitle] = useState("");
	const [mode, setMode] = useState(0);
	const [keyword, setKeyword] = useState("");
	const [funCodeData, setFunCodeData] = useState(funCodes);
	const navigate = useNavigate();
	const animatedComponents = makeAnimated();
	const [valueFunCode, setValueFunCode] = useState([]);
	const [valueFunCodeName, setValueFunCodeName] = useState([]);
	const [categoryCode, setCategoryCode] = useState([]);
	const [dataValueFunCode, setDataValueFunCode] = useState([]);
	const [roleNama, setRoleNama] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const [refreshCookies, setRefreshCookies] = useState(0);
	const [openCompany, setOpenCompany] = useState(false);
	const [openLokasi, setOpenLokasi] = useState(false);
	const [openKasir, setOpenKasir] = useState(false);
	const [companies, setCompanies] = useState([]);
	const [locations, setLocations] = useState([]);
	const [companiesSelect, setCompaniesSelect] = useState('');
	const [companiesLokasiSelect, setCompaniesLokasiSelect] = useState('');
	const [locationSelect, setLocationSelect] = useState('');
	const [locationSelectNew, setLocationSelectNew] = useState('');
	const [roleSelect, setRoleSelect] = useState('');
	const [kasirById, setKasirById] = useState({});
	const [lokasiById, setLokasiById] = useState({});
	const [companyById, setCompanyById] = useState({});
	const [paketSelect, setPaketSelect] = useState('');
	const [otpvalue, setOtpvalue] = useState('');
	const [otpemail, setOtpemail] = useState('kuroashiku@gmail.com');
	const [lokcomstats, setLokcomstats] = useState(1);
	const [openPassword, setOpenPassword] = useState(false);
	const [openSavePassword, setOpenSavePassword] = useState(false);
	const [passwordOld, setPasswordOld] = useState(null);
	const [passwordNew, setPasswordNew] = useState(null);
	const smtpexpressClient = createClient({
		projectId: "sm0pid-YeetNqQnJpUshPhZ3oLpvm1bL",
		projectSecret: "14f82079665219958f02546d8b7ddcbd033f47c7682694dfc5"
	});
    function togglePasswordVisibility() {
        setIsPasswordVisible((prevState) => !prevState);
    }
	const handleFilter = (searchKey) => {
		setKeyword(searchKey);
	};

	const handleOpen = useCallback(async (item,setedit,index) => {
		setValueFunCode([])
		setValueFunCodeName({"code":formatSentenceCase(item.kas_role),"desc":formatSentenceCase(item.kas_role)})
		const rolearr=[];
		const { data, error } = await readRoleNew({ kas_id: item.kas_id });
		if (error) {
			alert(dictionary.universal.notfound[lang]);
		} else {
			data.map((i, index) => {
				let pisah_priviledge=i.rol_priviledge.split("");
				pisah_priviledge.map((j, index) => {
					let desc_role=funCodes.filter(function (object) {
						return object.code === i.rol_fun_code+"-"+j;
					});
					rolearr.push({"code": i.rol_fun_code+"-"+j,"desc": desc_role[0].desc,"category": i.rol_fun_code})
				})
			})
			setRoleNama(item.kas_role)
			setValueFunCode(rolearr)
			
		}
		if (setedit == true) {
			setReadonly(false);
			setOpen(true);
			setUserById(item);
			settxtTitle("Edit User");
			setMode(2);
			
		} else {
			setReadonly(true);
			setOpen(true);
			setUserById(item);
			settxtTitle("Detail User");
			setMode(1);
		}
	}, [userById]);
	
	const handleOpenOtp = useCallback(async () => {
		const { data, error } = await setOtp({otp_email:otpemail,otp_kas_id:cookies.kas_id});
		if (error) {
			alert(dictionary.universal.notfound[lang]);
		} else {
			console.log(data)
			try {
				setLoading(true);
				// Sending an email using SMTP
				await smtpexpressClient.sendApi.sendMail({
				  // Subject of the email
				  subject: "Kasbon Otp",
				  // Body of the email
				  message: data.otp_code,
				  // Sender's details
				  sender: {
					// Sender's name
					name: "Kasbon Otp",
					// Sender's email address
					email: "kasbon-otp-8be212@projects.smtpexpress.com",
				  },
				  // Recipient's details
				  recipients: {
					// Recipient's email address (obtained from the form)
					email: otpemail,
				  },
				});
		  
				// Notify user of successful submission
				alert("Kode OTP telah terkirim");
				setLoading(false);
			  } catch (error) {
				// Notify user if an error occurs during submission
				alert("Ada yang salah, ulangi lagi");
				// You can console.log the error to know what went wrong
				console.log(error);
			  }
			setOpenOtp(true)
		}
	}, [otpvalue,otpemail]);

	function handleNewOpen(id) {
		setNewOpen(!newOpen);
	}

	function handleChangePassword() {
		setOpenPassword(!openPassword);
		console.log(cookies)
	}

	const handleAdd = (e) => {
		setOpenKasir(true);
		setKasirById({kas_nama:"",kas_nick:"",kas_password:"",kas_wa:""})
	};
	const handleAddCompany = (e) => {
		setOpenCompany(true);
		setCompanyById({com_nama:"",com_kode:"",com_maxrole:"",com_maxuser:"",com_paket:""})
	};
	const handleAddLokasi = (e) => {
		setOpenLokasi(true);
		setLokasiById({lok_nama:"",lok_alamat:"",lok_telpon:"",lok_footer1:"",lok_footer2:""})
	};
	// function handleAdd() {
	// 	console.log(cookies)
	// 	setOpenOtp(true)
	// 	Linking.openURL('whatsapp://send?text=hello&phone=085701009275')
	// 	// let admin_role=funCodes.filter(function (object) {
	// 	// 	return object.code === "ALL-0";
	// 	// });
	// 	// let admin_role_name=roleName.filter(function (object) {
	// 	// 	return object.code === "Admin";
	// 	// });
	// 	// let admin_arr=[];
	// 	// admin_arr.push(admin_role[0])
	// 	// let admin_arr_name=[];
	// 	// admin_arr_name.push(admin_role_name[0])
	// 	// setValueFunCode(admin_arr)
	// 	// setValueFunCodeName(admin_arr_name)
	// 	// setUserById({ lok_id: cookies.lok_id, com_id: cookies.com_id });
	// 	// setOpenAdd(!openAdd);
	// }

	const handleChange= (evt, id) =>{
        setUserById({
          ...userById,
          [id]: evt.target.value
        });
    };

	const handleChangeNew= (evt, id, type) =>{
		if(type=='kasir')
			setKasirById({
			...kasirById,
			[id]: evt.target.value
			});
		else if(type=='lokasi')
			setLokasiById({
				...lokasiById,
				[id]: evt.target.value
			});
		else if(type=='company')
			setCompanyById({
				...companyById,
				[id]: evt.target.value
			});
    };

	const handleInputChangePassword= (evt,type) =>{
		if(type=='lama')
		setPasswordOld(evt.target.value);
		else
		setPasswordNew(evt.target.value);
    };

	const handleDelete = useCallback(async () => {
		setItemDisplay(null);
		const { data, error } = await deleteRole({kas_id:Number(userById.kas_id)});
		if (error) {
			alert(dictionary.universal.notfound[lang]);
		} else {
			setLoading(true);
			const { data, error } = await getLokcom({ com_id: cookies.com_id });
			if (error) {
				alert(dictionary.universal.notfound[lang]);
			} else {
				setLokcoms(data);
			}
			setLoading(false);
		}
	}, [userById]);
	const handleNama= (evt, id) =>{
        setRoleNama(evt.target.value)
    };
	useEffect(() => {
		//const result = Object.groupBy(funCodes, ({ category }) => category);
		let newCategory=[...categoryCode];
		funCodes.map((i, index) => {
			newCategory.push(i.category);
		})
		let findDuplicates =newCategory.reduce(function(a,b){if(a.indexOf(b)<0)a.push(b);return a;},[]);
		setCategoryCode(findDuplicates)
	}, []);
	useEffect(() => {
		console.log(otpvalue)
	}, [otpvalue]);
	useEffect(() => {
		const indexOfId = valueFunCode.findIndex(a=>a.code=='ALL-0');
		if(indexOfId>=0)
		{
			if(funCodeData.length>0)
			setFunCodeData([])
			if(valueFunCode[0].category!="ALL"&&valueFunCode.length>0)
			setValueFunCode([{"code": "ALL-0",
				"desc": "Akses Semua",
				"category": "ALL"}]);
		}
		else{
			setFunCodeData(funCodes)
			const category_r=[];
			const category_notr=[];
			const category_all=[];
			categoryCode.map((i, index) => {
				let datafilter=valueFunCode.filter(
					function(data){ return data.category == i }
				)
				if(datafilter.length>0)
				{
					let checkr=datafilter.filter(
						function(data){ return (data.code).substr((data.code).length - 1) == 'R' && data.category !== 'PRN'}
					)
					let checknotr=datafilter.filter(
						function(data){ return (data.code).substr((data.code).length - 1) !== 'R' && data.category !== 'PRN'}
					)
					if(checkr.length>0)
						category_r.push(checkr[0].category)
					if(checknotr.length>0)
						category_notr.push(checknotr[0].category)
					category_all.push(datafilter[0].category)
				}
				
			})
			const category_not_r= category_all.filter(n => !category_r.includes(n));
			const _dataValueFunCode = cloneDeep(valueFunCode);
			const _newdataValueFunCode = [];
			category_not_r.map((i, index) => {
				let datafilter=funCodeData.filter(
					function(data){return data.code == i+'-R' }
				)
				_dataValueFunCode.push(datafilter[0])
			})
			// category_notr.map((i, index) => {
			// 	let datafilter=_dataValueFunCode.filter(
			// 		function(data){return data.category == i }
			// 	)
			// 	_newdataValueFunCode.push(datafilter)
			// })
			// const mergejson = _newdataValueFunCode.flat(1);
			setDataValueFunCode(_dataValueFunCode)
		}
	}, [valueFunCode,valueFunCodeName]);

	useEffect(() => {
		if(dataValueFunCode.length>0){
			setValueFunCode(dataValueFunCode)
		}
	}, [JSON.stringify(dataValueFunCode)]);

	const saveData = useCallback(async () =>{
		console.log(valueFunCodeName.code.replace(/\s/g, ''))
        const uniqueData = [];
        categoryCode.map((i, index) => {
			//valueFunCode.find((element) => element > 10);
			let datafilter=valueFunCode.filter(
				function(data){ return data.category == i }
			)
			let newstrinside='';
			datafilter.map((ii, indexi) => {
				newstrinside=newstrinside+(ii.code).substr((ii.code).length - 1);
			})
			if(newstrinside!='')
			uniqueData.push({"rol_id":-1,"rol_name":(valueFunCodeName.code).replace(/\s/g, ''),"lok_id":cookies.lok_id,"com_id":cookies.com_id,"rol_fun_code":i,"rol_priviledge":newstrinside,"kas_id":userById.kas_id})
		})
		await deleteRole({kas_id:Number(userById.kas_id)});
		let tasks = [];
		let k=0;
		for (let i = 0; i < uniqueData.length; i++) {
			const delay = 1500 * i;
			tasks.push(new Promise(async function(resolve) {
				await new Promise(res => setTimeout(res, delay));
				let result = await new Promise(r => {
					saveRole(uniqueData[k]);
					r(delay);
				});
				resolve(result);
				k++
			}));
		}
		setNewLoading(true);
		Promise.all(tasks).then(results => {
			setValueFunCode([]);
			setOpen(false);
			setNewLoading(false);
			const initupdate = async () => {
				const { data, error } = await updateLokasi({ kas_role: (valueFunCodeName.code.replace(/\s/g, '')).toUpperCase(), kas_id: userById.kas_id });
				if(!error){
					setNewLoading(false);
				}
			};
			initupdate();
			setRefreshCookies(refreshCookies+1)
		});
    },[userById,valueFunCode,categoryCode,roleNama,lokcoms,valueFunCodeName]);
	useEffect(() => {
		if(refreshCookies>0){
			var role_read=[];
			var role_create=[];
			var role_update=[];
			var role_delete=[];
			var role_dst=[];
			
			//setTimeout(function(){
			const initsetting = async () => {
				
				var role=[];
				const { data, error } = await readRoleNew({
					kas_id: cookies.kas_id,
				});
				if (data) {
					console.log(data)
					//setRoleNama(data[0].rol_name)
					
					data.map((i, index) => {
						var pisah_priviledge=i.rol_priviledge.split("");
						pisah_priviledge.map((ii, indexi) => {
							if(ii=='R')
								role_read.push(i.rol_fun_code);
							if(ii=='C')
								role_create.push(i.rol_fun_code);
							if(ii=='U')
								role_update.push(i.rol_fun_code);
							if(ii=='D')
								role_delete.push(i.rol_fun_code);
							if(ii=='0')
								role_dst.push(i.rol_fun_code);
						})
					})

				}
				setCookies("role_read", role_read);
				setCookies("role_create", role_create);
				setCookies("role_update", role_update);
				setCookies("role_delete", role_delete);
				setCookies("role_dst", role_dst);
				setCookies("role_nama", (valueFunCodeName.code.replace(/\s/g, '')).toLowerCase());
				window.location.reload();
				
			};
			initsetting();
			
			
			// window.location.reload();
			
			//},1000);
			
			
			
			// setCookies("role_read", role_read);
			// setCookies("role_create", role_create);
			// setCookies("role_update", role_update);
			// setCookies("role_delete", role_delete);
			// setCookies("role_dst", role_dst);
			// setCookies("role_nama", role_nama[0]);
		}
	}, [refreshCookies,userById]);

	const saveNewPassword =  useCallback(async (password) => {
		const {data, error} = await savePassword(password);
        if(error){
            alert(error.message);
        }else{
			setLokcoms(data);
			
        }
    },[userById]);
	const saveNewData =  useCallback(async (users) => {
		const {data, error} = await saveUser(users);
        if(error){
            alert(error.message);
        }else{
			saveNewPassword(users);
			//await deleteRole({kas_id:Number(users.kas_id)});
			let tasks = [];
			let k=0;
			for (let i = 0; i < users.role.length; i++) {
				const delay = 1500 * i;
				tasks.push(new Promise(async function(resolve) {
					await new Promise(res => setTimeout(res, delay));
					let result = await new Promise(r => {
						saveRole(users.role[k]);
						r(delay);
					});
					resolve(result);
					k++
				}));
			}
			setNewLoading(true);
			Promise.all(tasks).then(results => {
				setValueFunCode([]);
				setOpenAdd(false);
			});
        }
    },[userById]);

	const saveDataAdd = useCallback(async () => {
		const _userById = cloneDeep(userById);
		const uniqueData = [];
		_userById.kas_role=valueFunCodeName.code;
        setItemDisplay(null);
        const {data, error} = await addUser(_userById);
        if(error){
            alert(error.message);
        }else{
			_userById.kas_id=data[data.length-1].kas_id;
			categoryCode.map((i, index) => {
				//valueFunCode.find((element) => element > 10);
				let datafilter=valueFunCode.filter(
					function(data){ return data.category == i }
				)
				let newstrinside='';
				datafilter.map((ii, indexi) => {
					newstrinside=newstrinside+(ii.code).substr((ii.code).length - 1);
				})
				if(newstrinside!='')
				uniqueData.push({"rol_id":-1,"rol_name":(valueFunCodeName.code).replace(/\s/g, ''),"lok_id":cookies.lok_id,"com_id":cookies.com_id,"rol_fun_code":i,"rol_priviledge":newstrinside,"kas_id":data[data.length-1].kas_id})
			})
			_userById.role=uniqueData;
			saveNewData(_userById);
        }
    },[userById,valueFunCodeName,valueFunCode]);

	const saveDataKasirAdd = useCallback(async () => {
		const _kasirById = cloneDeep(kasirById);
		_kasirById.kas_id=-1;
		_kasirById.kas_com_id=companiesSelect;
		_kasirById.kas_lok_id=locationSelectNew;
		_kasirById.kas_role=(roleSelect).toUpperCase();
        setItemDisplay(null);
		if (_kasirById.kas_nama=="") alert("Nama kasir tidak boleh kosong");
		else if (_kasirById.kas_com_id == "") alert("Perusahaan tidak boleh kosong");
		else if (_kasirById.kas_lok_id == "") alert("Lokasi tidak boleh kosong");
		else if (_kasirById.kas_role == "") alert("Role tidak boleh kosong");
		else if (_kasirById.kas_nick == "") alert("Username tidak boleh kosong");
		else if (_kasirById.kas_password == "") alert("Password tidak boleh kosong");
		else {
			const {data, error} = await saveKasir(_kasirById);
			if(error){
				alert(error.message);
			}else{
				const initkasir = async () => {
					const { data, error } = await getLokcom({ com_id: cookies.com_id });
					if (!error) {
						setOpenLokasi(false);
						setLokcoms(data);
						setOpenKasir(false)
					}
				};
				initkasir();
			}
		}
    },[kasirById,companiesSelect,locationSelect,roleSelect]);

	const saveDataCompanyAdd = useCallback(async () => {
		const _companyById = cloneDeep(companyById);
		_companyById.com_id=-1;
		_companyById.com_paket=paketSelect;
        setItemDisplay(null);
		if (_companyById.com_nama=="") alert("Nama perusahaan tidak boleh kosong");
		else if (_companyById.com_kode == "") alert("Kode perusahaan tidak boleh kosong");
		else if (_companyById.com_maxrole == "") alert("Max Role tidak boleh kosong");
		else if (_companyById.com_maxuser == "") alert("Max User tidak boleh kosong");
		else if (_companyById.com_paket == "") alert("Paket tidak boleh kosong");
		else {
			const initverify = async () => {
				const { data } = await verify({otp_code:otpvalue, otp_kas_id:cookies.kas_id});
				if (data) {
					const {} = await saveCompany(_companyById);
						const initcompany = async () => {
							const { data, error } = await readCompany();
							if (!error) {
							setCompanies(data);
							setOpenCompany(false)
							setOpenOtp(false)
							}
						};
						initcompany();
				//   setCompanies(data);
				//   setOpenCompany(false)
				}
			};
			initverify();
			
		}
    },[companyById,paketSelect,otpvalue]);

	const saveDataLokasiAdd = useCallback(async () => {
		const _lokasiById = cloneDeep(lokasiById);
		_lokasiById.lok_id=-1;
		_lokasiById.lok_com_id=companiesLokasiSelect;
        setItemDisplay(null);
		if (_lokasiById.lok_nama=="") alert("Nama lokasi tidak boleh kosong");
		else if (_lokasiById.lok_alamat == "") alert("Alamat tidak boleh kosong");
		else {
			const {data, error} = await saveLokasi(_lokasiById);
			if(error){
				alert(error.message);
			}else{
				const initlokasi = async () => {
					const { data, error } = await readLokasi();
					if (!error) {
						let newLokasi=data.filter(
							function(row){ return row.lok_com_id == companiesSelect }
						)
						setOpenLokasi(false);
						setLocations(newLokasi);
					}
				};
				initlokasi();
			}
		}
    },[lokasiById,companiesLokasiSelect]);

	const validatePassword = useCallback(
		async () => {
			console.log(cookies)
			console.log(passwordOld)
			const { data, error } = await login({
			  username: cookies.kas_nick,
			  password: passwordOld,
			});
			console.log(data)
			if (error) {
			  alert("Password tidak sama");
			} else {
				setOpenPassword(false)
				setOpenSavePassword(true)
			}
		},
		[passwordOld,cookies]
	  );
	  const changePassword = useCallback(
		async () => {
			const { data, error } = await savePassword({
			  kas_id: cookies.kas_id,
			  kas_password: passwordNew,
			});
			console.log(data)
			if (error) {
			  alert("Password tidak sama");
			} else {
				setOpenSavePassword(false)
			}
		},
		[passwordNew,cookies]
	  );
	useEffect(() => {
		if (!cookies.lok_id) {
			navigate(topic.login.route);
		}

		const handleResponse = ({ data, error }) => {
			if (error) {
				alert(dictionary.universal.notfound[lang]);
			} else {
				setLokcoms(data);
				console.log(data)
			}
		};

		const init = async () => {
			if (keyword && keyword.length > 1) {
				const orderSearch = setTimeout(async () => {
					setLoading(true);
					const { data, error } = await getLokcom({ com_id: cookies.com_id, key_val: keyword });
					handleResponse({ data, error });
					setLoading(false);
				}, TIME_SEARCH_DEBOUNCE);
				return () => {
					clearTimeout(orderSearch);
				};
			} else if (!keyword) {
				setLoading(true);
				setLokcoms([]);
				const { data, error } = await getLokcom({ com_id: cookies.com_id });
				handleResponse({ data, error });
				setLoading(false);
			}
		};
		init();
		const initcompany = async () => {
			const { data, error } = await readCompany();
			if (!error) {
				console.log(data)
			  setCompanies(data);
			}
		};
		initcompany();
		const initlokasi = async () => {
			const { data, error } = await readLokasi();
			if (!error) {
				let newLokasi=data.filter(
					function(row){ return row.lok_com_id == companiesSelect }
				)
			  	setLocations(newLokasi);
			}
		};
		initlokasi();
	}, [keyword,companiesSelect,locationSelect]);

	const handleLokasi = (value) => {
		setLocationSelectNew(value)
	};
	useEffect(() => {
		if (navbarRef.current) {
			setListPadding(`${navbarRef.current.offsetHeight + 20}px`);
		}
	}, [lokcoms, navbarRef]);

	return (
		<Fragment>
			{!loading ? null : <LoadingOverlay white />}
			<div className="h-screen-adapt bg-gray-50 overflow-hidden relative">
				<div className="top-0 inset-x-0 fixed bg-gradient-to-b from-gray-50 h-20" />
				<div className="p-2 top-0 inset-x-0 fixed z-50 mx-auto desktop:max-w-[60%]">
					<Navbar ref={navbarRef} className={`pt-2 px-2 ${!filters.length ? "pb-6" : "pb-4"} relative`} blurred={false}>
						<div className="flex items-center">
							<IconButton variant="text" size="md" onClick={() => setMenuOpen(true)}>
								<div className="justify-items-center lowercase">
								<Bars3Icon className="h-6 w-6 stroke-2" />
									<div style={{fontSize:"10px",padding:"0px"}}>
										Menu
									</div>
								</div>
							</IconButton>
							<div className="mx-2 flex-grow">
								<SearchNavbar onSearch={handleFilter} value={keyword} label={dictionary.search.user[lang]} />
							</div>
							<IconButton size="md" variant="text" onClick={() => setFilters(true)}>
								<AdjustmentsVerticalIcon className="h-6 w-6 stroke-2" />
							</IconButton>
						</div>
						{!filters.length ? (
							<Typography variant="small" color="gray" className="absolute right-14 bottom-1 text-xs italic">
								{dictionary.filter.itemCategory.all[lang]}
							</Typography>
						) : (
							<div className="px-2 pt-4">
								<FilterChips filters={filters} onSetFilters={setFilters} />
							</div>
						)}
					</Navbar>
				</div>
				
				<div className="pb-20 overflow-auto h-full" style={{ paddingTop: listPadding }}>
					
					<List className="divide-y divide-dashed divide-gray-400">
						{lokcoms.map((i, index) => {
							return (
								<ListItem key={index} className="relative p-0">
									<div className="w-full " onClick={() => handleOpen(i, false, index)}>
										<div className="items-center flex h-10 w-[90%] whitespace-nowrap overflow-hidden text-ellipsis font-semibold">
											{i.kas_nama} {` (${i.kas_nick})`}
										</div>

									</div>
									<ListItemSuffix>
										<div className="action-area flex items-center absolute right-0">
											<IconButton variant="text" color="blue-gray" onClick={() => handleOpen(i, true, index)}>
												<PencilSquareIcon className="h-6 w-6 text-black-500" />
											</IconButton>
										</div>
									</ListItemSuffix>
								</ListItem>
							);
						})}
					</List>
					{/* <div className="fixed bottom-20 right-4">
						<IconButton variant="filled" color="teal" className="rounded-full" size="lg" onClick={handleChangePassword}>
							<ShieldCheckIcon className="h-8 w-8 text-black-500" />
						</IconButton>

					</div> */}
					<div className="fixed bottom-4 right-4">
						<IconButton variant="filled" color="teal" className="rounded-full" size="lg" onClick={handleAdd}>
							<PlusCircleIcon className="h-8 w-8 text-black-500" />
						</IconButton>
					</div>
				</div>

				<Dialog open={open} handler={handleOpen}>
					<DialogHeader>{txtTitle}</DialogHeader>
					<DialogBody>
						<label className="flex items-center mt-2"> Nama Role
						</label>
						{
							readonly?
							<Input value={valueFunCodeName.desc} disabled="true"></Input>
							:
							<CreatableSelect 
								isClearable 
								options={roleName} 
								value={valueFunCodeName}
								onChange={setValueFunCodeName} 
								getOptionLabel={(roleName) => roleName.desc}
								getOptionValue={(roleName) => roleName.code}
							/>
						}
						<label className="flex items-center"> Kode Fungsi 
						</label>
						<Select
							closeMenuOnSelect={false}
							components={animatedComponents}
							// defaultValue={[colourOptions[4], colourOptions[5]]}
							isMulti
							options={funCodeData}
							value={valueFunCode}
        					onChange={setValueFunCode}
							isDisabled={readonly}
							getOptionLabel={(funCodes) => funCodes.desc}
        					getOptionValue={(funCodes) => funCodes.code}
						/>
					</DialogBody>

					<DialogFooter className="flex gap-3 justify-between">
						<Button variant="gradient" color="blue-gray" onClick={() => setOpen(false)} className="w-full flex-1">
							<span>{mode <= 1 ? "Kembali" : dictionary.universal.cancel[lang]}</span>
						</Button>
						<Button
							variant="gradient"
							color={mode <= 1 ? "red" : "green"}
							onClick={mode <= 1 ? () => handleNewOpen(userById.kas_id) : saveData}
							className="w-full flex-1"
						>
							{
								newLoading ? (
									<Spinner className="h-4 w-4 ml-32 text-white" color="light-green" />
								) : (
									<span>{mode <= 1 ? dictionary.universal.delete[lang] : dictionary.universal.save[lang]}</span>
								)
							}
						</Button>
					</DialogFooter>
				</Dialog>
				<Dialog open={openAdd} handler={handleAdd}>
					<DialogHeader>{dictionary.dialogheader.adduser[lang]}</DialogHeader>
					<DialogBody>
						<div className="mb-4">
							<InputSimple
								label={dictionary.dialog.user.namecashier[lang]}
								onChange={(evt)=>handleChange(evt, "kas_nama")}
								disabled={readonly}
							/>
						</div>
						<div className="mb-4">
							<InputSimple
								label="Username"
								onChange={(evt)=>handleChange(evt, "kas_nick")}
								disabled={readonly}
							/>
						</div>
						<div className="mb-4">
							<Input
								label="Password"
								color="teal"
								onChange={(evt)=>handleChange(evt, "kas_password")}
								type={isPasswordVisible ? "text" : "password"}
							/>
							<label className="flex items-center mt-2">
								<input
									type="checkbox"
									className="mr-2 w-4 h-4"
									checked={isPasswordVisible}
									onChange={togglePasswordVisibility}
								/>
								<span className="text-sm text-gray-600">Show password</span>
							</label>
						</div>

						<label className="flex items-center mt-2"> Nama Role
						</label>
						{
							readonly?
							<CreatableSelect 
								isClearable 
								options={roleName} 
								value={valueFunCodeName}
								onChange={setValueFunCodeName} 
								getOptionLabel={(roleName) => roleName.desc}
								getOptionValue={(roleName) => roleName.code}
							/>:
							<Input value={valueFunCodeName} className={`${readonly?"pointer-events-none":"pointer-events-auto"}`}></Input>
						}
						
						<label className="flex items-center"> Kode Fungsi 
						</label>
						<Select
							closeMenuOnSelect={false}
							components={animatedComponents}
							// defaultValue={[colourOptions[4], colourOptions[5]]}
							isMulti
							options={funCodeData}
							value={valueFunCode}
							className={`${readonly?"pointer-events-none":"pointer-events-auto"}`}
        					onChange={setValueFunCode}
							isDisabled={readonly}
							getOptionLabel={(funCodes) => funCodes.desc}
        					getOptionValue={(funCodes) => funCodes.code}
						/>
					</DialogBody>

					<DialogFooter className="flex gap-3 justify-between">
						<Button variant="gradient" color="blue-gray" onClick={() => setOpenAdd(false)} className="w-full flex-1">
							<span>{mode <= 1 ? "Kembali" : dictionary.universal.cancel[lang]}</span>
						</Button>
						<Button
							variant="gradient"
							color={"green"}
							onClick={saveDataAdd}
							className="w-full flex-1"
						>
							{
								newLoading ? (
									<Spinner className="h-4 w-4 ml-32 text-white" color="light-green" />
								) : (
									<span>{dictionary.universal.save[lang]}</span>
								)
							}
						</Button>
					</DialogFooter>
				</Dialog>

				<Dialog open={newOpen} handler={handleNewOpen}>
					<DialogBody>
						<div className="text-center my-6">
							User {dictionary.universal.withname[lang]} <span className="font-semibold">{userById.kas_nama}</span> {dictionary.universal.deleteMessage[lang]}
						</div>
					</DialogBody>
					<DialogFooter className="flex gap-3 justify-between">
						<Button variant="gradient" color="blue-gray" onClick={() => setNewOpen(false)} className="w-full flex-1">
						<span>{dictionary.universal.cancel[lang]}</span>
						</Button>
						<Button variant="gradient" color="red" onClick={handleDelete} className="w-full flex-1">
						<span>{dictionary.universal.delete[lang]}</span>
						</Button>
					</DialogFooter>
				</Dialog>
				<Dialog open={openKasir} handler={()=>setOpenKasir(false)}>
					<DialogBody>
						{/* <ContactForm /> */}
						<div className="max-h-[60vh] overflow-y-auto">
							<div className="pb-4">
								<InputSimple
									value={kasirById.kas_nama}
									label={dictionary.dialog.user.namecashier[lang]}
									onChange={(evt) => handleChangeNew(evt, "kas_nama","kasir")}
									//disabled={readonly}
								/>
							</div>
							<div className="pb-4">
								<InputSimple
									value={kasirById.kas_wa}
									label={dictionary.dialog.user.wa[lang]}
									onChange={(evt) => handleChangeNew(evt, "kas_wa","kasir")}
									//disabled={readonly}
								/>
							</div>
							<div className="pb-4">
								<InputSimple
									value={kasirById.kas_nick}
									label="Username"
									onChange={(evt) => handleChangeNew(evt, "kas_nick","kasir")}
									//disabled={readonly}
								/>
							</div>
							<div className="pb-0">
								<InputSimple
									value={kasirById.kas_password}
									label="Password"
									type={isPasswordVisible ? "text" : "password"}
									onChange={(evt) => handleChangeNew(evt, "kas_password","kasir")}
									//disabled={readonly}
								/>
							</div>
							<div className="pb-4">
								<label className="flex items-center mt-2">
									<input
										type="checkbox"
										className="mr-2 w-4 h-4"
										checked={isPasswordVisible}
										onChange={togglePasswordVisibility}
									/>
									<span className="text-sm text-gray-600">Show password</span>
								</label>
							</div>
							<div className="pb-4 flex">
								<SelectTailwind
								id="companies"
								value={`${companiesSelect}`}
								onChange={setCompaniesSelect}
								color="teal"
								label={dictionary.choose.company[lang]}
								>
								{companies.map((p) => (
									<Option value={p.com_id} key={p.com_id}>
										{p.com_nama}
									</Option>
								))}
								</SelectTailwind>
								<div className="px-1">
									<IconButton variant="filled" color="teal" className="rounded-full" size="sm" onClick={handleAddCompany}>
										<PlusCircleIcon className="h-8 w-8 text-black-500" />
									</IconButton>
								</div>
							</div>
							{
								companiesSelect!=""?
								<div className="pb-4 flex">
									<SelectTailwind
									id="location"
									value={`${locationSelect}`}
									onChange={handleLokasi}
									color="teal"
									label={dictionary.choose.location[lang]}
									>
									{locations.map((p) => (
										<Option value={p.lok_id} key={p.lok_id}>
											{p.lok_nama}
										</Option>
									))}
									</SelectTailwind>
									<div className="px-1">
										<IconButton variant="filled" color="teal" className="rounded-full" size="sm" onClick={()=>{setOpenOtp(true)}}>
											<PlusCircleIcon className="h-8 w-8 text-black-500" />
										</IconButton>
									</div>
								</div>:null
							}
							<div className="pb-4">
								<SelectTailwind
								id="location"
								value={`${roleSelect}`}
								onChange={setRoleSelect}
								color="teal"
								label={dictionary.choose.role[lang]}
								>
								{roleName.map((p) => (
									<Option value={p.code} key={p.code}>
										{p.code}
									</Option>
								))}
								</SelectTailwind>
							</div>
						</div>
					</DialogBody>
					<DialogFooter className="flex gap-3 justify-between">
						<Button variant="gradient" color="red" onClick={() => setOpenKasir(false)} className="w-full flex-1">
						<span>{dictionary.universal.cancel[lang]}</span>
						</Button>
						<Button variant="gradient" color="green" onClick={saveDataKasirAdd} className="w-full flex-1">
						<span>{dictionary.universal.save[lang]}</span>
						</Button>
					</DialogFooter>
				</Dialog>
				<Dialog open={openLokasi} handler={()=>setOpenLokasi(false)}>
					<DialogBody>
						{/* <ContactForm /> */}
						<div className="max-h-[60vh] overflow-y-auto">
							<div className="pb-4">
								<InputSimple
									value={lokasiById.lok_nama}
									label={dictionary.dialog.user.namelocation[lang]}
									onChange={(evt) => handleChangeNew(evt, "lok_nama","lokasi")}
									//disabled={readonly}
								/>
							</div>
							<div className="pb-4">
								<InputSimple
									value={lokasiById.lok_alamat}
									label={dictionary.dialog.user.address[lang]}
									onChange={(evt) => handleChangeNew(evt, "lok_alamat","lokasi")}
									//disabled={readonly}
								/>
							</div>
							<div className="pb-4">
								<InputSimple
									value={lokasiById.lok_telpon}
									label={dictionary.dialog.user.phone[lang]}
									onChange={(evt) => handleChangeNew(evt, "lok_telpon","lokasi")}
									//disabled={readonly}
								/>
							</div>
							<div className="pb-4">
								<InputSimple
									value={lokasiById.lok_footer1}
									label="Footer 1"
									onChange={(evt) => handleChangeNew(evt, "lok_footer1","lokasi")}
									//disabled={readonly}
								/>
							</div>
							<div className="pb-4">
								<InputSimple
									value={lokasiById.lok_footer2}
									label="Footer 2"
									onChange={(evt) => handleChangeNew(evt, "lok_footer2","lokasi")}
									//disabled={readonly}
								/>
							</div>
							<div className="pb-4">
								<SelectTailwind
								id="companies"
								value={`${companiesLokasiSelect}`}
								onChange={setCompaniesLokasiSelect}
								color="teal"
								label={dictionary.choose.company[lang]}
								>
								{companies.map((p) => (
									<Option value={p.com_id} key={p.com_id}>
										{p.com_nama}
									</Option>
								))}
								</SelectTailwind>
							</div>
						</div>
					</DialogBody>
					<DialogFooter className="flex gap-3 justify-between">
						<Button variant="gradient" color="red" onClick={() => setOpenLokasi(false)} className="w-full flex-1">
						<span>{dictionary.universal.cancel[lang]}</span>
						</Button>
						<Button variant="gradient" color="green" onClick={saveDataLokasiAdd} className="w-full flex-1">
						<span>{dictionary.universal.save[lang]}</span>
						</Button>
					</DialogFooter>
				</Dialog>
				<Dialog open={openCompany} handler={()=>setOpenCompany(false)}>
					<DialogBody>
						{/* <ContactForm /> */}
						<div className="max-h-[60vh] overflow-y-auto">
							<div className="pb-4">
								<InputSimple
									value={companyById.com_nama}
									label={dictionary.dialog.user.namecompany[lang]}
									onChange={(evt) => handleChangeNew(evt, "com_nama","company")}
									//disabled={readonly}
								/>
							</div>
							<div className="pb-4">
								<InputSimple
									value={companyById.com_kode}
									label={dictionary.dialog.user.codecompany[lang]}
									onChange={(evt) => handleChangeNew(evt, "com_kode","company")}
									//disabled={readonly}
								/>
							</div>
							<div className="pb-4">
								<InputNumber
									value={companyById.com_maxrole}
									label="Max Role"
									onChange={(evt) => handleChangeNew(evt, "com_maxrole","company")}
									//disabled={readonly}
								/>
							</div>
							<div className="pb-4">
								<InputSimple
									value={companyById.com_maxuser}
									label="Max User"
									onChange={(evt) => handleChangeNew(evt, "com_maxuser","company")}
									//disabled={readonly}
								/>
							</div>
							<div className="pb-4">
								<SelectTailwind
								id="paket"
								value={`${paketSelect}`}
								onChange={setPaketSelect}
								color="teal"
								label={dictionary.choose.plan[lang]}
								>
									<Option value="R1" key="R1">R1</Option>
									<Option value="R2" key="R2">R2</Option>
									<Option value="R3" key="R3">R3</Option>
								</SelectTailwind>
							</div>
						</div>
					</DialogBody>
					<DialogFooter className="flex gap-3 justify-between">
						<Button variant="gradient" color="red" onClick={() => setOpenCompany(false)} className="w-full flex-1">
						<span>{dictionary.universal.cancel[lang]}</span>
						</Button>
						{/* saveDataCompanyAdd */}
						<Button variant="gradient" color="green" onClick={handleOpenOtp} className="w-full flex-1">
						<span>{dictionary.universal.save[lang]}</span>
						</Button>
					</DialogFooter>
				</Dialog>
				<Dialog open={openOtp} handler={()=>setOpenOtp(false)}>
					<DialogBody>
						{/* <ContactForm /> */}
						<OtpInput
							value={otpvalue}
							onChange={setOtpvalue}
							numInputs={5}
							renderSeparator={<span className='p-4'>-</span>}
							renderInput={(props) => <input {...props} />}
							inputStyle="p-2 rounded-lg border border-gray-300 focus:outline-none text-2xl !w-10"
						/>
						
						
					</DialogBody>
					<DialogFooter className="flex gap-3 justify-between">
						<Button variant="gradient" color="red" onClick={() => setOpenOtp(false)} className="w-full flex-1">
						<span>{dictionary.universal.cancel[lang]}</span>
						</Button>
						<Button variant="gradient" color="green" onClick={saveDataCompanyAdd} className="w-full flex-1">
						<span>{dictionary.universal.save[lang]}</span>
						</Button>
					</DialogFooter>
				</Dialog>
				<Dialog open={openPassword} handler={()=>setOpenPassword(false)}>
					<DialogBody>
					<div className="mb-4">
							<Input
								label={dictionary.dialog.user.oldpassword[lang]}
								color="teal"
								onChange={(evt)=>handleInputChangePassword(evt, 'lama')}
								type={isPasswordVisible ? "text" : "password"}
							/>
							<label className="flex items-center mt-2">
								<input
									type="checkbox"
									className="mr-2 w-4 h-4"
									checked={isPasswordVisible}
									onChange={togglePasswordVisibility}
								/>
								<span className="text-sm text-gray-600">Show password</span>
							</label>
						</div>
					</DialogBody>
					<DialogFooter className="flex gap-3 justify-between">
						<Button variant="gradient" color="red" onClick={() => setOpenPassword(false)} className="w-full flex-1">
						<span>{dictionary.universal.cancel[lang]}</span>
						</Button>
						<Button variant="gradient" color="green" onClick={() =>validatePassword()} className="w-full flex-1">
						<span>{dictionary.universal.save[lang]}</span>
						</Button>
					</DialogFooter>
				</Dialog>
				<Dialog open={openSavePassword} handler={()=>setOpenSavePassword(false)}>
					<DialogBody>
					<div className="mb-4">
							<Input
								label={dictionary.dialog.user.newpassword[lang]}
								color="teal"
								onChange={(evt)=>handleInputChangePassword(evt, 'baru')}
								type={isPasswordVisible ? "text" : "password"}
							/>
							<label className="flex items-center mt-2">
								<input
									type="checkbox"
									className="mr-2 w-4 h-4"
									checked={isPasswordVisible}
									onChange={togglePasswordVisibility}
								/>
								<span className="text-sm text-gray-600">Show password</span>
							</label>
						</div>
					</DialogBody>
					<DialogFooter className="flex gap-3 justify-between">
						<Button variant="gradient" color="red" onClick={() => setOpenSavePassword(false)} className="w-full flex-1">
						<span>{dictionary.universal.cancel[lang]}</span>
						</Button>
						<Button variant="gradient" color="green" onClick={() =>changePassword()} className="w-full flex-1">
						<span>{dictionary.universal.save[lang]}</span>
						</Button>
					</DialogFooter>
				</Dialog>
			</div>
		</Fragment>
	);
}
