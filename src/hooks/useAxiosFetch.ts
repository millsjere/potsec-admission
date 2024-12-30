import { useEffect, useState } from "react";
import axios from "axios";

const LIVEURL = "https://api.potsec.edu.gh/";
// const DEVURL = "http://localhost:8000/";

export const base = axios.create({
  baseURL: LIVEURL,
  headers: {
    "Content-Type": "application/json",
    "Accept-Language": "en-US,en;q=0.9",
  },
});

const useAxiosFetch = (url: string) => {
  const [response, setResponse] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const { data: res } = await base.get(url);
      setResponse(res?.data);
    } catch (error: any) {
      setError(error?.response);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return { response, error, isLoading, fetchData };
};

export default useAxiosFetch;
