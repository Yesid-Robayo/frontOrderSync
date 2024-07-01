export const routes = {
    baseURL: 'http://localhost:3001',
    summaryApi: {
        main: '/api/v1/summary',
        children: {
            getOrdersCount: '/orders',
            getBestSellingProduct: '/best-selling-product',
            getCitywithMostOrders: '/city-with-most-orders',
            getNumberOfCustomers: '/customers',
            getRevenueFromLastMonth: '/revenue',
            getRevenueDateAndCount: '/revenue-date-orders'
        }
    },
    ordersApi: {
        main: '/api/v1',
        children: {
            getOrders: '/orderswhitFilters',
            createOrder: '/orders',
            updateOrder: '/orders/:id',
            deleteOrder: '/orders/:id',
            updateOrderStatus: '/updateStatusOrder',
            ordersProductsbyid: '/ordersProductsbyid',
        }
    },
    usersApi: {
        main: '/api/v1',
        children: {
            getUsersFilters: '/users',
            getAllUsers: '/usersAll',
            getCitys:'/usersCitys',
            createUser: '/users',
        }
    },
    productsApi: {
        main: '/api/v1',
        children: {
            getProducts: '/products',
        }
    },

}