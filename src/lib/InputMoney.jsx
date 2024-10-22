import { Input } from "@material-tailwind/react";
import { formatBackToNumber, formatThousandSeparator } from "../util/formatter";
import { Fragment } from "react";

export default function InputMoney(
    props={value:"", label:"", variant:"static", align:"text-right", name:"", onChange:()=>{}, currency:"", error:"", disabled:false, icon:"", max:0 }
){
    const handleChange = (e) => {
        if(props.max==0)
        e.target.value = formatBackToNumber(e.target.value);
        else
        e.target.value = e.target.value>props.max?props.max:formatBackToNumber(e.target.value);
        props.onChange(e);
    }
    const value = formatThousandSeparator(parseFloat(props.value));
    return(
        <Fragment>
            <div className="relative">
                <Input color={props.error?"red":"teal"} 
                    variant={props.variant}
                    value={value?value:0}
                    label={props.label}
                    name={props.name} 
                    onChange={handleChange}
                    className={props.align}
                    disabled={props.disabled}
                    icon={props.icon} 
                />
                {/* <span className="absolute bottom-1 left-2">
                    {props.currency}
                </span> */}
            </div>
            {
                !props.error? null:
                <div className="text-xs text-red-600 text-right">{props.error}</div>   
            }
        </Fragment>
        
    )
}