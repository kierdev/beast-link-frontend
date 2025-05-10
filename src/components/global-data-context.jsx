import React, { createContext, useState, useEffect, useRef } from "react";

export const GlobalDataContext = createContext();

export function GlobalDataProvider({ children }) {
  const [documentLists, setDocumentLists] = useState([]);
  const [programs, setPrograms] = useState([]);
  const hasFetched = useRef(false);

  async function fetchData() {
    try {
      const response = await fetch("/api/document-lists");
      const data = await response.json();
      if (response.ok && Array.isArray(data.documentLists)) {
        const nestedData = data.documentLists.flatMap((item) => item);
        console.log("Fetched data:", nestedData);
        setDocumentLists(nestedData);
      } else {
        setDocumentLists([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setDocumentLists([]);
    }
  }

  async function fetchPrograms() {
    try {
      const response = await fetch("/api/programs");
      const data = await response.json();
      if (response.ok && Array.isArray(data.programs)) {
        const nestedData = data.programs.flatMap((item) => item);
        console.log("Fetched programs:", nestedData);
        setPrograms(nestedData);
      } else {
        setPrograms([]);
      }
    } catch (error) {
      console.error("Error fetching programs:", error);
      setPrograms([]);
    }
  }

  useEffect(() => {
    if (!hasFetched.current) {
      async function fetchData() {
        try {
          const response = await fetch("/api/document-lists");
          const data = await response.json();
          if (response.ok && Array.isArray(data.documentLists)) {
            const nestedData = data.documentLists.flatMap((item) => item);
            console.log("Fetched data:", nestedData);
            setDocumentLists(nestedData);
          } else {
            setDocumentLists([]);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
          setDocumentLists([]);
        }
      }
      fetchData();
      fetchPrograms(); // Fetch programs data
      hasFetched.current = true;
    }
  }, []);

  return (
    <GlobalDataContext.Provider value={{ documentLists, setDocumentLists, fetchData, programs, fetchPrograms }}>
      {children}
    </GlobalDataContext.Provider>
  );
}
