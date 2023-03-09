// import { invoke } from "@tauri-apps/api/tauri";
import { createMonthContainer } from "./scripts/month-board";

// first script that loads right after the dom is loaded
window.addEventListener("DOMContentLoaded", () => {
  const displayedMonth = document.querySelector(".displayed-month");
  const displayedYear = document.querySelector(".displayed-year");
  const incrementBtn = document.getElementById("increment");
  const decrementBtn = document.getElementById('decrement');

  incrementBtn?.addEventListener('click', handleDateIncrement);
  decrementBtn?.addEventListener('click', handleDateDecrement);

  let year: number;
  let month: number;
  // set current month and year
  const date = new Date();
  month = date.getMonth() + 1;
  year = date.getFullYear();

  function handleDateDecrement() {
    if (month > 1) {
          month--;
    } else {
          month = 12;
          year--;
    }
    createUI(year, month);
  }

  function handleDateIncrement() {
    if (month <= 11) {
          month++;
    } else {
          month = 1;
          year++;
    }
    createUI(year, month);
  }
  

  function createUI(year: number, month: number, nextMonth?:boolean) {
    const totalDays: number = getDays(year, month);
    createMonthContainer(totalDays, nextMonth);
    displayMonthAndYear(month, year);
  }

  const getDays = (year: number, month: number) => {
    return new Date(year , month, 0).getDate()
  }

  const displayMonthAndYear = (month: number, year: number) => {
    const monthNames = [
       "Jan", "Feb", "Mar", "Apr", "May", "Jun",
       "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
  
    displayedMonth.textContent = monthNames[month - 1];
    displayedYear.textContent = year.toString();
}

  createUI(year, month);
});

