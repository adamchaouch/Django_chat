import { useState } from "react";
import useAxiosInterceptor from "../helpers/jwtinterceptor";
import { BASE_URL } from "../config";

// Interface defining the structure of the object returned by the useCrud hook
interface IuseCrud<T> {
    dataCRUD: T[];               // CRUD data
    fetchData: () => Promise<void>;  // Function to fetch data
    error: Error | null;          // Error object
    isLoading: boolean;           // Loading indicator
}

// Custom hook for CRUD operations using Axios
const useCrud = <T>(initialData: T[], apiURL: string): IuseCrud<T> => {
    const jwtAxios = useAxiosInterceptor();  // Custom Axios instance with JWT interception
    const [dataCRUD, setDataCRUD] = useState<T[]>(initialData);  // State for CRUD data
    const [error, setError] = useState<Error | null>(null);       // State for errors
    const [isLoading, setIsLoading] = useState(false);            // State for loading indicator

    // Asynchronous function to fetch data from the specified API endpoint
    const fetchData = async () => {
        console.log(apiURL)

        setIsLoading(true);
        try {

            //await new Promise(resolve => setTimeout(resolve,5000));
            const response = await jwtAxios.get(`${BASE_URL}${apiURL}`, {});
            const data = response.data;
            setDataCRUD(data);
            setError(null);
            setIsLoading(false);
            console.log(response.data)
            return data;
        } catch (error:any) {

            if (error.response && error.response.status === 400) {
                setError(new Error("400"));
            }
            setIsLoading(false);
            throw Error;
        }
    };

    // Return an object with the defined properties
    return { fetchData, dataCRUD, error, isLoading };
};

// Export the custom hook for use in other parts of the application
export default useCrud;
