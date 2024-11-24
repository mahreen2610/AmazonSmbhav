import React, { useState } from 'react';

function AIDocBuilder() {
  const [formData, setFormData] = useState({
    productDetails: '',
    shipmentInformation: '',
    recipientData: '',
  });
  const [generatedDocument, setGeneratedDocument] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/generate-document', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setGeneratedDocument(data.document);
    } catch (error) {
      console.error('Error generating document:', error);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>AI Document Builder</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '500px', margin: '2rem auto' }}>
        <div>
          <label htmlFor="productDetails">Product Details</label>
          <textarea
            id="productDetails"
            name="productDetails"
            value={formData.productDetails}
            onChange={handleInputChange}
            style={{ width: '100%', padding: '0.5rem' }}
            rows="4"
          ></textarea>
        </div>
        <div>
          <label htmlFor="shipmentInformation">Shipment Information</label>
          <textarea
            id="shipmentInformation"
            name="shipmentInformation"
            value={formData.shipmentInformation}
            onChange={handleInputChange}
            style={{ width: '100%', padding: '0.5rem' }}
            rows="4"
          ></textarea>
        </div>
        <div>
          <label htmlFor="recipientData">Recipient Data</label>
          <textarea
            id="recipientData"
            name="recipientData"
            value={formData.recipientData}
            onChange={handleInputChange}
            style={{ width: '100%', padding: '0.5rem' }}
            rows="4"
          ></textarea>
        </div>
        <button type="submit" style={{ padding: '0.5rem 1rem', backgroundColor: '#4a90e2', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Generate Document
        </button>
      </form>
      {generatedDocument && (
        <div style={{ marginTop: '2rem' }}>
          <h2>Generated Document</h2>
          <pre style={{ backgroundColor: '#f0f0f0', padding: '1rem', borderRadius: '4px', whiteSpace: 'pre-wrap' }}>
            {JSON.stringify(generatedDocument, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

export default AIDocBuilder;
