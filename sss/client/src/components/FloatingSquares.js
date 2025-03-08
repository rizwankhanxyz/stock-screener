import React, { useEffect, useRef } from "react";
import "../App.css";

const NUM_SQUARES = 20; // Number of squares
const SPEED = 1; // Base speed for movement

const FloatingSquares = () => {
    const containerRef = useRef(null);
    // const squaresRef = useRef([]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const squares = Array.from({ length: NUM_SQUARES }).map(() => ({
            x: Math.random() * window.innerWidth, // Random start X
            y: Math.random() * window.innerHeight, // Random start Y
            vx: (Math.random() - 0.5) * SPEED * 2, // Random velocity X
            vy: (Math.random() - 0.5) * SPEED * 2, // Random velocity Y
            element: document.createElement("div"),
        }));

        // Append squares to container
        squares.forEach((square) => {
            square.element.classList.add("square");
            container.appendChild(square.element);
        });

        // Animation loop
        const animate = () => {
            squares.forEach((square) => {
                // Update position
                square.x += square.vx;
                square.y += square.vy;

                // Bounce off screen edges
                if (square.x <= 0 || square.x + 100 >= window.innerWidth) {
                    square.vx *= -1;
                }
                if (square.y <= 0 || square.y + 100 >= window.innerHeight) {
                    square.vy *= -1;
                }

                // Check collisions with other squares
                squares.forEach((other) => {
                    if (square === other) return;
                    const dx = square.x - other.x;
                    const dy = square.y - other.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    const minDist = 60; // Min distance to avoid overlap

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
