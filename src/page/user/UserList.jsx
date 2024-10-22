import { Fragment, useCallback, useContext, useEffect, useRef, useState } from "react";
import { getTable, saveTable, deleteTable } from "../../api/Table";
import { getRole, readRoleNew } from "../../api/Login";
import { getLokcom, saveRole, deleteRole, addUser, saveUser, savePassword } from "../../api/Login";
import { AppContext } from "../../AppContext";
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter, IconButton, Input, List, ListItem, Navbar,
	Option, Select as SelectTailwind, Spinner, Typography,
} from "@material-tailwind/react";
import SearchNavbar from "../../lib/SearchNavbar";
import { AdjustmentsVerticalIcon, Bars3Icon, PlusCircleIcon } from "@heroicons/react/24/outline";
import FilterChips from "../../lib/FilterChips";
import { TableListModel } from "../../model/table";
import { LokcomListModel } from "../../model/kasir";
import { dictionary } from "../../constant/appDictionary";
import { useNavigate } from "react-router-dom";
import LoadingOverlay from "../../lib/LoadingOverlay";
import { topic } from "../../constant/appTopics";
import { TIME_SEARCH_DEBOUNCE } from "../../constant/appCommon";
import InputSimple from "../../lib/InputSimple";
import { formatSentenceCase } from "../../util/formatter";
import { cloneDeep } from "lodash";
import { CheckCircleIcon, PencilSquareIcon, XCircleIcon } from "@heroicons/react/16/solid";
import { funCodes, roleName } from "../../constant/appEnum";
import Select  from 'react-select';
import makeAnimated from 'react-select/animated';
import CreatableSelect from 'react-select/creatable';
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
	const [roleread, setRoleread] = useState([]);
	const [roleupdate, setRoleupdate] = useState([]);
	const [rolecreate, setRolecreate] = useState([]);
	const [roledelete, setRoledelete] = useState([]);
	const [roledst, setRoledst] = useState([]);
	const [rolenama, setRolenama] = useState("");
	const [refreshCookies, setRefreshCookies] = useState(0);
    function togglePasswordVisibility() {
        setIsPasswordVisible((prevState) => !prevState);
    }
	const handleFilter = (searchKey) => {
		setKeyword(searchKey);
	};

	const handleOpen = useCallback(async (item,setedit,index) => {
		if (setedit == true) {
			setReadonly(false);
			setOpen(true);
			setUserById(item);
			settxtTitle("Edit User");
			setMode(2);
			setValueFunCode([])
			setValueFunCodeName({"code":formatSentenceCase(item.kas_role),"desc":formatSentenceCase(item.kas_role)})
			const rolearr=[];
			const { data, error } = await readRoleNew({ kas_id: item.kas_id });
			if (error) {
				alert("Data tidak ditemukan");
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
		} else {
			setReadonly(true);
			setOpen(!open);
			setUserById(item);
			settxtTitle("Detail User");
			setMode(1);
		}
	}, [userById]);
	
	function handleNewOpen(id) {
		setNewOpen(!newOpen);
	}

	function handleAdd() {
		console.log(cookies)
		// let admin_role=funCodes.filter(function (object) {
		// 	return object.code === "ALL-0";
		// });
		// let admin_role_name=roleName.filter(function (object) {
		// 	return object.code === "Admin";
		// });
		// let admin_arr=[];
		// admin_arr.push(admin_role[0])
		// let admin_arr_name=[];
		// admin_arr_name.push(admin_role_name[0])
		// setValueFunCode(admin_arr)
		// setValueFunCodeName(admin_arr_name)
		// setUserById({ lok_id: cookies.lok_id, com_id: cookies.com_id });
		// setOpenAdd(!openAdd);
	}

	const handleChange= (evt, id) =>{
        setUserById({
          ...userById,
          [id]: evt.target.value
        });
    };

	const handleDelete = useCallback(async () => {
		setItemDisplay(null);
		const { data, error } = await deleteRole({kas_id:Number(userById.kas_id)});
		if (error) {
			alert("Data tidak ditemukan");
		} else {
			setLoading(true);
			const { data, error } = await getLokcom({ com_id: cookies.com_id });
			if (error) {
				alert("Data tidak ditemukan");
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
			setRoleread([])
			setTimeout(function(){
			const initsetting = async () => {
				
				var role=[];
				const { data, error } = await readRoleNew({
					kas_id: cookies.kas_id,
				});
				if (data) {
					console.log(data[0].rol_name)
					setRoleNama(data[0].rol_name)
					refreshroles(data[0].rol_name,"role_nama");
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
			};
			initsetting();
			
			
			// window.location.reload();
			console.log(role_read)
			},1000);
			setRoleread(role_read)
			
			refreshroles(role_read,"role_read");
			// setCookies("role_read", role_read);
			// setCookies("role_create", role_create);
			// setCookies("role_update", role_update);
			// setCookies("role_delete", role_delete);
			// setCookies("role_dst", role_dst);
			// setCookies("role_nama", role_nama[0]);
		}
	}, [refreshCookies,userById]);

	const refreshroles = useCallback((value,incookies) =>{
		setCookies(incookies, value);
		console.log(roleread)
    },[rolenama,roleread]);

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

	useEffect(() => {
		if (!cookies.lok_id) {
			navigate(topic.login.route);
		}

		const handleResponse = ({ data, error }) => {
			if (error) {
				alert("Data tidak ditemukan");
			} else {
				setLokcoms(data);
			}
		};

		const init = async () => {
			if (keyword && keyword.length > 1) {
				const orderSearch = setTimeout(async () => {
					setLoading(true);
					const { data, error } = await getTable({ lok_id: cookies.lok_id, key_val: keyword });
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
	}, [keyword]);

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
								<Bars3Icon className="h-6 w-6 stroke-2" />
							</IconButton>
							<div className="mx-2 flex-grow">
								<SearchNavbar onSearch={handleFilter} value={keyword} label="Cari User" />
							</div>
							<IconButton size="md" variant="text" onClick={() => setFilters(true)}>
								<AdjustmentsVerticalIcon className="h-6 w-6 stroke-2" />
							</IconButton>
						</div>
						{!filters.length ? (
							<Typography variant="small" color="gray" className="absolute right-14 bottom-1 text-xs italic">
								Semua Kategori
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
								<ListItem key={index} className="relative">
									<div className="w-full  flex flex-col gap-1" onClick={() => handleOpen(i, false, index)}>
										<div className="w-[90%] whitespace-nowrap overflow-hidden text-ellipsis font-semibold">
											{i.kas_nama} {` (${i.kas_nick})`}
										</div>

									</div>

									<div className="action-area flex items-center absolute top-1 right-0">
										<IconButton variant="text" color="blue-gray" onClick={() => handleOpen(i, true, index)}>
											<PencilSquareIcon className="h-6 w-6 text-black-500" />
										</IconButton>
									</div>
								</ListItem>
							);
						})}
					</List>

					<div className="fixed bottom-4 right-4">
						<IconButton variant="filled" color="teal" className="rounded-full" size="lg" onClick={() => handleAdd()}>
							<PlusCircleIcon className="h-8 w-8 text-black-500" />
						</IconButton>
					</div>
				</div>

				<Dialog open={open} handler={handleOpen}>
					<DialogHeader>{txtTitle}</DialogHeader>
					<DialogBody>
						<label className="flex items-center mt-2"> Nama Role
						</label>
						<CreatableSelect 
							isClearable 
							options={roleName} 
							value={valueFunCodeName}
        					onChange={setValueFunCodeName} 
							getOptionLabel={(roleName) => roleName.desc}
							getOptionValue={(roleName) => roleName.code}
						/>
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
							<span>{mode <= 1 ? "Kembali" : "Batal"}</span>
						</Button>
						<Button
							variant="gradient"
							color={mode <= 1 ? "red" : "green"}
							onClick={mode <= 1 ? () => handleNewOpen(userById.mej_id) : saveData}
							className="w-full flex-1"
						>
							{
								newLoading ? (
									<Spinner className="h-4 w-4 ml-32 text-white" color="light-green" />
								) : (
									<span>{mode <= 1 ? "Hapus" : "Simpan"}</span>
								)
							}
						</Button>
					</DialogFooter>
				</Dialog>
				<Dialog open={openAdd} handler={handleAdd}>
					<DialogHeader>Tambah User</DialogHeader>
					<DialogBody>
						<div className="mb-4">
							<InputSimple
								label="Nama Kasir"
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
						<CreatableSelect 
							isClearable 
							options={roleName} 
							value={valueFunCodeName}
        					onChange={setValueFunCodeName} 
							getOptionLabel={(roleName) => roleName.desc}
							getOptionValue={(roleName) => roleName.code}
						/>
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
						<Button variant="gradient" color="blue-gray" onClick={() => setOpenAdd(false)} className="w-full flex-1">
							<span>{mode <= 1 ? "Kembali" : "Batal"}</span>
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
									<span>Simpan</span>
								)
							}
						</Button>
					</DialogFooter>
				</Dialog>

				<Dialog open={newOpen} handler={handleNewOpen}>
					<DialogBody>
						<div className="text-center my-6">
							User <span className="font-semibold">{userById.mej_nama}</span> akan dihapus. Apakah anda yakin?
						</div>
					</DialogBody>

          <DialogFooter className="flex gap-3 justify-between">
            <Button variant="gradient" color="blue-gray" onClick={() => setNewOpen(false)} className="w-full flex-1">
              <span>Batal</span>
            </Button>
            <Button variant="gradient" color="red" onClick={handleDelete} className="w-full flex-1">
              <span>Hapus</span>
            </Button>
          </DialogFooter>
				</Dialog>
			</div>
		</Fragment>
	);
}
