import { IconButton, ListItem } from "@material-tailwind/react";
import { RcvListModel } from "../../model/inventory";
import { formatThousandSeparator } from "../../util/formatter";
import InfiniteScroll from "../../lib/InfiniteScroll";
import { Fragment, useContext } from "react";
import { AppContext } from "../../AppContext";
import { InformationCircleIcon, WalletIcon } from "@heroicons/react/16/solid";

export default function ReceivingScroll({
	rcv = [RcvListModel()],
	onOpen = () => {},
	onLoad = () => {},
	onPay = () => {},
	infinite = false,
}) {
	const { currency } = useContext(AppContext);
	const listItems = rcv.map((i, index) => {
		return (
			<ListItem key={index} ripple={false} className="flex flex-col gap-1 px-0 relative">
				<div className="w-[90%] flex flex-col gap-1 pr-2">
					<div className="w-[90%] whitespace-nowrap overflow-hidden text-ellipsis font-semibold">{i.rcv_nomor}</div>
					<div
						className={`w-max whitespace-nowrap overflow-hidden text-ellipsis py-[2px] px-2 text-[12px] font-semibold rounded-md ${
							i.rcv_status == "PAID" ? "bg-green-100" : "bg-orange-100"
						}`}
					>
						{i.rcv_status == "PAID" ? "Sudah Lunas" : "Belum Lunas"}
					</div>

					<div className="flex items-center gap-2 text-sm">
						<div className="w-max py-[2px] px-2 font-semibold bg-blue-100 rounded-md">
							{i.rcv_total > 0 ? (
								<span>
									{currency} {formatThousandSeparator(parseFloat(i.rcv_total))}
								</span>
							) : (
								<span>{currency} -</span>
							)}
						</div>
					</div>
				</div>

				<div className="action-area flex items-center absolute top-1 right-0">
					<IconButton variant="text" color="blue-gray" onClick={() => onOpen(i)}>
						<InformationCircleIcon className="h-7 w-7 text-light-blue-500" />
					</IconButton>
					<IconButton
						disabled={i.rcv_tglunas ? true : false}
						variant="text"
						color="blue-gray"
						onClick={() => onPay(i, index)}
					>
						<WalletIcon className="h-6 w-6 text-green-500" />
					</IconButton>

					{/* <IconButton variant="text" color="blue-gray" onClick={() => onPrint(i, index)}>
						<PrinterIcon className="h-6 w-6 text-purple-500" />
					</IconButton> */}
				</div>
			</ListItem>
		);
	});

	if (infinite) {
		return <InfiniteScroll listItems={listItems} lastRowHandler={onLoad} heightClass="h-[100px]" />;
	}

	return <Fragment>{listItems}</Fragment>;
}
