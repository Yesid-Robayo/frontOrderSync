'use client'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { pageLogic } from './pageLogic';

export default function Page() {

    const { cities, formData, handleChange, handleSubmit, t } = pageLogic();
    return (
        <>
            <h1 className="text-center mt-5 font-bold text-2xl text-blue-950 opacity-80">{t('title')}</h1>
            <form onSubmit={handleSubmit} className="mx-auto mt-2 p-6 bg-white rounded-lg ">
                <div className="mb-4">
                    <label htmlFor="name" className="block mb-1 font-bold">{t('name')}:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="phone" className="block mb-1 font-bold">{t('phone')}:</label>
                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block mb-1 font-bold">{t('email')}:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="address" className="block mb-1 font-bold">{t('address')}:</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="city" className="block mb-1 font-bold">{t('city')}:</label>
                    <select id="city" name="city" value={formData.city} onChange={handleChange} required className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500">
                        <option value="" disabled>{t('selectCity')}</option>
                        {cities.map(city => (
                            <option key={city} value={city}>{city}</option>
                        ))}

                    </select>
                </div>
                <div className="flex justify-center mt-20">
                    <button type="submit" className="bg-blue-950 text-white px-4 py-2 rounded-lg hover:bg-blue-800">
                        {t('createUser')}
                    </button>
                </div>
            </form>
            <ToastContainer
                position="bottom-right"
                progressStyle={{ background: "#172557d9" }}
                toastClassName="bg-blue-950 border border-blue-950 border-opacity-60 rounded-lg p-2"
                bodyClassName="text-gray-700"
            />
        </>
    );
}
