import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { usersApi } from "../services/usersApi";

export const pageLogic = () => {
    
    const t = useTranslations('userList');

    const [users, setUsers] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalUsers, setTotalUsers] = useState(0);
    const [search, setSearch] = useState('');
    const [city, setCity] = useState('');
    const [citys, setCitys] = useState<string[]>([]);
    useEffect(() => {
        fetchUsers();
    }, [page, limit, search, city]);
    useEffect(() => {
        fetchCities();
    }, [])
    const fetchUsers = async () => {
        try {
            const { users, totalUsers } = await usersApi.getUserFilters({ page, limit, search, city });


            setUsers(users);
            setTotalUsers(totalUsers);


        } catch (error) {
            console.error('Failed to fetch users:', error);
        }
    };

    const fetchCities = async () => {
        try {
            const citiesResponse = await usersApi.getCitys();
            const uniqueCities = Array.from(new Set(citiesResponse.map((city: any) => city.city)));
            setCitys(uniqueCities);
        } catch (error) {
            console.error('Failed to fetch cities:', error);
        }
    }



    const totalPages = Math.ceil(totalUsers / limit);

    return {
        users,
        page,
        setPage,
        limit,
        setLimit,
        totalUsers,
        search,
        setSearch,
        city,
        setCity,
        citys,
        t,
        totalPages
    }
}