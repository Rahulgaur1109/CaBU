document.addEventListener('DOMContentLoaded', function() {
  // Check if we are on the dashboard page
  if (document.body.classList.contains('dashboard-body')) {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const dashboardBody = document.querySelector('.dashboard-body');
    const overlay = document.querySelector('.overlay'); // For overlay click to close sidebar

    // Open/close sidebar when the mobile menu button is clicked
    mobileMenuBtn.addEventListener('click', () => {
      dashboardBody.classList.toggle('sidebar-open');  // Toggle sidebar visibility
      overlay.style.display = dashboardBody.classList.contains('sidebar-open') ? 'block' : 'none';
    });

    // Close sidebar when clicking overlay
    overlay.addEventListener('click', () => {
      dashboardBody.classList.remove('sidebar-open');
      overlay.style.display = 'none';
    });
  }
});


document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const dashboardBody = document.querySelector('.dashboard-body');
  const overlay = document.querySelector('.overlay'); // For overlay click to close sidebar

  // Toggle sidebar when the mobile menu button is clicked
  mobileMenuBtn.addEventListener('click', () => {
    dashboardBody.classList.toggle('sidebar-open');  // Toggle sidebar visibility
    overlay.style.display = dashboardBody.classList.contains('sidebar-open') ? 'block' : 'none'; // Show overlay when sidebar is open
  });

  // Close sidebar when clicking overlay
  overlay.addEventListener('click', () => {
    dashboardBody.classList.remove('sidebar-open');
    overlay.style.display = 'none'; // Hide overlay
  });
});


