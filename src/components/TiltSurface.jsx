import { useRef } from "react";

function TiltSurface({ children, className = "", strength = 7, as: Tag = "div", ...props }) {
  const ref = useRef(null);
  const frame = useRef(null);

  const handleMove = (event) => {
    const element = ref.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rect = element.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    const rotateY = (px - 0.5) * strength * 2;
    const rotateX = (0.5 - py) * strength * 2;

    if (frame.current) cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      element.style.setProperty("--rx", `${rotateX.toFixed(2)}deg`);
      element.style.setProperty("--ry", `${rotateY.toFixed(2)}deg`);
      element.style.setProperty("--mx", `${(px * 100).toFixed(1)}%`);
      element.style.setProperty("--my", `${(py * 100).toFixed(1)}%`);
    });
  };

  const handleLeave = () => {
    const element = ref.current;
    if (!element) return;
    element.style.setProperty("--rx", "0deg");
    element.style.setProperty("--ry", "0deg");
    element.style.setProperty("--mx", "50%");
    element.style.setProperty("--my", "50%");
  };

  return (
    <Tag
      ref={ref}
      className={`tiltSurface ${className}`.trim()}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      {...props}
    >
      {children}
    </Tag>
  );
}

export default TiltSurface;
