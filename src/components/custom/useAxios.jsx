import { useState } from 'react';
import axios from 'axios';

export function useAxios() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = async (url, requestData) => {
    try {
      const response = await axios.get(url, { params: requestData });
      setData(response.data);
    } catch (error) {
      setError(error);
    }
  };

  return { data, error, fetchData };
}
