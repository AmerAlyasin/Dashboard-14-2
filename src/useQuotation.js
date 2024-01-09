/**import { useEffect, useState } from 'react';
import { connectToDB } from './app/lib/utils';

export const useQuotation = (id) => {
  const [quotation, setQuotation] = useState(null);
  const [error, setError] = useState(null); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      return;
    }
  
    console.log('ID in useQuotation Hook:', id);
    const fetchData = async () => {
      try {
        await connectToDB();
        const response = await fetch(`/quotations/[id]?id=1234`);
  
        if (!response.ok) {
          throw new Error('Failed to fetch quotation');
        }
  
        const fetchedQuotation = await response.json();
        setQuotation(fetchedQuotation);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
    console.log('useQuotation Hook - ID:', id);
  }, [id]);

  return { quotation, error, loading };
};
*/