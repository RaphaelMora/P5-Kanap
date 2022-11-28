let params = new URLSearchParams(document.location.search);
let id = params.get("orderId");

const orderId = document.getElementById("orderId");
orderId.textContent = id;
alert("Merci pour votre commande");
