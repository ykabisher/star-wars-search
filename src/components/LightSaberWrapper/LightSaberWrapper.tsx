import React, { useEffect, useRef } from 'react';
import styles from './LightSaberWrapper.module.css';

interface LightSaberWrapperProps {
  children: React.ReactNode;
}

const LightSaberWrapper: React.FC<LightSaberWrapperProps> = ({ children }) => {
  const lightsaberRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    //const colors = ['#eddc01', '#f2b125', '#fd9407', '#ff7308', '#eb5508', '#fe1a17', '#e93702'];
    const colors = ['#00eaff', '#00c7ff', '#009cff', '#0072ff', '#005eff', '#0048ff', '#0029ff'];
    const sizes = [4, 6, 8];
    const minimalDistance = 20;
    let prev = { x: 0, y: 0 };
    let last = { x: 0, y: 0 };

    const updateCoords = (position: { x: number; y: number }) => {
      prev.x = last.x;
      prev.y = last.y;
      last.x = position.x;
      last.y = position.y;
    };

    const calcDistance = (a: { x: number; y: number }, b: { x: number; y: number }) => {
      return Math.floor(Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2));
    };

    const pickRandom = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)];

    const createSpark = (position: { x: number; y: number }) => {
      const spark = document.createElement('div');
      spark.className = styles.spark;
      const size = pickRandom(sizes);
      spark.style.left = `${position.x}px`;
      spark.style.top = `${position.y}px`;
      spark.style.backgroundColor = pickRandom(colors);
      spark.style.width = `${size}px`;
      spark.style.height = `${size}px`;

      const glow = document.createElement('div');
      glow.className = styles['sparkGlow'];
      spark.appendChild(glow);

      document.body.appendChild(spark);
      animateSpark(spark, position);
      updateCoords(position);
    };

    const animateSpark = (spark: HTMLDivElement, position: { x: number; y: number }) => {
      let speedX = (Math.random() - 0.5) * 10;
      let speedY = (Math.random() - 0.5) * 10;
      const gravitation = 0.2;
      const airResistance = 0.98;
      const shrink = 0.1;

      const animate = () => {
        speedY -= gravitation;
        speedX *= airResistance;

        const sparkSize = parseFloat(spark.style.width);
        spark.style.top = `${parseFloat(spark.style.top) - speedY}px`;
        spark.style.left = `${parseFloat(spark.style.left) + speedX}px`;
        spark.style.width = `${sparkSize - shrink}px`;
        spark.style.height = `${sparkSize - shrink}px`;

        if (sparkSize > 0 && parseFloat(spark.style.top) < window.innerHeight && parseFloat(spark.style.left) > 0) {
          requestAnimationFrame(animate);
        } else {
          spark.remove();
        }
      };

      animate();
    };

    const handleMouseMove = (e: MouseEvent) => {
      const position = { x: e.clientX, y: e.clientY };
      const lightsaber = lightsaberRef.current;
      if (lightsaber) {
        lightsaber.style.left = `${position.x}px`;
        lightsaber.style.top = `${position.y}px`;
      }

      if (calcDistance(last, position) > minimalDistance) {
        createSpark(position);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div>
      <div ref={lightsaberRef} className={styles.lightsaber} />
      {children}
    </div>
  );
};

export default LightSaberWrapper;
