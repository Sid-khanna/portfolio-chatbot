'use client';

import { useEffect, useState } from 'react';
import { FaMapMarkerAlt, FaCalendarAlt, FaRobot } from 'react-icons/fa';

export default function TopBoxBar() {
  const [date, setDate] = useState('');

  useEffect(() => {
    const today = new Date();
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    setDate(today.toLocaleDateString('en-US', options));
  }, []);

  return (
    <div className="w-full max-w-2xl text-sm flex justify-between items-center text-gray-300 px-4 pt-4 pb-2 z-10">
      <div className="flex items-center gap-2">
        <FaRobot className="text-orange-400" />
        <span>Robotics Engineer</span>
      </div>
      <div className="flex items-center gap-2">
        <FaMapMarkerAlt className="text-green-400" />
        <span>Toronto, Canada</span>
      </div>
      <div className="flex items-center gap-2">
        <FaCalendarAlt className="text-sky-400" />
        <span>{date}</span>
      </div>
    </div>
  );
}
