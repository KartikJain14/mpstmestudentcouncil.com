"use client";

import React, { useState, useMemo, useCallback } from "react";
import Image from 'next/image';

// Type definitions for event data
type EventType = {
  year: number;
  month: number;
  day: number;
  title: string;
  link?: string;
  description: string;
  image?: string;
};

// --- Raw Event Data ---
// All events from the provided CSV files, consolidated and sorted.
const eventsData: EventType[] = [
  {
    year: 2025,
    month: 8, // September (months are 0-indexed in JS Date objects)
    day: 8,
    title: "ProdAIgy by Women In Product India",
    description: "Workshop on Agentic AI.",
  },
  {
    year: 2025,
    month: 8,
    day: 9,
    title: "LinkedIn Workshop",
    description: "A LinkedIn workshop organized to educate students about the benefits and prospects they'll achieve and discover through this social media platform.",
  },
  {
    year: 2025,
    month: 8,
    day: 15,
    title: "Mehfil",
    description: "An event by EDB.",
  },
  {
    year: 2025,
    month: 8,
    day: 16,
    title: "Blood Donation Drive",
    description: "Blood Donation Drive by Social Impact.",
  },
  {
    year: 2025,
    month: 8,
    day: 17,
    title: "Blood Donation Drive",
    description: "Blood Donation Drive by Social Impact.",
  },
  {
    year: 2025,
    month: 8,
    day: 18,
    title: "Code Red 2.0",
    description: "An event by IEEE Robotics and Automation Society.",
  },
  {
    year: 2025,
    month: 8,
    day: 21,
    title: "CL MEET",
    description: "An event by OUTREACH.",
  },
  {
    year: 2025,
    month: 8,
    day: 24,
    title: "Gamers Asylum & Battle of Boards, Wings and Roots",
    description: "An event by SPORTS and 4C.",
  },
  {
    year: 2025,
    month: 8,
    day: 25,
    title: "Gamers Asylum & Battle of Boards, Wings and Roots",
    description: "An event by SPORTS and 4C.",
  },
  {
    year: 2025,
    month: 8,
    day: 26,
    title: "Wings and Roots",
    description: "An event by 4C.",
  },
  {
    year: 2025,
    month: 8,
    day: 29,
    title: "Unplanned 5.0, Findrome x Crowwd",
    description: "One-on-one talk show between industry leaders in growing startups and fundings.",
  },
  {
    year: 2025,
    month: 8,
    day: 30,
    title: "Blind Date With A Book",
    description: "An event by EDB.",
  },

   {
    "year": 2025,
    "month": 9,
    "day": 1,
    "title": "BRS & BDWAB",
    "description": "BRS by TRC, a three-day academic event focused on research and collaboration. BDWAB by EDB."
  },
  {
    "year": 2025,
    "month": 9,
    "day": 2,
    "title": "BRS & BDWAB",
    "description": "BRS by TRC, a three-day academic event focused on research and collaboration. BDWAB by EDB."
  },
  {
    "year": 2025,
    "month": 9,
    "day": 3,
    "title": "BRS & BDWAB",
    "description": "BRS by TRC, a three-day academic event focused on research and collaboration. BDWAB by EDB."
  },
  {
    "year": 2025,
    "month": 9,
    "day": 4,
    "title": "BRS, BDWAB & Aerovisions",
    "description": "BRS by TRC, BDWAB by EDB, and Aerovisions by AeroXperts."
  },
  {
    "year": 2025,
    "month": 9,
    "day": 6,
    "title": "M2 Test",
    "description": "M2 Test."
  },
  {
    "year": 2025,
    "month": 9,
    "day": 13,
    "title": "Elevate Day 2",
    "description": "Flagship event by IEEE Robotics and Automation Society."
  },
  {
    "year": 2025,
    "month": 9,
    "day": 14,
    "title": "Elevate Day 2",
    "description": "Flagship event by IEEE Robotics and Automation Society."
  },
  {
    "year": 2025,
    "month": 9,
    "day": 15,
    "title": "Pre-event",
    "description": "Pre-event by Data Mavericks."
  },
  {
    "year": 2025,
    "month": 9,
    "day": 17,
    "title": "Pre-event",
    "description": "Pre-event activities by Sattva."
  },
  {
    "year": 2025,
    "month": 9,
    "day": 24,
    "title": "Pre-event",
    "description": "Pre-event activities by Sattva."
  },
  {
    "year": 2025,
    "month": 9,
    "day": 25,
    "title": "Hackathon",
    "description": "Hackathon by Data Mavericks."
  },
  {
    "year": 2025,
    "month": 9,
    "day": 26,
    "title": "Hackathon",
    "description": "Hackathon by Data Mavericks."
  },
  {
    "year": 2025,
    "month": 9,
    "day": 28,
    "title": "Pre-event",
    "description": "Pre-event seminar and activities by Social Impact."
  },
  {
    "year": 2025,
    "month": 9,
    "day": 29,
    "title": "Pre-event",
    "description": "Pre-event activities by Taqneeq."
  },
  {
    "year": 2025,
    "month": 9,
    "day": 30,
    "title": "Pre-event",
    "description": "Pre-event activities by Taqneeq."
  },
  {
    "year": 2025,
    "month": 9,
    "day": 31,
    "title": "Cult Night & Botson 10.0",
    "description": "Cult Night by Cultural Committee and a speaker session by IET."
  },

  {
    "year": 2025,
    "month": 10,
    "day": 1,
    "title": "Botson 10.0/ Adappt 3.0",
    "description": "Flagship event, bot building/Technical Ideathon by IET/IETE."
  },
  {
    "year": 2025,
    "month": 10,
    "day": 2,
    "title": "Botson 10.0/ Adappt 3.0",
    "description": "Flagship event, bot building/Technical Ideathon by IET/IETE."
  },
  {
    "year": 2025,
    "month": 10,
    "day": 3,
    "title": "Open mic night, FinPlay",
    "description": "Open mic night by Music Committee (tentative) followed by jamming session (VCR) and engaging financial student fun activities by FinDrome."
  },
  {
    "year": 2025,
    "month": 10,
    "day": 4,
    "title": "Stockraze",
    "description": "Flagship event - Stock Market Simulation by Colloquium."
  },
  {
    "year": 2025,
    "month": 10,
    "day": 5,
    "title": "Focal Point",
    "description": "Seminars and workshops by Khachaak."
  },
  {
    "year": 2025,
    "month": 10,
    "day": 6,
    "title": "Mock interviews/Focal Point",
    "description": "Seminars and workshops by Khachaak and mock interviews by Data Mavericks."
  },
  {
    "year": 2025,
    "month": 10,
    "day": 7,
    "title": "Mumbai MUN 2025",
    "description": "An event by MUNSociety."
  },
  {
    "year": 2025,
    "month": 10,
    "day": 8,
    "title": "Mumbai MUN 2025",
    "description": "An event by MUNSociety."
  },
  {
    "year": 2025,
    "month": 10,
    "day": 9,
    "title": "Mumbai MUN 2025",
    "description": "An event by MUNSociety."
  },
  {
    "year": 2025,
    "month": 10,
    "day": 13,
    "title": "Social Conclave Pre Event",
    "description": "A pre-event for the Social Conclave by Social Impact."
  },
  {
    "year": 2025,
    "month": 10,
    "day": 14,
    "title": "Social Conclave Pre Event",
    "description": "A pre-event for the Social Conclave by Social Impact."
  },
  {
    "year": 2025,
    "month": 10,
    "day": 24,
    "title": "Final Exams ODD SEMESTER",
    "description": "Final Exams for the Odd Semester begin."
  },

  {
    "year": 2025,
    "month": 11,
    "day": 1,
    "title": "Final Exams ODD SEMESTER",
    "description": "Final exams for the odd semester are scheduled."
  },

  {
    "year": 2026,
    "month": 0,
    "day": 6,
    "title": "DJ night",
    "description": "An underground DJ night organized by the Music Committee."
  },
  {
    "year": 2026,
    "month": 0,
    "day": 8,
    "title": "Social Conclave Pre Conclave",
    "description": "A pre-conclave event for the Social Conclave."
  },
  {
    "year": 2026,
    "month": 0,
    "day": 9,
    "title": "Social Conclave Pre Conclave",
    "description": "A pre-conclave event for the Social Conclave."
  },
  {
    "year": 2026,
    "month": 0,
    "day": 10,
    "title": "Propel 25",
    "description": "An event by Team Sudarshan (tentative)."
  },
  {
    "year": 2026,
    "month": 0,
    "day": 11,
    "title": "Propel 25",
    "description": "An event by Team Sudarshan (tentative)."
  },
  {
    "year": 2026,
    "month": 0,
    "day": 14,
    "title": "4C Event",
    "description": "An event by 4C."
  },
  {
    "year": 2026,
    "month": 0,
    "day": 15,
    "title": "4C Event",
    "description": "An event by 4C."
  },
  {
    "year": 2026,
    "month": 0,
    "day": 16,
    "title": "Bloomberg workshop",
    "description": "A Bloomberg workshop by FinDrome."
  },
  {
    "year": 2026,
    "month": 0,
    "day": 17,
    "title": "Hack n Code",
    "description": "An overnight hackathon by IET."
  },
  {
    "year": 2026,
    "month": 0,
    "day": 18,
    "title": "Hack n Code",
    "description": "An overnight hackathon by IET."
  },
  {
    "year": 2026,
    "month": 0,
    "day": 19,
    "title": "Expert talk",
    "description": "An expert talk by IETE."
  },
  {
    "year": 2026,
    "month": 0,
    "day": 20,
    "title": "Expert Talk",
    "description": "Industry Interaction and Expert Talk by ASCE MPSTME CESA/IETE."
  },
  {
    "year": 2026,
    "month": 0,
    "day": 21,
    "title": "Bizzneeti",
    "description": "An event by Colloquium (tentative)."
  },
  {
    "year": 2026,
    "month": 0,
    "day": 22,
    "title": "Bizzneeti",
    "description": "An event by Colloquium."
  },
  {
    "year": 2026,
    "month": 0,
    "day": 23,
    "title": "Bizzneeti",
    "description": "An event by Colloquium."
  },
  {
    "year": 2026,
    "month": 0,
    "day": 24,
    "title": "Cypher 5.0",
    "description": "NMIMS Official Hackathon by Taqneeq (tentative)."
  },
  {
    "year": 2026,
    "month": 0,
    "day": 25,
    "title": "Cypher 5.0",
    "description": "NMIMS Official Hackathon by Taqneeq (tentative)."
  },
  {
    "year": 2026,
    "month": 0,
    "day": 27,
    "title": "Social Conclave",
    "description": "A UN backed conference by Social Impact."
  },
  {
    "year": 2026,
    "month": 0,
    "day": 28,
    "title": "Social Conclave",
    "description": "A UN backed conference by Social Impact."
  },
  {
    "year": 2026,
    "month": 0,
    "day": 29,
    "title": "Social Conclave",
    "description": "A UN backed conference by Social Impact."
  },
  {
    "year": 2026,
    "month": 0,
    "day": 30,
    "title": "Social Conclave",
    "description": "A UN backed conference by Social Impact."
  },
  {
    "year": 2026,
    "month": 0,
    "day": 31,
    "title": "Cypher 5.0",
    "description": "NMIMS Official Hackathon by Taqneeq (tentative)."
  },

  {
    "year": 2026,
    "month": 1,
    "day": 1,
    "title": "Cypher 5.0",
    "description": "NMIMS Official Hackathon by Taqneeq (tentative)."
  },
  {
    "year": 2026,
    "month": 1,
    "day": 3,
    "title": "Inceptio 9.0",
    "description": "An event by IEC."
  },
  {
    "year": 2026,
    "month": 1,
    "day": 4,
    "title": "Inceptio 9.0",
    "description": "An event by IEC."
  },
  {
    "year": 2026,
    "month": 1,
    "day": 5,
    "title": "Inceptio 9.0",
    "description": "An event by IEC."
  },
  {
    "year": 2026,
    "month": 1,
    "day": 6,
    "title": "Expert Talk",
    "description": "Industry Talk by ASCE MPSTME CESA."
  },
  {
    "year": 2026,
    "month": 1,
    "day": 7,
    "title": "Hyphen",
    "description": "An event by GDG on Campus MPSTME (tentative)."
  },
  {
    "year": 2026,
    "month": 1,
    "day": 8,
    "title": "Hyphen",
    "description": "An event by GDG on Campus MPSTME (tentative)."
  },
  {
    "year": 2026,
    "month": 1,
    "day": 9,
    "title": "TEP",
    "description": "An event by EDB."
  },
  {
    "year": 2026,
    "month": 1,
    "day": 10,
    "title": "TEP",
    "description": "An event by EDB."
  },
  {
    "year": 2026,
    "month": 1,
    "day": 13,
    "title": "M1 Test",
    "description": "A test for students."
  },
  {
    "year": 2026,
    "month": 1,
    "day": 20,
    "title": "Decibel / Technical Debate",
    "description": "Flagship event by Music Committee (tentative) and a technical debate by IETE."
  },
  {
    "year": 2026,
    "month": 1,
    "day": 23,
    "title": "Decibel",
    "description": "Performances and DJ by Music Committee (tentative)."
  },
  {
    "year": 2026,
    "month": 1,
    "day": 24,
    "title": "Expert Talk",
    "description": "Industry Talk by ASCE MPSTME CESA."
  },
  {
    "year": 2026,
    "month": 1,
    "day": 25,
    "title": "Taqneeq 18.0",
    "description": "Official Tech Fest of MPSTME by TQ."
  },
  {
    "year": 2026,
    "month": 1,
    "day": 26,
    "title": "Taqneeq 18.0",
    "description": "Official Tech Fest of MPSTME by TQ."
  },
  {
    "year": 2026,
    "month": 1,
    "day": 27,
    "title": "Taqneeq 18.0",
    "description": "Official Tech Fest of MPSTME by TQ."
  },
  {
    "year": 2026,
    "month": 1,
    "day": 28,
    "title": "Taqneeq 18.0",
    "description": "Official Tech Fest of MPSTME by TQ."
  },

  {
    "year": 2026,
    "month": 2,
    "day": 3,
    "title": "Panel Discussion",
    "description": "A flagship event by FinDrome (tentative)."
  },
  {
    "year": 2026,
    "month": 2,
    "day": 4,
    "title": "Igeniero 2026",
    "description": "An event by ASCE MSTME CESA."
  },
  {
    "year": 2026,
    "month": 2,
    "day": 5,
    "title": "Igeniero 2026 / Social and Cultural Event",
    "description": "An event by ASCE MSTME CESA."
  },
  {
    "year": 2026,
    "month": 2,
    "day": 6,
    "title": "Abhirva 3.0",
    "description": "A workshop by ASCE MSTME CESA."
  },
  {
    "year": 2026,
    "month": 2,
    "day": 7,
    "title": "Abhirva 3.0",
    "description": "A flagship event (Speaker session & Bplan) by Enactus."
  },
  {
    "year": 2026,
    "month": 2,
    "day": 9,
    "title": "Figma Workshop",
    "description": "A workshop by GDG On Campus."
  },
  {
    "year": 2026,
    "month": 2,
    "day": 11,
    "title": "Igeniero 2026",
    "description": "An event by ASCE MSTME CESA."
  },
  {
    "year": 2026,
    "month": 2,
    "day": 12,
    "title": "Igeniero 2026",
    "description": "An event by ASCE MSTME CESA."
  },
  {
    "year": 2026,
    "month": 2,
    "day": 13,
    "title": "Igeniero 2026 / CTF",
    "description": "Igeniero 2026 / Social and Cultural Event / Inter College Cybersecurity CTF Competition by ASCE MSTME CESA/Cyber Chakravyuh."
  },
  {
    "year": 2026,
    "month": 2,
    "day": 15,
    "title": "Prize distribution",
    "description": "A prize distribution event by OUTREACH."
  },
  {
    "year": 2026,
    "month": 2,
    "day": 18,
    "title": "Internship Fair",
    "description": "An Internship Fair (Tentative) by TRC."
  },
  {
    "year": 2026,
    "month": 2,
    "day": 20,
    "title": "Internship Fair",
    "description": "An Internship Fair (Tentative) by TRC."
  },
  {
    "year": 2026,
    "month": 2,
    "day": 21,
    "title": "Semicode",
    "description": "An event by ACM."
  },
  {
    "year": 2026,
    "month": 2,
    "day": 22,
    "title": "Semicode",
    "description": "An event by ACM."
  },
  {
    "year": 2026,
    "month": 2,
    "day": 23,
    "title": "M2 Test",
    "description": "A test for students."
  },
  {
    "year": 2026,
    "month": 2,
    "day": 29,
    "title": "Semicode",
    "description": "An event by ACM."
  },

  {
    "year": 2026,
    "month": 3,
    "day": 3,
    "title": "IET TALKS / ULECTRO",
    "description": "A speaker session by IET and IETE."
  },
  {
    "year": 2026,
    "month": 3,
    "day": 4,
    "title": "ULECTRO",
    "description": "A flagship hardware display competition by IETE."
  },
  {
    "year": 2026,
    "month": 3,
    "day": 11,
    "title": "Prize distribution",
    "description": "A prize distribution event by Outreach."
  },

  {
    "year": 2026,
    "month": 4,
    "day": 1,
    "title": "FINAL EXAMS EVEN SEMESTER",
    "description": "Final exams for the even semester are scheduled."
  },
];

