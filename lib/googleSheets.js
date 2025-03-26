// lib/googleSheets.js

const SHEET_ID = '1HGgOSGOcFKdr4GrNHb_ftJSIEH8Vp1RYn2EKiDDGOi8'; // Your Sheet ID
const API_KEY = 'AIzaSyANfVPNSIcu5A4yx2gT8G8jIMK4M4W57KA'; // Your API Key
const RANGE = 'ExerciseLogV3!A1:E'; // Sheet name and range (adjust if needed)

export const getWorkoutData = async () => {
  try {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`;
    console.log('Fetching from URL:', url);
    
    const response = await fetch(url);
    const responseText = await response.text();
    console.log('Raw response:', responseText);
    
    if (!response.ok) {
      console.error('Google Sheets API Error:', response.status, response.statusText);
      console.error('Error details:', responseText);
      throw new Error('Failed to fetch data from Google Sheets');
    }
    
    const data = JSON.parse(responseText);
    
    if (!data.values || !Array.isArray(data.values) || data.values.length === 0) {
      console.error('Invalid data format:', data);
      throw new Error('Invalid data format received from Google Sheets');
    }
    
    // Return all rows including headers for proper data processing
    return data.values;
  } catch (error) {
    console.error('Error fetching data from Google Sheets:', error);
    throw error;
  }
};
