import InfiniteScrollContainer from "./InfiniteScrollContainer";
import InfiniteScrollVirtualItem from "./InfiniteScrollVirtualItem";

export default function InfiniteScroll({ listItems = [], lastRowHandler = () => {}, heightClass = "h-[70px]" }) {
  const InfiniteScrollItems = listItems.map((listItem) => (
    <InfiniteScrollVirtualItem children={listItem} heightClass={heightClass} />
  ));

  return <InfiniteScrollContainer listItems={InfiniteScrollItems} lastRowHandler={lastRowHandler} />;
}
