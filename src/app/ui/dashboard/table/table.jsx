import React from 'react'
import { FaPlus, FaTrash } from 'react-icons/fa';
import styles from '@/app/ui/dashboard/table/table.module.css'

const QuotationTable = ({rows, handleRowInputChange, addRow, deleteRow}) => {
  return (
    <div className={styles.form}>
      <p className={styles.title}>Products</p>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Number</td>
            <td>Product Code</td>
            <td>Unit Price</td>
            <td>Unit</td>
            <td>Qty</td>
            <td>Description</td>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => {
            // Destructure the row properties
            const { id, number, productCode, unitPrice, unit, qty, description } = row;
            return (
              <tr key={id} className={styles.row}>
                <td>
                  <input
                    className={`${styles.input} ${styles.numberInput}`}
                    type="text"
                    value={number}
                    readOnly
                  />
                </td>
                <td>
                  <input
                    name="productCode" // Use the same name as the row property
                    className={styles.input1}
                    placeholder={productCode}
                    value={productCode}
                    onChange={handleRowInputChange} // Pass the event object directly
                  />
                </td>
                <td>
                  <input
                    name="unitPrice" // Use the same name as the row property
                    className={styles.input1}
                    placeholder={unitPrice}
                    value={unitPrice}
                    onChange={handleRowInputChange} // Pass the event object directly
                  />
                </td>
                <td>
                  <input
                    name="unit" // Use the same name as the row property
                    className={styles.input1}
                    placeholder={unit}
                    value={unit}
                    onChange={handleRowInputChange} // Pass the event object directly
                  />
                </td>
                <td>
                  <input
                    name="qty" // Use the same name as the row property
                    className={styles.input1}
                    placeholder={qty}
                    value={qty}
                    onChange={handleRowInputChange} // Pass the event object directly
                  />
                </td>
                <td>
                  <textarea
                    name="description" // Use the same name as the row property
                    className={`${styles.input1} ${styles.textarea}`}
                    placeholder={description}
                    value={description}
                    onChange={handleRowInputChange} // Pass the event object directly
                  ></textarea>
                </td>
                <td>
                  {/* Use a ternary operator to conditionally render the button icons */}
                  <button
                    type="button"
                    className={styles.iconButton}
                    onClick={index === rows.length - 1 ? addRow : () => deleteRow(index)}
                  >
                    {index === rows.length - 1 ? <FaPlus /> : <FaTrash />}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default QuotationTable;
