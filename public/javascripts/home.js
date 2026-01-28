document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".how-card, .stay-card").forEach((card, i) => {
        card.style.opacity = 0;
        card.style.transform = "translateY(20px)";
        setTimeout(() => {
            card.style.transition = "all 0.4s ease";
            card.style.opacity = 1;
            card.style.transform = "translateY(0)";
        }, i * 100);
    });
});
