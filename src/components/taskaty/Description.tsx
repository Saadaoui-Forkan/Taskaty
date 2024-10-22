"use client";
import dynamic from 'next/dynamic';
import React, { useState } from 'react';
const DynamicCKEditor = dynamic(
    async () => {
      const { CKEditor } = await import('@ckeditor/ckeditor5-react');
      const ClassicEditor = await import('@ckeditor/ckeditor5-build-classic');
      return (props: any) => <CKEditor editor={ClassicEditor.default} {...props} />;
    },
    { ssr: false }
  );
  
const Description = () => {
  const [data, setData] = useState<string>('');

  return (
    <div className="editor-container space-y-2">
      <p className="text-gray-800 dark:text-gray-300 font-medium mb-2">
        Task Description
      </p>
      <DynamicCKEditor 
        config={{
          toolbar: [
            'heading',
            '|',
            'bold',
            'italic',
            'link',
            '|',
            'bulletedList',
            'numberedList',
            '|',
            'undo',
            'redo',
          ],
        }}
        onChange={(event: any, editor: { getData: () => string }) => {
          const content = editor.getData();
          console.log(content);
          setData(content);
        }}
      />
    </div>
  );
};

export default Description;
