document.addEventListener("DOMContentLoaded", function () {
    console.log("Página inicial carregada!");

    // Adicionando um pequeno delay para garantir o efeito de animação
    const image = document.querySelector(".animated-image");
    setTimeout(() => {
        image.classList.add("fade-in");
    }, 500);
});
