import React from 'react';
import styles from './ShowPerson.module.scss';

interface ShowPersonProps {
  primeiroNome: string;
  segundoNome: string;
  alcool: number;
  foto: string;
  numero: number;
  corNumero: string;
  nomesVertical: boolean; 
}

const ShowPerson: React.FC<ShowPersonProps> = ({
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

  const getImageSrc = () => {
    if (!foto || foto === null || foto === 'null' || foto === '') {
      return "https://via.placeholder.com/190";
    }
    
    return foto; // O backend já envia URLs completas
  };

  return (
    <div className={styles.showPersonContainer}>
      <div className={styles.alcoolLevel}>
        {alcool}mg/l
      </div>
      
      <div className={styles.photoContainer}>
        <img 
          src={getImageSrc()} 
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
