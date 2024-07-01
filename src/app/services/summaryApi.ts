import { BestSellingProductDTO, CityWithMostOrdersDTO, RevenueDateAndCountDTO } from "../utils/DTOS";
import { formatDate } from "../utils/helpers";
import { routes } from "../utils/routes";

export const summaryApi = {
    baseURL:`${routes.baseURL}${routes.summaryApi.main}`,

    async getOrdersCount() : Promise<any> {
        const response = await fetch(`${this.baseURL}${routes.summaryApi.children.getOrdersCount}`);
        return await response.json();

    },
    async getBestSellingProduct() : Promise<BestSellingProductDTO[]> {
        const response = await fetch(`${this.baseURL}${routes.summaryApi.children.getBestSellingProduct}`);
        return await response.json();
    },

    async getCitywithMostOrders() : Promise<CityWithMostOrdersDTO[]> {
        const response = await fetch(`${this.baseURL}${routes.summaryApi.children.getCitywithMostOrders}`);
        return await response.json();
    },

    async getNumberOfCustomers() : Promise<any> {
        const response = await fetch(`${this.baseURL}${routes.summaryApi.children.getNumberOfCustomers}`);
        return await response.json();
    },

    async getRevenueFromLastMonth() : Promise<any> {
        const response = await fetch(`${this.baseURL}${routes.summaryApi.children.getRevenueFromLastMonth}`);
        return await response.json();
    },

    async getRevenueDateAndCount() : Promise<RevenueDateAndCountDTO[]> {
        const response = await fetch(`${this.baseURL}${routes.summaryApi.children.getRevenueDateAndCount}`);

        const data = await response.json();
        return data.map((item: any) => ({
            date: formatDate(item.date),
            order_count: item.order_count
        }));
    }

}