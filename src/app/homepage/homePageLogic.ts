import { useEffect, useState } from "react";
import { CityWithMostOrdersDTO, RevenueDateAndCountDTO } from "../utils/DTOS";
import { useTranslations } from "next-intl";
import { summaryApi } from "../services/summaryApi";

export const homePageLogic = () => {
    const [revenueData, setRevenueData] = useState<RevenueDateAndCountDTO[]>([]);
    const t = useTranslations('metrics');
    const [totalOrders, setTotalOrders] = useState<number>(0);
    const [totalCustomers, setTotalCustomers] = useState<number>(0);
    const [bestSellingProduct, setBestSellingProduct] = useState<string>('');
    const [cityWithMostOrders, setCityWithMostOrders] = useState<CityWithMostOrdersDTO>(
        { city: '', orders: 0, total_orders: 0 }
    );
    const [width, setWidth] = useState<string>('');
    const [height, setHeight] = useState<string>('');
    const [renueveFromLastMonth, setRevenueFromLastMonth] = useState<number>(0);
    useEffect(() => {
        const fetchData = async () => {
            const data = await summaryApi.getRevenueDateAndCount();
            setRevenueData(data);
            const total = await summaryApi.getOrdersCount();
            setTotalOrders(total[0].ordenes);
            const customers = await summaryApi.getNumberOfCustomers();
            setTotalCustomers(customers[0].users);
            const product = await summaryApi.getBestSellingProduct();
            setBestSellingProduct(product[0].name);
            const city = await summaryApi.getCitywithMostOrders();
            setCityWithMostOrders(city[0]);
            const revenue = await summaryApi.getRevenueFromLastMonth();
            setRevenueFromLastMonth(revenue[0].revenue_last_month);
        };

        const handleResize = () => {
            if (window.innerWidth <1024) {
                setWidth('300px');
                setHeight('150px');
            }else{
                setWidth('600px');
                setHeight('300px');
            
            }
        }
        handleResize();
        fetchData();
    }, []);

    return {
        revenueData,
        totalOrders,
        totalCustomers,
        bestSellingProduct,
        cityWithMostOrders,
        width,
        height,
        renueveFromLastMonth,
        t
    }
}