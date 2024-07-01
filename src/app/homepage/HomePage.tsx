'use client'
import { UserIcon } from "@heroicons/react/24/outline";
import Dashboard from "../components/dashboard/Dashboard";
import { homePageLogic } from "./homePageLogic";
import DashboardDonut from "../components/dashboard/DashboardDonut";

export const HomePage = () => {
    const { revenueData, totalOrders, totalCustomers, bestSellingProduct, cityWithMostOrders, width, height, renueveFromLastMonth, t } = homePageLogic();
    return (
        <div className="flex flex-col w-full h-full p-5">
            <h1 className="text-center mb-8 text-2xl font-bold mt-2 text-blue-950 text-opacity-80">{t('stadisticsGlobal')}</h1>
            <section className=" justify-center items-center sm:flex lg:flex-row sm:flex-col ">
                {revenueData &&
                    <div className="flex justify-center items-center">
                        {height !== '' && width !== '' && <Dashboard revenueData={revenueData} height={height} width={width} />
                        }
                    </div>
                }
                <div className="flex flex-col ml-4 justify-center items-center">
                    <h3 className="text-blue-950 text-opacity-80 font-bold text-xl ml-4">{t('totalOrders')}</h3>
                    <p className="text-center mt-4 border-4 rounded-full h-16 w-16 flex items-center justify-center border-blue-900 border-opacity-60">
                        {totalOrders}
                    </p>
                </div>

            </section>
            <section className="mt-10">
                <div className="lg:grid lg:grid-cols-2 lg:gap-4 sm:flex sm:flex-col ml-4">
                    <div className="flex-col mb-5 lg:mb-0 lg:flex lg:flex-row  justify-between">
                        <div className="justify-center lg:flex-col mb-5 lg:mb-0  items-center">
                            <h3 className="text-blue-950 text-opacity-80 font-bold text-xl ml-4">{t('totalCustomers')}</h3>
                            <p className="text-center mt-5 flex items-center justify-center ">
                                <UserIcon className="h-4 w-4 mr-2 text-blue-950 " />   {totalCustomers}
                            </p>
                        </div>
                        <div className="justify-center items-center">
                            <h3 className="text-blue-950 text-opacity-80 font-bold text-xl ml-4">{t('productMostSold')}</h3>
                            <p className="text-center flex items-center mt-5  justify-center ">
                                {bestSellingProduct}
                            </p>
                        </div>
                    </div>

                    <div className="col-span-1 row-span-3 flex flex-col  items-center">
                        <h3 className="text-blue-950 text-opacity-80 font-bold text-xl ml-4">{t('cityMostOrders')}</h3>

                        <DashboardDonut cityData={cityWithMostOrders} />

                    </div>

                    <div className="col-span-1 lg:mt-16  mt-5 flex flex-col justify-center items-center">
                        <h3 className="text-blue-950 text-opacity-80 font-bold text-xl ml-4">{t('sellsIn30Days')}</h3>
                        <p className="text-center mt-5 border-blue-900 border-opacity-60">
                            $ {renueveFromLastMonth}
                        </p>
                    </div>
                </div>

            </section>
        </div>
    );

}