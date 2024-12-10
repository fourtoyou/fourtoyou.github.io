// Firebase Configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// DOM Elements
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const loginBtn = document.getElementById('login-btn');
const signupBtn = document.getElementById('signup-btn');
const logoutBtn = document.getElementById('logout-btn');
const searchInput = document.getElementById('search');
const searchBtn = document.getElementById('search-btn');
const searchResults = document.getElementById('search-results');
const ticketsList = document.getElementById('tickets-list');

// Authentication Handlers
loginBtn.addEventListener('click', () => {
  const email = emailInput.value;
  const password = passwordInput.value;
  auth.signInWithEmailAndPassword(email, password)
    .then(user => {
      alert('Logged in!');
      showSearchSection();
    })
    .catch(err => alert(err.message));
});

signupBtn.addEventListener('click', () => {
  const email = emailInput.value;
  const password = passwordInput.value;
  auth.createUserWithEmailAndPassword(email, password)
    .then(user => {
      alert('Account created!');
      showSearchSection();
    })
    .catch(err => alert(err.message));
});

logoutBtn.addEventListener('click', () => {
  auth.signOut().then(() => {
    alert('Logged out!');
    showAuthSection();
  });
});

// Firestore Handlers
searchBtn.addEventListener('click', () => {
  const city = searchInput.value.trim();
  if (!city) {
    alert('Please enter a city name!');
    return;
  }

  // Save ticket to Firestore
  const user = auth.currentUser;
  db.collection('tickets').add({
    userId: user.uid,
    city: city,
    bookedAt: new Date()
  })
  .then(() => {
    alert(`Ticket for ${city} booked!`);
    loadTickets();
  })
  .catch(err => alert(err.message));
});

function loadTickets() {
  const user = auth.currentUser;
  db.collection('tickets')
    .where('userId', '==', user.uid)
    .get()
    .then(snapshot => {
      ticketsList.innerHTML = '';
      snapshot.forEach(doc => {
        const ticket = doc.data();
        const li = document.createElement('li');
        li.textContent = `${ticket.city} - ${ticket.bookedAt.toDate()}`;
        ticketsList.appendChild(li);
      });
    });
}

// UI Sections
function showAuthSection() {
  document.getElementById('auth-section').style.display = 'block';
  document.getElementById('search-section').style.display = 'none';
  document.getElementById('tickets-section').style.display = 'none';
}

function showSearchSection() {
  document.getElementById('auth-section').style.display = 'none';
  document.getElementById('search-section').style.display = 'block';
  document.getElementById('tickets-section').style.display = 'block';
  loadTickets();
}

// Initialize UI
auth.onAuthStateChanged(user => {
  if (user) {
    showSearchSection();
  } else {
    showAuthSection();
  }
});
