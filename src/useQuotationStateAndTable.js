import { useState, useEffect } from 'react';

const useQuotationStateAndTable = (quotation) => {
  // State variables for form data and rows
  const [formData, setFormData] = useState(() => ({
    clientName: quotation?.clientName || '',
    projectName: quotation?.projectName || '',
    projectLA: quotation?.projectLA || '',
    products: quotation?.products || [],
    paymentTerm: quotation?.paymentTerm || '',
    paymentDelivery: quotation?.paymentDelivery || '',
    note: quotation?.note || '',
    excluding: quotation?.excluding || '',
  }));

  const [rows, setRows] = useState(() => {
    return quotation
      ? quotation.products.map((product, index) => ({
          _id: product._id,
          id: index + 1,
          number: index + 1,
          productCode: product.productCode,
          unitPrice: product.unitPrice,
          unit: product.unit,
          qty: product.qty,
          description: product.description,
        }))
      : [
          {
            _id: null,
            id: 1,
            number: 1,
            productCode: '',
            unitPrice: '',
            unit: '',
            qty: '',
            description: '',
          },
        ];
  });

  useEffect(() => {
    // Update the state when the quotation prop changes
    setFormData((prevFormData) => ({
      ...prevFormData,
      clientName: quotation?.clientName || '',
      projectName: quotation?.projectName || '',
      projectLA: quotation?.projectLA || '',
      products: quotation?.products || [],
      paymentTerm: quotation?.paymentTerm || '',
      paymentDelivery: quotation?.paymentDelivery || '',
      note: quotation?.note || '',
      excluding: quotation?.excluding || '',
    }));

    setRows(() => {
      return quotation
        ? quotation.products.map((product, index) => ({
            _id: product._id,
            id: index + 1,
            number: index + 1,
            productCode: product.productCode,
            unitPrice: product.unitPrice,
            unit: product.unit,
            qty: product.qty,
            description: product.description,
          }))
        : [
            {
              _id: null,
              id: 1,
              number: 1,
              productCode: '',
              unitPrice: '',
              unit: '',
              qty: '',
              description: '',
            },
          ];
    });
  }, [quotation]);

  return { formData, setFormData, rows, setRows };
};

export default useQuotationStateAndTable;
