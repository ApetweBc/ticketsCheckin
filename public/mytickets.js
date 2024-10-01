// Function to fetch and display sold tickets
function loadSoldTickets() {
    fetch('/api/tickets')
        .then(response => response.json())
        .then(data => {
            const soldTicketsTableBody = document.getElementById('myTicketsTableBody');
            let rowNumber = 1;

            // Clear existing table rows
            soldTicketsTableBody.innerHTML = '';

            // Iterate over tickets and display sold tickets
            Object.entries(data).forEach(([ticketNumber, status]) => {
                if (status.toLowerCase()) {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <th scope="row">${rowNumber}</th>
                        <td>${ticketNumber}</td>
                        <td>${status}</td>
                    `;
                    soldTicketsTableBody.appendChild(row);
                    rowNumber++;
                }
            });
        })
        .catch(error => console.error('Error loading all tickets:', error));
}

// Call the loadSoldTickets function when the page loads
loadSoldTickets();
