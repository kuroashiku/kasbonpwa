import { InvoicePOS } from "../../model/invoice";
import { formatThousandSeparator } from "../../util/formatter";
import { format, setDefaultOptions } from "date-fns";
import { id } from 'date-fns/locale'

export default function POSInvoicetabel({ data = InvoicePOS() }) {
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

  const columns = [
    { key: "service_qty", title: "Byk" },
    { 
      key: "service_item", 
      title: "Item", 
      render: (row) => (row.itm_nama +" / "+ row.satuan0) 
    },
    { key: "service_nama", title: "Treatment" },
    { key: "service_hrg", title: "Harga" },
    { key: "service_total", title: "Total" },
  ];

  return (
    <div className="my-4 p-3 text-black lg:w-[500px] max-w-[500px] pb-5 mx-auto border border-gray-800 text-sm">
      <HeaderArea />

      <div className="struk-content my-6 text-xs">
        <table className="table-auto border-collapse border border-gray-400 w-full text-left">
          <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-400 px-4 py-2">Byk</th>
            <th className="border border-gray-400 px-4 py-2">Item</th>
            <th className="border border-gray-400 px-4 py-2">Treatment</th>
            <th className="border border-gray-400 px-4 py-2">Harga</th>
            <th className="border border-gray-400 px-4 py-2">Jumlah</th>
            {/* <th className="border border-gray-400 px-4 py-2">Usia</th>
            <th className="border border-gray-400 px-4 py-2">Kota</th> */}
          </tr>
        </thead>
        <tbody>
          {data.itemCheckout.map((ii, index2) => (
            ii.service_level_satuan0.map((row, i) => (
            <tr key={row.service_id} className={i % 2 === 0 ? "bg-gray-50" : ""}>
              {columns.map((col) => (
                <td key={col.key} className="border border-gray-400 px-3 py-2">
                  {col.render ? col.render(ii) : (parseInt(row[col.key])>0?formatThousandSeparator(row[col.key]):row[col.key])}
                </td>
              ))}
            </tr>
            ))

          ))}
          {/* {data.itemCheckout.map((i, index) =>
          <tr className="bg-gray-100">
              {i.service_level_satuan0.map((ii, indexi) => (
                <td className="border border-gray-400 px-4 py-2">{i.itm_nama} / {i.satuan0}</td>
              ))}
              {i.service_level_satuan0.map((ii, indexi) => (
                <td className="border border-gray-400 px-4 py-2">{ii.service_nama ? ii.service_nama : ""}</td>
              ))}
              {i.service_level_satuan0.map((ii, indexi) => (
                <td className="border border-gray-400 px-4 py-2">{ii.service_hrg ? formatThousandSeparator(ii.service_hrg) : 0}</td>
              ))}
              {i.service_level_satuan0.map((ii, indexi) => (
                <td className="border border-gray-400 px-4 py-2">{ii.service_hrg ? formatThousandSeparator(parseFloat(ii.service_hrg)*parseFloat(ii.service_qty)) : 0}</td>
              ))}
          </tr>
            )} */}
            <tr className="bg-gray-100"><td rowspan="3" className="border border-gray-400 px-4 py-2 text-center font-semibold">Catatan</td><td colspan="2" rowspan="3" className="p-2 text-justify bg-gray-50">{data.note}</td><td className="border border-gray-400 px-2 py-2 text-right font-semibold">Total</td><td className="border border-gray-400 px-4 py-2 bg-gray-50">{data.discount?<p className="w-full text-center" style={{fontSize:10}}>Diskon {data.discount}%</p>:null} {formatThousandSeparator(data.totalPay)}</td></tr>
            <tr className="bg-gray-100"><td className="border border-gray-400 px-2 py-2 text-right font-semibold">{data.isPiutang?"Uang Muka":"Dibayar"}</td><td className="border border-gray-400 px-4 py-2 bg-gray-50">{formatThousandSeparator(data.money)==""?0:formatThousandSeparator(data.money)}</td></tr>
            <tr className="bg-gray-100"><td className="border border-gray-400 px-2 py-2 text-right font-semibold">{data.isPiutang?"Sisa":"Kembalian"}</td><td className="border border-gray-400 px-4 py-2 bg-gray-50">{data.isPiutang ? formatThousandSeparator((parseFloat(data.totalPay)-parseFloat(data.money?data.money:0))) : formatThousandSeparator(data.cashback)==""?0:formatThousandSeparator(data.cashback)}</td></tr>
        </tbody>
        </table>
        {/* {data.discount||data.tax?(
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
        )} */}
      </div>

      <FooterArea />
    </div>
  );
}
