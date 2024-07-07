import { useState, useEffect } from 'react';

const DateTimeFormatter = ({ timestamp }: { timestamp: string }) => {
    const [formattedDate, setFormattedDate] = useState<string>('');
    const [formattedTime, setFormattedTime] = useState<string>('');
  
    useEffect(() => {
        const dateObject = new Date(timestamp);
    
        // Format date as 'YYYY-MM-DD'
        const formattedDateString = dateObject.toISOString().split('T')[0];
    
        // Format time as 'HH:MM:SS'
        const formattedTimeString = dateObject.toISOString().split('T')[1].split('.')[0];
    
        setFormattedDate(formattedDateString);
        setFormattedTime(formattedTimeString);
      }, [timestamp]);
  
    return (
      <>
          {formattedDate} {formattedTime}
      </>
    );
  };

  export default DateTimeFormatter;