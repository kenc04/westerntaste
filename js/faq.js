document.addEventListener("DOMContentLoaded", function () {
    const events = document.querySelectorAll(".event");

    events.forEach((event) => {
        const content = event.querySelector(".content");
        const contentHeight = content.scrollHeight;

        content.style.maxHeight = "0";

        event.addEventListener("click", () => {
            if (!event.classList.contains("active")) {
                event.classList.add("active");
                content.style.maxHeight = contentHeight + "px";
            } else {
                event.classList.remove("active");
                content.style.maxHeight = "0";
            }
        });
    });
});

const faqs = document.querySelectorAll(".faq");

faqs.forEach((faq) => {
    faq.addEventListener("click", () => {
        faq.classList.toggle("active");
    });
});