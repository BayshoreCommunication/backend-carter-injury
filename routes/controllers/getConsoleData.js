

import { google } from 'googleapis';

function getFormattedDate() {
    const currentDate = new Date();
    
    const year = currentDate.getFullYear().toString().slice(-2); // Get the last two digits of the year
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
    const day = currentDate.getDate().toString().padStart(2, '0');
  
    const formattedDate = `20${year}-${month}-${day}`;
    return formattedDate;
  }

const get_console_data =async()=>{
    const {siteUrl}=req.body
    const searchConsole = google.searchconsole({
        version: 'v1',
        auth: oauth2Client,
      });
      const dateResult = getFormattedDate();

      try {
        const response = await searchConsole.searchanalytics.query({
          siteUrl: siteUrl,
          startDate: '2023-12-12',
          endDate: dateResult,
          dimensions: ['date'],
          rowLimit: 10,
          startRow: 0,
        });
    
        return res.status(200).json({ data:response.data })
    } catch (error) {
        return  res.status(400).json({ error:error })
      }
}

export default get_console_data;
