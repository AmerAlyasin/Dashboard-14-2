"use client"
import { useEffect } from 'react';

const useQuotationEffect = (id, quotation, setFormData, setRows) => {
  useEffect(() => {
    if (quotation && Object.keys(quotation).length > 0) {
      console.log('Quotation data:', quotation);
      setFormData({
        id: quotation.id || '' , 
        clientName: quotation.clientName !== null ? quotation.clientName : '',
        projectName: quotation.projectName !== null ? quotation.projectName : '',
        projectLA: quotation.projectLA !== null ? quotation.projectLA : '',
        products: quotation.products || [],
        paymentTerm: quotation.paymentTerm !== null ? quotation.paymentTerm : '',
        paymentDelivery: quotation.paymentDelivery !== null ? quotation.paymentDelivery : '',
        note: quotation.note !== null ? quotation.note : '',
        excluding: quotation.excluding !== null ? quotation.excluding : '',
      });

      const initialRows = quotation.products.map((product, index) => ({
        _id: product._id || null,
        id: index + 1,
        number: index + 1,
        productCode: product.productCode || '',
        unitPrice: product.unitPrice || '',
        unit: product.unit || '',
        qty: product.qty,
        description: product.description || '',
      }));

      setRows(initialRows);
    }
  }, [id, quotation]);
};

export default useQuotationEffect;
