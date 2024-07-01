'use client'

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { pageLogic } from "./pageLogic";

export default function Page() {
   const {comments,filteredProducts,handleProductChange,handleSubmit,searchTerm,selectedProducts,selectedUser,shipping,t,totalValue,users,setSearchTerm,setSelectedUser,setShipping,setComments} = pageLogic();

    return (
        <>
            <h1 className="text-center mt-5 font-bold text-2xl text-blue-950 opacity-80">{t('title')}</h1>
            <form onSubmit={handleSubmit} className="mx-auto mt-2 p-6 bg-white">
                <div className="flex flex-col lg:flex-row mb-6">
                    <div className="lg:w-1/2  pr-4">
                        <div className="mb-4">
                            <label htmlFor="user" className="block mb-2 font-bold">{t('customer')}: </label>
                            <select
                                id="user"
                                value={selectedUser}
                                onChange={(e) => setSelectedUser(e.target.value)}
                                required
                                className="w-full p-2 border rounded"
                            >
                                <option value="" disabled>{t('selectCustomer')}</option>
                                {users.map(user => (
                                    <option key={user.id} value={user.id}>{user.id} - {user.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="shipping" className="block mb-2 font-bold">{t('shippingRule')}: </label>
                            <select
                                id="shipping"
                                value={shipping}
                                onChange={(e) => setShipping(e.target.value)}
                                required
                                className="w-full p-2 border rounded"
                            >
                                <option value="pick up">{t('pick up')}</option>
                                <option value="home delivery">{t('home delivery')}</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="comments" className="block mb-2 font-bold">{t('comments')}:</label>
                            <textarea
                                id="comments"
                                value={comments}
                                onChange={(e) => setComments(e.target.value)}
                                className="w-full p-2 border rounded h-72"
                            ></textarea>
                        </div>
                    </div>
                    <div className="lg:w-1/2 pl-4">
                        <div className="mb-4">
                            <label htmlFor="productSearch" className="block mb-2 font-bold">{t('seachProducts')}:</label>
                            <input
                                type="text"
                                id="productSearch"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder={t('search')}
                                className="w-full p-2 border rounded mb-4"
                            />
                            <div className="h-[410px] overflow-y-auto border rounded">
                                <div className="sticky top-0 bg-gray-200 flex font-bold">
                                    <div className="flex-grow p-2">{t('product')}</div>
                                    <div className="w-24 p-2">{t('quantity')}</div>
                                </div>
                                {filteredProducts.map(product => (
                                    <div key={product.id} className="flex border-t">
                                        <div className="flex-grow p-2">{product.name}</div>
                                        <div className="w-24 p-2">
                                            <input
                                                type="number"
                                                min="0"
                                                max={product.inventory}
                                                placeholder="0"
                                                value={selectedProducts.find(p => p.id === product.id)?.quantity || ''}
                                                onChange={(e) => handleProductChange(product.id, parseInt(e.target.value, 10))}
                                                className="w-full p-1 border rounded"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between items-center mt-10">
                    <div className="text-xl font-bold">
                        {t('total')}: ${totalValue.toFixed(2)}
                    </div>
                    <button type="submit" className="bg-blue-950 text-white p-2 rounded hover:bg-blue-800 opacity-80 px-8">
                        {t('createOrder')}
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