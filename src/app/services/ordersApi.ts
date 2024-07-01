import { OrderRequestDTO } from "../utils/DTOS";
import { routes } from "../utils/routes";
import { shippingRuleType, statusType } from "../utils/types";

export const ordersApi = {
    baseURL: `${routes.baseURL}${routes.ordersApi.main}`,

    async getOrders({ page = 1, limit = 10, search = '', status = '', shipping_rule = '' }: { page: number, limit: number, search: string, status: statusType, shipping_rule: shippingRuleType }): Promise<any> {
        const queryParams = new URLSearchParams({
            page: page.toString(),
            limit: limit.toString(),
            search,
            status,
            shipping_rule,
        });
        const response = await fetch(`${this.baseURL}${routes.ordersApi.children.getOrders}?${queryParams}`);
        return await response.json();

    },
    async updateStatusOrder(id: number, status: statusType): Promise<any> {
        const response = await fetch(`${this.baseURL}${routes.ordersApi.children.updateOrderStatus}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, status })
        });
        return await response.json();
    },
    async createOrder(order: OrderRequestDTO): Promise<any> {
        const response = await fetch(`${this.baseURL}${routes.ordersApi.children.createOrder}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(order)
        });
        return await response.json();

    },
    async getOrderProducts(id: number): Promise<any> {
        const response = await fetch(`${this.baseURL}${routes.ordersApi.children.ordersProductsbyid}?id=${id}`);
        return await response.json();
    }
}