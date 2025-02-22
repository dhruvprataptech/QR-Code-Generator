let qrCodeInstance = null;

function generateQR() {
    const url = document.getElementById('urlInput').value;
    const qrcodeDiv = document.getElementById('qrcode');
    const shareSection = document.getElementById('shareSection');

    // Clear previous QR code
    qrcodeDiv.innerHTML = '';

    if (url) {
        // Generate new QR code
        qrCodeInstance = new QRCode(qrcodeDiv, {
            text: url,
            width: 200,
            height: 200,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });

        // Show share buttons
        shareSection.style.display = 'flex';
        qrcodeDiv.style.animation = 'popIn 0.5s ease-in-out';
    } else {
        alert('Please enter a valid URL!');
    }
}

function copyQRToClipboard() {
    const qrcodeCanvas = document.querySelector('#qrcode canvas');
    if (qrcodeCanvas) {
        qrcodeCanvas.toBlob((blob) => {
            const item = new ClipboardItem({ 'image/png': blob });
            navigator.clipboard.write([item]).then(() => {
                alert('QR code copied to clipboard!');
            }).catch(() => {
                alert('Failed to copy QR code to clipboard.');
            });
        });
    } else {
        alert('No QR code generated yet!');
    }
}

function shareQR() {
    const qrcodeCanvas = document.querySelector('#qrcode canvas');
    if (qrcodeCanvas) {
        qrcodeCanvas.toBlob((blob) => {
            const file = new File([blob], 'qrcode.png', { type: 'image/png' });
            if (navigator.share) {
                navigator.share({
                    title: 'QR Code',
                    files: [file],
                }).then(() => {
                    console.log('QR code shared successfully!');
                }).catch(() => {
                    alert('Failed to share QR code.');
                });
            } else {
                alert('Web Share API is not supported in your browser.');
            }
        });
    } else {
        alert('No QR code generated yet!');
    }
}

function toggleTheme() {
    const body = document.body;
    const themeIcon = document.getElementById('themeIcon');
    body.classList.toggle('light-mode');
    if (body.classList.contains('light-mode')) {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
}