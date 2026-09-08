const verses = [
  "I can do all things through Christ who strengthens me. – Philippians 4:13",
  "Run with endurance the race that is set before us. – Hebrews 12:1",
  "The Lord is my strength and my shield. – Psalm 28:7",
  "Be strong and courageous; do not be frightened. – Joshua 1:9"
];

const canvas = document.getElementById('cardCanvas');
const ctx = canvas.getContext('2d');
const webcam = document.getElementById('webcam');
let userImageSrc = null;

// Initialize Webcam
navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => { webcam.srcObject = stream; })
  .catch(err => console.log("Webcam access denied or unavailable."));

// Capture Selfie
document.getElementById('snapBtn').addEventListener('click', () => {
  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = webcam.videoWidth;
  tempCanvas.height = webcam.videoHeight;
  tempCanvas.getContext('2d').drawImage(webcam, 0, 0);
  userImageSrc = tempCanvas.toDataURL('image/png');
  alert("Selfie captured!");
});

// Load Uploaded Image
document.getElementById('imageInput').addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => { userImageSrc = event.target.result; };
    reader.readAsDataURL(file);
  }
});

function generateCard() {
  const gender = document.getElementById('gender').value;
  const verse = verses[Math.floor(Math.random() * verses.length)];
  const avatarSrc = gender === 'male' ? 'male_pickleball.png' : 'female_pickleball.png';

  // Clear Canvas
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const userImg = new Image();
  const avatarImg = new Image();

  userImg.onload = () => {
    // Draw User Photo (Left side)
    ctx.drawImage(userImg, 20, 50, 260, 260);

    avatarImg.onload = () => {
      // Draw Pickleball Avatar (Right side)
      ctx.drawImage(avatarImg, 320, 50, 260, 260);

      // Add Bible Verse
      ctx.fillStyle = '#1b5e20';
      ctx.font = 'bold 18px Arial';
      ctx.textAlign = 'center';
      
      // Wrap text line
      ctx.fillText(verse, canvas.width / 2, 400, 560);

      document.getElementById('shareBtn').style.display = 'inline-block';
    };
    avatarImg.src = avatarSrc;
  };
  
  if (userImageSrc) {
    userImg.src = userImageSrc;
  } else {
    alert("Please upload a photo or take a selfie first!");
  }
}

// Facebook Sharing Logic
function shareToFacebook() {
  // Facebook requires a publicly hosted page URL to share
  const pageUrl = encodeURIComponent(window.location.href);
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`, '_blank');
}
