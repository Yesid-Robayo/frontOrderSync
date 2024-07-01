import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { OrderDTO } from "../utils/DTOS";
import { shippingRuleType, statusType } from "../utils/types";
import { ordersApi } from "../services/ordersApi";

export const pageLogic = () => {
    const notify = (message: string) => toast(message);

    const t = useTranslations('OrderList');

    const [orders, setOrders] = useState<OrderDTO[]>([]);
    const [expandedOrder, setExpandedOrder] = useState(null);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalOrders, setTotalOrders] = useState(0);
    const [search, setSearch] = useState('');
    const [status, setStatus] = useState<statusType>('');
    const [shippingRule, setShippingRule] = useState<shippingRuleType>('');
    const [orderProducts, setOrderProducts] = useState<any[]>([]);

    useEffect(() => {

        fetchOrders();
    }, [page, limit, search, status, shippingRule]);

    const fetchOrders = async () => {
        try {
            const { orders, totalOrders } = await ordersApi.getOrders({ page, limit, search, status, shipping_rule: shippingRule });
            setOrders(orders);
            setTotalOrders(totalOrders);
        } catch (error) {
            console.error('Failed to fetch orders:', error);
        }
    };

    const toggleExpandOrder = async (id: any) => {
        if (expandedOrder === id) {
            setExpandedOrder(null);
            setOrderProducts([]);
        } else {
            setExpandedOrder(id);
            try {
                const products = await ordersApi.getOrderProducts(id); // Asegúrate de tener una función en ordersApi para obtener los productos del pedido
                console.log(products);
                setOrderProducts(products);
            } catch (error) {
                console.error('Failed to fetch order products:', error);
            }
        }
    };


    const handleStatusChange = async (id: number, newStatus: statusType) => {
        try {
            await ordersApi.updateStatusOrder(id, newStatus);
            notify(t('order.orderStatusChangeSuccess'));
            fetchOrders();
        }
        catch (error) {
            notify(t('order.orderStatusChangeError'));
        }
    };

    const totalPages = Math.ceil(totalOrders / limit);

    const formatDateString = (date: any) => {

        return new Date(date).toDateString();
    };

    return{
        t,
        orders,
        expandedOrder,
        page,
        setPage,
        limit,
        setLimit,
        search,
        setSearch,
        status,
        setStatus,
        shippingRule,
        setShippingRule,
        orderProducts,
        toggleExpandOrder,
        handleStatusChange,
        totalPages,
        formatDateString
    }
}