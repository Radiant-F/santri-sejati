import React, {useEffect, useState} from 'react';

export default function useDaysInMonth(monthIndex: number): number {
  const [daysInMonth, setDaysInMonth] = useState<number>(0);

  useEffect(() => {
    const calculateDaysInMonth = () => {
      switch (monthIndex) {
        case 0: // January
        case 2: // March
        case 4: // May
        case 6: // July
        case 7: // August
        case 9: // October
        case 11: // December
          setDaysInMonth(31);
          break;
        case 3: // April
        case 5: // June
        case 8: // September
        case 10: // November
          setDaysInMonth(30);
          break;
        case 1: // February
          const year = new Date().getFullYear(); // Get the current year
          if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
            // Leap year
            setDaysInMonth(29);
          } else {
            setDaysInMonth(28);
          }
          break;
        default:
          setDaysInMonth(0); // Invalid month index
          break;
      }
    };

    calculateDaysInMonth();
  }, [monthIndex]);

  return daysInMonth;
}
