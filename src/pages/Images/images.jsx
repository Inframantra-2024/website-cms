import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
    console.log('File selected:', e.target.files[0]);
  };

//   const onFileUpload = async (e) => {
//     e.preventDefault();
//     if (!file) {
//       setMessage('Please select a file to upload.');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('file', file);
//     console.log('FormData created:', formData);

//     const url = 'http://localhost:5000/api/v1/file/upload';

//     try {
//       setLoading(true);
//       console.log(`Uploading to ${url}`);
//       const response = await axios.post(url, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       console.log('Response:', response);
//       setMessage(`File uploaded successfully: ${response.data.file.path}`);
//     } catch (error) {
//       console.error('Error uploading file:', error);
//       setMessage(`Error uploading file: ${error.response ? error.response.data.message : error.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };
     
const onFileUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage('Please select a file to upload.');
      return;
    }
  
    const formData = new FormData();
    formData.append('file', file);
    console.log(formData);
    // Log FormData content
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }
  
    const url = 'http://localhost:5000/api/v1/file/upload';
  
    try {
      setLoading(true);
      console.log(`Uploading to ${url}`);
      const response = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Response:', response);
      setMessage(`File uploaded successfully: ${response.data.file.path}`);
    } catch (error) {
      console.error('Error uploading file:', error);
      setMessage(`Error uploading file: ${error.response ? error.response.data.message : error.message}`);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <h1>File Upload</h1>
      <form onSubmit={onFileUpload}>
        <div>
          <input type="file" onChange={onFileChange} />
        </div>
        <div>
          <button type="submit" disabled={loading}>
            {loading ? 'Uploading...' : 'Upload File'}
          </button>
        </div>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default FileUpload;
