import React, { useState, useEffect } from 'react';

function Documentation() {
  const [documents, setDocuments] = useState([]);
  const [newDocument, setNewDocument] = useState({ title: '', content: '' });

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/documents');
      const data = await response.json();
      setDocuments(data);
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDocument(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/documents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newDocument),
      });
      const data = await response.json();
      setDocuments([...documents, data]);
      setNewDocument({ title: '', content: '' });
    } catch (error) {
      console.error('Error creating document:', error);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Blockchain-Based Documentation</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
        <input
          type="text"
          name="title"
          value={newDocument.title}
          onChange={handleInputChange}
          placeholder="Document Title"
          style={{ marginRight: '1rem', padding: '0.5rem' }}
        />
        <input
          type="text"
          name="content"
          value={newDocument.content}
          onChange={handleInputChange}
          placeholder="Document Content"
          style={{ marginRight: '1rem', padding: '0.5rem' }}
        />
        <button type="submit" style={{ padding: '0.5rem 1rem', backgroundColor: '#4a90e2', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Add Document
        </button>
      </form>
      <div>
        <h2>Documents</h2>
        {documents.map((doc) => (
          <div key={doc._id} style={{ marginBottom: '1rem', padding: '1rem', backgroundColor: '#f0f0f0', borderRadius: '4px' }}>
            <h3>{doc.title}</h3>
            <p>{doc.content}</p>
            <small>Hash: {doc.hash}</small>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Documentation;

