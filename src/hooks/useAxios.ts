import React, { useState, useRef, useEffect } from 'react';
import axios, { AxiosError } from 'axios';

interface TodoObject {
  title: string;
  body: string;
  userId: number;
}

const useAxios = (url: string, method: string, payload: TodoObject) => {
  const [data, dataSet] = useState(null);
  const [error, errorSet] = useState<string>('');
  const [loaded, loadedSet] = useState<boolean>(false);
  const controllerRef = useRef<AbortController>(new AbortController());

  const cancel = () => {
    controllerRef.current.abort();
  };

  useEffect(() => {
    (async () => {
      let response;
      try {
        switch (method) {
          case 'GET':
            response = await axios.request({
              data: '',
              signal: controllerRef.current.signal,
              method: 'GET',
              url,
            });
            break;
          case 'POST':
            response = await axios.request({
              data: payload,
              signal: controllerRef.current.signal,
              method: 'POST',
              url,
            });
            break;
          case 'DELETE': {
            response = await axios.request({
              data: payload,
              signal: controllerRef.current.signal,
              method: 'DELETE',
              url,
            });
            break;
          }
          default:
            throw new Error();
        }
        dataSet(response.data);
      } catch (error) {
        const err = error as AxiosError;
        errorSet(err.message);
      } finally {
        loadedSet(true);
      }
    })();
  }, []);

  return { cancel, data, error, loaded };
};

export default useAxios;
