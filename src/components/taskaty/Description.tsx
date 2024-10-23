"use client";
import React, { SetStateAction, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const QuillEditor = dynamic(() => import('react-quill'), { ssr: false });

const Description = () => {
  const [description, setDescription] = useState<string>('');

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image'],
      [{ align: [] }],
      [{ color: [] }],
      ['code-block'],
      ['clean'],
    ],
  };

  const quillFormats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'link',
    'image',
    'align',
    'color',
    'code-block',
  ];

  const handleEditorChange = (content: SetStateAction<string>) => {
    setDescription(content);
  };
  return (
    <div className=" bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-900">
      <h2 className="text-gray-800 dark:text-gray-300 font-medium mb-2">
        Task Description
      </h2>
      <QuillEditor
        value={description}
        onChange={handleEditorChange}
        modules={quillModules}
        formats={quillFormats}
        className="w-full bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-4 focus:ring-indigo-400 focus:border-indigo-500 transition-all text-gray-900 dark:text-gray-100 text-xl"
      />
    </div>
  );
};

export default Description;
