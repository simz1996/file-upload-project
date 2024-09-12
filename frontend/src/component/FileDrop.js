import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

const FileDrop = () => {
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];

    // Create FormData to send the file
    const formData = new FormData();
    formData.append('file', file);

    // Send the file to the backend
    axios.post('http://localhost:3001/upload', formData)
      .then((response) => {
        console.log('File uploaded successfully:', response.data);
      })
      .catch((error) => {
        console.error('Error uploading file:', error);
      });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} style={{ border: '2px dashed #000', padding: '20px', width: '300px', textAlign: 'center' }}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag 'n' drop some files here, or click to select files</p>
      }
    </div>
  );
}

export default FileDrop;
