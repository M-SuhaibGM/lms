import React from 'react';
import { AlertTriangle, CheckCircle } from 'lucide-react';

const Banner = ({ variant = 'success', label }) => {
    // Define styles and icons based on the variant
    const styles = {
        success: {
            backgroundColor: '#f0fdf4', // Light green background
            borderColor: '#4ade80', // Green border
            icon: <CheckCircle className="w-5 h-5 text-green-600" />, // Success icon
            textColor: 'text-green-600', // Green text
        },
        warning: {
            backgroundColor: '#fefce8', // Light yellow background
            borderColor: '#facc15', // Yellow border
            icon: <AlertTriangle className="w-5 h-5 text-yellow-600" />, // Warning icon
            textColor: 'text-yellow-600', // Yellow text
        },
    };

    // Get the styles and icon for the selected variant
    const { backgroundColor, borderColor, icon, textColor } = styles[variant];

    return (
        <div
            className={`p-4 rounded-md border-l-4 flex items-center gap-2`}
            style={{ backgroundColor, borderColor }}
        >
            {/* Icon */}
            {icon}

            {/* Label */}
            <p className={`${textColor} font-medium`}>{label}</p>
        </div>
    );
};

export default Banner;