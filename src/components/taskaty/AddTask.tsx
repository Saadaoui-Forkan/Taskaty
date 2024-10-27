"use client";
import React, { FormEvent, useContext, useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";
import { MdAdd } from "react-icons/md";
import Description from "./Description";
import { useTranslations } from "next-intl";
import axios, { AxiosError } from "axios";
import { ErrorResponse } from "@/utils/types";
import { AppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import Toast from "../toast";
import moment from "moment";

type AddTaskProps = {
  token: string;
};

const AddTask = ({ token }: AddTaskProps) => {
  const t = useTranslations("Add Task");
  const [openTaskModal, setOpenTaskModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const context = useContext(AppContext);
  const router = useRouter();

  if (!context) {
    throw new Error("AppContext must be used within an AppProvider");
  }
  const { alert, setAlert } = context;
  // handle open/close modal
  const handleCloseTaskModal = () => setOpenTaskModal(false);
  const handleOpenTaskModal = () => setOpenTaskModal(true);

  // Post New Task
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [from, setFrom] = useState<Date | null>(null);
  const [to, setTo] = useState<Date | null>(null);
  const [status, setStatus] = useState<string>("NotStarted");

  const AddNewTask = async (e: FormEvent) => {
    e.preventDefault();
    // inputs validation
    if (title === "") {
      setAlert({ alertText: t('required_title'), type: "error" });
      setLoading(false);
      return;
    }
    if (description === "") {
      setAlert({ alertText: t("required_description"), type: "error" });
      setLoading(false);
      return;
    }
    if (to === null) {
      setAlert({ alertText: t('required_to'), type: "error" });
      setLoading(false);
      return;
    }
    if (from === null) {
      setAlert({ alertText: t('required_from'), type: "error" });
      setLoading(false);
      return;
    }
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_TASKATIES_API_DOMAIN}`,
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
      setAlert({ alertText: t('add_task_successfully'), type: "success" });
      router.refresh();
      setTitle("")
      setDescription("")
      setFrom(null)
      setTo(null)
      setLoading(false);
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      console.log(axiosError);
      const errorMessage =
        axiosError.response?.data?.message || "An error occurred";
      setAlert({ alertText: errorMessage, type: "error" });
    } finally {
      setLoading(false);
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
    <div className="relative">
      {/* Floating Button */}
      <div className="fixed top-16 right-8">
        <button
          onClick={handleOpenTaskModal}
          className="bg-royalPurple w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
        >
          <MdAdd className="text-2xl text-white" />
        </button>
      </div>

      {/* Modal */}
      {openTaskModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6  w-11/12 md:w-3/4 shadow-xl overflow-auto max-h-[85vh]">
            {alert.type && <Toast alertText={alert.alertText} type={alert.type} />}
            {/* Close Button */}
            <button
              onClick={handleCloseTaskModal}
              className="absolute top-1 right-1 bg-rubyRed p-1 rounded-full hover:bg-red-600"
            >
              <IoIosClose className="text-3xl text-white" />
            </button>

            {/* Form */}
            <form onSubmit={AddNewTask} className="space-y-6">
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

              {loading ? (
                <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-r-2 border-white inline-block"></span>
              ) : (
                <button
                  type="submit"
                  onSubmit={AddNewTask}
                  className="w-full bg-royalPurple text-white p-3 rounded-lg hover:bg-slate-700 transition"
                >
                  {t("add_task")}
                </button>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddTask;
