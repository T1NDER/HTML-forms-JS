class Popover {
  constructor(triggerElement, options = {}) {
    this.trigger = triggerElement;
    this.title = options.title || "Popover title";
    this.content = options.content || "Popover content";
    this.popover = null;
    this.isVisible = false;

    this.init();
  }

  init() {
    this.trigger.addEventListener("click", (e) => {
      e.stopPropagation();
      this.toggle();
    });

    document.addEventListener("click", (e) => {
      if (this.isVisible && !this.popover.contains(e.target)) {
        this.hide();
      }
    });

    this.trigger.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.hide();
      }
    });
  }

  toggle() {
    if (this.isVisible) {
      this.hide();
    } else {
      this.show();
    }
  }

  show() {
    if (this.isVisible) return;

    this.popover = this.createPopover();
    document.body.appendChild(this.popover);
    this.positionPopover();
    this.isVisible = true;

    requestAnimationFrame(() => {
      this.popover.classList.add("show");
    });
  }

  hide() {
    if (!this.isVisible) return;

    this.popover.classList.remove("show");
    setTimeout(() => {
      if (this.popover && this.popover.parentNode) {
        this.popover.parentNode.removeChild(this.popover);
      }
      this.popover = null;
      this.isVisible = false;
    }, 150);
  }

  createPopover() {
    const popover = document.createElement("div");
    popover.className = "popover bottom";
    popover.setAttribute("role", "tooltip");

    const arrow = document.createElement("div");
    arrow.className = "popover-arrow";

    const header = document.createElement("div");
    header.className = "popover-header";
    header.textContent = this.title;

    const body = document.createElement("div");
    body.className = "popover-body";
    body.textContent = this.content;

    popover.append(arrow);
    popover.append(header);
    popover.append(body);

    return popover;
  }

  positionPopover() {
    if (!this.popover) return;

    const triggerRect = this.trigger.getBoundingClientRect();
    const popoverRect = this.popover.getBoundingClientRect();

    const top = triggerRect.bottom + window.scrollY + 8;
    const left =
      triggerRect.left +
      window.scrollX +
      triggerRect.width / 2 -
      popoverRect.width / 2;

    this.popover.style.top = `${top}px`;
    this.popover.style.left = `${left}px`;
  }
}

export default Popover;
