// Events Renderer - Dynamically creates event cards from Google Sheets data

// Function to create a single event card
function createEventCard(event, index) {
    const { day, month, year } = formatEventDate(event.date);
    const color = getEventColor(index);
    const icon = getEventIcon(event.tags);
    
    return `
        <div class="bg-white rounded-3xl border border-gray-200 overflow-hidden card-hover flex-shrink-0" style="width: 320px;">
            <div class="bg-gradient-to-br ${color} p-6 text-white">
                <div class="flex items-center justify-between mb-4">
                    <div class="text-center">
                        <div class="text-3xl font-comfortaa font-bold">${day}</div>
                        <div class="text-sm opacity-90 font-medium">${month}</div>
                    </div>
                    <div class="text-right">
                        <div class="text-lg font-semibold">${year}</div>
                    </div>
                </div>
                <h3 class="font-comfortaa font-semibold text-xl mb-2">${event.name}</h3>
                <p class="text-sm opacity-90">${event.location}</p>
            </div>
            <div class="p-6">
                <div class="flex items-center text-gray-800 mb-3 font-medium">
                    <i data-lucide="clock" class="mr-2 text-orange-500"></i>
                    <span>${event.time}</span>
                </div>
                <div class="flex items-center text-gray-800 mb-4 font-medium">
                    <i data-lucide="map-pin" class="mr-2 text-red-500"></i>
                    <button onclick="openMaps('${event.address}')" class="text-left hover:text-red-600 hover:underline transition-colors cursor-pointer">
                        ${event.address}
                    </button>
                </div>
                <div class="flex space-x-2 mb-4">
                    ${event.tags.map(tag => `<span class="bg-red-100 text-red-700 font-medium px-2 py-1 rounded text-sm">${tag}</span>`).join('')}
                </div>
                ${event.rsvp ? `
                    <button onclick="window.open('${event.rsvp}', '_blank')" class="w-full bg-gradient-to-r ${color} text-white hover:shadow-lg transition-all duration-300 font-comfortaa font-semibold py-3 rounded-xl">
                        <i data-lucide="${icon}" class="mr-2 inline"></i>
                        RSVP
                    </button>
                ` : ''}
            </div>
        </div>
    `;
}

// Function to render all events
function renderEvents(events) {
    const eventsContainer = document.querySelector('#events-container .flex');
    
    if (!eventsContainer) {
        console.error('Events container not found');
        return;
    }
    
    // Clear existing content
    eventsContainer.innerHTML = '';
    
    if (events.length === 0) {
        eventsContainer.innerHTML = `
            <div class="text-center py-12 w-full">
                <p class="text-xl text-gray-600">No upcoming events at the moment. Check back soon!</p>
            </div>
        `;
        return;
    }
    
    // Create event cards
    events.forEach((event, index) => {
        const eventCard = createEventCard(event, index);
        eventsContainer.innerHTML += eventCard;
    });
    
    // Reinitialize icons after adding new content
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    // Update navigation buttons after events are loaded
    setTimeout(() => {
        if (typeof initEventsNavigation === 'function') {
            initEventsNavigation();
        }
    }, 100);
}

// Function to load and display events
async function loadEvents() {
    try {
        // Show loading state
        const eventsContainer = document.querySelector('#events-container .flex');
        if (eventsContainer) {
            eventsContainer.innerHTML = `
                <div class="text-center py-12 w-full">
                    <div class="flex items-center justify-center">
                        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
                        <span class="ml-2 text-lg text-gray-600">Loading events...</span>
                    </div>
                </div>
            `;
        }
        
        // Fetch events from Google Sheets
        const events = await fetchEventsFromSheets();
        
        // Render events
        renderEvents(events);
        
        console.log(`Loaded ${events.length} events successfully`);
        
    } catch (error) {
        console.error('Error loading events:', error);
        
        // Show error state
        const eventsContainer = document.querySelector('#events-container .flex');
        if (eventsContainer) {
            eventsContainer.innerHTML = `
                <div class="text-center py-12 w-full">
                    <p class="text-xl text-red-600">Error loading events. Please try again later.</p>
                    <p class="text-sm text-gray-600 mt-2">Check the console for more details.</p>
                </div>
            `;
        }
    }
}

// Auto-load events when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Add a small delay to ensure all other scripts are loaded
    setTimeout(loadEvents, 500);
});

// Refresh events function (can be called manually)
function refreshEvents() {
    console.log('Refreshing events...');
    loadEvents();
}

// Auto-refresh every 5 minutes to get latest data
setInterval(refreshEvents, 5 * 60 * 1000);