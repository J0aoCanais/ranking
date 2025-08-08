import React from 'react';
import styles from './Bar.module.scss';

interface BarProps {
  primeiroNome: string;
  segundoNome: string;
  alcool: number;
  foto: string;
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
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = "https://via.placeholder.com/190";
  };

  const getImageSrc = () => {
    if (!foto || foto === null || foto === 'null' || foto === '') {
      return "https://via.placeholder.com/190";
    }
    
    // Se já é uma URL completa, usar diretamente
    if (foto.startsWith('http')) {
      return foto;
    }
    
    // Construir URL completa para PythonAnywhere
    const BASE_URL = 'https://japcanais.pythonanywhere.com';
    const baseUrl = BASE_URL.endsWith('/') ? BASE_URL.slice(0, -1) : BASE_URL;
    const photoPath = foto.startsWith('/') ? foto : `/${foto}`;
    
    return `${baseUrl}/media${photoPath}`;
  };

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
                  src={getImageSrc()} 
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
