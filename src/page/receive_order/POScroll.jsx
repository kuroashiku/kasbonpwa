import { ListItem } from "@material-tailwind/react";
import InfiniteScroll from "../../lib/InfiniteScroll";

export default function POScroll({ po = [{}], setPO = () => {}, onLoad = () => {}, infinite = false }) {
  const listItems = po.map((i, index) => {
    return (
      <ListItem key={index} className=" pb-2">
        <div className="w-full" onClick={() => setPO(i, index)}>
          <div className="flex flex-col justify-between text-[15px]">
            <div className="font-semibold">{i.nomor}</div>
            <div>{i.sup_nama}</div>
          </div>
        </div>
      </ListItem>
    );
  });

  if (infinite) {
    return <InfiniteScroll listItems={listItems} lastRowHandler={onLoad} heightClass="h-[50px]" />;
  }

  return listItems;
}
