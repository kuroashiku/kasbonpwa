import {useInView} from "react-intersection-observer";

export default function InfiniteScrollVirtualItem({children, heightClass="h-[70px]"}) {
    const [ref, inView] = useInView();
    return (
        <div ref={ref} className={heightClass}>
            {inView ? children : null}
        </div>
    );
}