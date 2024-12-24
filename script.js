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
    // Check if all fields are filled out
    if (!name.value || !designation.value || !number.value || !address.value) {
        alert('Please fill in all fields before generating the business card!'); // Show alert if any field is empty
        return; // Exit the function if any field is empty
    }

    // Capitalize the first letter of the value
    const capitalizedName = name.value.charAt(0).toUpperCase() + name.value.slice(1);
    const capDesignation = designation.value.charAt(0).toUpperCase() + designation.value.slice(1);

    // Update business card text based on form inputs
    displayName.textContent = capitalizedName || "User name";
    displayDesignation.textContent = capDesignation || "User designation";
    displayNum.textContent = number.value || "Phone number";
    displayAddress.textContent = address.value || "Address";

    const linkText = qrLink.value.trim();
    if (linkText) {
        generateQRCode(linkText);
    } else {
        qrImg.src = ""; // Clear QR code if no link is provided
    }

    // Process and update the image preview with background removal
    const fileInput = document.getElementById('image-upload');
    const previewImage = document.getElementById('image-preview');

    // Check if a file is selected
    if (fileInput.files.length === 0) {
        alert('Please select an image!'); // Show an alert if no file is selected
        return; // Exit the function if no file is selected
    }

    const file = fileInput.files[0];

    // Check if the file is an image
    if (!file.type.startsWith('image/')) {
        alert('Please upload a valid image file!'); // Validate if the file is an image
        return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
        const img = new Image();
        img.src = e.target.result;

        img.onload = () => {
            // Create a canvas element
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;

            // Draw the image onto the canvas
            ctx.drawImage(img, 0, 0);

            // Get the image data
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;

            // Loop through each pixel and remove the white background (or any color you want)
            for (let i = 0; i < data.length; i += 4) {
                // Check if the pixel is white (or close to white)
                if (data[i] > 200 && data[i + 1] > 200 && data[i + 2] > 200) {
                    // Make this pixel transparent
                    data[i + 3] = 0;
                }
            }

            // Put the modified image data back to the canvas
            ctx.putImageData(imageData, 0, 0);

            // Convert canvas to image URL
            const processedImageUrl = canvas.toDataURL();

            // Update the image preview
            previewImage.src = processedImageUrl;
        };
    };

    reader.readAsDataURL(file);
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
