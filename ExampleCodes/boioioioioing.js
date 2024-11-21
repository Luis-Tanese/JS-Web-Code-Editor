(function () {
    const img = document.createElement("img");

    Object.assign(img.style, {
        position: "absolute",
        margin: "0",
        zIndex: "1000",
    });

    img.id = "char1";
    img.src = "https://media.tenor.com/4hyNBpoMx9EAAAAi/cat-kitty.gif";

    img.onload = () => {
        document.body.prepend(img);

        setInterval(() => {
        const char1 = document.getElementById("char1");
        const randomX = Math.random() * (window.innerWidth - img.width);
        const randomY = Math.random() * (window.innerHeight - img.height);
        const randomRot = -45 + Math.random() * 90;

        Object.assign(char1.style, {
            left: `${randomX}px`,
            top: `${randomY}px`,
            transform: `rotate(${randomRot}deg)`,
            webkitTransform: `rotate(${randomRot}deg)`,
        });
        }, 1500);
    };
})();