// Month names mapping
const monthNames = [
  "January", "February", "March", "April", "May", "June", "July",
  "August", "September", "October", "November", "December"
];

// Utility function to get the date of an event
const getEventDate = (event: EventType): Date => {
  return new Date(event.year, event.month, event.day);
};

export default function EventCalendar() {
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);

  // Memoize all events, sorted chronologically
  const sortedEvents = useMemo(() => {
    return [...eventsData].sort((a, b) => {
      const dateA = getEventDate(a).getTime();
      const dateB = getEventDate(b).getTime();
      return dateA - dateB;
    });
  }, []);

  // Filter events for the currently displayed month
  const eventsThisMonth = useMemo(() => {
    return sortedEvents.filter(
      (event) => event.year === currentYear && event.month === currentMonth
    );
  }, [currentYear, currentMonth, sortedEvents]);

  // Group events by day for easy calendar lookup
  const eventsByDay = useMemo(() => {
    const grouped: { [day: number]: EventType[] } = {};
    eventsThisMonth.forEach((event) => {
      const day = event.day;
      if (!grouped[day]) grouped[day] = [];
      grouped[day].push(event);
    });
    return grouped;
  }, [eventsThisMonth]);

  // Calendar grid logic
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay();
  const calendarDays = useMemo(() => {
    const days: (number | null)[] = [...Array(firstDayOfWeek).fill(null)];
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  }, [firstDayOfWeek, daysInMonth]);

  // Navigation handlers
  const prevMonth = useCallback(() => {
    setCurrentMonth((prev) => (prev === 0 ? 11 : prev - 1));
    if (currentMonth === 0) setCurrentYear((prev) => prev - 1);
  }, [currentMonth]);

  const nextMonth = useCallback(() => {
    setCurrentMonth((prev) => (prev === 11 ? 0 : prev + 1));
    if (currentMonth === 11) setCurrentYear((prev) => prev + 1);
  }, [currentMonth]);
  
  // Handlers for the modal
  const handleEventClick = useCallback((event: EventType) => {
    setSelectedEvent(event);
  }, []);
  
  const closeModal = useCallback(() => {
    setSelectedEvent(null);
  }, []);

  return (
    <main className="w-full min-h-screen bg-black text-white flex flex-col items-center p-4 font-sans">
      <div className="w-full max-w-6xl mt-12 md:mt-24">
        {/* --- Calendar View Section --- */}
        <h1 className="text-3xl md:text-5xl font-extrabold text-yellow-400 mb-8 text-center">Event Calendar</h1>
        
        {/* Header with navigation */}
        <div className="flex justify-between items-center mb-4">
          <button onClick={prevMonth} className="px-3.5 py-1.5 bg-yellow-500 text-black rounded-md hover:bg-yellow-600 transition-colors text-sm font-semibold">
            Prev
          </button>
          <h2 className="text-xl md:text-2xl font-bold text-center">
            {monthNames[currentMonth]} {currentYear}
          </h2>
          <button onClick={nextMonth} className="px-3.5 py-1.5 bg-yellow-500 text-black rounded-md hover:bg-yellow-600 transition-colors text-sm font-semibold">
            Next
          </button>
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="text-center font-medium text-yellow-400 text-sm md:text-base pb-2">
              {day}
            </div>
          ))}

          {calendarDays.map((day, idx) =>
            day === null ? (
              <div key={idx} />
            ) : (
              <div
                key={idx}
                className="border border-gray-700 rounded-lg p-2 flex flex-col justify-start items-start relative min-h-[100px] hover:bg-gray-800 transition-colors cursor-pointer"
              >
                <div className="text-xs md:text-sm font-semibold text-gray-300 mb-1">{day}</div>
                
                <div className="w-full space-y-1">
                  {eventsByDay[day]?.map((event, i) => (
                    <div
                      key={i}
                      onClick={() => handleEventClick(event)}
                      className="block bg-yellow-400 text-black px-1.5 py-0.5 text-[10px] md:text-xs rounded-md truncate hover:bg-yellow-300 transition-colors"
                      title={event.title}
                    >
                      {event.title}
                    </div>
                  ))}
                </div>
              </div>
            )
          )}
        </div>
      </div>
      
      {/* --- Timeline View Section --- */}
      <div className="w-full max-w-6xl mt-24">
        <h2 className="text-3xl md:text-4xl font-extrabold text-yellow-400 mb-8 text-center">Upcoming Events</h2>
        
        <div className="space-y-8">
          {sortedEvents.map((event, idx) => (
            <div 
              key={idx} 
              className="group flex flex-col md:flex-row items-start md:items-center p-4 rounded-lg bg-gray-900 border border-gray-700 transform hover:scale-105 transition-transform duration-300"
            >
              <div className="flex-shrink-0 w-full md:w-36 text-center md:text-left mb-4 md:mb-0">
                <p className="text-lg font-bold text-yellow-300">
                  {monthNames[event.month]} {event.day}
                </p>
                <p className="text-sm text-gray-400">{event.year}</p>
              </div>
              <div className="flex-grow">
                <h3 className="text-xl font-bold text-gray-100 group-hover:text-yellow-400 transition-colors">
                  {event.title}
                </h3>
                <p className="text-sm text-gray-400 mt-1">{event.description}</p>
                {event.link && (
                  <a href={event.link} target="_blank" rel="noopener noreferrer" className="text-yellow-500 hover:text-yellow-400 text-sm mt-2 inline-block transition-colors">
                    Read more →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- Modal for Event Details --- */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-gray-800 p-6 rounded-lg max-w-lg w-full relative border border-gray-700">
            <button onClick={closeModal} className="absolute top-2 right-2 text-gray-400 hover:text-white text-xl">
              &times;
            </button>
            <h3 className="text-2xl font-bold text-yellow-400 mb-2">{selectedEvent.title}</h3>
            <p className="text-sm text-gray-400 mb-4">
              {monthNames[selectedEvent.month]} {selectedEvent.day}, {selectedEvent.year}
            </p>
            {selectedEvent.image && (
                <div className="w-full h-48 relative overflow-hidden rounded-lg mb-4">
                    <Image
                      src={selectedEvent.image}
                      alt={selectedEvent.title}
                      layout="fill"
                      objectFit="cover"
                      className="group-hover:scale-105 transition-transform duration-300"
                    />
                </div>
            )}
            <p className="text-gray-200 text-base">{selectedEvent.description}</p>
            {selectedEvent.link && (
              <a 
                href={selectedEvent.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="mt-4 inline-block px-4 py-2 bg-yellow-500 text-black rounded-md hover:bg-yellow-600 transition-colors font-semibold"
              >
                Visit Link
              </a>
            )}
          </div>
        </div>
      )}
    </main>
  );
}