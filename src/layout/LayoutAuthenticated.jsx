import { useContext, useEffect, useState } from "react";
import logo from "/logo.svg";
import { IconButton, Typography, List, ListItem, ListItemPrefix, ListItemSuffix, Chip, Accordion,
	AccordionHeader, AccordionBody, Drawer, Card } from "@material-tailwind/react";
import { BeakerIcon, PowerIcon, Squares2X2Icon, WrenchScrewdriverIcon, ReceiptPercentIcon, 
	CreditCardIcon,QrCodeIcon} from "@heroicons/react/24/solid";
import { ChevronDownIcon, DocumentTextIcon, UserGroupIcon, XMarkIcon, InboxStackIcon, CalculatorIcon,
	TruckIcon, Cog6ToothIcon, ClipboardDocumentIcon, Square3Stack3DIcon, UserIcon, ShoppingBagIcon, 
	CubeIcon, CubeTransparentIcon, NewspaperIcon, ClockIcon
} from "@heroicons/react/24/outline";
import { AppContext } from "../AppContext";
import { dictionary } from "../constant/appDictionary";
import { topic } from "../constant/appTopics";
import { Link,useNavigate } from "react-router-dom";
import { getCountCustomers } from "../api/Customer";
import { getCountSupplier } from "../api/Supplier";
import { differenceInHours} from "date-fns";

