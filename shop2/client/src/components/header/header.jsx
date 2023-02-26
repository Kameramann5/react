import React from 'react';
import { ContentWrapper } from '../content-wrapper';
import WaveImage from './wave.svg'
import styles from './styles.module.css';

export const Header = () => {
  return (
    <div className={styles.header}>
        <ContentWrapper className={styles.content}>
            <h1 className={styles.title}>{ `Салон авто будущего` }</h1>
            <p className={styles.desc}>{`В нашем салоне представлены модели авто с самым футуристичным дизайном. `}</p>
            <p className={styles.desc}>{`Будущее уже здесь!`}</p>
        </ContentWrapper>
        <img src={ WaveImage } alt="" className={ styles.wave }/>
    </div>
  )
}
