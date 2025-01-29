import React, { useState } from 'react';

const MobileNavToggle = () => {
    const [isActive, setIsActive] = useState(false);

    const handleClick = () => {
        setIsActive(!isActive);
    };

    const toggleClasses = () => {
        return `mobile-nav-toggle bi-list ${isActive ? 'bi-x' : ''}`;
    };

    return (
        <button className={toggleClasses()} onClick={handleClick}>
            {/* Optional: Add an icon or label for better accessibility */}
            <span className="sr-only">Toggle Mobile Navigation</span>
        </button>
    );
};

export default MobileNavToggle;
