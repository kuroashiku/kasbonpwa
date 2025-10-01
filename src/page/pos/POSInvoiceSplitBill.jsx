import { InvoicePOS } from "../../model/invoice";
import { formatThousandSeparator } from "../../util/formatter";
import { format, setDefaultOptions } from "date-fns";
import { id } from 'date-fns/locale'

export default function POSInvoiceSplitBill({ atribut, data, total, subtotal, money }) {
	setDefaultOptions({ locale: id })
	const HeaderArea = () => {
		return (
			<div className="title-area text-center border-b-2 border-dotted border-gray-800 pb-2 mb-3">
				<p className="nama text-[13px] font-semibold">{atribut.lokasi}</p>
				<p className="alamat text-[11px] text-gray-700">{atribut.alamatLokasi}</p>
				<p className="tanggal text-[11px] text-gray-700">{format(new Date(), "dd MMMM yyyy hh:mm")}</p>
			</div>
		);
	};

	const FooterArea = () => {
		return (
			<div className="text-center mt-4 leading-4">
				<div className="text-[12px]">{atribut.footer1}</div>
				<div className="text-[9px] text-gray-700">*{atribut.footer2}</div>
			</div>
		);
	};
	console.log((money-total))
	return (
		<div className="mt-5 p-3 text-black lg:w-[219px] max-w-[219px] pb-5 mx-auto border border-gray-800">
			<HeaderArea />
				<div className="struk-content my-6 text-xs">
					
					<div className="text-xs border-b-2 border-gray-800 my-2">
						{data.map((i, index) => (
							<div key={index} className="mb-2">
								<div>
									<p>
										{i.itm_nama} (per {i.satuan0})
									</p>
								</div>
								<div className="flex">
									<p className="w-10">{i.qty} x</p>
									<p className="w-14">{!i.diskon || parseInt(i.diskon)<=0 ?formatThousandSeparator(i.satuan0hrg):formatThousandSeparator(i.satuan0hrg / (1 - parseInt(i.diskon) / 100))}</p>
									<p className="flex-grow text-right">{!i.diskon || parseInt(i.diskon)<=0 ?formatThousandSeparator(i.qty * i.satuan0hrg):formatThousandSeparator(i.qty * (i.satuan0hrg / (1 - parseInt(i.diskon) / 100)))}</p>
								</div>
								{!i.diskon || parseInt(i.diskon)<=0 ? null : (
									<p className="text-right">{` (Disc ${Number(i.diskon)}% : ${formatThousandSeparator(
										i.qty * i.satuan0hrg
									)}) `}</p>
								)}
							</div>
						))}
					</div>

					{atribut.discount||data.tax?(
						<div className="flex justify-between">
						<p>Sub Total</p>
						<p>{formatThousandSeparator(subtotal)}</p>
						</div>
					):null}
					{!atribut.discount ? null : (
					<div className="flex-grow text-right">
						<p className="text-right">{` (Disc ${Number(atribut.discount)}% : ${formatThousandSeparator(
							(parseFloat(subtotal) * (1 - parseInt(atribut.discount) / 100))
						)}) `}</p>
					</div>
					)}
					{!atribut.tax ? null : (
					<div className="flex justify-between">
						<p>{`Pajak ${formatThousandSeparator(atribut.tax)}%`}</p>
						<p>{`${formatThousandSeparator(
							(parseFloat(subtotal) * (1 - parseInt(atribut.discount) / 100) * (parseInt(atribut.tax) / 100))
						)}`}</p>
					</div>
					)}
					<div className="flex justify-between">
					<p>Total</p>
						<p>{formatThousandSeparator(total)}</p>
					</div>
					<div className="flex justify-between">
					<p>Bayar</p>
						<p>{formatThousandSeparator(money)}</p>
					</div>
					<div className="flex justify-between">
						<p>{(money-total)>=0 ? "Kembali" : "Kurang"}</p>
						<p>{!(money-total)==0 ? formatThousandSeparator((money-total) < 0 ? (money-total) * -1 : (money-total)) : 0}</p>
					</div>
				</div>
			

			<FooterArea />
		</div>
	);
}
