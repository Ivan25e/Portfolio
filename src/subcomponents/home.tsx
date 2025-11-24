import 'react';
import { Row, Col } from 'antd';
import portafolioImage from '../assets/portafolioimage.jpg'
import styles from '../styles/main.module.scss'; 
import Carousel from './carousel';

export default function Home() {
    return (
        <>
            <Row
                justify="center"
                align="middle"
                gutter={[32, 32]}
                style={{ minHeight: '45vh' }}
            >
                <Col xs={22} sm={8} md={6} lg={6}>
                    <img src={portafolioImage} alt="Profile" className={styles.profileImage} />
                </Col>

                <Col xs={22} sm={16} md={12} lg={12}>
                    <div className={styles.textContent}>
                        <h2>Hi, I'm Iván — a Software Developer passionate about creating scalable, high-performance web applications.</h2>
                        <p>
                            I focus on creating intuitive interfaces, automating workflows, and delivering efficient cloud-based solutions. 
                            With experience across React, Angular, TypeScript, SPFx, Power Platform, and Azure DevOps, 
                            I help teams improve productivity through modern, well-structured software.
                        </p>
                    </div>
                </Col>
                
            </Row>
            <Row
                justify="center"
                align="middle"
                gutter={[32, 32]}
            >
                <Carousel/>
            </Row>
        </>
    );
}