"use client"
import React, { useEffect } from 'react';
import styles from '@/app/ui/dashboard/quotations/addQuotations/addQuotations.module.css';
import QuotationTable from '@/app/ui/dashboard/table/table';
import useQuotationLogic from '@/useQuoataionLogic';
import { fetchQuotations } from '@/app/lib/data';
import { fetchQuotationById} from '@/app/lib/data'


// Define the component
const SingleQuotation =  ({params}) => { 
  
  const {id} = params;
  console.log(id)
  const {
    formData,
    rows,
    addRow,
    deleteRow,
    handleRowInputChange,
    handleInputChange,
    handleSubmit,
  } = useQuotationLogic(id);

  // Fetch the quotation data only once when the component mounts
  
  useEffect(() => {
    const getQuotation = async () => {
      try {
        const quotation = await fetchQuotationById(id);
        console.log('Quotation data:', quotation); // Log the fetched data
        // Do something with the quotation data
      } catch (error) {
        // Handle the error
      }
    };
    getQuotation();
  }, [id]);


  return (
    
    <div>
      <form onSubmit={handleSubmit}>
        <div className={styles.container}>
          <div className={styles.form}>
            <input type="hidden" name="id" value={id} />
            <input
              name='clientName'
              className={styles.input}
              placeholder="clientName"
              value={formData.clientName}
              onChange={handleInputChange} // Use the name attribute to update the state
            />
            <input
              name='projectName'
              className={styles.input}
              placeholder="projectName"
              value={formData.projectName}
              onChange={handleInputChange}
            />
            <input
              name='projectLA'
              className={styles.input}
              placeholder="projectLA"
              value={formData.projectLA}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className={styles.container}>
        <QuotationTable
            rows={rows}
            handleRowInputChange={handleRowInputChange}
            addRow={addRow}
            deleteRow={deleteRow}
          />
          </div>
        <div className={styles.container}>
          <div className={styles.form}>
            <input
              name='paymentTerm'
              className={styles.input}
              placeholder="paymentTerm"
              value={formData.paymentTerm}
              onChange={handleInputChange}
            />
            <input
              name='paymentDelivery'
              className={styles.input}
              placeholder="paymentDelivery"
              value={formData.paymentDelivery}
              onChange={handleInputChange}
            />
            <input
              name='note'
              className={styles.input}
              placeholder="note"
              value={formData.note}
              onChange={handleInputChange}
            />
            <input
              name='excluding'
              className={styles.input}
              placeholder="excluding"
              value={formData.excluding}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
  
};

export default SingleQuotation;
