import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppContext, AppProvider } from "./AppContext";
import { LayoutAuthenticated } from "./layout/LayoutAuthenticated";
import LoadingOverlay from "./lib/LoadingOverlay";
import { topic } from "./constant/appTopics";
import { Suspense, lazy } from "react";
import Error404 from "./page/error/Error404";
import GoogleCallback from "./page/google/GoogleCallback";
<<<<<<< HEAD
// import PrivasiNew from "./page/google/PrivasiNew";
const POS = lazy(() => import("./page/pos/PointOfSales"));
const POSCalculator = lazy(() => import("./page/pos/POSCalculator"));
const ItemList = lazy(() => import("./page/item/ItemList"));
const Karyawan = lazy(() => import("./page/karyawan/SupplierList"));
const Shareholder = lazy(() => import("./page/shareholder/SupplierList"));
const ProjectList = lazy(() => import("./page/masterproject/MasterprojectList"));
=======
import PrivasiNew from "./page/google/PrivasiNew";
const POS = lazy(() => import("./page/pos/PointOfSales"));
const POSCalculator = lazy(() => import("./page/pos/POSCalculator"));
const ItemList = lazy(() => import("./page/item/ItemList"));
>>>>>>> parent of 290da7b... Post POS new scroll
const CustomerList = lazy(() => import("./page/customer/CustomerList"));
const Transaction = lazy(() => import("./page/transaction/TransactionNew"));
const Statistic = lazy(() => import("./page/statistic"));
const POSCheckout = lazy(() => import("./page/pos/POSCheckout"));
const POSCheckoutLaundry = lazy(() => import("./page/pos/POSCheckoutLaundry"));
const UomItemList = lazy(() => import("./page/uom/UomItemListNew"));
const Login = lazy(() => import("./page/login/LoginPage"));
const Supplier = lazy(() => import("./page/supplier/SupplierList"));
const Tax = lazy(() => import("./page/tax/TaxList"));
const Discount = lazy(() => import("./page/discount/DiscountList"));
const GeneralSetting = lazy(() => import("./page/general_setting/GeneralSettingList"));
const Table = lazy(() => import("./page/table/TableList"));
const StokOpname = lazy(() => import("./page/stokopname/StokOpnameListNew"));
const UserList = lazy(() => import("./page/user/UserList"));
const POList = lazy(() => import("./page/purchase_order/POTemp"));
const ReceivingList = lazy(() => import("./page/receive_order/ReceivingTemp"));
const POSCheckoutSplitBill = lazy(() => import("./page/pos/POSCheckoutSplitBill"));
const POSCalculatorSplitBill = lazy(() => import("./page/pos/POSCalculatorSplitBill"));
const Qris = lazy(() => import("./page/qris/Qris"));
const LaporanList = lazy(() => import("./page/laporan/LaporanList"));
const ShiftList = lazy(() => import("./page/shift/ShiftList"));
const AddBudgetList = lazy(() => import("./page/addbudget/AddBudgetList"));
function App() {
  return (
    <AppProvider>
      <AppContext.Consumer>
        {({ cookies }) => (
          <div>
            <BrowserRouter>
              {!cookies || !cookies.lok_id ? (
                <Routes>
                  <Route
                    path={topic.login.route}
                    element={
                      <Suspense
                        fallback={
                          <div className="w-fit mx-auto">
                            <LoadingOverlay />
                          </div>
                        }
                      >
                        <Login />
                      </Suspense>
                    }
                  />
                  <Route path="*" element={<Error404 />} />
                </Routes>
              ) : (
                <LayoutAuthenticated>
                  <Routes>
                    <Route
                      path={topic.cashier.route}
                      element={
                        <Suspense
                          fallback={
                            <div className="w-fit mx-auto">
                              <LoadingOverlay />
                            </div>
                          }
                        >
                          <POS />
                        </Suspense>
                      }
                    />
                    <Route
                      path={topic.cashier.checkout.route}
                      element={
                        <Suspense
                          fallback={
                            <div className="w-fit mx-auto">
                              <LoadingOverlay />
                            </div>
                          }
                        >
                          <POSCheckout />
                        </Suspense>
                      }
                    />
                    <Route
                      path={topic.cashier.checkout_laundry.route}
                      element={
                        <Suspense
                          fallback={
                            <div className="w-fit mx-auto">
                              <LoadingOverlay />
                            </div>
                          }
                        >
                          <POSCheckoutLaundry />
                        </Suspense>
                      }
                    />
                    <Route
                      path={topic.cashier.calculator.route}
                      element={
                        <Suspense
                          fallback={
                            <div className="w-fit mx-auto">
                              <LoadingOverlay />
                            </div>
                          }
                        >
                          <POSCalculator />
                        </Suspense>
                      }
                    />
                    <Route
                      path={topic.customer.route}
                      element={
                        <Suspense
                          fallback={
                            <div className="w-fit mx-auto">
                              <LoadingOverlay />
                            </div>
                          }
                        >
                          <CustomerList />
                        </Suspense>
                      }
                    />
                    <Route
                      path={topic.stock.item.route}
                      element={
                        <Suspense
                          fallback={
                            <div className="w-fit mx-auto">
                              <LoadingOverlay />
                            </div>
                          }
                        >
                          <ItemList />
                        </Suspense>
                      }
                    />
                    <Route
                      path={topic.masterprojects.route}
                      element={
                        <Suspense
                          fallback={
                            <div className="w-fit mx-auto">
                              <LoadingOverlay />
                            </div>
                          }
                        >
                          <ProjectList />
                        </Suspense>
                      }
                    />
                    <Route
<<<<<<< HEAD
                      path={topic.karyawan.route}
                      element={
                        <Suspense
                          fallback={
                            <div className="w-fit mx-auto">
                              <LoadingOverlay />
                            </div>
                          }
                        >
                          <Karyawan />
                        </Suspense>
                      }
                    />
                    <Route
                      path={topic.shareholder.route}
                      element={
                        <Suspense
                          fallback={
                            <div className="w-fit mx-auto">
                              <LoadingOverlay />
                            </div>
                          }
                        >
                          <Shareholder />
                        </Suspense>
                      }
                    />
                    <Route
                      path={topic.transaction.route}
                      element={
                        <Suspense
                          fallback={
                            <div className="w-fit mx-auto">
                              <LoadingOverlay />
                            </div>
                          }
                        >
                          <Transaction />
                        </Suspense>
                      }
                    />
                    <Route
=======
>>>>>>> parent of 290da7b... Post POS new scroll
                      path={topic.statistic.route}
                      element={
                        <Suspense
                          fallback={
                            <div className="w-fit mx-auto">
                              <LoadingOverlay />
                            </div>
                          }
                        >
                          <Statistic />
                        </Suspense>
                      }
                    />
                    <Route
                      path={topic.stock.uom.route}
                      element={
                        <Suspense
                          fallback={
                            <div className="w-fit mx-auto">
                              <LoadingOverlay />
                            </div>
                          }
                        >
                          <UomItemList />
                        </Suspense>
                      }
                    />
                    <Route
                      path={topic.reLogin.route}
                      element={
                        <Suspense
                          fallback={
                            <div className="w-fit mx-auto">
                              <LoadingOverlay />
                            </div>
                          }
                        >
                          <Login />
                        </Suspense>
                      }
                    />
                    <Route
                      path={topic.setting.tax.route}
                      element={
                        <Suspense
                          fallback={
                            <div className="w-fit mx-auto">
                              <LoadingOverlay />
                            </div>
                          }
                        >
                          <Tax />
                        </Suspense>
                      }
                    />
                    <Route
                      path={topic.setting.discount.route}
                      element={
                        <Suspense
                          fallback={
                            <div className="w-fit mx-auto">
                              <LoadingOverlay />
                            </div>
                          }
                        >
                          <Discount />
                        </Suspense>
                      }
                    />
                    <Route
                      path={topic.supplier.route}
                      element={
                        <Suspense
                          fallback={
                            <div className="w-fit mx-auto">
                              <LoadingOverlay />
                            </div>
                          }
                        >
                          <Supplier />
                        </Suspense>
                      }
                    />
                    <Route
                      path={topic.setting.general_setting.route}
                      element={
                        <Suspense
                          fallback={
                            <div className="w-fit mx-auto">
                              <LoadingOverlay />
                            </div>
                          }
                        >
                          <GeneralSetting />
                        </Suspense>
                      }
                    />
                    <Route
                      path={topic.setting.qris.route}
                      element={
                        <Suspense
                          fallback={
                            <div className="w-fit mx-auto">
                              <LoadingOverlay />
                            </div>
                          }
                        >
                          <Qris />
                        </Suspense>
                      }
                    />
                    <Route
                      path={topic.table.route}
                      element={
                        <Suspense
                          fallback={
                            <div className="w-fit mx-auto">
                              <LoadingOverlay />
                            </div>
                          }
                        >
                          <Table />
                        </Suspense>
                      }
                    />
                    <Route
                      path={topic.stock.stokopname.route}
                      element={
                        <Suspense
                          fallback={
                            <div className="w-fit mx-auto">
                              <LoadingOverlay />
                            </div>
                          }
                        >
                          <StokOpname />
                        </Suspense>
                      }
                    />
                    <Route
                      path={topic.setting.user.route}
                      element={
                        <Suspense
                          fallback={
                            <div className="w-fit mx-auto">
                              <LoadingOverlay />
                            </div>
                          }
                        >
                          <UserList />
                        </Suspense>
                      }
                    />
                    <Route
                      path={topic.purchasing.order.route}
                      element={
                        <Suspense
                          fallback={
                            <div className="w-fit mx-auto">
                              <LoadingOverlay />
                            </div>
                          }
                        >
                          <POList />
                        </Suspense>
                      }
                    />
                    <Route
                      path={topic.purchasing.receive.route}
                      element={
                        <Suspense
                          fallback={
                            <div className="w-fit mx-auto">
                              <LoadingOverlay />
                            </div>
                          }
                        >
                          <ReceivingList />
                        </Suspense>
                      }
                    />
                    <Route
                      path={topic.cashier.calculator_splitbill.route}
                      element={
                        <Suspense
                          fallback={
                            <div className="w-fit mx-auto">
                              <LoadingOverlay />
                            </div>
                          }
                        >
                          <POSCalculatorSplitBill />
                        </Suspense>
                      }
                    />
                    <Route
                      path={topic.cashier.checkout_splitbill.route}
                      element={
                        <Suspense
                          fallback={
                            <div className="w-fit mx-auto">
                              <LoadingOverlay />
                            </div>
                          }
                        >
                          <POSCheckoutSplitBill />
                        </Suspense>
                      }
                    />
                    <Route
                      path={topic.report.route}
                      element={
                        <Suspense
                          fallback={
                            <div className="w-fit mx-auto">
                              <LoadingOverlay />
                            </div>
                          }
                        >
                          <LaporanList />
                        </Suspense>
                      }
                    />
                    <Route
                      path={topic.shift.route}
                      element={
                        <Suspense
                          fallback={
                            <div className="w-fit mx-auto">
                              <LoadingOverlay />
                            </div>
                          }
                        >
                          <ShiftList />
                        </Suspense>
                      }
                    />
                    <Route
                      path={topic.purchasing.add_budget.route}
                      element={
                        <Suspense
                          fallback={
                            <div className="w-fit mx-auto">
                              <LoadingOverlay />
                            </div>
                          }
                        >
                          <AddBudgetList />
                        </Suspense>
                      }
                    />
                    <Route path="/auth/google" element={<GoogleCallback />}></Route>
                  </Routes>
                </LayoutAuthenticated>
              )}
            </BrowserRouter>
          </div>
        )}
      </AppContext.Consumer>
    </AppProvider>
  );
}

export default App;
