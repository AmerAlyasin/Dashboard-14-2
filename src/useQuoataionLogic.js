"use client"
import { useEffect } from 'react';
import { fetchQuotationById } from '@/app/lib/data';
import { updateQuotation } from './app/lib/actions';
import useQuotationEffect from '@/useQuotationEffect';
import useQuotationStateAndTable from '@/useQuotationStateAndTable';

const useQuotationLogic = (id) => {
  // State variables for form data and rows
  const { formData, setFormData, rows, setRows } = useQuotationStateAndTable();

  console.log(formData)
  console.log(rows)
  // Fetch quotation data
  useEffect(() => {
    const fetchQuotationData = async () => {
      try {
        const quotation = await fetchQuotationById(id);
// Use the custom hook to update the state with the quotation data
useQuotationEffect(id,quotation, setFormData, setRows); 
      } catch (error) {
        // Handle the error
      }
    };

    fetchQuotationData();
  }, [id, setFormData, setRows]); // Add the state setters as dependencies

  // Function to add a new row to the products table
  const addRow = () => {
    const newRow = { id: rows.length + 1, number: rows.length + 1 };
    setRows((prevRows) => [...prevRows, newRow]);
  };

  // Function to delete a row from the products table
  const deleteRow = (index) => {
    const updatedRows = rows.filter((_, i) => i !== index);
    const updatedRowsWithNumbers = updatedRows.map((row, i) => ({ ...row, number: i + 1 }));
    setRows(updatedRowsWithNumbers);
  };

  // Function to handle input change for each row
  const handleRowInputChange = (index, fieldName, value) => {
    setRows((prevRows) =>
      prevRows.map((row, i) =>
        i === index ? { ...row, [fieldName]: value } : row
      )
    );
  };

  // Function to handle input change for the main form
  const handleInputChange = (e) => {
    const { name, value } = e.target; // Destructure the name and value from the event object
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value, // Use the name attribute to update the state
    }));
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const rowInputs = rows.map((row) => ({
      productCode: row.productCode, 
      unitPrice: row.unitPrice,
      unit: row.unit,
      qty: row.qty,
      description: row.description,
    }));

    await updateQuotation({
      id,
      ...formData,
      products: rowInputs,
    });
  };

  return {
    formData,
    rows,
    addRow,
    deleteRow,
    handleRowInputChange,
    handleInputChange,
    handleSubmit,
  };
};

export default useQuotationLogic;
