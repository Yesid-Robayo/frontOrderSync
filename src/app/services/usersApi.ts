import { ProductDTO, UserDTO, UserRequestDTO } from "../utils/DTOS";
import { routes } from "../utils/routes";

export const usersApi = {
    baseUrl: `${routes.baseURL}${routes.usersApi.main}`,

    async getAllUsers(): Promise<UserDTO[]> {
        const response = await fetch(`${this.baseUrl}${routes.usersApi.children.getAllUsers}`);
        return await response.json();
    },
    async getUserFilters({ page = 1, limit = 10, search = '', city = '' }: { page: number, limit: number, search: string, city: string }): Promise<{
        users: UserDTO[],
        totalUsers: number
    }> {
        const queryParams = new URLSearchParams({
            page: page.toString(),
            limit: limit.toString(),
            search,
            city,
        });
        const response = await fetch(`${this.baseUrl}${routes.usersApi.children.getUsersFilters}?${queryParams}`);
        return await response.json();
    },
    async getCitys(): Promise<string[]> {
        const response = await fetch(`${this.baseUrl}${routes.usersApi.children.getCitys}`);
        return await response.json();
    },
    async createUser(user: UserRequestDTO) {
        const response = await fetch(`${usersApi.baseUrl}${routes.usersApi.children.createUser}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        return await response.json();
    }
}

