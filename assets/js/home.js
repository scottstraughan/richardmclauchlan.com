document.addEventListener("DOMContentLoaded", () => {
    if (window.location.href.indexOf("sent") !== -1) {
        document.getElementsByClassName("not-sent")[0].style.display = "none";
        document.getElementsByClassName("sent")[0].style.display = "flex";
    } else {
        document.getElementsByClassName("sent")[0].style.display = "none";
    }
});