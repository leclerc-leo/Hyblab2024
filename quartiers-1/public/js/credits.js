let origin = sessionStorage.getItem("comeFrom");
console.log(origin);
if (origin === "index") {
    document.querySelectorAll(".deletable").forEach(element => {
        element.remove();
    });
}
