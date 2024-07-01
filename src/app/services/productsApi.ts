import { ProductDTO } from "../utils/DTOS";
import { routes } from "../utils/routes";

export const productsApi = {
    baseURL:`${routes.baseURL}${routes.productsApi.main}`,  

    async getProducts(): Promise<ProductDTO[]> {
        const response = await fetch(`${this.baseURL}${routes.productsApi.children.getProducts}`);
        return await response.json();
    }
}