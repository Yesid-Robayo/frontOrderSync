import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { ProductDTO, UserDTO } from "../utils/DTOS";
import { toast } from "react-toastify";
import { usersApi } from "../services/usersApi";
import { productsApi } from "../services/productsApi";
import { shippingRuleType, statusType } from "../utils/types";
import { ordersApi } from "../services/ordersApi";

export const pageLogic = () => {
    const t = useTranslations('createOrder');
    const [users, setUsers] = useState<UserDTO[]>([]);
    const [products, setProducts] = useState<ProductDTO[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<ProductDTO[]>([]);
    const [selectedUser, setSelectedUser] = useState('');
    const [selectedProducts, setSelectedProducts] = useState<{ id: number, quantity: number }[]>([]);
    const [shipping, setShipping] = useState('pick up');
    const [comments, setComments] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [totalValue, setTotalValue] = useState(0);

    const notify = (message: string) => toast(message);

    useEffect(() => {
        const fetchUsersAndProducts = async () => {
            const usersResponse = await usersApi.getAllUsers();
            const productsResponse = await productsApi.getProducts();
            setUsers(usersResponse);
            setProducts(productsResponse);
            setFilteredProducts(productsResponse);
        };

        fetchUsersAndProducts();
    }, []);

    useEffect(() => {
        const results = products.filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProducts(results);
    }, [searchTerm, products]);

    const handleProductChange = (productId: number, quantity: number) => {
        const product = products.find(p => p.id === productId);

        if (!product) {
            notify("Product not found");
            return;
        }

        if (quantity < 0) {
            notify("Quantity cannot be negative");
            quantity = 0;
        }

        if (quantity > product.inventory) {
            notify(`Only ${product.inventory} items available in stock`);
            quantity = 0;
        }

        setSelectedProducts(prev => {
            const newSelectedProducts = prev.find(p => p.id === productId)
                ? prev.map(p => p.id === productId ? { ...p, quantity } : p)
                : [...prev, { id: productId, quantity }];

            // Filter out products with quantity 0
            const filteredProducts = newSelectedProducts.filter(p => p.quantity > 0);

            calculateTotalValue(filteredProducts);
            return filteredProducts;
        });
    };

    const calculateTotalValue = (selectedProds: { id: number, quantity: number }[]) => {
        const total = selectedProds.reduce((acc: number, curr: { id: number, quantity: number }) => {
            const product = products.find(p => p.id === curr.id);
            if (product && curr.quantity > 0) {
                return acc + product.price * curr.quantity;
            } else {
                return acc;
            }
        }, 0);

        setTotalValue(total);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const order = {
            user_id: parseInt(selectedUser),
            products: selectedProducts.filter(p => p.quantity > 0), // Ensure only non-zero quantities are included
            shipping_rule: shipping as shippingRuleType,
            comments,
            status: "pending" as statusType,
            paid: false,
            date: new Date().toISOString().split('T')[0]
        };

        const response = await ordersApi.createOrder(order);
        if (response) {
            notify("Order created successfully");
            setSelectedUser('');
            setSelectedProducts([]);
            setShipping('pickup');
            setComments('');
            setTotalValue(0);
        } else {
            notify("Failed to create order");
        }


    };

    return {
        t,
        users,
        filteredProducts,
        selectedUser,
        selectedProducts,
        shipping,
        comments,
        searchTerm,
        totalValue,
        handleProductChange,
        handleSubmit,
        setSearchTerm,
        setSelectedUser,
        setShipping,
        setComments
    }
}