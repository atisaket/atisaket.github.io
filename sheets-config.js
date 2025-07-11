// Google Sheets Configuration
// Instructions:
// 1. Create a Google Sheet with the following columns: name | location | date | time | address | rsvp | tags
// 2. Make the sheet public: File -> Share -> Publish to the web -> Entire Document -> Publish
// 3. Copy your Google Sheets ID from the URL (between /d/ and /edit)
// 4. Replace SPREADSHEET_ID below with your actual spreadsheet ID

const SHEETS_CONFIG = {
    // Replace with your actual Google Sheets ID (from the URL between /d/ and /edit)
    SPREADSHEET_ID: 'e/2PACX-1vT3-4KaR4_trkzOpfXX3YJ4EJyLefUIASOTjqZ33msp2OkSKSqbXv4-Nd95ki4JkhHc7ON9N3qmk4MT',
    
    // Sheet name (usually Sheet1 unless you renamed it)
    SHEET_NAME: 'Sheet1'
};

// Function to fetch events from Google Sheets using CSV export (no API key required)
async function fetchEventsFromSheets() {
    try {
        // Use Google Sheets CSV export URL
        const csvUrl = `https://docs.google.com/spreadsheets/d/${SHEETS_CONFIG.SPREADSHEET_ID}/pub?gid=0&single=true&output=csv`;
        
        const response = await fetch(csvUrl);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const csvText = await response.text();
        const rows = parseCSV(csvText);
        
        if (rows.length === 0) {
            console.warn('No data found in Google Sheets');
            return [];
        }
        
        // Convert rows to event objects (skip header row)
        const events = [];
        
        for (let i = 1; i < rows.length; i++) {
            const row = rows[i];
            const event = {
                name: row[0] || '',
                location: row[1] || '',
                date: row[2] || '',
                time: row[3] || '',
                address: row[4] || '',
                rsvp: row[5] || '',
                tags: row[6] ? row[6].split('|') : []
            };
            
            // Only add events with required fields
            if (event.name && event.location && event.date) {
                events.push(event);
            }
        }
        
        return events;
        
    } catch (error) {
        console.error('Error fetching events from Google Sheets:', error);
        
        // Return demo data if Google Sheets fails
        return getDemoEvents();
    }
}

// Simple CSV parser function
function parseCSV(csvText) {
    const rows = [];
    const lines = csvText.split('\n');
    
    for (let line of lines) {
        if (line.trim() === '') continue;
        
        const row = [];
        let current = '';
        let inQuotes = false;
        
        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            
            if (char === '"' && (i === 0 || line[i-1] === ',')) {
                inQuotes = true;
            } else if (char === '"' && inQuotes && (i === line.length - 1 || line[i+1] === ',')) {
                inQuotes = false;
            } else if (char === ',' && !inQuotes) {
                row.push(current.trim());
                current = '';
            } else {
                current += char;
            }
        }
        
        row.push(current.trim());
        rows.push(row);
    }
    
    return rows;
}

// Demo events data (fallback)
function getDemoEvents() {
    return [
        {
            name: 'Bollywood Trivia Night',
            location: 'Spice Route Restaurant',
            date: '15 Dec 2024',
            time: '7:00 PM - 10:00 PM',
            address: '123 Main St, Dallas, TX 75201',
            rsvp: 'https://facebook.com/events/sample1',
            tags: ['Trivia', 'Prizes']
        },
        {
            name: 'Desi Karaoke Night',
            location: 'Curry Corner',
            date: '25 Dec 2024',
            time: '8:00 PM - 11:00 PM',
            address: '789 Elm Avenue, Austin, TX 78702',
            rsvp: 'https://facebook.com/events/sample2',
            tags: ['Karaoke', 'Music']
        },
        {
            name: 'Regional Food Festival',
            location: 'Tandoor Palace',
            date: '28 Dec 2024',
            time: '6:30 PM - 9:30 PM',
            address: '321 Pine Road, Austin, TX 78703',
            rsvp: 'https://facebook.com/events/sample3',
            tags: ['Food', 'Culture']
        },
        {
            name: 'Punjabi Music Night',
            location: 'Dhaba Express',
            date: '2 Jan 2025',
            time: '7:30 PM - 10:30 PM',
            address: '567 Cedar Lane, Austin, TX 78704',
            rsvp: 'https://facebook.com/events/sample4',
            tags: ['Music', 'Punjabi']
        },
        {
            name: 'South Indian Festival',
            location: 'Bangalore Bites',
            date: '5 Jan 2025',
            time: '6:00 PM - 9:00 PM',
            address: '890 Maple Street, Austin, TX 78705',
            rsvp: 'https://facebook.com/events/sample5',
            tags: ['Culture', 'Food']
        },
        {
            name: 'Gujarati Garba Night',
            location: 'Spice Village',
            date: '8 Jan 2025',
            time: '8:00 PM - 11:00 PM',
            address: '234 Willow Drive, Austin, TX 78706',
            rsvp: 'https://facebook.com/events/sample6',
            tags: ['Dance', 'Gujarati']
        }
    ];
}

// Format date for display
function formatEventDate(dateString) {
    try {
        const date = new Date(dateString);
        return {
            day: date.getDate(),
            month: date.toLocaleString('default', { month: 'short' }).toUpperCase(),
            year: date.getFullYear()
        };
    } catch (error) {
        // Fallback parsing for various date formats
        const parts = dateString.split(' ');
        if (parts.length >= 3) {
            return {
                day: parts[0],
                month: parts[1].toUpperCase(),
                year: parts[2]
            };
        }
        return {
            day: '1',
            month: 'JAN',
            year: '2025'
        };
    }
}

// Get color scheme for event cards (cycling through 3 colors)
function getEventColor(index) {
    const colors = [
        'from-red-600 to-orange-600',
        'from-blue-600 to-purple-600',
        'from-green-600 to-teal-600'
    ];
    return colors[index % colors.length];
}

// Get icon for event based on tags
function getEventIcon(tags) {
    return 'calendar';
    if (tags.includes('Trivia')) return 'help-circle';
    if (tags.includes('Karaoke') || tags.includes('Music')) return 'music';
    if (tags.includes('Food')) return 'utensils';
    if (tags.includes('Dance')) return 'users';
    return 'calendar';
}