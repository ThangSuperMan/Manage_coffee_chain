import { useState, useEffect } from 'react';
import axios from 'axios';
import { constants } from '@/constants';

axios.defaults.baseURL = constants.baseURL;

interface Props {
  url: string;
  method: string;
  body?: any;
  headers?: any;
}

interface Error {
  detail: string;
  message: string;
}

const useAxios = (props: Props) => {
  const { url, method, body, headers } = props;
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<Error>();
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    axios(url, {
      method: method,
      headers: headers,
      data: body,
    })
      .then((res: any) => {
        setResponse(res);
      })
      .catch((err: Error) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { response, error, loading };
};

export default useAxios;
