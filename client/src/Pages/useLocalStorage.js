// import { useState, useEffect } from "react";
// // localStorage.clear();

// let get = (key, initialValue) => {
//   const returnValue = localStorage.getItem(key);

//   if (returnValue) return returnValue;
//   if (initialValue instanceof Function) return initialValue();

//   return initialValue;
// };
// //  getOrSet("name", "Prince")

// const useLocalStorage = (key, initialValue) => {
//   const [val, setVal] = useState(() => get(key, initialValue));

//   useEffect(() => {
//     localStorage.setItem(key, JSON.stringify(val));
//   }, [val]);

//   return [val, setVal];
// };

// export default useLocalStorage;
