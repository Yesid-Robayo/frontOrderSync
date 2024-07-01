import { shippingRuleType, statusType } from "./types";

// productDTO.ts
export interface ProductDTO {
    id: number;
    name: string;
    price: number;
    inventory: number;
}
// userDTO.ts
export interface UserDTO {
    id: number;
    name: string;
    phone: string;
    email: string;
    address: string;
    city: string;
}
export interface UserRequestDTO {
    name: string;
    phone: string;
    email: string;
    address: string;
    city: string;

}
// orderDTO.ts
export interface OrderDTO {
    id: number;
    date: Date;
    status: statusType;
    paid: boolean;
    user_id: number;
    shipping_rule: shippingRuleType;
    comments?: string;
}


export interface OrderRequestDTO {
    date: string;
    status: statusType;
    paid: boolean;
    user_id: number;
    shipping_rule: shippingRuleType;
    comments?: string;
    products:{
        id: number;
        quantity: number;
    }[];
    
}
// orderProductDTO.ts
export interface OrderProductDTO {
    orderId: number;
    productId: number;
    quantity: number;
}


export interface BestSellingProductDTO {
    name: string;
    total_sold: number;
}

export interface CityWithMostOrdersDTO {
    city: string;
    orders: number;
    total_orders: number;
}

export interface RevenueDateAndCountDTO {
    date: Date;
    order_count: number;
}