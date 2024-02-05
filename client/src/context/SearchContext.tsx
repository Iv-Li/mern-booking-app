// eslint-disable react-refresh/only-export-components
import { createContext, PropsWithChildren, useContext, useState } from 'react';

export interface ISearchParams {
  destination: string;
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
  hotelId: string;
}
interface ISearchContext extends ISearchParams {
  onSearch(params: Omit<ISearchParams, 'hotelId'>): void
}

const SearchContext = createContext<ISearchContext | null>(null)
const SearchContextProvider = ({ children }: PropsWithChildren) => {
  const [destination, setDestination] = useState(sessionStorage.getItem("destination") || "")
  const [checkIn, setCheckIn] = useState(new Date(sessionStorage.getItem("checkIn") || new Date().getTime()))
  const [checkOut, setCheckOut] = useState(new Date(sessionStorage.getItem("checkOut") || new Date().getTime()))
  const [adultCount, setAdultCount] = useState(parseInt(sessionStorage.getItem("adultCount") || "1"))
  const [childCount, setChildCount] = useState(parseInt(sessionStorage.getItem("adultCount") || "0"))
  const [hotelId, setHotelId] = useState(sessionStorage.getItem("hotelID") || "")
  const onSearch = ({
     destination, checkIn, checkOut, adultCount, childCount, hotelId
  }: ISearchParams) => {
    setDestination(destination);
    setCheckIn(checkIn);
    setCheckOut(checkOut);
    setAdultCount(adultCount);
    setChildCount(childCount);
    if (hotelId) {
      setHotelId(hotelId);
    }

    sessionStorage.setItem("destination", destination);
    sessionStorage.setItem("checkIn", checkIn.toISOString());
    sessionStorage.setItem("checkOut", checkOut.toISOString());
    sessionStorage.setItem("adultCount", adultCount.toString());
    sessionStorage.setItem("childCount", childCount.toString());

    if (hotelId) {
      sessionStorage.setItem("hotelId", hotelId);
    }
  }
  return (
    <SearchContext.Provider value={{
      destination, checkIn, checkOut, adultCount, childCount, hotelId,
      onSearch
    }}>
      {children}
    </SearchContext.Provider>
  )
}

const useSearchContext = () =>  useContext(SearchContext) as ISearchContext

export {
  SearchContextProvider,
  // eslint-disable-next-line react-refresh/only-export-components
  useSearchContext
}