// Dashboard functionality
document.addEventListener('DOMContentLoaded', function() {
    // Sample data for rides (in a real application, this would come from a database)
    const ridesData = [
      {
        id: 1,
        creatorName: "John D.",
        creatorInitial: "J",
        rating: 4.8,
        pickup: "Central Park",
        destination: "JFK Airport",
        date: "2025-04-15",
        time: "10:30",
        totalSeats: 4,
        availableSeats: 2,
        price: 250,
        genderPreference: "any",
        notes: "I have space for medium luggage. Will be departing on time.",
        isUserRide: true
      },
      {
        id: 2,
        creatorName: "Sarah M.",
        creatorInitial: "S",
        rating: 4.5,
        pickup: "Brooklyn Heights",
        destination: "Manhattan, Downtown",
        date: "2025-04-15",
        time: "09:15",
        totalSeats: 3,
        availableSeats: 1,
        price: 150,
        genderPreference: "female",
        notes: "Morning commute to work. I take this route daily.",
        isUserRide: true
      },
      {
        id: 3,
        creatorName: "Mike T.",
        creatorInitial: "M",
        rating: 4.2,
        pickup: "Queens, Astoria",
        destination: "Bronx Zoo",
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
        creatorName: "Emma L.",
        creatorInitial: "E",
        rating: 4.9,
        pickup: "Staten Island Ferry",
        destination: "Times Square",
        date: "2025-04-17",
        time: "14:45",
        totalSeats: 2,
        availableSeats: 1,
        price: 180,
        genderPreference: "any",
        notes: "Heading to a Broadway show. Must arrive by 3:30 PM."
      },
      {
        id: 5,
        creatorName: "David W.",
        creatorInitial: "D",
        rating: 4.0,
        pickup: "Columbia University",
        destination: "Newark Airport",
        date: "2025-04-18",
        time: "07:00",
        totalSeats: 3,
        availableSeats: 2,
        price: 300,
        genderPreference: "male",
        notes: "Early morning airport run. Please be on time."
      },
      {
        id: 6,
        creatorName: "Linda K.",
        creatorInitial: "L",
        rating: 4.7,
        pickup: "Barclays Center",
        destination: "LaGuardia Airport",
        date: "2025-04-20",
        time: "12:00",
        totalSeats: 4,
        availableSeats: 3,
        price: 220,
        genderPreference: "any",
        notes: "Midday airport drop-off. Can help with luggage."
      }
    ];
    
    // Sample data for joined rides
    const joinedRidesData = [
      {
        id: 101,
        creatorName: "Alex P.",
        creatorInitial: "A",
        rating: 4.6,
        pickup: "Grand Central",
        destination: "Coney Island",
        date: "2025-04-14",
        time: "15:00",
        totalSeats: 4,
        availableSeats: 0,
        price: 180,
        genderPreference: "any",
        notes: "Weekend beach trip. Bringing a cooler.",
        seatsBooked: 1
      },
      {
        id: 102,
        creatorName: "Olivia R.",
        creatorInitial: "O",
        rating: 4.4,
        pickup: "Union Square",
        destination: "MetLife Stadium",
        date: "2025-04-19",
        time: "17:30",
        totalSeats: 3,
        availableSeats: 0,
        price: 200,
        genderPreference: "any",
        notes: "Going to the concert. Plan to return around midnight.",
        seatsBooked: 2
      }
    ];
  
    // DOM elements
    const tabLinks = document.querySelectorAll('.sidebar-nav a[data-tab]');
    const tabContents = document.querySelectorAll('.tab-content');
    const subtabLinks = document.querySelectorAll('.tab-btn[data-subtab]');
    const subtabContents = document.querySelectorAll('.subtab-content');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const sidebar = document.querySelector('.dashboard-sidebar');
    const overlay = document.querySelector('.overlay');
    
    const createRideBtn = document.getElementById('create-ride-btn');
    const createRideModal = document.getElementById('create-ride-modal');
    const joinRideModal = document.getElementById('join-ride-modal');
    const closeModalBtns = document.querySelectorAll('.close-modal, .cancel-modal');
    
    const myCreatedRidesContainer = document.getElementById('my-created-rides');
    const myJoinedRidesContainer = document.getElementById('my-joined-rides');
    const availableRidesContainer = document.getElementById('available-rides-grid');
    
    const dashboardSearchInput = document.getElementById('dashboard-ride-search');
    const dashboardSearchBtn = document.getElementById('dashboard-search-btn');
    const genderFilter = document.getElementById('gender-filter');
    const dateFilter = document.getElementById('date-filter');
    
    const createRideForm = document.getElementById('create-ride-form');
    const joinRideForm = document.getElementById('join-ride-form');
    
    // Chat bot elements
    const chatBotContainer = document.getElementById('chat-bot');
    const chatMessages = document.getElementById('chat-messages');
    const userMessageInput = document.getElementById('user-message');
    const sendMessageBtn = document.getElementById('send-message');
    const openChatBtn = document.getElementById('open-chat');
    const closeChatBtn = document.getElementById('close-chat');
  
    // Tab navigation
    tabLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const tabId = this.getAttribute('data-tab');
        
        // Remove active class from all tabs
        tabLinks.forEach(tab => tab.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to current tab
        this.classList.add('active');
        document.getElementById(tabId).classList.add('active');
      });
    });
  
    // Subtab navigation
    subtabLinks.forEach(link => {
      link.addEventListener('click', function() {
        const subtabId = this.getAttribute('data-subtab');
        
        // Remove active class from all subtabs
        subtabLinks.forEach(tab => tab.classList.remove('active'));
        subtabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to current subtab
        this.classList.add('active');
        document.getElementById(subtabId).classList.add('active');
      });
    });
  
    // Mobile menu toggle
    if (mobileMenuBtn) {
      mobileMenuBtn.addEventListener('click', function() {
        document.body.classList.toggle('sidebar-open');
        document.body.classList.toggle('menu-open');
        overlay.style.display = document.body.classList.contains('sidebar-open') ? 'block' : 'none';
      });
    }
  
    // Close sidebar when clicking overlay
    overlay.addEventListener('click', function() {
      document.body.classList.remove('sidebar-open', 'menu-open');
      overlay.style.display = 'none';
    });
  
    // Modal handling
    createRideBtn.addEventListener('click', function() {
      createRideModal.style.display = 'block';
      overlay.style.display = 'block';
    });
  
    closeModalBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        createRideModal.style.display = 'none';
        joinRideModal.style.display = 'none';
        overlay.style.display = 'none';
      });
    });
  
    // Render ride cards
    function renderRideCard(ride, container, isJoined = false) {
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
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
            <span>${genderText[ride.genderPreference]}</span>
          </div>
        </div>
        <div class="ride-footer">
          <div class="seat-info">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 18a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v12Z"/><path d="m22 6-5.5 5.5"/><path d="M13 13h4v4"/></svg>
            ${isJoined ? 
              `<span>Your seats: ${ride.seatsBooked}</span>` : 
              `<span>${ride.availableSeats}/${ride.totalSeats} seats available</span>`
            }
          </div>
          <div class="price-tag">
            ₹${ride.price}${isJoined ? ' x ' + ride.seatsBooked : ''}
          </div>
        </div>
        <div style="margin-top: 15px; text-align: right;">
          ${!ride.isUserRide && !isJoined ? 
            `<button class="btn primary join-ride-btn" data-ride-id="${ride.id}">Join Ride</button>` : 
            isJoined ? 
              `<button class="btn secondary cancel-join-btn" data-ride-id="${ride.id}">Cancel</button>` :
              `<button class="btn secondary edit-ride-btn" data-ride-id="${ride.id}">Edit</button>`
          }
        </div>
      `;
      
      container.appendChild(card);
      
      // Add event listener for join ride buttons
      if (!ride.isUserRide && !isJoined) {
        const joinBtn = card.querySelector('.join-ride-btn');
        joinBtn.addEventListener('click', function() {
          openJoinRideModal(ride);
        });
      }
    }
  
    // Format date function
    function formatDate(dateString) {
      const options = { weekday: 'short', day: 'numeric', month: 'short' };
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', options);
    }
  
    // Load rides
    function loadRides() {
      // Clear containers
      myCreatedRidesContainer.innerHTML = '';
      myJoinedRidesContainer.innerHTML = '';
      availableRidesContainer.innerHTML = '';
      
      // Load user created rides
      const userRides = ridesData.filter(ride => ride.isUserRide);
      if (userRides.length > 0) {
        userRides.forEach(ride => renderRideCard(ride, myCreatedRidesContainer));
      } else {
        myCreatedRidesContainer.innerHTML = '<div class="no-rides-message">You haven\'t created any rides yet.</div>';
      }
      
      // Load joined rides
      if (joinedRidesData.length > 0) {
        joinedRidesData.forEach(ride => renderRideCard(ride, myJoinedRidesContainer, true));
      } else {
        myJoinedRidesContainer.innerHTML = '<div class="no-rides-message">You haven\'t joined any rides yet.</div>';
      }
      
      // Load available rides (excluding user rides)
      const availableRides = ridesData.filter(ride => !ride.isUserRide);
      if (availableRides.length > 0) {
        availableRides.forEach(ride => renderRideCard(ride, availableRidesContainer));
      } else {
        availableRidesContainer.innerHTML = '<div class="no-rides-message">No available rides found.</div>';
      }
    }
  
    // Enhanced filter rides function
    function filterRides() {
      const searchTerm = dashboardSearchInput.value.toLowerCase();
      const genderValue = genderFilter.value;
      const dateValue = dateFilter.value;
      
      // Apply visual effect to the search button to indicate search is in progress
      dashboardSearchBtn.classList.add('searching');
      setTimeout(() => {
        dashboardSearchBtn.classList.remove('searching');
      }, 500);
      
      // Clear container
      availableRidesContainer.innerHTML = '';
      
      // Filter the rides
      const filteredRides = ridesData.filter(ride => {
        // Exclude user rides
        if (ride.isUserRide) return false;
        
        // Search term filter (enhanced to be more comprehensive)
        const matchesSearch = 
          ride.pickup.toLowerCase().includes(searchTerm) || 
          ride.destination.toLowerCase().includes(searchTerm) ||
          ride.notes.toLowerCase().includes(searchTerm) ||
          ride.creatorName.toLowerCase().includes(searchTerm);
        
        // Gender filter
        const matchesGender = genderValue === 'all' || ride.genderPreference === genderValue;
        
        // Date filter
        let matchesDate = true;
        if (dateValue !== 'all') {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          
          const tomorrow = new Date(today);
          tomorrow.setDate(tomorrow.getDate() + 1);
          
          const nextWeek = new Date(today);
          nextWeek.setDate(nextWeek.getDate() + 7);
          
          const rideDate = new Date(ride.date);
          
          if (dateValue === 'today') {
            matchesDate = rideDate.toDateString() === today.toDateString();
          } else if (dateValue === 'tomorrow') {
            matchesDate = rideDate.toDateString() === tomorrow.toDateString();
          } else if (dateValue === 'week') {
            matchesDate = rideDate >= today && rideDate < nextWeek;
          }
        }
        
        return matchesSearch && matchesGender && matchesDate;
      });
      
      // Render filtered rides with a highlight effect for the search term
      if (filteredRides.length > 0) {
        filteredRides.forEach(ride => {
          renderRideCard(ride, availableRidesContainer);
        });
        
        // Add highlight effect if there's a search term
        if (searchTerm) {
          const textElements = availableRidesContainer.querySelectorAll('.location-item p');
          textElements.forEach(element => {
            const text = element.textContent;
            if (text.toLowerCase().includes(searchTerm)) {
              const regex = new RegExp(`(${searchTerm})`, 'gi');
              element.innerHTML = text.replace(regex, '<span class="highlight">$1</span>');
              element.parentElement.parentElement.classList.add('found-match');
            }
          });
        }
      } else {
        availableRidesContainer.innerHTML = '<div class="no-rides-message">No rides match your search criteria. Try adjusting filters or search terms.</div>';
      }
      
      // Display search summary
      const searchSummary = document.createElement('div');
      searchSummary.className = 'search-summary';
      searchSummary.innerHTML = `<p>Found ${filteredRides.length} ride${filteredRides.length !== 1 ? 's' : ''} matching your criteria.</p>`;
      availableRidesContainer.prepend(searchSummary);
    }
  
    // Join ride modal
    function openJoinRideModal(ride) {
      const joinPickupEl = document.getElementById('join-pickup');
      const joinDestinationEl = document.getElementById('join-destination');
      const joinDateTimeEl = document.getElementById('join-date-time');
      const joinGenderPrefEl = document.getElementById('join-gender-pref');
      const joinDriverRatingEl = document.getElementById('join-driver-rating');
      const joinPriceEl = document.getElementById('join-price');
      const joinSeatsAvailableEl = document.getElementById('join-seats-available');
      const rideIdInput = document.getElementById('ride-id');
      const seatsToBookInput = document.getElementById('seats-to-book');
      
      const formattedDate = formatDate(ride.date);
      const genderText = {
        'any': 'Any Gender',
        'male': 'Male Only',
        'female': 'Female Only'
      };
      
      joinPickupEl.textContent = ride.pickup;
      joinDestinationEl.textContent = ride.destination;
      joinDateTimeEl.textContent = `${formattedDate}, ${ride.time}`;
      joinGenderPrefEl.textContent = genderText[ride.genderPreference];
      joinDriverRatingEl.textContent = `${ride.creatorName} (${ride.rating}/5)`;
      joinPriceEl.textContent = `₹${ride.price}`;
      joinSeatsAvailableEl.textContent = ride.availableSeats;
      rideIdInput.value = ride.id;
      
      // Reset seats to book
      seatsToBookInput.value = 1;
      // Set max seats based on available seats
      seatsToBookInput.max = ride.availableSeats;
      
      // Show modal
      joinRideModal.style.display = 'block';
      overlay.style.display = 'block';
      
      // Seat counter functionality
      const minusBtn = document.querySelector('.seat-btn.minus');
      const plusBtn = document.querySelector('.seat-btn.plus');
      
      minusBtn.addEventListener('click', function() {
        let value = parseInt(seatsToBookInput.value);
        if (value > 1) {
          seatsToBookInput.value = value - 1;
        }
      });
      
      plusBtn.addEventListener('click', function() {
        let value = parseInt(seatsToBookInput.value);
        let max = parseInt(seatsToBookInput.max);
        if (value < max) {
          seatsToBookInput.value = value + 1;
        }
      });
    }
  
    // Create ride form submission
    createRideForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const pickup = document.getElementById('pickup-location').value;
      const destination = document.getElementById('destination').value;
      const date = document.getElementById('ride-date').value;
      const time = document.getElementById('ride-time').value;
      const totalSeats = parseInt(document.getElementById('total-seats').value);
      const price = parseInt(document.getElementById('price-per-seat').value);
      const genderPreference = document.getElementById('gender-preference').value;
      const notes = document.getElementById('ride-notes').value;
      
      // Create new ride object
      const newRide = {
        id: ridesData.length + 1,
        creatorName: "John D.",  // Hardcoded for demo
        creatorInitial: "J",
        rating: 4.8,  // Hardcoded for demo
        pickup,
        destination,
        date,
        time,
        totalSeats,
        availableSeats: totalSeats,
        price,
        genderPreference,
        notes,
        isUserRide: true
      };
      
      // Add to rides data
      ridesData.unshift(newRide);
      
      // Reload rides
      loadRides();
      
      // Hide modal
      createRideModal.style.display = 'none';
      overlay.style.display = 'none';
      
      // Reset form
      createRideForm.reset();
      
      // Show success message - using alert for simplicity, would use toast in production
      alert("Ride created successfully!");
    });
  
    // Join ride form submission
    joinRideForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const rideId = parseInt(document.getElementById('ride-id').value);
      const seatsToBook = parseInt(document.getElementById('seats-to-book').value);
      const notes = document.getElementById('join-notes').value;
      
      // Find ride in data
      const ride = ridesData.find(r => r.id === rideId);
      
      if (ride) {
        // Update available seats
        ride.availableSeats -= seatsToBook;
        
        // Create joined ride object
        const joinedRide = {
          id: rideId,
          creatorName: ride.creatorName,
          creatorInitial: ride.creatorInitial,
          rating: ride.rating,
          pickup: ride.pickup,
          destination: ride.destination,
          date: ride.date,
          time: ride.time,
          totalSeats: ride.totalSeats,
          availableSeats: ride.availableSeats,
          price: ride.price,
          genderPreference: ride.genderPreference,
          seatsBooked: seatsToBook,
          notes: notes || "No notes provided."
        };
        
        // Add to joined rides
        joinedRidesData.unshift(joinedRide);
        
        // Reload rides
        loadRides();
        
        // Hide modal
        joinRideModal.style.display = 'none';
        overlay.style.display = 'none';
        
        // Reset form
        joinRideForm.reset();
        
        // Show success message
        alert("You have successfully joined the ride!");
      }
    });
  
    // Add additional CSS for search highlight and animations
    const style = document.createElement('style');
    style.textContent = `
      .highlight {
        background-color: rgba(155, 89, 182, 0.3);
        font-weight: bold;
        padding: 0 2px;
        border-radius: 3px;
      }
      
      .found-match {
        animation: pulse 1s ease-in-out;
      }
      
      @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.03); }
        100% { transform: scale(1); }
      }
      
      .searching {
        animation: searchPulse 0.5s ease-in-out;
      }
      
      @keyframes searchPulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.2); background-color: #8e44ad; }
        100% { transform: scale(1); }
      }
      
      .search-summary {
        padding: 10px 15px;
        margin-bottom: 15px;
        background-color: rgba(155, 89, 182, 0.1);
        border-radius: 6px;
        font-size: 14px;
        color: #444;
      }
      
      #dashboard-ride-search {
        transition: all 0.3s ease;
      }
      
      #dashboard-ride-search:focus {
        border-color: #8e44ad;
        box-shadow: 0 0 0 2px rgba(155, 89, 182, 0.2);
      }
    `;
    document.head.appendChild(style);
  
    // Enhanced search button functionality with animations
    dashboardSearchBtn.addEventListener('click', filterRides);
    dashboardSearchBtn.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.1)';
      this.style.transition = 'transform 0.2s ease-in-out';
    });
    
    dashboardSearchBtn.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
    });
    
    // Apply real-time search on input changes with small delay
    dashboardSearchInput.addEventListener('keyup', function(e) {
      if (e.key === 'Enter') {
        filterRides();
      }
      
      // Auto-search after typing stops (with delay)
      clearTimeout(this.searchTimeout);
      this.searchTimeout = setTimeout(() => {
        if (this.value.length > 2 || this.value.length === 0) {
          filterRides();
        }
      }, 500);
    });
    
    genderFilter.addEventListener('change', filterRides);
    dateFilter.addEventListener('change', filterRides);
  
    // Chat Bot Functionality
    function initChatBot() {
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
        'price': 'Ride prices are set by ride creators. You can see the price per seat before joining a ride.',
        'search': 'You can search for rides by entering keywords in the search box on the Available Rides tab. You can search by destination, pickup location, or creator name.'
      };
      
      // Open chat bot
      openChatBtn.addEventListener('click', function() {
        chatBotContainer.style.display = 'flex';
        openChatBtn.style.display = 'none';
      });
      
      // Close chat bot
      closeChatBtn.addEventListener('click', function() {
        chatBotContainer.style.display = 'none';
        openChatBtn.style.display = 'block';
      });
      
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
      
      sendMessageBtn.addEventListener('click', sendMessage);
      userMessageInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
          sendMessage();
        }
      });
      
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
  
    // Initialize
    loadRides();
    initChatBot();
  });
  