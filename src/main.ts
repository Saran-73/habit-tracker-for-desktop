// import { invoke } from "@tauri-apps/api/tauri";
import { createMonthContainer } from "./scripts/month-board";

// first script that loads right after the dom is loaded
window.addEventListener("DOMContentLoaded", () => {
  const displayedMonth = document.querySelector(".displayed-month");
  const displayedYear = document.querySelector(".displayed-year");
  const incrementBtn = document.getElementById("increment");
  const decrementBtn = document.getElementById('decrement');



  let year: number;
  let month: number;

  const date = new Date();
  month = date.getMonth() + 1;
  year = date.getFullYear();

  const displayMonthAndYear = (month: number, year: number) => {
      const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
      ];
    
      displayedMonth.textContent = monthNames[month - 1];
      displayedYear.textContent = year.toString();
  }

    displayMonthAndYear(month, year)
  
  const getDays = (year: number, month: number) => {
    return new Date(year , month, 0).getDate()
  }


  incrementBtn?.addEventListener('click', handleDateIncrement)
  decrementBtn?.addEventListener('click', handleDateDecrement)


  function handleDateDecrement() {
    if (month > 1) {
          month--;
    } else {
          month = 12;
          year--;
    }
    const totalDays: number = getDays(year, month);
    createMonthContainer(totalDays)
    displayMonthAndYear(month, year)
  }

  function handleDateIncrement() {
    if (month <= 11) {
          month++;
    } else {
          month = 1;
          year++;
    }
    const totalDays: number = getDays(year, month);
    createMonthContainer(totalDays, true)
    displayMonthAndYear(month, year)
  }
  
  const totalDays: number = getDays(year, month);
  // create UI 
  createMonthContainer(totalDays)
  


  // class Habit{
  //   name: string;
  //   alert;
  //   constructor(name: string) {
  //     this.name = name;
  //     this.alert =()=>{
  //       console.log("alert happened")
  //     }
  //   }
  //   renameHabit(newName: string){
  //     this.name = newName;
  //   }
  // }

  // const a:{ name: string, alert():void}[] = [];

  // const football = new Habit('football');
  // const read = new Habit('read');


  // football.renameHabit('soccer')


  // a.push(football)
  // a.push(read)



});

