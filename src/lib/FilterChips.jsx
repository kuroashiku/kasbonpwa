import { cloneDeep } from "lodash";
import { FilterModel } from "../model/filter";
import { Chip, Typography } from "@material-tailwind/react";
import { format } from "date-fns";
import { useContext } from "react";

export default function FilterChips({
    filters=FilterModel(), 
    onSetFilters=(filter)=>{}
}){ 
    const onRemove=(index)=>{
        const newFilters = cloneDeep(filters);
        newFilters.splice(index, 1);
        onSetFilters(newFilters);
    }
    return(
        <div className="flex items-center flex-wrap gap-2">
            {
                filters.map((f, index) => {
                    if(!f.key){
                        return <div/>
                    }
                    let chipText = "";
                    if(f.key === "date"){
                        if(f.value){
                            chipText = `${f.key}: ${format(f.value, "dd MMM yyyy")}`;
                        }else if(f.valueMin && f.valueMax){
                            chipText = `${f.key}: ${format(f.valueMin, "dd MMM yyyy")} - ${format(f.valueMax, "dd MMM yyyy")}`;
                        }else if(f.valueMin && !(f.valueMax)){
                            chipText = `${f.key}: ${format(f.valueMin, "dd MMM yyyy")}`;
                        }
                    }
                    else if(f.key === "search"){
                        if(f.value){
                            chipText = `Ditemukan ${f.value} item`;
                        }
                        else{
                            chipText = `Tidak ditemukan item`;
                        }
                    }else{
                        if(f.value){
                            chipText = `${f.key}: ${f.value}`;
                        }else if(f.valueMax || f.valueMin){
                            chipText = `${f.key}: ${f.valueMin} - ${f.valueMax}`;
                        }else{
                            chipText = f.key;
                        }
                    }
                    if(f.key === "search")
                    {
                        return(
                            <div key={`fchips-${index}`}>
                                <Chip
                                    className="bg-gray-100"
                                    open={true}
                                    animate={{
                                        mount: { y: 0 },
                                        unmount: { y: -50 },
                                    }}
                                    value={
                                        <Typography variant="small" color={!f.value?"red":"teal"} className="capitalize">
                                            {chipText}
                                        </Typography>
                                    }
                                />
                            </div>
                        )
                    }
                    else{
                        return(
                            <div key={`fchips-${index}`}>
                                <Chip
                                    color={"teal"}
                                    open={true}
                                    animate={{
                                        mount: { y: 0 },
                                        unmount: { y: -50 },
                                    }}
                                    value={
                                        <Typography variant="small" className="capitalize">
                                            {chipText}
                                        </Typography>
                                    }
                                    onClose={() => onRemove(index)}
                                />
                            </div>
                        )
                    }
                })
            }
        </div>
    )
}