import { useEffect, useRef } from "react";

// Simple particle trail that follows the mouse cursor.
// It creates a canvas that covers the whole viewport and draws small fading circles.
const ParticleBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Resize canvas to fill the window
        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener("resize", resize);

        // Particle storage
        type Particle = { x: number; y: number; size: number; alpha: number };
        const particles: Particle[] = [];
        const maxParticles = 200;
        const addParticle = (x: number, y: number) => {
            particles.push({
                x,
                y,
                size: Math.random() * 4 + 3, // 3‑7px
                alpha: 0.9,
            });
            if (particles.length > maxParticles) particles.shift();
        };

        const mouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            addParticle(x, y);
        };
        window.addEventListener("mousemove", mouseMove);

        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach((p) => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255,255,255,${p.alpha})`;
                ctx.fill();
                p.alpha -= 0.015; // fade slowly
                p.size += 0.05;
            });
            // Remove faded particles
            for (let i = particles.length - 1; i >= 0; i--) {
                if (particles[i].alpha <= 0) particles.splice(i, 1);
            }
            requestAnimationFrame(render);
        };
        render();

        // Cleanup listeners on unmount
        return () => {
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", mouseMove);
        };
    }, []);

    return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-10" />;
};

export default ParticleBackground;
