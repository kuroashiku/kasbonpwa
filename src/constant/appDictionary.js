import { dialog } from "@material-tailwind/react";

export const dictionary = Object.freeze({
    cashier: {
        sidebar: {
            EN: "Cashier",
            ID: "Kasir"
        },
        pos: {
            search: {
                EN: "Search Item",
                ID: "Cari Barang"
            },
            checkout: {
                EN: "Checkout",
                ID: "Checkout"
            },
            itemsSelected: {
                EN: "items selected",
                ID: "item terpilih"
            },
            noItems: {
                EN: "No items found",
                ID: "Barang tidak ditemukan"
            },
            clear: {
                EN: "Clear all items in the cart?",
                ID: "Hapus semua barang di keranjang?"
            },
            clearHeader: {
                EN: "Clear All",
                ID: "Hapus Semua"
            },
            cartOptions: {
                EN: "Cart Options",
                ID: "Keranjang Belanja"
            },
            clearAll: {
                EN: "Clear All",
                ID: "Hapus Semua"
            },
            clearOne: {
                EN: "Clear This Item Only",
                ID: "Hapus Item Ini Saja"
            },
            inputQty: {
                EN: "Quantity",
                ID: "Kuantiti"
            },
            inputDiskon: {
                EN: "Discount",
                ID: "Diskon"
            },
            inputHeader: {
                EN: "Order Detail",
                ID: "Detail Pesanan"
            },
            btnSubmit: {
                EN: "Submit",
                ID: "Jalankan"
            },
            btnCancel: {
                EN: "Cancel",
                ID: "Batal"
            },
            choose:{
                EN: "Choose",
                ID: "Pilih"
            },
            runout:{
                EN: "Run Out",
                ID: "Habis"
            },
            splitbillinfo:{
                EN: "Split Bill Information",
                ID: "Info Split Bill"
            }
        },
        checkout: {
            title: {
                EN: "Shopping Cart",
                ID: "Keranjang Belanja"
            },
            noItems: {
                EN: "No items inside checkout list",
                ID: "Tidak ada item di dalam daftar checkout"
            },
            back: {
                EN: "Back to item list",
                ID: "Kembali ke daftar barang"
            },
            pay: {
                EN: "Pay",
                ID: "Bayar"
            },
            draft: {
                EN: "Draft Order",
                ID: "Jadikan Draft Pesanan"
            },
        },
        calculator: {
            totalPay: {
                EN: "Total",
                ID: "Total"
            },
            money: {
                EN: "Amount",
                ID: "Jumlah Uang"
            },
            moneyBack: {
                EN: "Refund",
                ID: "Kembalian"
            },
            pay: {
                EN: "Pay",
                ID: "Bayar"
            },
            exactMoney: {
                EN: "Exact Money",
                ID: "Uang Pas"
            },
            payWith: {
                EN: "Pay With",
                ID: "Bayar Pakai"
            },
            print: {
                EN: "Print Invoice",
                ID: "Cetak Struk"
            },
            pdf: {
                EN: "Invoice PDF",
                ID: "Struk PDF"
            },
            newTrans: {
                EN: "New Transaction",
                ID: "Transaksi Baru"
            },
            failed: {
                EN: "Payment Failed",
                ID: "Pembayaran Gagal"
            }
        },
    },
    transaction: {
        sidebar: {
            EN: "Transaction",
            ID: "Transaksi"
        },
        search: {
            EN: "Search Transaction No",
            ID: "Cari No Transaksi"
        },
        noItems: {
            EN: "No Transaction",
            ID: "Transaksi tidak ditemukan"
        }
    },
    masterproject: {
        sidebar: {
            EN: "Master Projects",
            ID: "Master Proyek"
        },
        search: {
            EN: "Search Transaction No",
            ID: "Cari No Transaksi"
        },
        noItems: {
            EN: "No Transaction",
            ID: "Transaksi tidak ditemukan"
        }
    },
    statistic: {
        sidebar: {
            EN: "Statistic",
            ID: "Statistik"
        },
    },
    customer: {
        sidebar: {
            EN: "Customer",
            ID: "Pelanggan"
        },
    },
    table: {
        sidebar: {
            EN: "Table",
            ID: "Meja"
        }
    },
    supplier: {
        sidebar: {
            EN: "Supplier",
            ID: "Penyuplai"
        },
        pos: {
            search: {
                EN: "Search Supplier",
                ID: "Cari Supplier"
            },
        }
    },
    report: {
        sidebar: {
            EN: "Report",
            ID: "Laporan"
        },
    },
    stock: {
        sidebar: {
            EN: "Stock Management",
            ID: "Manajemen Stok"
        },
        item: {
            sidebar: {
                EN: "Items",
                ID: "Daftar Barang"
            },
            search: {
                EN: "Search Item",
                ID: "Cari Barang"
            },
            noItems: {
                EN: "No items found",
                ID: "Barang tidak ditemukan"
            },
        },
        uom: {
            sidebar: {
                EN: "UOM & Conversion",
                ID: "Satuan & Konversi"
            },
            unitList: {
                EN: "Units",
                ID: "Satuan"
            },
            unitName: {
                EN: "Unit Name",
                ID: "Nama Satuan"
            },
            coef: {
                EN: "Multiply Factor",
                ID: "Faktor Kali"
            },
            hpp: {
                EN: "HPP",
                ID: "HPP"
            },
            price: {
                EN: "Price",
                ID: "Harga"
            },
            save: {
                EN: "Save Data",
                ID: "Simpan Data"
            },
            config: {
                EN: "Configure UOM",
                ID: "Atur Satuan"
            },
            stock: {
                EN: "Stock",
                ID: "Stok"
            },
            stockopname: {
                EN: "Stock Opname",
                ID: "Stok Opname"
            },
            stockopnamesetting: {
                EN: "Stock Opname Setting",
                ID: "Atur Stok Opname "
            },
            note: {
                EN: "Note",
                ID: "Catatan"
            },
            status: {
                EN: "Status",
                ID: "Status"
            },
        },
        stokopname: {
            sidebar: {
                EN: "Stok Opname",
                ID: "Stok Opname"
            },
        },
    },
    purchasing: {
        sidebar: {
            EN: "Purchasing",
            ID: "Pembelian Barang"
        },
        order: {
            sidebar: {
                EN: "Purchase Order",
                ID: "Barang Dipesan"
            }
        },
        receive: {
            sidebar: {
                EN: "Receive Order",
                ID: "Barang Diterima"
            }
        },
        add_budget: {
            sidebar: {
                EN: "Additional Budget",
                ID: "Biaya Tambahan"
            }
        }
    },
    setting: {
        sidebar: {
            EN: "Setting",
            ID: "Pengaturan"
        },
        employee: {
            sidebar: {
                EN: "Employee",
                ID: "Karyawan"
            }
        },
        tax: {
            sidebar: {
                EN: "Tax",
                ID: "Pajak"
            }
        },
        discount: {
            sidebar: {
                EN: "Discount",
                ID: "Diskon"
            }
        },
        discountglobal: {
            sidebar: {
                EN: "Global Discount",
                ID: "Diskon Global"
            }
        },
        shift: {
            sidebar: {
                EN: "Shift",
                ID: "Jam Kerja"
            }
        },
        printer: {
            sidebar: {
                EN: "Printer",
                ID: "Printer"
            }
        },
        backup: {
            sidebar: {
                EN: "Backup",
                ID: "Cadangkan Data"
            }
        },
        general_setting: {
            sidebar: {
                EN: "General Setting",
                ID: "Pengaturan Umum"
            }
        },
        user_management: {
            sidebar: {
                EN: "User Management",
                ID: "Manajemen Akun"
            }
        },
        qris: {
            sidebar: {
                EN: "QRIS",
                ID: "QRIS"
            }
        },
        password: {
            sidebar: {
                EN: "Change Password",
                ID: "Ubah Password"
            }
        }
    },
    filter: {
        itemCategory: {
            all: {
                EN: "All Categories",
                ID: "Semua Kategori"
            }
        }
    },
    shift: {
        sidebar: {
            EN: "Shift",
            ID: "Shift"
        }
    },
    common: {
        cancel: {
            EN: "Cancel",
            ID: "Batal"
        }
    },
    report:{
        sidebar: {
            EN: "Report",
            ID: "Laporan"
        }
    },
    profil: {
        sidebar: {
            EN: "Profil",
            ID: "Profil"
        }
    },
    universal: {
        apply:{
            EN: "Apply",
            ID: "Terapkan"
        },
        cancel:{
            EN: "Cancel",
            ID: "Batal"
        },
        delete:{
            EN: "Delete",
            ID: "Hapus"
        },
        add:{
            EN: "Add",
            ID: "Tambah"
        },
        deleteimage:{
            EN: "Delete",
            ID: "Hapus"
        },
        deletefilter:{
            EN: "Delete",
            ID: "Hapus"
        },
        save:{
            EN: "Save",
            ID: "Simpan"
        },
        back:{
            EN: "Back",
            ID: "Kembali"
        },
        confirm:{
            EN: "Confirm",
            ID: "Konfirmasi"
        },
        withname:{
            EN: "with name",
            ID: "dengan nama"
        },
        withnumber:{
            EN: "with number",
            ID: "dengan nomor"
        },
        deleteMessage:{
            EN: "will be deleted. Are you sure?",
            ID: "akan dihapus. Apakah anda yakin?"
        },
        change:{
            EN: "Ubah",
            ID: "Change"
        },
        image:{
            EN: "Image",
            ID: "Gambar"
        },
        notfound:{
            EN: "Data not found",
            ID: "Data tidak ditemukan"
        },
        chooseyear:{
            EN: "Choose Year",
            ID: "Pilih Tahun"
        },
        choosemonth:{
            EN: "Choose Month",
            ID: "Pilih Bulan"
        },
        choosedate: {
            EN: "Choose a Date",
            ID: "Pilih Tanggal"
        },
        location:{
            EN: "Location",
            ID: "Lokasi"
        },
        company:{
            EN: "Company",
            ID: "Perusahaan"
        },
        company:{
            EN: "Company",
            ID: "Perusahaan"
        },
        percentagemode:{
            EN: "Percentage Mode",
            ID: "Mode Persentase"
        },
        percent:{
            EN: "Percent",
            ID: "Persen"
        },
        startingcapital:{
            EN: "Starting Capital",
            ID: "Modal Awal"
        },
        finalcapital:{
            EN: "Final Capital",
            ID: "Modal Akhir"
        },
        usestock:{
            EN: "Use Stock",
            ID: "Pakai Stok"
        },
        usestock:{
            EN: "Use Stock",
            ID: "Pakai Stok"
        },
        globalbudget:{
            EN: "Global Budget",
            ID: "Budget Global"
        },
        globaldiscount:{
            EN: "Global Discount",
            ID: "Diskon Global"
        },
        erroroccured:{
            EN: "Error Occured",
            ID: "Terjadi Kesalahan"
        },
        active:{
            EN: "Active",
            ID: "Aktif"
        },
    },
    dialog: {
        add_budget: {
            outcome: {
                EN: "Outcome's Categories",
                ID: "Kategori Outcome"
            },
            income: {
                EN: "Income's Categories",
                ID: "Kategori Income"
            },
            name: {
                EN: "Budget's Name",
                ID: "Nama Budget"
            },
            value: {
                EN: "Budget's Value",
                ID: "Nilai Budget"
            }
        },
        customer: {
            name: {
                EN: "Customer's Name",
                ID: "Nama Kustomer"
            },
            wa: {
                EN: "Customer's WA Number",
                ID: "Nomor WA"
            }
        },
        discount: {
            name: {
                EN: "Discount Names",
                ID: "Nama Diskon"
            },
            value: {
                EN: "Discount Values",
                ID: "Nilai Diskon"
            }
        },
        supplier: {
            name: {
                EN: "Supplier's Name",
                ID: "Nama Supplier"
            },
            wa: {
                EN: "Supplier's WA Number",
                ID: "Nomor WA"
            },
            address: {
                EN: "Supplier's Address",
                ID: "Alamat Supplier"
            },
        },
        table: {
            name: {
                EN: "Table Name",
                ID: "Nama Meja"
            },
            capacity: {
                EN: "Table Capacity",
                ID: "Kapasitas Meja"
            },
            categories: {
                EN: "Table Categories",
                ID: "Kategori Meja"
            }
        },
        tax: {
            name: {
                EN: "Tax Name",
                ID: "Nama Pajak"
            },
            value: {
                EN: "Tax Value",
                ID: "Nilai Pajak"
            }
        },
        transaction: {
            bill: {
                EN: "Bill",
                ID: "Tagihan"
            },
            remainingcost: {
                EN: "Remaining Cost",
                ID: "Sisa Biaya"
            },
            installment: {
                EN: "Installment",
                ID: "Cicilan"
            },
            interest: {
                EN: "Interest",
                ID: "Bunga"
            }
        },
        item: {
            code: {
                EN: "Item Code",
                ID: "Kode Item"
            },
            name: {
                EN: "Item Name",
                ID: "Nama Item"
            },
            newcategories: {
                EN: "New Categories",
                ID: "Kategori Baru"
            },
            categories: {
                EN: "Categories",
                ID: "Kategori"
            },
            unit: {
                EN: "Unit",
                ID: "Satuan"
            },
            startingprice: {
                EN: "Starting Price",
                ID: "Harga Awal"
            },
            cost: {
                EN: "Cost",
                ID: "Biaya"
            },
            price: {
                EN: "price",
                ID: "Harga"
            },
            level: {
                EN: "Level",
                ID: "Level"
            },
            sellingprice: {
                EN: "Selling Price",
                ID: "Harga Jual"
            },
            serviceprice: {
                EN: "Service Price",
                ID: "Harga Jasa"
            }
        },
        user: {
            namecashier: {
                EN: "Cashier Name",
                ID: "Nama Kasir"
            },
            wa: {
                EN: "WA Number",
                ID: "Nomor WA"
            },
            namelocation: {
                EN: "Location Name",
                ID: "Nama Lokasi"
            },
            namecompany: {
                EN: "Company Name",
                ID: "Nama Perusahaan"
            },
            codecompany: {
                EN: "Company Code",
                ID: "Kode Perusahaan"
            },
            address: {
                EN: "Address",
                ID: "Alamat"
            },
            phone: {
                EN: "Phone Number",
                ID: "Nomor Telepon"
            },
            startingprice: {
                EN: "Starting Price",
                ID: "Harga Awal"
            },
            cost: {
                EN: "Cost",
                ID: "Biaya"
            },
            level: {
                EN: "Level",
                ID: "Level"
            },
            sellingprice: {
                EN: "Selling Price",
                ID: "Harga Jual"
            },
            serviceprice: {
                EN: "Service Price",
                ID: "Harga Jasa"
            },
            newpassword: {
                EN: "New Password",
                ID: "Password Baru"
            },
            oldpassword: {
                EN: "Old Password",
                ID: "Password Lama"
            },
            passwordconfirmation: {
                EN: "Password Confirmation",
                ID: "Konfirmasi Password"
            },
            loginname: {
                EN: "Login/Name",
                ID: "Login/Nama"
            }
        },
        bluetooth: {
            setup: {
                EN: "The printer has not been set-up. Set-up the printer now?",
                ID: "Printer belum diset-up. Set-up printer sekarang?"
            },
            performing: {
                EN: "Performing printer set-up",
                ID: "Melakukan set-up printer"
            },
            bluetooth: {
                EN: "Yes, via Bluetooth",
                ID: "Ya, via Bluetooth"
            },
            usb: {
                EN: "Yes, via USB",
                ID: "Ya, via USB"
            },
            later: {
                EN: "Maybe later",
                ID: "Nanti saja"
            },
        }
    },
    dialogheader: {
        changepassword: {
                EN: "Change Password",
                ID: "Ganti Password"
        },
        profile: {
            EN: "Profile",
            ID: "Profil"
        },
        adjusttheamount: {
            EN: "Adjust The Amount",
            ID: "Atur Jumlah"
        },
        changesettingvalue: {
            EN: "Change Setting Value",
            ID: "Ubah Nilai Pengaturan"
        },
        printthesticker: {
            EN: "Print The Sticker",
            ID: "Cetak Stiker"
        },
        shelf: {
            EN: "Shelf",
            ID: "Rak"
        },
        orderdraft: {
            EN: "Order Draft",
            ID: "Draft Pesanan"
        },
        limitation: {
            EN: "Limitation",
            ID: "Batasan"
        },
        order: {
            EN: "Order",
            ID: "Pesanan"
        },
        duedateofcredit: {
            EN: "Due Date of Credit",
            ID: "Tanggal Jatuh Tempo Piutang"
        },
        pleasescanqris: {
            EN: "Please Scan QRIS",
            ID: "Silahkan Scan QRIS"
        },
        additemtopo: {
            EN: "Add Item To PO",
            ID: "Tambah Item Ke PO"
        },
        additemtobom: {
            EN: "Add Item To BOM",
            ID: "Tambah Item Ke BOM"
        },
        addsuppliertopo: {
            EN: "Add Supplier To PO",
            ID: "Tambah Supplier Ke PO"
        },
        addpotorcv: {
            EN: "Add PO To RCV",
            ID: "Tambah PO Ke RCV"
        },
        adduser: {
            EN: "Add User",
            ID: "Tambah User"
        },
    },
    search: {
        add_budget: {
            outcome: {
                EN: "Outcome's Categories",
                ID: "Kategori Outcome"
            },
            income: {
                EN: "Income's Categories",
                ID: "Kategori Income"
            },
            name: {
                EN: "Budget's Name",
                ID: "Nama Budget"
            },
            value: {
                EN: "Budget's Value",
                ID: "Nilai Budget"
            }
        },
        customer: {
                EN: "Search for Customer",
                ID: "Cari Kustomer"
        },
        discount: {
            EN: "Search for Discount",
            ID: "Cari Diskon"
        },
        itembom: {
            EN: "Search for Item (BOM)",
            ID: "Cari Barang (BOM)"
        },
        item: {
            EN: "Search for Item (Master Item)",
            ID: "Cari Barang (Master Item)"
        },
        report: {
            EN: "Search for Report",
            ID: "Cari Laporan"
        },
        pos: {
            EN: "Search for Item (Cashier)",
            ID: "Cari Barang (Kasir)"
        },
        externalscan: {
            EN: "External Scan Mode",
            ID: "Mode Pemindaian External"
        },
        camerascan: {
            EN: "Camera Scan Mode",
            ID: "Mode Pemindaian Kamera"
        },
        itemtablecustomer: {
            EN: "Search for Item/Table/Customer",
            ID: "Cari Barang/Meja/Kustomer"
        },
        supplier: {
            EN: "Search for Supplier",
            ID: "Cari Supplier"
        },
        po: {
            EN: "Search for Purchase Order Number",
            ID: "Cari No. PO"
        },
        rcv: {
            EN: "Search for Receiving Number",
            ID: "Cari No. Penerimaan"
        },
        table: {
            EN: "Search for Table",
            ID: "Cari Meja"
        },
        stockopname: {
            EN: "Search for Item (Stok Opname)",
            ID: "Cari Item (Stok Opname)"
        },
        transaction: {
            EN: "Search for Transaction Number",
            ID: "Cari No. Transaksi"
        },
        convertion: {
            EN: "Search for Item (Convertion)",
            ID: "Cari Item (Konversi)"
        },
        user: {
            EN: "Search for User",
            ID: "Cari User"
        },
    },
    choose: {
        customer: {
            EN: "Choose a Customer",
            ID: "Pilih Kustomer"
        },
        discount: {
            EN: "Choose a Discount",
            ID: "Pilih Diskon"
        },
        date: {
            EN: "Choose a Date",
            ID: "Pilih Tanggal"
        },
        company: {
            EN: "Choose a Company",
            ID: "Pilih Perusahaan"
        },
        location: {
            EN: "Choose a Location",
            ID: "Pilih Lokasi"
        },
        role: {
            EN: "Choose a Role",
            ID: "Pilih Role"
        },
        plan: {
            EN: "Choose a Plan",
            ID: "Pilih Paket"
        },
    },
    new: {
        new: {
            EN: "New",
            ID: "Baru"
        },
        customer: {
            EN: "New Customer",
            ID: "Kustomer Baru"
        },
        discount: {
            EN: "New Discount",
            ID: "Diskon Baru"
        },
    },
    monthcalender:{
        january:{
            EN: "January",
            ID: "Januari",
            value:1
        },
        february:{
            EN: "February",
            ID: "Februari",
            value:2
        },
        march:{
            EN: "March",
            ID: "Maret",
            value:3
        },
        april:{
            EN: "April",
            ID: "April",
            value:4
        },
        may:{
            EN: "May",
            ID: "Mei",
            value:5
        },
        june:{
            EN: "June",
            ID: "Juni",
            value:6
        },
        july:{
            EN: "July",
            ID: "Juli",
            value:7
        },
        august:{
            EN: "August",
            ID: "Agustus",
            value:8
        },
        september:{
            EN: "September",
            ID: "September",
            value:9
        },
        october:{
            EN: "October",
            ID: "Oktober",
            value:10
        },
        november:{
            EN: "November",
            ID: "November",
            value:11
        },
        december:{
            EN: "December",
            ID: "Desember",
            value:9
        },
    },
    monthcalender:{
        EN:["January","February","March","April","May","June","July","August","September","October","November","December"],
        ID:["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"]
    },
    yearcalender:{
        EN:[2020,2021,2022,2023,2024,2025,2026,2027,2028,2029,2030,2031,2032,2033,2034,2035,2036,2037,2038,2039,2040,2041,2042,2043,2044,2045,2046,2047,2048,2049,2050,2051,2052,2053,2054,2055,2056,2057,2058,2059],
        ID:[2020,2021,2022,2023,2024,2025,2026,2027,2028,2029,2030,2031,2032,2033,2034,2035,2036,2037,2038,2039,2040,2041,2042,2043,2044,2045,2046,2047,2048,2049,2050,2051,2052,2053,2054,2055,2056,2057,2058,2059]
    }
})