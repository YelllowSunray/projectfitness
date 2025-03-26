export async function GET() {
    try {
        const SHEET_ID = "1HGgOSGOcFKdr4GrNHb_ftJSIEH8Vp1RYn2EKiDDGOi8"; // Replace with your Google Sheet ID
        const API_KEY = "AIzaSyANfVPNSIcu5A4yx2gT8G8jIMK4M4W57KA"; // Replace with your API Key
        const RANGE = "ExerciseLogV3!A1:E"; // Adjust range if needed
    
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`;
        console.log('Fetching from URL:', url);
        
        const res = await fetch(url);
        const responseText = await res.text();
        console.log('Raw response:', responseText);
        
        if (!res.ok) {
            console.error('Google Sheets API Error:', res.status, res.statusText);
            console.error('Error details:', responseText);
            return new Response(JSON.stringify({ error: 'Failed to fetch data from Google Sheets' }), {
                status: res.status,
                headers: { 'Content-Type': 'application/json' }
            });
        }
        
        let data;
        try {
            data = JSON.parse(responseText);
        } catch (parseError) {
            console.error('JSON Parse Error:', parseError);
            return new Response(JSON.stringify({ error: 'Invalid JSON response from Google Sheets' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }
        
        console.log('Parsed data:', data);
    
        if (!data.values || !Array.isArray(data.values) || data.values.length === 0) {
            console.error('Invalid data format:', data);
            return new Response(JSON.stringify({ error: 'Invalid data format received from Google Sheets' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }
    
        // Convert rows into an array of objects
        const headers = data.values[0];
        const rows = data.values.slice(1).map(row => {
            return Object.fromEntries(row.map((val, index) => [headers[index], val]));
        });
    
        console.log('Processed rows:', rows);
        return new Response(JSON.stringify(rows), {
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error('API Error:', error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
  