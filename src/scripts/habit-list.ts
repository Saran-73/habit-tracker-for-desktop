import { removeMonthContainer } from "../utils";
import { createElement } from "../utils/dom-methods"
import { currentHabit } from "../utils/state";
import { createMonthContainer, handleIsChecked } from "./month-board";

export const createHabitLists = () => {

         fetch("/api/habits")
            .then((response) => response.json())
            .then((data) => {
            createHabitsUI(data); 
          }).catch((error) => {
            console.error(error)
          });
    
    const createHabitsUI = ({ habits }: { habits: { id: number, name: string }[] }) => {
    const SIDEBAR = document.querySelector(".sidebar") 
        habits.map(eachhabit => {
            const EACHHABIT = createElement("div");
            EACHHABIT.setAttribute("class", 'each-habit')
            EACHHABIT.addEventListener('click',(e)=> handleFetchingHabit(e, eachhabit.name))
            EACHHABIT.textContent = eachhabit.name;
             SIDEBAR?.append(EACHHABIT)
        })
        

        function handleFetchingHabit(e: any, name: string) {
            currentHabit.name = name;
            const allHabitsNode = document.querySelectorAll(".each-habit");

            allHabitsNode.forEach((each) => {
                each.classList.remove('isActive')
            })
            handleIsChecked(e, "isActive")


            // get and display all the habits name in sidebar
            fetch("/api/habits/2")
            .then((response) => response.json())
            .then(({habit}) => {
                removeMonthContainer()
                createMonthContainer(31, "Mar-2023", habit?.month_data?.march);
          }).catch((error) => {
            console.error(error)
          });

         
        }
    }

}
    