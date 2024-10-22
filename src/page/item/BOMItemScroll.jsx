import { Button, IconButton, ListItem, ListItemSuffix, Popover, PopoverHandler, PopoverContent, Typography,
} from "@material-tailwind/react";
import { ItemListModel } from "../../model/item";
import { formatThousandSeparator, formatSentenceCase } from "../../util/formatter";
import InfiniteScroll from "../../lib/InfiniteScroll";
import { Fragment, useContext } from "react";
import { AppContext } from "../../AppContext";
import { BanknotesIcon, InformationCircleIcon, TrashIcon, PrinterIcon, HandThumbUpIcon } from "@heroicons/react/16/solid";
export default function BOMItemScroll({
	item = [ItemListModel()],
	setItem = () => {},
	onLoad = () => {},
	// onPrint = () => {},
	infinite = false,
}) {
	const { currency } = useContext(AppContext);

	const listItems = item.map((i, index) => {
		return (
			<ListItem key={index} className="">
			<div className="w-full pr-2" onClick={() => setItem(i, index)}>
				<div></div>
				<div className="flex items-center justify-between">
				<Typography variant="small" color="gray" className="font-normal">
					<b>{formatSentenceCase(i.itm_nama)}</b> {i.satuan0?"/":""} {i.satuan0?i.satuan0:""}
				</Typography>
				<Typography color="gray" className="font-normal">
					{i.total}
				</Typography>
				</div>
			</div>
			</ListItem>
		);
		})

	if (infinite) {
		return <InfiniteScroll listItems={listItems} lastRowHandler={onLoad} heightClass="h-[50px]" />;
	}

	return <Fragment>{listItems}</Fragment>;
}
