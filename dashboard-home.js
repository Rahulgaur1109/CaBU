
// Dashboard home page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Sample data for rides on homepage (in a real application, this would come from a database)
    const featuredRides = [
      {
        id: 1,
        creatorName: "K. Sriram Naveen",
        creatorInitial: "S",
        rating: 4.8,
        pickup: "Bennett University",
        destination: "Knowledge Park",
        date: "2025-04-15",
        time: "10:30",
        totalSeats: 4,
        availableSeats: 2,
        price: 250,
        genderPreference: "any",
        notes: "I have space for medium luggage. Will be departing on time."
      },
      {
        id: 3,
        creatorName: "Manit Kumar",
        creatorInitial: "M",
        rating: 4.2,
        pickup: "Bennett University",
        destination: "Delta-I",
        date: "2025-04-16",
        time: "11:00",
        totalSeats: 4,
        availableSeats: 3,
        price: 200,
        genderPreference: "any",
        notes: "Weekend trip to the zoo. Relaxed schedule."
      },
      {
        id: 4,
        creatorName: "Srishti Saahi",
        creatorInitial: "S",
        rating: 4.9,
        pickup: "Bennett University",
        destination: "Pari Chowk",
        date: "2025-04-17",
        time: "14:45",
        totalSeats: 2,
        availableSeats: 1,
        price: 180,
        genderPreference: "any",
        notes: "Heading to a Broadway show. Must arrive by 3:30 PM."
      }
    ];
  
    // DOM elements
    const ridesContainer = document.getElementById('rides-container');
    const chatBotContainer = document.getElementById('chat-bot');
    const chatMessages = document.getElementById('chat-messages');
    const userMessageInput = document.getElementById('user-message');
    const sendMessageBtn = document.getElementById('send-message');
    const openChatBtn = document.getElementById('open-chat');
    const closeChatBtn = document.getElementById('close-chat');
    
    // Load map if it exists
    const mapElement = document.getElementById('map');
    let map;
  
    // Format date function
    function formatDate(dateString) {
      const options = { weekday: 'short', day: 'numeric', month: 'short' };
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', options);
    }
  
    // Render ride card function
    function renderRideCard(ride, container) {
      const card = document.createElement('div');
      card.className = 'ride-card';
      
      const genderText = {
        'any': 'Any Gender',
        'male': 'Male Only',
        'female': 'Female Only'
      };
      
      const formattedDate = formatDate(ride.date);
      
      card.innerHTML = `
        <div class="ride-header">
          <div class="ride-creator">
            <div class="creator-avatar">
              ${ride.creatorInitial}
            </div>
            <div class="creator-info">
              <h4>${ride.creatorName}</h4>
              <div class="rating">${'★'.repeat(Math.floor(ride.rating))}${ride.rating % 1 >= 0.5 ? '★' : ''} ${ride.rating}</div>
            </div>
          </div>
          <div class="ride-date">
            ${formattedDate}
          </div>
        </div>
        <div class="ride-route">
          <div class="location-item">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            <div>
              <h4>Pick up</h4>
              <p>${ride.pickup}</p>
            </div>
          </div>
          <div class="location-item">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="red" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            <div>
              <h4>Drop off</h4>
              <p>${ride.destination}</p>
            </div>
          </div>
        </div>
        <div class="ride-info">
          <div class="info-item">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            <span>${ride.time}</span>
          </div>
          <div class="info-item">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 1-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
            <span>${genderText[ride.genderPreference]}</span>
          </div>
        </div>
        <div class="ride-footer">
          <div class="seat-info">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 18a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v12Z"/><path d="m22 6-5.5 5.5"/><path d="M13 13h4v4"/></svg>
            <span>${ride.availableSeats}/${ride.totalSeats} seats available</span>
          </div>
          <div class="price-tag">
            ₹${ride.price}
          </div>
        </div>
        <div style="margin-top: 15px; text-align: right;">
          <a href="dashboard.html" class="btn primary">Join Ride</a>
        </div>
      `;
      
      container.appendChild(card);
    }
  
    // Load featured rides
    function loadFeaturedRides() {
      // Clear container
      if (ridesContainer) {
        ridesContainer.innerHTML = '';
        
        // Render featured rides
        if (featuredRides.length > 0) {
          featuredRides.forEach(ride => renderRideCard(ride, ridesContainer));
        } else {
          ridesContainer.innerHTML = '<div class="no-rides-message">No available rides found.</div>';
        }
      }
    }
  
    // Initialize map
    function initMap() {
      if (mapElement) {
        // Initialize Leaflet map
        map = L.map('map').setView([28.45080683818592, 77.58415488033597], 12);
        
        // Add tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        
        // Add sample markers for rides
        const markers = [
          { latlng: [28.45080683818592, 77.58415488033597], title: "Central Park", destination: "JFK Airport" }
          // { latlng: [40.7624, -73.9738], title: "Midtown", destination: "LaGuardia Airport" },
          // { latlng: [40.7484, -73.9857], title: "Times Square", destination: "Newark Airport" },
          // { latlng: [40.7114, -74.0053], title: "Financial District", destination: "Brooklyn Heights" }
        ];
        
        markers.forEach(markerInfo => {
          const marker = L.marker(markerInfo.latlng).addTo(map);
          marker.bindPopup(`<b>Pickup: ${markerInfo.title}</b><br>Destination: ${markerInfo.destination}<br><a href="dashboard.html" class="map-link">View Ride</a>`);
        });
      }
    }
  
    // Chat Bot Functionality
    function initChatBot() {
      if (!chatBotContainer) return;
      
      // Chat bot responses based on keywords
      const botResponses = {
        'hi': 'Hello! How can I help you with CaBU today?',
        'hello': 'Hi there! How can I assist you with your cab sharing needs?',
        'ride': 'To create a new ride, click the "Create Ride" button on the dashboard. To join an existing ride, browse available rides and click "Join Ride".',
        'create': 'You can create a new ride by clicking on the "Create Ride" button in the dashboard sidebar. Fill in the details and submit!',
        'join': 'To join a ride, browse the available rides and click the "Join Ride" button on the ride card. You can then select how many seats you need.',
        'payment': 'Currently, CaBU supports cash payments directly to the driver. We plan to add in-app payment options soon!',
        'cancel': 'You can cancel your joined rides from the "My Rides" tab, then select "Joined Rides" and click the cancel button on the ride card.',
        'safety': 'Your safety is our priority. All CaBU drivers are verified, and you can see ratings and reviews before joining a ride. We also have an emergency assistance feature.',
        'gender': 'You can set gender preferences when creating rides. Options include "Any Gender", "Male Only", or "Female Only".',
        'help': 'I can help you with information about creating rides, joining rides, payments, cancellations, and safety. What would you like to know?',
        'contact': 'You can reach our support team at support@cabu.com or call our helpline at +1-800-CABU-HELP.',
        'price': 'Ride prices are set by ride creators. You can see the price per seat before joining a ride.'
      };
      
      // Open chat bot
      if (openChatBtn) {
        openChatBtn.addEventListener('click', function() {
          chatBotContainer.style.display = 'flex';
          openChatBtn.style.display = 'none';
        });
      }
      
      // Close chat bot
      if (closeChatBtn) {
        closeChatBtn.addEventListener('click', function() {
          chatBotContainer.style.display = 'none';
          openChatBtn.style.display = 'block';
        });
      }
      
      // Send message
      function sendMessage() {
        const message = userMessageInput.value.trim();
        if (message === '') return;
        
        // Add user message to chat
        addMessage(message, 'user');
        
        // Process and respond
        processMessage(message);
        
        // Clear input
        userMessageInput.value = '';
      }
      
      if (sendMessageBtn) {
        sendMessageBtn.addEventListener('click', sendMessage);
      }
      
      if (userMessageInput) {
        userMessageInput.addEventListener('keyup', function(e) {
          if (e.key === 'Enter') {
            sendMessage();
          }
        });
      }
      
      // Add message to chat
      function addMessage(message, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        messageDiv.innerHTML = `<p>${message}</p>`;
        chatMessages.appendChild(messageDiv);
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
      }
      
      // Process message and respond
      function processMessage(message) {
        message = message.toLowerCase();
        
        // Create a small delay for more natural interaction
        setTimeout(() => {
          let response = "I'm not sure I understand. Can you rephrase or ask about creating rides, joining rides, payments, safety, or contact information?";
          
          // Check for keywords
          for (const [keyword, resp] of Object.entries(botResponses)) {
            if (message.includes(keyword)) {
              response = resp;
              break;
            }
          }
          
          // Add bot response to chat
          addMessage(response, 'bot');
        }, 500);
      }
    }
  
    // Initialize components
    loadFeaturedRides();
    initMap();
    initChatBot();
  });
  