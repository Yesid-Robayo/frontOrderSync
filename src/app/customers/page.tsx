'use client'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { pageLogic } from "./pageLogic";

export default function Page() {
const {city,citys,limit,page,search,setCity,setLimit,setPage,setSearch,t,totalPages,totalUsers,users} = pageLogic();
    return (
        <div className='p-5'>
            <ToastContainer position="bottom-right" progressStyle={{ background: "#172557d9" }} toastClassName={
                " bg-blue-950 border border-blue-950 border-opacity-60 rounded-lg p-2"
            } bodyClassName={"text-gray-700"}
            />
            <h1 className="font-bold text-center mb-8 text-blue-950 opacity-80 text-2xl">{t('title')}</h1>
            <div className="flex flex-col lg:flex-row justify-between mb-4">
                <input
                    type="text"
                    placeholder={t('search')}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border p-2 mb-4 lg:mb-0 rounded-lg"
                />
                <select value={city} onChange={(e) => setCity(e.target.value)} className="border mb-4 lg:mb-0 rounded-lg p-2">

                    <option value="">{t('allCities')}</option>
                    {citys.map((city: any) => (
                        <option key={city} value={city}>{city}</option>
                    ))}
                </select>
                <select value={limit} onChange={(e) => setLimit(Number(e.target.value))} className="border rounded-lg p-2">
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                </select>
            </div>
            <ul>
                {users.map(user => (
                    <li key={user.id} className="border p-2 border-blue-950 rounded-lg mb-2">
                        <div className="flex justify-between items-center">
                            <span>{t('user.id')} : {user.id}</span>
                            <span>{user.name}</span>
                            <span>{user.phone}</span>
                        </div>
                        <div className="mt-2">
                            <p>{t('user.email')}: {user.email}</p>
                            <p>{t('user.address')}: {user.address}</p>
                            <p>{t('user.city')}: {user.city}</p>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="flex items-center justify-between mt-6">
                <button onClick={() => setPage(page > 1 ? page - 1 : 1)} className="border p-2" disabled={page === 1}>{t('previous')}</button>
                <span className="hidden lg:flex">{t('page')} {page} {t('of')} {totalPages}</span>
                <span className="lg:hidden">{t('page')} {page}</span>
                <button onClick={() => setPage(page < totalPages ? page + 1 : page)} className="border p-2" disabled={page === totalPages}>{t('next')}</button>
            </div>
        </div>
    );
}
