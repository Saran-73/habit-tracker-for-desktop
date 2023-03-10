import { createElement } from "../utils/dom-methods";
import { currentHabit } from "../utils/state";


export const createMonthContainer = (totalDays: number, monthId:string, data?: number[],  nextMonth?: boolean) => {
    const MONTH_CONTAINER_WRAPPER = document.querySelector(".month-parent-container");

    const MONTH_CONTAINER = createElement('section');
    MONTH_CONTAINER.setAttribute("class", "month-container");
    MONTH_CONTAINER.setAttribute("id", monthId);
 
    let days = totalDays;
    // if the month is february just add an extra block but hide that one 
    if (totalDays === 28) {
        days = 29
    }

    for (let i = 0; i < days; i++) {
        const checkmarkDiv = createElement("div");
        if (totalDays === 28 && i === 28) {
            checkmarkDiv.setAttribute("class", "checkmark-block-hidden")
        } else {
            checkmarkDiv.setAttribute("class", "checkmark-block")
        }

        // add checkmark if its already in the data
        if (data?.includes(i+1)) {
            checkmarkDiv.classList.add("isChecked")
        }

        let id = i + 1;

        checkmarkDiv.setAttribute("data-id",id.toString())
        checkmarkDiv.addEventListener("click", (e)=>handleCheckMark(e, data ))
        MONTH_CONTAINER?.append(checkmarkDiv);
    }


    if (nextMonth) {
        MONTH_CONTAINER_WRAPPER?.append(MONTH_CONTAINER)   
        MONTH_CONTAINER.scrollIntoView({block: "start", behavior: "smooth"})

    } else {
        MONTH_CONTAINER_WRAPPER?.prepend(MONTH_CONTAINER)
        MONTH_CONTAINER.scrollIntoView({block: "nearest", behavior: "smooth"})
    }

}
const handleCheckMark = (e: any, monthArray: number[]) => {
    let blockId = parseInt(e.target.getAttribute("data-id"), 10);
    const isChecked = e.target.classList.contains("isChecked");
    let updatedMonth: number[];
    if (isChecked) {
        updatedMonth =  monthArray.filter((each)=> each !== blockId);
    } else {
        updatedMonth = [...monthArray, blockId]
    }

    updateCurrentMonthData(updatedMonth, currentHabit.id, e)
}

export const handleIsChecked = (element: any, checked: 'isChecked' | 'isActive') => {
    const xMarkClassName: string = checked; // class name that has a bg set to x mark using svg
    const currentElement = element.target;
    const isChecked: boolean = currentElement.classList.contains(xMarkClassName);
   
    if (isChecked && checked === 'isChecked') {
        currentElement.classList.remove(xMarkClassName)
    } else {
        currentElement.classList.add(xMarkClassName)
    }
}

const updateCurrentMonthData = (monthArray: number[], id: string,e :any) => {
    fetch(`api/habits/${id}`,{
        method: "PATCH",
        body: JSON.stringify({
            month_data: monthArray
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
    }).then((response) => response.json())
        .then((data) => {
            handleIsChecked(e, "isChecked")
        })
}