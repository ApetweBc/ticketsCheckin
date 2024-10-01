// Sample ticket data in JSON format
// Function to initialize local storage with initial ticket data
// function initializeLocalStorage() {
//     const localStorageKey = "ticketStatus";
//     const ticketData = {
//         "123456": "Not Used",
//         "789012": "Not Used",
//         "345678": "Not Used",
//         // Add more initial ticket data as needed
//     };

//     localStorage.setItem(localStorageKey, JSON.stringify(ticketData));
// }

// initializeLocalStorage();


// Function to load ticket data from the server
function loadTicketData() {
    fetch('/api/tickets')
        .then(response => response.json())
        .then(data => {
          ticketData = data;
        })
        .catch(error => console.error('Error loading ticket data:', error));
}

// Load ticket data when the page loads
loadTicketData();

// Function to lookup ticket status
function lookupTicket() {
    // const barcodeInput = document.getElementById("barcodeInput").value;
    const barcodeInput = "GCAC-" + document.getElementById("barcodeInput").value;

    const outputDiv = document.getElementById("output");

    if (!barcodeInput) {
        outputDiv.innerHTML = "<p class='text-light bg-danger p-3'>Please enter a valid ticket number.</p>";
        return;
    }

    if (ticketData.hasOwnProperty(barcodeInput)) {
        const status = ticketData[barcodeInput];
        outputDiv.innerHTML = `<p class='text-light bg-success p-3'>Ticket ${barcodeInput} status: ${status}</p>`;
    } else {
        outputDiv.innerHTML = "<p class='text-light bg-danger p-3'>Ticket not found.</p>";
    }
}

// Function to update the server with ticket status
function updateServer(ticketNumber, newStatus) {
    fetch('/api/tickets', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            ...ticketData,
            [ticketNumber]: newStatus,
        }),
    })
        .then(response => response.text())
        .then(data => console.log(data))
        .catch(error => console.error('Error updating server:', error));
}

// Function to toggle ticket status
function toggleStatus(newStatus) {
    //const barcodeInput = document.getElementById("barcodeInput").value;
    const barcodeInput = "GCAC-" + document.getElementById("barcodeInput").value;

    const outputDiv = document.getElementById("output");

    if (!barcodeInput) {
        outputDiv.innerHTML = "<p class='text-light bg-danger p-3'>Please enter a valid ticket number.</p>";
        return;
    }

    if (ticketData.hasOwnProperty(barcodeInput)) {
        const currentStatus = ticketData[barcodeInput];
        if (currentStatus !== newStatus) {
            ticketData[barcodeInput] = newStatus;
            outputDiv.innerHTML = `<p class='text-light bg-success p-3'>Ticket ${barcodeInput} status updated to ${newStatus}</p>`;
            updateServer(barcodeInput, newStatus);
        } else {
            outputDiv.innerHTML = `<p class='text-light bg-warning p-3'>Ticket ${barcodeInput} is already ${newStatus}</p>`;
        }
    } else {
        outputDiv.innerHTML = "<p class='text-light bg-warning'>Ticket not found.</p>";
    }
}


// Function to start the barcode scanner
function startScanner() {
    const scannerContainer = document.getElementById("scanner-container");
    
    Quagga.init({
        inputStream: {
            name: "Live",
            type: "LiveStream",
            target: scannerContainer,
            constraints: {
                width: 640,
                height: 0,
                facingMode: "environment", // Use the device's rear camera
            },
        },
        decoder: {
            readers: ["code_128_reader"], // Use EAN barcode reader, adjust as needed
        },
    }, function (err) {
        if (err) {
            console.error(err);
            return;
        }
        Quagga.start();
        scannerContainer.style.display = "block";
    });
    

    // Event listener for successful scans
    Quagga.onDetected(function (result) {
        const barcodeInput = document.getElementById("barcodeInput");
        barcodeInput.value = result.codeResult.code;
        console.log(result.codeResult.code);

        // Trigger the lookup function when a barcode is detected
        lookupTicket();
        
    });


    
    
}

function stopScanner() {
    Quagga.stop();
    let stop = document.getElementById("scanner-container");
    stop.style.display = "none";
}
// Call the startScanner function when the page loads
// startScanner();
