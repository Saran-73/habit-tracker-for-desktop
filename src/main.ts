// import { invoke } from "@tauri-apps/api/tauri";
import { createMonthContainer } from "./scripts/month-board";

// first script that loads right after the dom is loaded
window.addEventListener("DOMContentLoaded", () => {
  const displayedMonth = document.querySelector(".displayed-month");
  const displayedYear = document.querySelector(".displayed-year");
  const incrementBtn = document.getElementById("increment");
  const decrementBtn = document.getElementById('decrement');
  // const MONTH_CONTAINER_WRAPPER = document.querySelector(".month-parent-container");


  incrementBtn?.addEventListener('click', handleDateIncrement);
  decrementBtn?.addEventListener('click', handleDateDecrement);

  let year: number;
  let month: number;
  // set current month and year
  const date = new Date();
  month = date.getMonth() + 1;
  year = date.getFullYear();
 
  // let previousMonthExists: boolean | undefined;
  // let upcomingMonthExists: boolean | undefined;

  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
 ];

  // let options = {
  //   root: document.querySelector(".month-parent-container"),
  //   rootMargin: "0px 0px 2px 0px",
  //   threshold: 1.0,
  // };
  
  // let observer = new IntersectionObserver(callback, options);

  // function callback(entries: any[]) {
  //   entries.forEach((entry) => {
  //     if (entry.isIntersecting) {
  //       let elem = entry.target;
  //       console.log(entry, elem)
  //     }
  //   });
  // }
  // const target = document.querySelector(`#${monthNames[month]+"-"+year.toString()}`);
  // observer.observe(target);
  // console.log(target)

  function handleDateDecrement() {
    if (month > 1) {
          month--;
    } else {
          month = 12;
          year--;
    }

    const MONTH_CONTAINER = document.querySelector(".month-container");
    MONTH_CONTAINER?.remove()

    createUI(year, month, getIdForMonth(month, year) );

    // displayMonthAndYear(month, year);
  }

  function handleDateIncrement() {
    if (month <= 11) {
          month++;
    } else {
          month = 1;
          year++;
    }

    const MONTH_CONTAINER = document.querySelector(".month-container");
    MONTH_CONTAINER?.remove()

    createUI(year, month, getIdForMonth(month, year), true);
  }
  
  function getIdForMonth(month: number, year:number){
   return `${monthNames[month - 1]+"-"+year.toString()}`
  }

  function createUI(year: number, month: number, monthId:string, nextMonth?:boolean,) {
    const totalDays: number = getDays(year, month);
    createMonthContainer(totalDays, monthId, nextMonth);
    displayMonthAndYear(month, year);
  }

  const getDays = (year: number, month: number) => {
    return new Date(year , month, 0).getDate()
  }

  const displayMonthAndYear = (month: number, year: number) => {
    displayedMonth.textContent = monthNames[month - 1];
    displayedYear.textContent = year.toString();
  }
  
  createUI(year, month, getIdForMonth(month, year));

});

