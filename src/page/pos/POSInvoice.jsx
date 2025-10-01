import { InvoicePOS } from "../../model/invoice";
import { formatThousandSeparator } from "../../util/formatter";
import { format, setDefaultOptions } from "date-fns";
import { id } from 'date-fns/locale'

export default function POSInvoice({ data = InvoicePOS() }) {
  setDefaultOptions({ locale: id })
  const HeaderArea = () => {
    return (
      <div className="title-area text-center border-b-2 border-dotted border-gray-800 pb-2 mb-3">
        <p className="nama text-[13px] font-semibold">{data.lokasi}</p>
        <p className="alamat text-[11px] text-gray-700">{data.alamatLokasi}</p>
        <p className="tanggal text-[11px] text-gray-700">{format(new Date(), "dd MMMM yyyy hh:mm")}</p>
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
      {console.log(data)}

      <div className="struk-content my-6 text-xs">
        {!data.isLaundry ? (
          <div className="text-xs border-b-2 border-gray-800 my-2">
            {data.itemCheckout.map((i, index) => (
              <div key={index} className="mb-2">
                <div>
                  <p>
                    {i.itm_nama} (per {i.satuan0})
                  </p>
                </div>
                <div className="flex">
                  <p className="w-10">{i.qty} x</p>
                  <p className="w-14">
                    {formatThousandSeparator(i.satuan0hrg)}
                  </p>
                  <p className="flex-grow text-right">
                    {formatThousandSeparator(i.qty * i.satuan0hrg)}
                  </p>
                </div>
                {!i.diskon || parseInt(i.diskon) <= 0 ? null : (
                  <p className="text-right">{` (Disc ${Number(i.diskon)}% : ${formatThousandSeparator(
                    i.qty * (i.satuan0hrg * (1 - parseInt(i.diskon) / 100))
                  )}) `}</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-xs border-b-2 border-gray-800 my-2">
            {data.itemCheckout.map((i, index) =>
              i.service_level_satuan0.map((ii, indexi) => (
                <div key={index + indexi} className="mb-2">
                  <div>
                    <p>
                      {i.itm_nama} {ii.service_nama ? ii.service_nama : ""} / {i.satuan0}
                    </p>
                  </div>
                  <div className="flex">
                    <p className="w-10">{parseFloat(ii.service_qty)} x</p>
                    <p className="w-14">
                      {!i.diskon || parseInt(i.diskon) <= 0
                        ? formatThousandSeparator(parseFloat(ii.service_hrg))
                        : formatThousandSeparator(parseFloat(ii.service_hrg) * (1 - parseInt(i.diskon) / 100))}
                    </p>
                    <p className="flex-grow text-right">
                      {!i.diskon || parseInt(i.diskon) <= 0
                        ? formatThousandSeparator(parseFloat(ii.service_qty) * parseFloat(ii.service_hrg))
                        : formatThousandSeparator(
                            parseFloat(ii.service_qty) * (parseFloat(ii.service_hrg) * (1 - parseInt(i.diskon) / 100))
                          )}
                    </p>
                  </div>
                  {!i.diskon || parseInt(i.diskon) <= 0 ? null : (
                    <p className="text-right">{` (Disc ${Number(i.diskon)}% : ${formatThousandSeparator(
                      parseFloat(ii.service_qty) * parseFloat(ii.service_hrg)
                    )}) `}</p>
                  )}
                </div>
              ))
            )}
          </div>
        )}
        {data.discount||data.tax?(
          <div className="flex justify-between">
          <p>Sub Total</p>
          <p>{formatThousandSeparator(data.subtotalPay)}</p>
          </div>
        ):null}
        {!data.totalTemp ? null : (
           <div className="flex justify-between">
            <p>Total After Join</p>
            <p>{formatThousandSeparator(data.totalTemp)}</p>
          </div>
        )}
        {!data.discount ? null : (
          <div className="flex-grow text-right">
            <p className="text-right">{` (Disc ${Number(data.discount)}% : ${formatThousandSeparator(
                (parseFloat(data.subtotalPay) * (1 - parseInt(data.discount) / 100))
              )}) `}</p>
          </div>
        )}
        {!data.tax ? null : (
          <div className="flex justify-between">
            <p>{`Pajak ${formatThousandSeparator(data.tax)}%`}</p>
            <p>{`${formatThousandSeparator(
                (parseFloat(data.subtotalPay) * (1 - parseInt(data.discount) / 100) * (parseInt(data.tax) / 100))
              )}`}</p>
          </div>
        )}
        <div className="flex justify-between">
          <p>Total</p>
          <p>{formatThousandSeparator(data.totalPay)}</p>
        </div>
        <div className="flex justify-between">
          <p>Bayar</p>
          <p>{formatThousandSeparator(data.money)}</p>
        </div>
        <div className="flex justify-between">
          <p>{!data.isPiutang ? "Kembali" : "Kurang"}</p>
          <p>{data.cashback ? formatThousandSeparator(data.cashback) : 0}</p>
        </div>
      </div>

      <FooterArea />
    </div>
  );
}
