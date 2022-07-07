import { useEffect, useState } from 'react';
import axios from 'axios';

const useSendGetApiRequest = (initialData, url, mapResponseToData) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [data, setData] = useState(initialData);
  
  useEffect(() => {
    let didCancel = false;
    axios.get(url)
      .then(response => {
        if (!didCancel) {
          setLoading(false)
          setData(mapResponseToData(response))
        }
      })
      .catch(() => {
        if (!didCancel) {
          setLoading(false);
          setError("Something went wrong")
        }
      });
    return () => {
      didCancel = true;
    }
  }, [url, mapResponseToData]);
  
  return {
    loading: loading,
    error: error,
    data: data,
    setLoading
  }
  
}

export default useSendGetApiRequest;
