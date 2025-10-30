export const topic = Object.freeze({
    cashier: {
        id: 1,
        route: "/",
        checkout: {
            id: 18,
            route: "/checkout"
        },
        calculator: {
            id: 19,
            route: "/calculator"
        },
        checkout_laundry: {
            id: 25,
            route: "/checkout_laundry"
        },
        calculator_splitbill: {
            id: 26,
            route: "/calculator_splitbill"
        },
        checkout_splitbill: {
            id: 27,
            route: "/checkout_splitbill"
        },
    },
    transaction: {
        id: 2,
        route: "/transaction",
    },
    statistic: {
        id: 3,
        route: "/statistic"
    },
    customer: {
        id: 4,
        route: "/customer"
    },
    table: {
        id: 20,
        route: "/table"
    },
    supplier: {
        id: 5,
        route: "/supplier"
    },
    item: {
        id: 5,
        route: "/items"
    },
    stock: {
        id: 6,
        item: {
            id: 7,
            route: "/items",
        },
        itemDetail: {
            id: 17,
            route: "/item-detail"
        },
        uom: {
            id: 8,
            route: "/uom"
        },
        stokopname: {
            id: 21,
            route: "/stokopname"
        },
    },
    purchasing: {
        id: 9,
        order: {
            id: 10,
            route: "/purchase-order"
        },
        receive: {
            id: 11,
            route: "/receive-order"
        },
        add_budget: {
            id: 30,
            route: "/add-budget"
        }
    },
    setting: {
        id: 12,
        employee: {
            id: 13,
            route: "/employee"
        },
        shift: {
            id: 14,
            route: "/shift"
        },
        tax: {
            id: 15,
            route: "/tax"
        },
        printer: {
            id: 16,
            route: "/printer"
        },
        backup: {
            id: 17,
            route: "/backup"
        },
        general_setting: {
            id: 18,
            route: "/general_setting"
        },
        discount: {
            id: 19,
            route: "/discount"
        },
        user: {
            id: 24,
            route: "/user"
        },
        qris: {
            id: 25,
            route: "/qris"
        },
        password: {
            id: 31,
            route: "/password"
        },
    },
    login: {
        id: 22,
        route: "/",
    },
    reLogin: {
        id: 23,
        route: "/login",
    },
    report: {
        id: 28,
        route: "/report",
    },
    shift: {
        id: 29,
        route: "/shift",
    },
    privasi: {
        id: 99,
        route: "/#/privasi",
    },
    termservice: {
        id: 98,
        route: "/#/termservice",
    },
    masterprojects: {
        id: 100,
        route: "/masterproject",
    },
    karyawan: {
        id: 101,
        route: "/karyawan",
    },
    shareholder: {
        id: 101,
        route: "/shareholder",
    }

});
