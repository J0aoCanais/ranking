import React from 'react';
import styles from './ShowPerson.module.scss';
import { getImageSrc } from '../../utils/imageUtils';

interface ShowPersonProps {
  id?: number;
  primeiroNome: string;
  segundoNome: string;
  alcool: number;
  foto: string | null;
  numero: number;
  corNumero: string;
  nomesVertical: boolean; 
}

const ShowPerson: React.FC<ShowPersonProps> = ({
  id,
  primeiroNome,
  segundoNome,
  alcool,
  foto,
  numero,
  corNumero,
  nomesVertical
}) => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = "https://via.placeholder.com/190";
  };

  const imageSrc = getImageSrc(foto, id);

  return (
    <div className={styles.showPersonContainer}>
      <div className={styles.alcoolLevel}>
        {alcool}mg/l
      </div>
      
      <div className={styles.photoContainer}>
        <img 
          src={imageSrc} 
          alt={`${primeiroNome} ${segundoNome}`} 
          className={styles.photo}
          onError={handleImageError}
        />
      </div>
      
      <div className={`${styles.namesContainer} ${nomesVertical ? styles.vertical : styles.horizontal}`}>
        <span className={styles.primeiroNome}>{primeiroNome}</span>
        <span className={styles.segundoNome}>{segundoNome}</span>
      </div>
      
      {numero > 0 && (
        <div 
          className={styles.numero}
          style={{ color: corNumero }}
        >
          {numero}
        </div>
      )}
    </div>
  );
};

export default ShowPerson;
