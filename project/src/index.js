import "./styles/styles.css";
import Popover from "./popover";

document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("popoverButton");

  const popover = new Popover(button, {
    title: "Popover title",
    content: "And here's some amazing content. It's very engaging. Right?",
  });
});
