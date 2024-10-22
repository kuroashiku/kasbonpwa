import { IconButton, Input } from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
export default function SearchNavbar({
    label,
    onSearch,
    value,
    onKeyDown,
    scanflag=0
}){
    return(
        <div className="relative flex w-full"> 
            <Input color="teal" label={label} 
                className="pr-20"
                value={value}
                onChange={(e)=>onSearch(e.target.value)}
                onKeyDown={(e)=>scanflag==0?null:onKeyDown(e)}
                containerProps={{
                className: "min-w-0",
                }}
            />
            <IconButton className="!absolute right-1 top-1 !rounded shadow-none" size="sm" type="button" color="white" onClick={()=>onSearch(value)}>
                <MagnifyingGlassIcon className="h-6 w-6" />
            </IconButton>
        </div>
    )
}