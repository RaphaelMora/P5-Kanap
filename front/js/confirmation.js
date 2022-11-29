let showId = localStorage.getItem("orderId");

let orderId = document.getElementById("orderId");
orderId.innerText = showId;
localStorage.clear();

alert("Merci pour votre commande");
localStorage.clear();
