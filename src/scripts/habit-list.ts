import { removeMonthContainer } from "../utils";
import { createElement } from "../utils/dom-methods"
import { currentHabit } from "../utils/state";
import { createMonthContainer, handleIsChecked } from "./month-board";

export const createHabitLists = () => {

         fetch("/api/habits")
            .then((response) => response.json())
            .then((data) => {
            createHabitsUI(data); 
              console.log(data)
          }).catch((error) => {
            console.error(error)
          });
    
    const createHabitsUI = ({ habits }: { habits: { id: string, name: string }[] }) => {
    const SIDEBAR = document.querySelector(".sidebar") 
        habits.map(eachhabit => {
            const EACHHABIT = createElement("div");
            EACHHABIT.setAttribute("class", 'each-habit')
            EACHHABIT.setAttribute("data-id", eachhabit.id)
            EACHHABIT.addEventListener('click',(e)=> handleFetchingHabit(e, eachhabit.name))
            EACHHABIT.textContent = eachhabit.name;
             SIDEBAR?.append(EACHHABIT)
        })
        

        function handleFetchingHabit(e: any, name: string) {
          currentHabit.name = name;
          let id = parseInt(e.target.getAttribute("data-id"), 10);
            const allHabitsNode = document.querySelectorAll(".each-habit");

            allHabitsNode.forEach((each) => {
                each.classList.remove('isActive')
            })
            handleIsChecked(e, "isActive")


            // get and display all the habits name in sidebar
            fetch(`/api/habits/${id}`)
            .then((response) => response.json())
              .then(({habits}) => {
              console.log(habits)
                removeMonthContainer()
                createMonthContainer(31, "Mar-2023", habits.month_data);
          }).catch((error) => {
            console.error(error)
          });

         
        }
    }

}
    