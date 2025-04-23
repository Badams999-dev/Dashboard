
import React from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
export default function Upload({ onBom }) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop: async (files) => {
      const form = new FormData();
      files.forEach(f=>form.append('files',f));
      const res = await axios.post('/api/upload', form, { headers:{'Content-Type':'multipart/form-data'} });
      onBom(res.data);
  }, multiple: true });
  return (<div {...getRootProps()} style={{border:'2px dashed #888',padding:'1.5rem',marginTop:'1rem',textAlign:'center',cursor:'pointer'}}>
    <input {...getInputProps()} />
    {isDragActive ? 'Drop to upload' : 'Drag & drop PDFs / STEP files here'}
  </div>);
}
