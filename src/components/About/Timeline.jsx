import React, { useState, useEffect} from 'react';
import '../../css/Timeline.css';

const Timeline = () => {
  const [activeIndex, setActiveIndex] = useState(0); // Initially highlight the first point

  const handleClick = (index) => {
    setActiveIndex(index); // Set active index based on the clicked point
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveIndex(4); // Make all points active after 3 seconds
    }, 3000);

    return () => clearTimeout(timer); // Clean up timer on unmount
  }, []);
  const timelineEvents = [
    { title: 'Event 1', date: '2000' },
    { title: 'Event 2', date: '2005' },
    { title: 'Restaraunt Cashier @ Lime Fresh Mexican', date: '2020' },
    { title: 'Assistant Campus Leader @ Camp MahkeeNac', date: '2022' },
    { title: 'SWE & PM @ Baron Technologies', date: '2023' },
  ];
  
  return (
    <div>
      <section className="timeline">
        <div className="timeline-line">
          <div
            className="timeline-innerline"
            style={{
              width: `${(activeIndex + 1) / timelineEvents.length * 100}%`, // Adjust width dynamically based on activeIndex and number of events
            }}
          ></div>
        </div>

        <ul>
          {timelineEvents.map(({ title, date }, index) => (
            <li
              key={index}
              className={activeIndex >= index ? 'active' : ''}
              onClick={() => handleClick(index)}
            >
              <span className="timeline-point"></span>
              <span className="date">{date}</span>
              <div className='point-name'>{title}</div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Timeline;
