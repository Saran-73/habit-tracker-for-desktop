import { createElement } from "../utils/dom-methods";


export const createMonthContainer = (totalDays: number) => {
    const MONTH_CONTAINER = document.querySelector(".month-container")

    for (let i = 0; i < totalDays; i++) {
        const checkmarkDiv = createElement("div");
        checkmarkDiv.setAttribute("class", "checkmark-block")
        checkmarkDiv.addEventListener("click", handleIsChecked)
        MONTH_CONTAINER?.append(checkmarkDiv);
    }
}

const handleIsChecked = (element: any) => {
    const xMarkClassName: string = "isChecked"; // class name that has a bg set to x mark using svg
    const currentElement = element.target;
    const isChecked: boolean = currentElement.classList.contains(xMarkClassName);

    if (isChecked) {
        currentElement.classList.remove(xMarkClassName)
    } else {
        currentElement.classList.add(xMarkClassName)
    }
}
