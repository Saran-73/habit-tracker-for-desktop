// import { invoke } from "@tauri-apps/api/tauri";

window.addEventListener("DOMContentLoaded", () => {
  const totalDays: number = 31;

  // const MAIN_ELEMENT = document.querySelector(".main-content")
  const MONTH_CONTAINER = document.querySelector(".month-container")
  const createElement = (element: string) => document.createElement(element);

  const handleIsChecked = (element: any) => {
    const xMarkClassName: string = "isChecked"; // class name that has a bg set to x mark using svg
    const currentElement = element.target;
    const isChecked: boolean = currentElement.classList.contains(xMarkClassName)

    if(isChecked) {
      currentElement.classList.remove(xMarkClassName)
    } else {
      currentElement.classList.add(xMarkClassName)
    }
  }

  for (let i = 0; i < totalDays; i++) {
    const checkmarkDiv = createElement("div");
    checkmarkDiv.setAttribute("class", "checkmark-block")
    checkmarkDiv.addEventListener("click", handleIsChecked)
    MONTH_CONTAINER?.append(checkmarkDiv);
  }


});

