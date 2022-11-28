let showId = new URLSearchParams(document.location.search).get("orderId");

const orderId = document.getElementById("orderId");
orderId.textContent = showId;
alert("Merci pour votre commande");
