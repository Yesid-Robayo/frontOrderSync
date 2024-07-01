'use client'
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { OrderDTO } from "../utils/DTOS";
import { shippingRuleType, statusType } from "../utils/types";
import { ordersApi } from "../services/ordersApi";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import { formatDate } from "../utils/helpers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { pageLogic } from "./pageLogic";

export default function Page() {
   const {expandedOrder,formatDateString,handleStatusChange,limit,orderProducts,orders,page,search,setLimit,setPage,setSearch,setShippingRule,setStatus,shippingRule,status,t,toggleExpandOrder,totalPages} = pageLogic();
    return (
        <div className='p-5 '>
            <ToastContainer position="bottom-right" progressStyle={{ background: "#172557d9" }} toastClassName={
                " bg-blue-950 border border-blue-950 border-opacity-60 rounded-lg p-2"
            } bodyClassName={"text-gray-700"}
            />
            <h1 className="  font-bold text-center mb-8 text-blue-950 opacity-80 text-2xl">{t('title')}</h1>
            <div className="flex flex-col lg:flex-row justify-between mb-4">
                <input
                    type="text"

                    placeholder={t('search')}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border p-2 mb-4 lg:mb-0 rounded-lg"
                />
                <select value={status} onChange={(e) => setStatus((e.target.value as statusType))} className="border mb-4 lg:mb-0 rounded-lg p-2">
                    <option value="">{t('status.allStatus')}</option>
                    <option value="pending">{t('status.pending')}</option>
                    <option value="en route">{t('status.en route')}</option>
                    <option value="delivered">{t('status.delivered')}</option>
                    <option value="cancelled">{t('status.cancelled')}</option>
                </select>
                <select value={shippingRule} onChange={(e) => setShippingRule(e.target.value as shippingRuleType)} className="border rounded-xl  mb-4 lg:mb-0 p-2">
                    <option value="">{t('shippingRule.allRule')}</option>
                    <option value="home delivery">{t('shippingRule.home delivery')}</option>
                    <option value="pick up">{t('shippingRule.pick up')}</option>
                </select>
                <select value={limit} onChange={(e) => setLimit(Number(e.target.value))} className="border rounded-lg p-2">
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                </select>
            </div>
            <ul>
                {orders.map(order => (
                    <li key={order.id} className="border border-blue-950 border-opacity-40 p-2 rounded-lg mb-2">
                        <div className="flex justify-between items-center">
                            <span>{t('order.idOrder')} : {order.id}</span>
                            <span>{t(`status.${order.status}`)}</span>
                            <button onClick={() => toggleExpandOrder(order.id)}>
                                {expandedOrder === order.id ? <ChevronUpIcon className="h-5 w-5 mr-4" /> : <ChevronDownIcon className="h-5 w-5 mr-4" />}
                            </button>
                        </div>
                        {expandedOrder === order.id && (
                            <div className="mt-2">
                                <p>{t('order.date')}:  {formatDate(formatDateString(order.date))}</p>
                                <p>{t('order.paid')}: {order.paid ? t('order.yes') : t('order.no')}</p>
                                <p>{t('order.userID')}: {order.user_id}</p>
                                <p>{t('order.shippingRule')}: {t(`shippingRule.${order.shipping_rule}`)}</p>
                                <p>{t('order.comments')}: {order.comments}</p>
                                <select value={order.status} onChange={(e) => handleStatusChange(order.id, e.target.value as statusType)} className="border mt-4 mb-2 border-blue-950 border-opacity-80 rounded-lg p-2">
                                    <option value="pending" className="text-blue-950">{t('status.pending')}</option>
                                    <option value="en route" className="text-blue-950">{t('status.en route')}</option>
                                    <option value="delivered" className="text-blue-950">{t('status.delivered')}</option>
                                    <option value="cancelled" className="text-blue-950">{t('status.cancelled')}</option>
                                </select>

                                <h3 className="text-center">{t('products')}</h3>
                                <div className="overflow-y-auto max-h-40">
                                    <ul>
                                        {orderProducts.map(product => (
                                            <li key={product.id} className="border flex justify-between px-20 p-2 rounded-lg mb-2">
                                                <p >{product.product.name} </p>
                                                <p>{t('quantity')}: {product.quantity}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}


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