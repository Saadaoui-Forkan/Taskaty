'use client'
import { useTranslations } from 'next-intl';
import { FormEvent, useContext, useEffect, useState } from 'react';
import Description from './Description';
import { IoIosClose } from 'react-icons/io';
import { Task } from '@prisma/client';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import { AppContext } from '@/context/AppContext';
import axios, { AxiosError } from 'axios';
import { ErrorResponse } from '@/utils/types';
import Toast from '../toast';

interface UpdateTaskProps {
    task: Task,
    id: number,
    token: string
}

const UpdateTask = ({ task, id, token }: UpdateTaskProps) => {
    const t = useTranslations("Add Task");
    const [isMounted, setIsMounted] = useState(false)
    const [loading, setLoading] = useState(false);
    const context = useContext(AppContext);
    const router = useRouter();

    if (!context) {
        throw new Error("AppContext must be used within an AppProvider");
    }
    const { alert, setAlert } = context;

    // Handle open/close update modal
    const [updateTaskModal, setUpdateTaskModal] = useState(false)
    const openUpdateTaskModal = () => setUpdateTaskModal(true)
    const closeUpdateTaskModal = () => setUpdateTaskModal(false)

    // handle update modal
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [from, setFrom] = useState(task.from);
    const [to, setTo] = useState(task.to);
    const [status, setStatus] = useState(task.status);

    const handleUpdateTask = async(e: FormEvent) => {
        e.preventDefault()
        // form validation
        if (title === "") {
            setAlert({ alertText: "Task title is required", type: "error" });
            setLoading(false);
            return;
        }
        if (description === "") {
            setAlert({ alertText: "Task description is required", type: "error" });
            setLoading(false);
            return;
        }
        if (to === null) {
            setAlert({ alertText: "To Date is required", type: "error" });
            setLoading(false);
            return;
        }
        if (from === null) {
            setAlert({ alertText: "From Date is required", type: "error" });
            setLoading(false);
            return;
        }
        try {
            await axios.put(
                `${process.env.NEXT_PUBLIC_TASKATIES_API_DOMAIN}/${id}`,
                {
                  title,
                  description,
                  from,
                  to,
                  status,
                },
                {
                  headers: {
                    Cookie: `jwtToken=${token}`,
                  },
                }
              );
              closeUpdateTaskModal()
              router.refresh();
        } catch (error) {
            const axiosError = error as AxiosError<ErrorResponse>;
            console.log(axiosError);
            const errorMessage =
              axiosError.response?.data?.message || "An error occurred";
            setAlert({ alertText: errorMessage, type: "error" });
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (alert.type !== "") {
          setTimeout(() => {
            setAlert({ alertText: "", type: "" });
          }, 5000);
        }
    }, [alert]);

    useEffect(() => {
        setIsMounted(true);
        if (task) {
            setTitle(task.title || "")
            setDescription(task.description || "")
            setFrom(task.from || null);
            setTo(task.to || null);
            setStatus(task.status || "")
        }
    }, [task]);
    if (!isMounted) return null;
    return (
        <div className="relative">

            {/* Modal */}
            {updateTaskModal ? (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6  w-11/12 md:w-3/4 shadow-xl overflow-auto max-h-[85vh]">
                        {alert.type && <Toast alertText={alert.alertText} type={alert.type} />}
                        {/* Close Button */}
                        <button
                            onClick={closeUpdateTaskModal}
                            className="absolute top-1 right-1 bg-rubyRed p-1 rounded-full hover:bg-red-600"
                        >
                            <IoIosClose className="text-3xl text-white" />
                        </button>

                        {/* Form */}
                        <form
                            onSubmit={handleUpdateTask}
                            className="space-y-6"
                        >
                            <div>
                                <label className="block text-gray-800 dark:text-gray-300 font-medium mb-2">
                                    {t("title")}
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-white"
                                    placeholder={t("enter_task_title")}
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>

                            {/* Text editor Component */}
                            <Description
                                description={description}
                                setDescription={setDescription}
                            />

                            <div>
                                <label className="block text-gray-800 dark:text-gray-300 font-medium mb-2">
                                    {t("status")}
                                </label>
                                <select
                                    name="status"
                                    className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-white"
                                    onChange={(e) => setStatus(e.target.value)}
                                >
                                    <option value="NotStarted">{t("not_started")}</option>
                                    <option value="InProgress">{t("in_progress")}</option>
                                    <option value="Completed">{t("completed")}</option>
                                </select>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-800 dark:text-gray-300 font-medium mb-2">
                                        {t("from")}
                                    </label>
                                    <input
                                        type="date"
                                        name="from"
                                        className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-white"
                                        value={from ? moment(from).format('YYYY-MM-DD') : ''}
                                        onChange={(e) => setFrom(new Date(e.target.value))}
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-800 dark:text-gray-300 font-medium mb-2">
                                        {t("to")}
                                    </label>
                                    <input
                                        type="date"
                                        name="to"
                                        className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-white"
                                        value={to ? moment(to).format('YYYY-MM-DD') : ''}
                                        onChange={(e) => setTo(new Date(e.target.value))}
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-royalPurple text-white p-3 rounded-lg hover:bg-slate-700 transition"
                            >{t('update')}</button>
                        </form>
                    </div>
                </div>
            ) : (<button
                onClick={openUpdateTaskModal}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md shadow-md 
                hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
            >
                {t('update')}
            </button>)}
        </div>
    )
}

export default UpdateTask