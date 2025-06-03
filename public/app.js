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
  fetch("/api/tickets")
    .then((response) => response.json())
    .then((data) => {
      ticketData = data;
    })
    .catch((error) => console.error("Error loading ticket data:", error));
}

// Load ticket data when the page loads
loadTicketData();

// Function to lookup ticket status
function lookupTicket() {
  // Get the ticket number from the input field
  // const barcodeInput = document.getElementById("barcodeInput").value;

  // Get the ticket number from the input field with the prefix "GCAC-" already added
  const barcodeInput = "GCAC-" + document.getElementById("barcodeInput").value;

  // Get the output div
  const outputDiv = document.getElementById("output");
  if (!barcodeInput) {
    outputDiv.innerHTML =
      "<p class='text-light bg-danger p-3'>Please enter a valid ticket number.</p>";
    return;
  }

  // Check if the ticket number exists in the ticketData object
  if (ticketData.hasOwnProperty(barcodeInput)) {
    // Get the ticket status from the ticketData object
    const status = ticketData[barcodeInput];

    // Display the ticket status in the output div
    outputDiv.innerHTML = `<p class='text-light bg-success p-3'>Ticket ${barcodeInput} status: ${status}</p>`;
  } else {
    // Display an error message if the ticket number is not found
    outputDiv.innerHTML =
      "<p class='text-light bg-danger p-3'>Ticket not found.</p>";
  }
}

// Function to update the server with ticket status
function updateServer(ticketNumber, newStatus) {
  fetch("/api/tickets", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      // Update the ticket status
      [ticketNumber]: newStatus,
    }),
  })
    .then((response) => response.text()) // Parse the JSON response

    .catch((error) => console.error("Error updating server:", error)); // Log errors
}

// Function to toggle ticket status
let ticketData = {}; // Initialize an empty object to hold ticket data
function toggleStatus(newStatus) {
  //const barcodeInput = document.getElementById("barcodeInput").value;
  const barcodeInput = "GCAC-" + document.getElementById("barcodeInput").value;

  const outputDiv = document.getElementById("output");

  if (!barcodeInput) {
    outputDiv.innerHTML =
      "<p class='text-light bg-danger p-3'>Please enter a valid ticket number.</p>";
    return;
  }
  // Check if the ticket number exists in the ticketData object
  if (ticketData.hasOwnProperty(barcodeInput)) {
    // Get the current ticket status
    const currentStatus = ticketData[barcodeInput];
    // Update the ticket status if it is different from the new status
    if (currentStatus !== newStatus) {
      // Update the ticket status in the ticketData object
      ticketData[barcodeInput] = newStatus;
      // Display a success message in the output div
      outputDiv.innerHTML = `<p class='text-light bg-success p-3'>Ticket ${barcodeInput} status updated to ${newStatus}</p>`;
      updateServer(barcodeInput, newStatus);
    } else {
      // Display a warning message if the ticket status is already the new status
      outputDiv.innerHTML = `<p class='text-light bg-warning p-3'>Ticket ${barcodeInput} is already ${newStatus}</p>`;
    }
  } else {
    // Display an error message if the ticket number is not found
    outputDiv.innerHTML =
      "<p class='text-light bg-warning'>Ticket not found.</p>";
  }
}

// Function to start the barcode scanner
function startScanner() {
  const scannerContainer = document.getElementById("scanner-container");

  Quagga.init(
    {
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
    },
    function (err) {
      if (err) {
        return;
      }
      Quagga.start();
      scannerContainer.style.display = "block";
    }
  );

  // Event listener for successful scans
  Quagga.onDetected(function (result) {
    const barcodeInput = document.getElementById("barcodeInput");
    barcodeInput.value = result.codeResult.code;
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
