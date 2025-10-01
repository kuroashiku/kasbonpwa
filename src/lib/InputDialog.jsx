import { Button, Input, Dialog, DialogHeader, DialogBody, DialogFooter } from "@material-tailwind/react";
import { formatBackToNumber, formatThousandSeparator } from "../util/formatter";
import { Fragment, useContext } from "react";
import { dictionary } from "../constant/appDictionary";
import { AppContext } from "../AppContext";
export default function InputDialog(
  props = {
    open: false,
    hargaMode: false,
    handleInput: () => {},
    handleClose: () => {},
    handleAccept: () => {},
    handleChange: () => {},
    qty: 0,
  }
) {
  const { lang } = useContext(AppContext);
  // const handleChange = (e) => {
  //     if(props.max==0)
  //     e.target.value = formatBackToNumber(e.target.value);
  //     else
  //     e.target.value = e.target.value>props.max?props.max:formatBackToNumber(e.target.value);
  //     props.onChange(e);
  // }
  return (
    <Dialog open={props.open} handler={props.handleInput}>
      <DialogHeader>{dictionary.dialogheader.adjusttheamount[lang]}</DialogHeader>
      <DialogBody>
        <div className="mb-4">
          <Input
            aria-hidden="false"
            type="number"
            label={dictionary.cashier.pos.inputQty[lang]}
            value={props.qty}
            onChange={props.handleChange}
          ></Input>
        </div>
        {
          props.hargaMode?
          <div className="mb-4">
            <Input
              aria-hidden="false"
              type="number"
              label={dictionary.dialog.item.cost[lang]}
              value={props.satuan1hrg}
              onChange={props.handleChange}
            ></Input>
          </div>:null
        }
      </DialogBody>
      <DialogFooter>
        <div className="flex w-full gap-2">
          <Button className="w-full" variant="gradient" color="blue-gray" onClick={props.handleClose}>
            {dictionary.universal.cancel[lang]}
          </Button>
          <Button className="w-full" variant="gradient" color="green" onClick={props.handleAccept}>
            {dictionary.universal.apply[lang]}
          </Button>
        </div>
      </DialogFooter>
    </Dialog>
  );
}
