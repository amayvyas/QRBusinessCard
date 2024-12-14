// Get form elements
const name = document.getElementById("username");
const displayName = document.getElementById("display-name");

const designation = document.getElementById("designation");
const displayDesignation = document.getElementById("display-designation");

const number = document.getElementById("number");
const displayNum = document.getElementById("display-number");

const address = document.getElementById("address");
const displayAddress = document.getElementById("assignee-address");

const qrLink = document.getElementById("qr-link");
const qrImg = document.getElementById("qr-img");

// Function to update the business card when form values change
function updateBusinessCard() {
    displayName.textContent = name.value || "User name";
    displayDesignation.textContent = designation.value || "User designation";
    displayNum.textContent = number.value || "Phone number";
    displayAddress.textContent = address.value || "Address";

    const linkText = qrLink.value.trim();
    if (linkText) {
        generateQRCode(linkText);
    } else {
        qrImg.src = ""; // Clear QR code if no link is provided
    }
}

// Function to generate QR Code
function generateQRCode(text) {
    const qrContainer = document.getElementById("qr-img");
    QRCode.toDataURL(text, (err, url) => {
        if (err) {
            console.error("Error generating QR code:", err);
        } else {
            qrContainer.src = url;
        }
    });
}

// Event listener for the "Generate Business Card" button
document.getElementById("update-button").addEventListener("click", updateBusinessCard);
