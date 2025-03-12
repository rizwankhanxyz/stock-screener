import React, { useEffect, useRef } from "react";
import "../App.css";


const STOCK_TERMS = [
    "Earnings Per Share",
    "Debt/Equity Ratio",
    "Halal Compliance",
    "Financial Screening",
    "Interest-Bearing Debt",
    "Shariah-Compliant",
    "Market Cap",
    "Zakat Screening",
    "Dividend Yield",
    "Riba-Free Stocks",
    "Business Screening",
    "Profit Margin",
    "Islamic Finance",
    "Stock Liquidity",
    "Sukuk vs Bonds",
    "Business Screening",
];

const NUM_SQUARES = 20; // Number of squares (20)
const SPEED = 1; // Base speed for movement

// Function to generate a random color
const getRandomColor = () => {
    const colors = ["rgb(31, 66, 42);", "#FF5722", "#4CAF50", "#03A9F4", "#9C27B0", "#FFEB3B", "#E91E63"];
    return colors[Math.floor(Math.random() * colors.length)];
};

const FloatingSquares = () => {
    const containerRef = useRef(null);
    // const squaresRef = useRef([]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const squares = Array.from({ length: NUM_SQUARES }).map((_, index) => ({
            x: Math.random() * window.innerWidth, // Random start X
            y: Math.random() * window.innerHeight, // Random start Y
            vx: (Math.random() - 0.5) * SPEED * 2, // Random velocity X
            vy: (Math.random() - 0.5) * SPEED * 2, // Random velocity Y
            term: STOCK_TERMS[index % STOCK_TERMS.length], // Assign stock-related term
            color: getRandomColor(), // Assign random text color
            element: document.createElement("div"),
        }));

        // Append squares to container
        squares.forEach((square) => {
            square.element.classList.add("square");
            square.element.textContent = square.term; // Add stock term inside box
            square.element.style.color = square.color; // Apply random color to text
            container.appendChild(square.element);
        });

        // Animation loop
        const animate = () => {
            squares.forEach((square) => {
                // Update position
                square.x += square.vx;
                square.y += square.vy;

                // Bounce off screen edges
                if (square.x <= 0 || square.x + 120 >= window.innerWidth) {
                    square.vx *= -1;
                }
                if (square.y <= 0 || square.y + 60 >= window.innerHeight) {
                    square.vy *= -1;
                }

                // Check collisions with other squares
                squares.forEach((other) => {
                    if (square === other) return;
                    const dx = square.x - other.x;
                    const dy = square.y - other.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    const minDist = 60; // Min distance to avoid overlap (60)

                    if (distance < minDist) {
                        // Swap velocities (elastic collision)
                        const tempVx = square.vx;
                        const tempVy = square.vy;
                        square.vx = other.vx;
                        square.vy = other.vy;
                        other.vx = tempVx;
                        other.vy = tempVy;

                        // Move them apart to prevent sticking
                        const angle = Math.atan2(dy, dx);
                        square.x += Math.cos(angle) * 2;
                        square.y += Math.sin(angle) * 2;
                        other.x -= Math.cos(angle) * 2;
                        other.y -= Math.sin(angle) * 2;
                        // const angle = Math.atan2(dy, dx);
                        // square.vx = Math.cos(angle) * SPEED;
                        // square.vy = Math.sin(angle) * SPEED;
                    }
                });

                // Apply new position
                square.element.style.transform = `translate(${square.x}px, ${square.y}px)`;
            });

            requestAnimationFrame(animate);
        };

        animate();

        // Cleanup when unmounting
        return () => {
            squares.forEach((square) => {
                container.removeChild(square.element);
            });
        };
    }, []);

    return <div className="floating-squares" ref={containerRef}></div>;
};

export default FloatingSquares;
