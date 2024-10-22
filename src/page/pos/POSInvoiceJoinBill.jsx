import { InvoicePOS } from "../../model/invoice";
import { formatThousandSeparator } from "../../util/formatter";

export default function POSInvoiceJoinBill({ data }) {
  const HeaderArea = () => {
    return (
      <div className="title-area text-center border-b-2 border-dotted border-gray-800 pb-2 mb-3">
        <p className="nama text-[13px] font-semibold">{data.lokasi}</p>
        <p className="alamat text-[11px] text-gray-700">{data.alamatLokasi}</p>
      </div>
    );
  };

  const FooterArea = () => {
    return (
      <div className="text-center mt-4 leading-4">
        <div className="text-[12px]">{data.footer1}</div>
        <div className="text-[9px] text-gray-700">*{data.footer2}</div>
      </div>
    );
  };
console.log(data)
  return (
    <div className="my-4 p-3 text-black lg:w-[219px] max-w-[219px] pb-5 mx-auto border border-gray-800">
      <HeaderArea />
      
      {data.itemBillCheckout.map((iii, indexii) => {
        let _totalPrice = 0;
        iii.notaitems.forEach((item) => {
          _totalPrice += parseFloat(item.nit_total);
        });
        const subTotal = _totalPrice;
        return(
          <div className="struk-content my-6 text-xs">
            
              <div className="text-xs border-b-2 border-gray-800 my-2">
                {iii.notaitems.map((i, index) => (
                  <div key={index} className="mb-2">
                    <div>
                      <p>
                        {i.itm_nama} (per {i.nit_satuan0})
                      </p>
                    </div>
                    <div className="flex">
                      <p className="w-10">{parseFloat(i.nit_qty)} x</p>
                      <p className="w-14">
                        {formatThousandSeparator(parseFloat(i.nit_satuan0hrg))}
                      </p>
                      <p className="flex-grow text-right">
                        {formatThousandSeparator(parseFloat(i.nit_qty) * parseFloat(i.nit_satuan0hrg))}
                      </p>
                    </div>
                    {parseFloat(i.nit_diskon)==0 ? null : (
                      <p className="text-right">{` (Disc ${Number(i.nit_diskon)}% : ${formatThousandSeparator(
                        parseFloat(i.nit_qty) * (parseFloat(i.nit_satuan0hrg) * (1 - parseInt(i.nit_diskon) / 100))
                      )}) `}</p>
                    )}
                  </div>
                ))}
              </div>
            
            {!parseFloat(iii.not_diskon)==0||!parseFloat(iii.not_pajak)==0?(
              <div className="flex justify-between">
              <p>Sub Total</p>
              <p>{formatThousandSeparator(subTotal)}</p>
              </div>
            ):null}
            {data.totalTemp ? null : (
              <div className="flex justify-between">
                <p>Total After Join</p>
                <p>{formatThousandSeparator(data.totalTemp)}</p>
              </div>
            )}
            {parseFloat(iii.not_diskon)==0 ? null : (
              <div className="flex-grow text-right">
                <p className="text-right">{` (Disc ${Number(iii.not_diskon)}% : ${formatThousandSeparator(
                    (parseFloat(subTotal) * (1 - parseInt(iii.not_diskon) / 100))
                  )}) `}</p>
              </div>
            )}
            {parseFloat(iii.not_pajak)==0 ? null : (
              <div className="flex justify-between">
                <p>{`Pajak ${formatThousandSeparator(iii.not_pajak)}%`}</p>
                <p>{`${formatThousandSeparator(
                    (parseFloat(subTotal) * (1 - parseInt(iii.not_diskon) / 100) * (parseInt(iii.not_pajak) / 100))
                  )}`}</p>
              </div>
            )}
            <div className="flex justify-between">
              <p>Total</p>
              <p>{formatThousandSeparator(parseFloat(iii.not_total))}</p>
            </div>
            <div className="flex justify-between">
              <p>Bayar</p>
              <p>{formatThousandSeparator(parseFloat(iii.not_dibayar))}</p>
            </div>
            <div className="flex justify-between">
              <p>{iii.not_dicicil=="0" ? "Kembali" : "Kurang"}</p>
              <p>{iii.not_kembalian ? formatThousandSeparator(parseFloat(iii.not_kembalian)) : 0}</p>
            </div>
          </div>
            
        )})
      }


      <FooterArea />
    </div>
  );
}
