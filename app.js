document.getElementById("reservationForm").addEventListener("submit", function(e) {
    e.preventDefault(); // Zabráníme standardnímu odeslání formuláře

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;

    // Odeslání dat na server
    fetch("http://localhost:5000/book", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: name,
            email: email,
            date: date,
            time: time,
        }),
    })
    .then(response => response.json())
    .then(data => {
        // Zobrazení výsledku
        const resultDiv = document.getElementById("result");
        resultDiv.textContent = data.message;
        resultDiv.style.color = "#4CAF50"; // zelený text pro úspěch
    })
    .catch(error => {
        // Zobrazení chyby
        const resultDiv = document.getElementById("result");
        resultDiv.textContent = "Došlo k chybě, zkuste to znovu.";
        resultDiv.style.color = "red"; // červený text pro chybu
    });
});
