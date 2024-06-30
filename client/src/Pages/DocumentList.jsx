import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import {server} from "../main"

const DocumentList = ({ projectId }) => { 
  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDocuments = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${server}/document/${projectId}/documents`);
        // console.log("response",response.data)
        setDocuments(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (projectId) {
      fetchDocuments();
    }
  }, [projectId]);

  return (
    <div className='flex  flex-col justify-center items-center'>
      <h1>Documents inside a project</h1>
      {isLoading && <p>Loading documents...</p>}
      {error && <p>Error fetching documents: {error.message}</p>}
      {!isLoading && !error && projectId && ( 
        <ul>
          {documents.map((document) => (
            <li key={document._id}>{document.file_name}</li>
          ))}
        </ul>
      )}
      {!projectId && <p>Please select a project to view documents.</p>}
    </div>
  );
};

export default DocumentList;
