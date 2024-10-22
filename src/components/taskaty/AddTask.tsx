"use client";
import React, { FormEvent, useState } from "react";
import { IoIosClose } from "react-icons/io";
import { MdAdd } from "react-icons/md";
import Description from "./Description";

const AddTask = () => {
  const [openTaskModal, setOpenTaskModal] = useState(false);
  // handle open/close modal
  const handleCloseTaskModal = () => setOpenTaskModal(false);
  const handleOpenTaskModal = () => setOpenTaskModal(true);

  const AddNewTask = (e: FormEvent) => {
    e.preventDefault()
    handleCloseTaskModal()
  }
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
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-11/12 max-w-lg shadow-xl overflow-auto max-h-[85vh]">
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
                Title
              </label>
              <input
                type="text"
                name="title"
                className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-white"
                placeholder="Enter task title"
              />
            </div>

            {/* CKEditor Component */}
            <Description />

            <div>
              <label className="block text-gray-800 dark:text-gray-300 font-medium mb-2">
                Status
              </label>
              <select
                name="status"
                className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-white"
              >
                <option value="NotStarted">Not Started</option>
                <option value="InProgress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-800 dark:text-gray-300 font-medium mb-2">
                  From
                </label>
                <input
                  type="date"
                  name="from"
                  className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-gray-800 dark:text-gray-300 font-medium mb-2">
                  To
                </label>
                <input
                  type="date"
                  name="to"
                  className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-royalPurple text-white p-3 rounded-lg hover:bg-slate-700 transition"
            >
              Add Task
            </button>
          </form>
        </div>
      </div>
    )}
  </div>
  );
};

export default AddTask;