export function LayoutAuthenticated({ children }) {
	const { isMenuOpen, setMenuOpen, lang, countCustomer, countSupplier, setCountCustomer, setCountSupplier,
		cookies, removeCookies, setItemsCheckout, setDiskonGlobal, setPajakGlobal } = useContext(AppContext);
	const [openParentMenu, setOpenParentMenu] = useState(0);
	const handleOpen = (value) => {
		setOpenParentMenu(openParentMenu === value ? 0 : value);
	};
	const navigate = useNavigate();
	const [isPOSAccess] = 
		useState(!cookies.role_read||!cookies.role_dst?false:
		cookies.role_read.length==0&&cookies.role_dst.length==0?true:(
		(cookies.role_dst.findIndex(a=>a=='ALL')>=0?
		true:(cookies.role_read.findIndex(a=>a=='POS')>= 0?
		true:false))));
	const [isTransactionAccess] = 
		useState(!cookies.role_read||!cookies.role_dst?false:
		cookies.role_read.length==0&&cookies.role_dst.length==0?true:(
		(cookies.role_dst.findIndex(a=>a=='ALL')>=0?
		true:(cookies.role_read.findIndex(a=>a=='TRANS')>= 0?
		true:false))));
	const [isSalesAccess] = 
		useState(!cookies.role_read||!cookies.role_dst?false:
		cookies.role_read.length==0&&cookies.role_dst.length==0?true:(
		(cookies.role_dst.findIndex(a=>a=='ALL')>=0?
		true:(cookies.role_read.findIndex(a=>a=='SALES')>= 0?
		true:false))));
	const [isMasterItemAccess] = 
		useState(!cookies.role_read||!cookies.role_dst?false:
		cookies.role_read.length==0&&cookies.role_dst.length==0?true:(
		(cookies.role_dst.findIndex(a=>a=='ALL')>=0?
		true:(cookies.role_read.findIndex(a=>a=='ITM')>= 0?
		true:false))));
	const [isMasterCustomerAccess] = 
		useState(!cookies.role_read||!cookies.role_dst?false:
		cookies.role_read.length==0&&cookies.role_dst.length==0?true:(
		(cookies.role_dst.findIndex(a=>a=='ALL')>=0?
		true:(cookies.role_read.findIndex(a=>a=='CUST')>= 0?
		true:false))));
	const [isMasterTableAccess] = 
		useState(!cookies.role_read||!cookies.role_dst?false:
		cookies.role_read.length==0&&cookies.role_dst.length==0?true:(
		(cookies.role_dst.findIndex(a=>a=='ALL')>=0?
		true:(cookies.role_read.findIndex(a=>a=='TBL')>= 0?
		true:false))));
	const [isMasterConversionAccess] = 
		useState(!cookies.role_read||!cookies.role_dst?false:
		cookies.role_read.length==0&&cookies.role_dst.length==0?true:(
		(cookies.role_dst.findIndex(a=>a=='ALL')>=0?
		true:(cookies.role_read.findIndex(a=>a=='CONV')>= 0?
		true:false))));
	const [isSupplierAccess] = 
		useState(!cookies.role_read||!cookies.role_dst?false:
		cookies.role_read.length==0&&cookies.role_dst.length==0?true:(
		(cookies.role_dst.findIndex(a=>a=='ALL')>=0?
		true:(cookies.role_read.findIndex(a=>a=='SUPP')>= 0?
		true:false))));
		const [isMasterStokOpnameAccess] = 
		useState(!cookies.role_read||!cookies.role_dst?false:
		cookies.role_read.length==0&&cookies.role_dst.length==0?true:(
		(cookies.role_dst.findIndex(a=>a=='ALL')>=0?
		true:(cookies.role_read.findIndex(a=>a=='SOP')>= 0?
		true:false))));
	const [isPOAccess] = 
		useState(!cookies.role_read||!cookies.role_dst?false:
		cookies.role_read.length==0&&cookies.role_dst.length==0?true:(
		(cookies.role_dst.findIndex(a=>a=='ALL')>=0?
		true:(cookies.role_read.findIndex(a=>a=='PO')>= 0?
		true:false))));
	const [isReceivingAccess] = 
		useState(!cookies.role_read||!cookies.role_dst?false:
		cookies.role_read.length==0&&cookies.role_dst.length==0?true:(
		(cookies.role_dst.findIndex(a=>a=='ALL')>=0?
		true:(cookies.role_read.findIndex(a=>a=='RCV')>= 0?
		true:false))));
	const [isMasterPajakAccess] = 
		useState(!cookies.role_read||!cookies.role_dst?false:
		cookies.role_read.length==0&&cookies.role_dst.length==0?true:(
		(cookies.role_dst.findIndex(a=>a=='ALL')>=0?
		true:(cookies.role_read.findIndex(a=>a=='TAX')>= 0?
		true:false))));
	const [isMasterDiskonAccess] = 
		useState(!cookies.role_read||!cookies.role_dst?false:
		cookies.role_read.length==0&&cookies.role_dst.length==0?true:(
		(cookies.role_dst.findIndex(a=>a=='ALL')>=0?
		true:(cookies.role_read.findIndex(a=>a=='DIS')>= 0?
		true:false))));
	const [isAdmin] = 
		useState(cookies.role_nama=="admin"?true:false);
	useEffect(() => {
		if (cookies) {
			const init = async () => {
				const [customerCount, supplierCount] = await Promise.all([
					getCountCustomers({
						com_id: cookies.com_id,
					}),
					getCountSupplier({
						com_id: cookies.com_id,
					}),
				]);
				setCountCustomer(customerCount.data ? customerCount.data.total : 0);
				setCountSupplier(supplierCount.data ? supplierCount.data.total : 0);
			};
			init();
		}
	}, [cookies]);

	useEffect(
		() => {
			const intervalId = setInterval(() => {
				let time_arr=(cookies.time_now).split(',')
				const substract = differenceInHours(
					new Date(),
					new Date(time_arr[0], time_arr[1], time_arr[2], time_arr[3], time_arr[4], time_arr[5])
				)
				//console.log(substract)
				if(parseInt(substract)>=parseInt(cookies.auto_logout)&&parseInt(cookies.auto_logout)!=0)
				{
					setMenuOpen(false);
					setItemsCheckout([]);
					setPajakGlobal(0);
					setDiskonGlobal(0);
					removeCookies("lok_id");
					removeCookies("role_dst");
					removeCookies("role_read");
					navigate(topic.login.route);
				}
			}, 60000);
			return () => {
				clearInterval(intervalId)
			}
		} 
	)

	const openDrawer = () => {
		return setMenuOpen(true);
	};

	const closeDrawer = () => setMenuOpen(false);

	const clearCookies = () => {
		setMenuOpen(false);
		setItemsCheckout([]);
		setPajakGlobal(0);
		setDiskonGlobal(0);
		removeCookies("lok_id");
	};

	const { pathname } = window.location;
	return (
		<div className="relative lg-zoom">
			{children}
			<Drawer open={isMenuOpen} onClose={closeDrawer}>
				<Card color="transparent" shadow={false} className="h-full w-full relative">
					<div className="absolute top-2 right-2">
						<IconButton variant="text" size="lg" onClick={closeDrawer}>
							<XMarkIcon className="h-8 w-8 stroke-2" />
						</IconButton>
					</div>
					<div className="flex items-center gap-4 p-4">
						<img src={logo} alt="brand" className="h-8 w-8" />
						<Typography variant="h5" color="blue-gray">
							KASBON
						</Typography>
					</div>

					<List className="overflow-y-auto p-4">
						<Link to={topic.cashier.route} onClick={closeDrawer}  
							className={isPOSAccess?"":"hidden"}
						>
							<ListItem selected={pathname === topic.cashier.route} className="px-0">
								<ListItemPrefix>
									<CalculatorIcon className="h-5 w-5" />
								</ListItemPrefix>
								{dictionary.cashier.sidebar[lang]}
							</ListItem>
						</Link>
						<Link to={topic.transaction.route} onClick={closeDrawer} 
							className={isTransactionAccess?"":"hidden"}
						>
							<ListItem className="px-0">
								<ListItemPrefix>
									<DocumentTextIcon className="h-5 w-5" />
								</ListItemPrefix>
								{dictionary.transaction.sidebar[lang]}
							</ListItem>
						</Link>
						<Link to={topic.statistic.route} onClick={closeDrawer} 
							className={isSalesAccess?"":"hidden"}
						>
							<ListItem className="px-0">
								<ListItemPrefix>
									<DocumentTextIcon className="h-5 w-5" />
								</ListItemPrefix>
								{dictionary.statistic.sidebar[lang]}
							</ListItem>
						</Link>
						<Link to={topic.shift.route} onClick={closeDrawer} 
						>
							<ListItem className="px-0">
								<ListItemPrefix>
									<ClockIcon className="h-5 w-5" />
								</ListItemPrefix>
								{dictionary.shift.sidebar[lang]}
							</ListItem>
						</Link>
						<Link to={topic.customer.route} onClick={closeDrawer} 
							className={isMasterCustomerAccess?"":"hidden"}
						>
							<ListItem className="px-0">
								<ListItemPrefix>
									<UserGroupIcon className="h-5 w-5" />
								</ListItemPrefix>
								{dictionary.customer.sidebar[lang]}
								<ListItemSuffix>
									<Chip value={countCustomer} size="sm" variant="ghost" color="blue-gray" className="rounded-full" />
								</ListItemSuffix>
							</ListItem>
						</Link>
						{cookies.lok_type == "resto" ? (
							<Link to={topic.table.route} onClick={closeDrawer} 
								className={isMasterTableAccess?"":"hidden"}
							>
								<ListItem className="px-0">
									<ListItemPrefix>
										<ClipboardDocumentIcon className="h-5 w-5" />
									</ListItemPrefix>
									{dictionary.table.sidebar[lang]}
								</ListItem>
							</Link>
						) : null}
						<Link to={topic.supplier.route} onClick={closeDrawer} 
							className={isSupplierAccess?"":"hidden"}
						>
							<ListItem className="px-0">
								<ListItemPrefix>
									<TruckIcon className="h-5 w-5" />
								</ListItemPrefix>
								{dictionary.supplier.sidebar[lang]}
								<ListItemSuffix>
									<Chip value={countSupplier} size="sm" variant="ghost" color="blue-gray" className="rounded-full" />
								</ListItemSuffix>
							</ListItem>
						</Link>

						<Accordion
							open={openParentMenu === topic.stock.id}
							icon={
								<ChevronDownIcon
									strokeWidth={2.5}
									className={`mx-auto h-4 w-4 transition-transform ${
										openParentMenu === topic.stock.id ? "rotate-180" : ""
									}`}
								/>
							}
						>
							<ListItem className="p-0" selected={openParentMenu === topic.stock.id}>
								<AccordionHeader onClick={() => handleOpen(topic.stock.id)} className="border-b-0 p-3 px-0">
									<ListItemPrefix>
										<InboxStackIcon className="h-5 w-5" />
									</ListItemPrefix>
									<Typography color="blue-gray" className="mr-auto font-normal">
										{dictionary.stock.sidebar[lang]}
									</Typography>
								</AccordionHeader>
							</ListItem>
							<AccordionBody className="py-1 pl-4">
								<List className="p-0">
									<Link to={topic.stock.item.route} onClick={closeDrawer}  
										className={isMasterItemAccess?"":"hidden"}
									>
										<ListItem selected={pathname === topic.stock.item.route} className="px-0">
											<ListItemPrefix>
												<Squares2X2Icon strokeWidth={3} className="h-4 w-5" />
											</ListItemPrefix>
											{dictionary.stock.item.sidebar[lang]}
										</ListItem>
									</Link>
									<Link to={topic.stock.uom.route} onClick={closeDrawer} 
										className={isMasterConversionAccess?"":"hidden"}
									>
										<ListItem selected={pathname === topic.stock.uom.route} className="px-0">
											<ListItemPrefix>
												<BeakerIcon strokeWidth={3} className="h-4 w-5" />
											</ListItemPrefix>
											{dictionary.stock.uom.sidebar[lang]}
										</ListItem>
									</Link>
									<Link to={topic.stock.stokopname.route} onClick={closeDrawer}  
										className={isMasterStokOpnameAccess?"":"hidden"}
									>
										<ListItem selected={pathname === topic.stock.stokopname.route} className="px-0">
											<ListItemPrefix>
												<Square3Stack3DIcon strokeWidth={3} className="h-4 w-5" />
											</ListItemPrefix>
											{dictionary.stock.stokopname.sidebar[lang]}
										</ListItem>
									</Link>
								</List>
							</AccordionBody>
						</Accordion>

						<Accordion
							open={openParentMenu === topic.purchasing.id}
							icon={
								<ChevronDownIcon
									strokeWidth={2.5}
									className={`mx-auto h-4 w-4 transition-transform ${
										openParentMenu === topic.purchasing.id ? "rotate-180" : ""
									}`}
								/>
							}>
							<ListItem className="p-0" selected={openParentMenu === topic.purchasing.id}>
								<AccordionHeader onClick={() => handleOpen(topic.purchasing.id)} className="border-b-0 p-3 px-0">
									<ListItemPrefix>
										<ShoppingBagIcon className="h-5 w-5" />
									</ListItemPrefix>
									<Typography color="blue-gray" className="mr-auto font-normal">
										{dictionary.purchasing.sidebar[lang]}
									</Typography>
								</AccordionHeader>
							</ListItem>
							<AccordionBody className="py-1 pl-4">
								<List className="p-0">
									<Link to={topic.purchasing.order.route} onClick={closeDrawer} 
									className={isPOAccess?"":"hidden"}
									>
										<ListItem  className="px-0">
											<ListItemPrefix>
												<CubeTransparentIcon strokeWidth={3} className="h-4 w-5" />
											</ListItemPrefix>
											{dictionary.purchasing.order.sidebar[lang]}
										</ListItem>
									</Link>
									<Link to={topic.purchasing.receive.route} onClick={closeDrawer}
									className={isReceivingAccess?"":"hidden"}
									>
										<ListItem  className="px-0">
											<ListItemPrefix>
												<CubeIcon strokeWidth={3} className="h-4 w-5" />
											</ListItemPrefix>
											{dictionary.purchasing.receive.sidebar[lang]}
										</ListItem>
									</Link>
								</List>
							</AccordionBody>
						</Accordion>

						<Accordion
							open={openParentMenu === topic.setting.id}
							icon={
								<ChevronDownIcon
									strokeWidth={2.5}
									className={`mx-auto h-4 w-4 transition-transform ${
										openParentMenu === topic.purchasing.id ? "rotate-180" : ""
									}`}
								/>
							}
						>
							<ListItem className="p-0" selected={openParentMenu === topic.setting.id}>
								<AccordionHeader onClick={() => handleOpen(topic.setting.id)} className="border-b-0 p-3 px-0">
									<ListItemPrefix>
										<Cog6ToothIcon className="h-5 w-5" />
									</ListItemPrefix>
									<Typography color="blue-gray" className="mr-auto font-normal">
										{dictionary.setting.sidebar[lang]}
									</Typography>
								</AccordionHeader>
							</ListItem>
							<AccordionBody className="py-1 pl-4">
								<List className="p-0">
									<Link to={topic.setting.general_setting.route} onClick={closeDrawer}
										className={isAdmin?"":"hidden"}
									>
										<ListItem className="px-0">
											<ListItemPrefix>
												<WrenchScrewdriverIcon strokeWidth={3} className="h-4 w-5" />
											</ListItemPrefix>
											{dictionary.setting.general_setting.sidebar[lang]}
										</ListItem>
									</Link>
									{/* <ListItem  className="px-0">
										<ListItemPrefix>
											<UsersIcon strokeWidth={3} className="h-4 w-5" />
										</ListItemPrefix>
										{dictionary.setting.employee.sidebar[lang]}
									</ListItem> */}
									{/* <ListItem  className="px-0">
										<ListItemPrefix>
											<ClockIcon strokeWidth={3} className="h-4 w-5" />
										</ListItemPrefix>
										{dictionary.setting.shift.sidebar[lang]}
									</ListItem> */}
									<Link to={topic.setting.tax.route} onClick={closeDrawer}  
										className={isMasterPajakAccess?"":"hidden"}
									>
										<ListItem className="px-0">
											<ListItemPrefix>
												<ReceiptPercentIcon strokeWidth={3} className="h-4 w-5" />
											</ListItemPrefix>
											{dictionary.setting.tax.sidebar[lang]}
										</ListItem>
									</Link>
									<Link to={topic.setting.discount.route} onClick={closeDrawer} 
										className={isMasterDiskonAccess?"":"hidden"}
									>
										<ListItem className="px-0">
											<ListItemPrefix>
												<CreditCardIcon strokeWidth={3} className="h-4 w-5" />
											</ListItemPrefix>
											{dictionary.setting.discount.sidebar[lang]}
										</ListItem>
									</Link>
									<Link to={topic.setting.user.route} onClick={closeDrawer}
										className={isAdmin?"":"hidden"}
									>
										<ListItem className="px-0">
											<ListItemPrefix>
												<UserIcon strokeWidth={3} className="h-4 w-5" />
											</ListItemPrefix>
											{dictionary.setting.user_management.sidebar[lang]}
										</ListItem>
									</Link>
									<Link to={topic.setting.qris.route} onClick={closeDrawer}>
										<ListItem className="px-0">
											<ListItemPrefix>
												<QrCodeIcon strokeWidth={3} className="h-4 w-5" />
											</ListItemPrefix>
											{dictionary.setting.qris.sidebar[lang]}
										</ListItem>
									</Link>
									{/* <ListItem  className="px-0">
										<ListItemPrefix>
											<PrinterIcon strokeWidth={3} className="h-4 w-5" />
										</ListItemPrefix>
										{dictionary.setting.printer.sidebar[lang]}
									</ListItem> */}
									{/* <ListItem  className="px-0">
										<ListItemPrefix>
											<CircleStackIcon strokeWidth={3} className="h-4 w-5" />
										</ListItemPrefix>
										{dictionary.setting.backup.sidebar[lang]}
									</ListItem> */}
								</List>
							</AccordionBody>
						</Accordion>
						<Link to={topic.report.route} onClick={closeDrawer}>
							<ListItem className="px-0">
								<ListItemPrefix>
									<NewspaperIcon className="h-5 w-5" />
								</ListItemPrefix>
								{dictionary.report.sidebar[lang]}
							</ListItem>
						</Link>
						<Link to={topic.login.route} onClick={clearCookies}>
							<ListItem className="px-0">
								<ListItemPrefix>
									<PowerIcon className="h-5 w-5" />
								</ListItemPrefix>
								Log Out
							</ListItem>
						</Link>
					</List>
				</Card>
			</Drawer>
		</div>
	);
}
