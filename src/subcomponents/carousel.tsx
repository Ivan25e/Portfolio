import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import styles from "../styles/carousel.module.scss";

import reactLogo from '../assets/carousel/react.png';
import powerAutomateLogo from '../assets/carousel/powerautomate.png';
import angularLogo from '../assets/carousel/angular.png';
import devopsLogo from '../assets/carousel/devops.png';
import powerAppsLogo from '../assets/carousel/powerapps.png';
import sharepointLogo from '../assets/carousel/sharepoint.png';
import typescriptLogo from '../assets/carousel/typescript.png';
import gitLogo from '../assets/carousel/git.png';
import sqlLogo from '../assets/carousel/sql.png';
import nodeLogo from '../assets/carousel/node.png';
import laravelLogo from '../assets/carousel/laravel.png';

const images = [
    { src: reactLogo, alt: "React" },
    { src: angularLogo, alt: "Angular" },
    { src: typescriptLogo, alt: "TypeScript" },
    { src: gitLogo, alt: "Git" },
    { src: sqlLogo, alt: "SQL" },
    { src: nodeLogo, alt: "NodeJS" },
    { src: laravelLogo, alt: "Laravel (PHP)" },
    { src: sharepointLogo, alt: "SharePoint (SPFx and SharePoint Online)" },
    { src: devopsLogo, alt: "Azure DevOps" },
    { src: powerAppsLogo, alt: "Power Apps" },
    { src: powerAutomateLogo, alt: "Power Automate (Cloud & Desktop)" },
];

export default function Carousel() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex(prev => (prev + 1) % images.length);
        }, 2500);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className={styles.carouselWrapper}>
            <motion.p
                key={images[index].alt + "-text"}
                className={styles.carouselTitle}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                {images[index].alt}
            </motion.p>

            <motion.img
                key={images[index].src}
                src={images[index].src}
                alt={images[index].alt}
                className={styles.carouselImage}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            />
        </div>
    );
}