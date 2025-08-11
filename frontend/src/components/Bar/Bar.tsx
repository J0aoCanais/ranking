import React from 'react';
import styles from './Bar.module.scss';
import { buildImageUrl, handleImageError } from '../../utils/imageUtils';

interface BarProps {
  primeiroNome: string;
  segundoNome: string;
  alcool: number;
  foto: string | null;
  numero: number;
  corNumero: string;
}

const Bar: React.FC<BarProps> = ({
  primeiroNome,
  segundoNome,
  alcool,
  foto,
  numero,
  corNumero,
}) => {

  const imageSrc = buildImageUrl(foto);

  return (
    <div className={styles.BarContainer}>

        <div 
            className={styles.numero}
            style={{ color: corNumero }}
        >
            {numero}
        </div>
        
        <div className={styles.bar}>

            <div className={styles.photoContainer}>
                <img 
                  src={imageSrc} 
                  alt={`${primeiroNome} ${segundoNome}`} 
                  className={styles.photo}
                  onError={handleImageError}
                />
            </div>

            <div className={styles.namesContainer} >
                <span className={styles.primeiroNome}>{primeiroNome}</span>
                <span className={styles.segundoNome}>{segundoNome}</span>
            </div>

            <div className={styles.alcoolLevel}>
                {alcool}mg/l
            </div>
            
        </div>
    </div>
      
  );
};

export default Bar;
