# Hungama Nights - Google Sheets Integration Setup

This static website now fetches event data dynamically from Google Sheets using the public CSV export feature. **No API key required!**

## Setup Instructions

### 1. Create Your Google Sheet

1. **Create a new Google Sheet** with the following column headers in row 1:
   ```
   name | location | date | time | address | rsvp | tags
   ```

2. **Add your event data** starting from row 2. Here's the sample data structure:
   ```
   Bollywood Trivia Night | Spice Route Restaurant | 15 Dec 2024 | 7:00 PM - 10:00 PM | 123 Main St, Dallas, TX 75201 | https://facebook.com/events/sample1 | Trivia|Prizes
   ```

3. **Make the sheet public:**
   - Click "File" → "Share" → "Publish to the web"
   - Select "Entire Document"
   - Click "Publish"
   - Copy the sheet ID from the URL (the long string between `/d/` and `/edit`)

### 2. Configure the Website

1. Open `sheets-config.js`
2. Replace the placeholder value:
   ```javascript
   const SHEETS_CONFIG = {
       SPREADSHEET_ID: 'YOUR_ACTUAL_SPREADSHEET_ID_HERE',
       SHEET_NAME: 'Sheet1'
   };
   ```

**That's it!** No API key needed.

### 4. Sample Data Format

Here's the sample data you can copy into your Google Sheet:

| name | location | date | time | address | rsvp | tags |
|------|----------|------|------|---------|------|------|
| Bollywood Trivia Night | Spice Route Restaurant | 15 Dec 2024 | 7:00 PM - 10:00 PM | 123 Main St, Dallas, TX 75201 | https://facebook.com/events/sample1 | Trivia\|Prizes |
| Desi Karaoke Night | Curry Corner | 25 Dec 2024 | 8:00 PM - 11:00 PM | 789 Elm Avenue, Austin, TX 78702 | https://facebook.com/events/sample2 | Karaoke\|Music |
| Regional Food Festival | Tandoor Palace | 28 Dec 2024 | 6:30 PM - 9:30 PM | 321 Pine Road, Austin, TX 78703 | https://facebook.com/events/sample3 | Food\|Culture |
| Punjabi Music Night | Dhaba Express | 2 Jan 2025 | 7:30 PM - 10:30 PM | 567 Cedar Lane, Austin, TX 78704 | https://facebook.com/events/sample4 | Music\|Punjabi |
| South Indian Festival | Bangalore Bites | 5 Jan 2025 | 6:00 PM - 9:00 PM | 890 Maple Street, Austin, TX 78705 | https://facebook.com/events/sample5 | Culture\|Food |
| Gujarati Garba Night | Spice Village | 8 Jan 2025 | 8:00 PM - 11:00 PM | 234 Willow Drive, Austin, TX 78706 | https://facebook.com/events/sample6 | Dance\|Gujarati |

**Note:** Use the pipe symbol (|) to separate multiple tags.

## Features

- **Dynamic Loading:** Events are loaded automatically when the page loads
- **Auto-refresh:** Events are refreshed every 5 minutes
- **Fallback Data:** If Google Sheets fails to load, demo data is shown
- **Responsive Design:** Works on desktop and mobile
- **Navigation:** Desktop users get left/right navigation buttons
- **Color Cycling:** Event cards cycle through 3 attractive color schemes

## Troubleshooting

### Common Issues:

1. **404 Error:**
   - Check that your spreadsheet ID is correct
   - Ensure the sheet name matches (default is "Sheet1")
   - Verify the sheet is published publicly

2. **No Events Loading:**
   - Check browser console for error messages
   - Verify your sheet has the correct column headers
   - Ensure there's data in rows 2 and below

3. **CORS Issues:**
   - Make sure you're accessing the site via HTTP/HTTPS (not file://)
   - Ensure the sheet is properly published to the web

### Testing Your Setup:

1. Open your browser's developer console (F12)
2. Look for any error messages
3. You should see "Loaded X events successfully" if everything works
4. The events should appear with your custom data

## File Structure

```
static-export/
├── index.html              # Main website file
├── script.js               # General website functionality
├── sheets-config.js        # Google Sheets configuration
├── events-renderer.js      # Dynamic event rendering
├── styles.css             # Additional styles
└── README.md              # This file
```

## Benefits of This Approach

- **No API Key Required:** Simple setup without Google Cloud Console
- **No Authentication:** Public sheets work out of the box
- **No Rate Limits:** CSV export is more generous than API calls
- **Easy Management:** Just edit your Google Sheet and the website updates automatically
- **Real-time Updates:** Changes to your sheet appear on the website within minutes

## Security Note

Since this uses public sheets, ensure your Google Sheet only contains information you're comfortable sharing publicly. Don't include any sensitive data like email addresses or internal notes.