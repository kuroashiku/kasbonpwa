import { IconButton, ListItem } from "@material-tailwind/react";
import { POListModel } from "../../model/inventory";
import { formatThousandSeparator } from "../../util/formatter";
import InfiniteScroll from "../../lib/InfiniteScroll";
import { Fragment, useContext } from "react";
import { AppContext } from "../../AppContext";
import { InformationCircleIcon, TrashIcon, HandThumbUpIcon } from "@heroicons/react/16/solid";

export default function POScroll({
	po = [POListModel()],
	onOpen = () => {},
	onRemove = () => {},
	onLoad = () => {},
	onApprove = () => {},
	// onPrint = () => {},
	infinite = false,
}) {
	const { currency } = useContext(AppContext);
	const listItems = po.map((i, index) => {
		return (
			<ListItem key={index} ripple={false} className="flex flex-col gap-1 px-0 relative">
				<div className="w-[90%] flex flex-col gap-1 pr-2">
					<div className="w-[90%] whitespace-nowrap overflow-hidden text-ellipsis font-semibold">{i.po_nomor}</div>
					<div
						className={`w-max whitespace-nowrap overflow-hidden text-ellipsis py-[2px] px-2 text-[12px] font-semibold rounded-md ${
							i.po_tgapprove ? "bg-green-100" : "bg-orange-100"
						}`}
					>
						{i.po_tgapprove ? "Sudah Di Approve" : "Belum Di Approve"}
					</div>

					<div className="flex items-center gap-2 text-[12px]">
						<div className="w-max py-[2px] px-2 font-semibold bg-blue-100 rounded-md">
							{i.po_total > 0 ? (
								<span>
									{currency} {formatThousandSeparator(parseFloat(i.po_total))}
								</span>
							) : (
								<span>{currency} -</span>
							)}
						</div>

						{i.not_dicicil == 1 && i.piutlunas == 0 ? (
							<span className="w-max py-[2px] px-2 font-semibold bg-orange-100 rounded-md">Belum Lunas</span>
						) : i.not_dicicil == 1 && i.piutlunas == 1 ? (
							<span className="w-max py-[2px] px-2 font-semibold bg-lime-200 rounded-md">Lunas</span>
						) : (
							""
						)}
					</div>
				</div>

				<div className="action-area flex items-center absolute top-1 right-0">
					<IconButton variant="text" color="blue-gray" onClick={() => onOpen(i)}>
						<InformationCircleIcon className="h-7 w-7 text-light-blue-500" />
					</IconButton>
					<IconButton
						disabled={i.po_tgapprove ? true : false}
						variant="text"
						color="blue-gray"
						onClick={() => onApprove(i, index)}
					>
						<HandThumbUpIcon className="h-6 w-6 text-green-500" />
					</IconButton>

					{/* <IconButton variant="text" color="blue-gray" onClick={() => onPrint(i, index)}>
						<PrinterIcon className="h-6 w-6 text-purple-500" />
					</IconButton> */}

					<IconButton
						disabled={i.po_tgapprove ? true : false}
						variant="text"
						color="blue-gray"
						onClick={() => onRemove(i)}
					>
						<TrashIcon className="h-6 w-6 text-red-500" />
					</IconButton>
				</div>
			</ListItem>
		);
	});

	if (infinite) {
		return <InfiniteScroll listItems={listItems} lastRowHandler={onLoad} heightClass="h-[100px]" />;
	}

	return <Fragment>{listItems}</Fragment>;
}
