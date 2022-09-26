let orderId = new URLSearchParams(document.location.search).get("orderId");
document.getElementById("orderId").innerHTML = orderId;
alert("Merci pour votre commande")