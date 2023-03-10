
 export const removeMonthContainer = () => {
    const MONTH_CONTAINER = document.querySelector(".month-container");
    MONTH_CONTAINER?.remove()
 }
 
  export const getDays = (year: number, month: number) => {
     return new Date(year , month, 0).getDate()
   }