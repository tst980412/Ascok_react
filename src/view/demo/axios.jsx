import { useState, useEffect, useReducer } from "react";
import axios from "axios";

const dataReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_INIT":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case "FETCH_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
  }
};

const useHockAxios = (initUrl, initData) => {
  const [url, setUrl] = useState(initUrl);
  const [state, dispatch] = useReducer(dataReducer, {
    isLoading: false,
    isError: false,
    data: initData,
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_INIT" });
      try {
        const result = await axios(url);
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (error) {
        dispatch({ type: "FETCH_FAILURE" });
      }
    };

    fetchData();
  }, [url]);
  console.log(state);
  return [setUrl, state];
};
// const useHockAxios = (initUrl, initData) => {
//   const [data, setData] = useState(initData);
//   const [url, setUrl] = useState(initUrl);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isError, setIsError] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       setIsError(false);
//       setIsLoading(true);

//       try {
//         const result = await axios(url);
//         setData(result.data);
//       } catch {
//         setIsError(true);
//       }

//       setIsLoading(false);
//     };

//     fetchData();
//   }, [url]);
//   return [{ data, isLoading, isError }, setUrl];
// };

export default useHockAxios;
