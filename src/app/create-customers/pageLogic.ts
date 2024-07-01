import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { usersApi } from "../services/usersApi";

export const pageLogic = () => {
    const t = useTranslations('createUser');
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        address: '',
        city: ''
    });
    const [cities, setCities] = useState<string[]>([]);

    const notify = (message: any) => toast(message);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {

            const response = await usersApi.createUser(formData)
            console.log(response)
            if (response.message === 'User added successfully') {
                notify('User created successfully');
                setFormData({
                    name: '',
                    phone: '',
                    email: '',
                    address: '',
                    city: ''
                });
            } else {
                notify('Failed to create user');
            }
        } catch (error) {
            console.error('Error creating user:', error);
            notify('Failed to create user');
        }
    };

    useEffect(() => {
        const fetchCities = async () => {
            try {
                const citiesResponse = await usersApi.getCitys();
                const uniqueCities = Array.from(new Set(citiesResponse.map((city: any) => city.city)));
                setCities(uniqueCities);
            } catch (error) {
                console.error('Failed to fetch cities:', error);
            }
        };

        fetchCities();
    }, []);

    return {
        t,
        formData,
        cities,
        handleChange,
        handleSubmit
    }
}