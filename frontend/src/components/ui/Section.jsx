import React from 'react';

const Section = ({ children, className = '', id }) => {
  return (
    <section id={id} className={`section py-20 md:py-28 ${className}`}>
      {children}
    </section>
  );
};

export default Section;
