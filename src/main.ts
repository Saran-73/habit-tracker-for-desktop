// import { invoke } from "@tauri-apps/api/tauri";
import { createMonthContainer } from "./scripts/month-board";

// first script that loads right after the dom is loaded
window.addEventListener("DOMContentLoaded", () => {
  const totalDays: number = 31;
  createMonthContainer(totalDays)

});

