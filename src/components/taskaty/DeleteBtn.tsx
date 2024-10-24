'use client'
import { AppContext } from '@/context/AppContext';
import { ErrorResponse } from '@/utils/types';
import { Task } from '@prisma/client';
import axios, { AxiosError } from 'axios';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect } from 'react'
import Toast from '../toast';

interface DeleteTaskProps {
    task: Task,
    id: number,
    token: string
}

const DeleteBtn = ({task, id, token}: DeleteTaskProps) => {
    const t = useTranslations("Add Task");
    const context = useContext(AppContext);
    const router = useRouter();

    if (!context) {
        throw new Error("AppContext must be used within an AppProvider");
    }
    const { alert, setAlert } = context;
    const deleteTask = async () => {
        try {
            await axios.delete(`${process.env.NEXT_PUBLIC_TASKATIES_API_DOMAIN}/${id}`, {
                headers: {
                    Cookie: `jwtToken=${token}`,
                },
            });
            router.push('/taskaties')
            setAlert({ alertText: "Deleted", type: "success" });
        } catch (error) {
            const axiosError = error as AxiosError<ErrorResponse>;
            console.error('Error deleting task:', axiosError);
            
            const errorMessage = axiosError.response?.data?.message || "An error occurred";
            setAlert({ alertText: errorMessage, type: "error" });
        }
    };

    useEffect(() => {
        if (alert.type !== "") {
          setTimeout(() => {
            setAlert({ alertText: "", type: "" });
          }, 5000);
        }
    }, [alert]);
    return (
        <div>
            {alert.type && <Toast alertText={alert.alertText} type={alert.type} />}
            <button
                onClick={deleteTask}
                className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md shadow-md 
                            hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 transition-all"
            >
                {t('delete')}
            </button>
        </div>
    )
}

export default DeleteBtn