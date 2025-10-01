import { Document, Page, Text, View, pdf, StyleSheet, PDFViewer } from "@react-pdf/renderer";
import { InvoicePOS } from "../../model/invoice";
import { Button, Dialog, DialogBody, DialogFooter } from "@material-tailwind/react";
import { capitalizeWords, formatThousandSeparator } from "../../util/formatter";
import { INVOICE_FILE_NAME } from "../../constant/appCommon";
import { AppContext } from "../../AppContext";
import { dictionary } from "../../constant/appDictionary";
function PDFDoc({ data = InvoicePOS(), onPrint = () => {} }) {
  const { cookies } = useContext(AppContext);

  // Create styles
  const styles = StyleSheet.create({
    page: {
      padding: 10,
      color: "black",
      width: 219,
      maxWidth: 219,
    },
    header: {
      margin: 0,
      textAlign: "center",
      borderBottom: "2px dotted black",
      marginBottom: 12,
      paddingBottom: 8,
    },
    title: {
      marginBottom: 8,
      fontSize: 13,
    },
    subtitle: {
      fontSize: 11,
    },
    checkouts: {
      margin: 0,
      marginTop: 20,
      fontSize: 12,
      borderBottom: "2px",
      width: "100%",
    },
    totals: {
      marginTop: 5,
      fontSize: 12,
      marginBottom: 20,
    },
    flex: {
      display: "flex",
      flexDirection: "row",
    },
    alignRightFlex: {
      textAlign: "right",
      flexGrow: 1,
      width: 50,
    },
    listItem: {
      marginBottom: 9,
    },
    listItemPrice: {
      width: 50,
    },
    listItemDiskon: {
      textAlign: "right",
      flexGrow: 1,
      width: 50,
      fontSize: 9,
    },
    listItemDiskonGlobal: {
      textAlign: "right",
      flexGrow: 1,
      width: 50,
      fontSize: 12,
    },
    listItemSubTotal: {
      textAlign: "right",
      flexGrow: 1,
      width: 50,
    },
    listItemTotal: {
      textAlign: "right",
      flexGrow: 1,
      width: 50,
      fontSize: 14,
      fontWeight: "bold",
    },
    listItemDiskonGlobal: {
      textAlign: "right",
      flexGrow: 1,
      width: 50,
      fontSize: 12,
    },
    listTotalLabel: {
      fontSize: 14,
    },
    listQty: {
      width: 40,
    },
    footer: {
      fontSize: 16,
      paddingTop: 10,
      marginTop: 12,
      borderTop: "2px",
      textAlign: "center",
    },
    footer_1: {
      fontSize: 12,
    },
    footer_2: {
      fontSize: 9,
    },
  });

  return (
    <Document onRender={onPrint}>
      {/*render a single page*/}
      <Page style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>{cookies?.nama_lokasi || "TOKO SEDERHANA 1"}</Text>
          <Text style={styles.title}>{cookies?.alamat_lokasi || ""}</Text>
        </View>

        <View style={styles.checkouts}>
          {data.itemCheckout.map((i, index) => (
            <View key={index} style={styles.listItem}>
              <View>
                <Text>
                  {i.itm_nama} (per {i.satuan0})
                </Text>
              </View>
              <View style={styles.flex}>
                <Text style={styles.listQty}>{i.qty} x</Text>
                <Text style={styles.listItemPrice}>{formatThousandSeparator(i.satuan0hrg)}</Text>
                <Text style={styles.listItemSubTotal}>{formatThousandSeparator(i.qty * i.satuan0hrg)}</Text>
              </View>
              {!i.diskon ? null : (
                <View style={styles.flex}>
                  <Text style={styles.listQty}></Text>
                  <Text style={styles.listItemPrice}></Text>
                  <Text style={styles.listItemDiskon}>{` (Disc ${Number(i.diskon)}% : ${formatThousandSeparator(
                    i.satuan0hrg
                  )}) `}</Text>
                </View>
              )}
            </View>
          ))}
        </View>

        <View style={styles.totals}>
          <View style={styles.flex}>
            <Text style={styles.listTotalLabel}>Total</Text>
            <Text style={styles.listItemTotal}>{formatThousandSeparator(data.totalPay)}</Text>
          </View>
          {!data.discount ? null : (
            <View style={styles.flex}>
              <Text>Diskon</Text>
              <Text style={styles.listItemDiskonGlobal}>{`${formatThousandSeparator(data.discount)} %`}</Text>
            </View>
          )}
          {!data.tax ? null : (
            <View style={styles.flex}>
              <Text>Pajak</Text>
              <Text style={styles.listItemDiskonGlobal}>{`${formatThousandSeparator(data.tax)} %`}</Text>
            </View>
          )}
          <View style={styles.flex}>
            <Text>Bayar</Text>
            <Text style={styles.alignRightFlex}>{formatThousandSeparator(data.money)}</Text>
          </View>
          <View style={styles.flex}>
            <Text>Kembali</Text>
            <Text style={styles.alignRightFlex}>{data.cashback ? formatThousandSeparator(data.cashback) : 0}</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footer_1}>{capitalizeWords(cookies?.footer1) || "Terimakasih atas kunjungannya"}</Text>
          <Text style={styles.footer_2}>*{cookies?.footer2 || ""}</Text>
        </View>
      </Page>
    </Document>
  );
}

export default function POSInvoicePdf({
  data = InvoicePOS(),
  open = false,
  onClose = () => {},
  title = "Invoice",
  onPrint = () => {},
}) {
  const onSave = async () => {
    const blob = await pdf(<PDFDoc data={data} onPrint={onPrint} />).toBlob();
    const a = document.createElement("a");
    a.download = INVOICE_FILE_NAME;
    a.href = URL.createObjectURL(blob);
    a.addEventListener("click", (e) => {
      setTimeout(() => URL.revokeObjectURL(a.href), 30 * 1000);
    });
    a.click();
  };
  return (
    <Dialog open={open} handler={onClose} size="xxl" className="bg-white overflow-hidden">
      <DialogBody className="p-0">
        <PDFViewer
          style={{
            width: window.innerWidth, //the pdf viewer will take up all of the width and height
            height: window.innerHeight - 74,
          }}
        >
          <PDFDoc data={data} onPrint={onPrint} />
        </PDFViewer>
      </DialogBody>
      <DialogFooter>
        <Button variant="outlined" color="teal" onClick={onClose} className="mr-1">
          <span>{dictionary.universal.back[lang]}</span>
        </Button>
        <Button color="teal" onClick={onSave}>
          <span>Download</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
