import React, { useState, useEffect, useRef } from 'react';
import styles from './LandingPage.module.scss';
import conceicao from '../../assets/conceicao-final.png';
import camisola from '../../assets/camisola.png';
import instructions from '../../assets/instructions.png';
import elo from '../../assets/elo1.png';
import Ranking from '../../components/Ranking/Ranking';
import ShowPerson from '../../components/ShowPerson/ShowPerson';
import { buildPhotoUrl } from '../../utils/imageUtils';
import { request } from '../../api';

interface Person {
  id: number;
  primeiro_nome: string;
  ultimo_nome: string;
  alcool: number;
  foto?: string;
}

const LandingPage = () => {
  const [persons, setPersons] = useState<Person[]>([]);
  const [latestPerson, setLatestPerson] = useState<Person | null>(null);
  const [loading, setLoading] = useState(true);
  const [showLatestPerson, setShowLatestPerson] = useState(false);
  const [lastPersonId, setLastPersonId] = useState<number | null>(null);
  const [showInstructions, setShowInstructions] = useState(false);
  
  const cycleTimeoutRef = useRef<number | null>(null);
  const instructionsTimeoutRef = useRef<number | null>(null);

  // Sem inline helper; usamos buildPhotoUrl que respeita VITE_BACKEND_URL

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Buscar todas as pessoas para o ranking
        const rankingResponse = await request('GET', '/person/ranking/');
        console.log('Resposta do ranking:', rankingResponse);
        if (rankingResponse.success) {
          console.log('Pessoas encontradas:', rankingResponse.data);
          console.log('Total de pessoas:', rankingResponse.data.length);
          setPersons(rankingResponse.data);
        } else {
          console.error('Erro na resposta do ranking:', rankingResponse.error);
        }

        // Buscar a última pessoa adicionada
        const latestResponse = await request('GET', '/person/latest/');
        if (latestResponse.success) {
          const newLatestPerson = latestResponse.data;
          
          // Verificar se é uma nova pessoa (diferente ID da anterior)
          if (newLatestPerson && newLatestPerson.id !== lastPersonId) {
            // Normalizar URL da foto já aqui para evitar recomputes
            const normalized = { ...newLatestPerson, foto: buildPhotoUrl(newLatestPerson.foto) } as Person;
            setLatestPerson(normalized);
            setLastPersonId(newLatestPerson.id);
            setShowLatestPerson(true);
            setShowInstructions(false); // Para as instruções quando uma nova pessoa aparece
            
            // Mostrar a pessoa por 30 segundos, depois voltar ao ranking
            setTimeout(() => {
              setShowLatestPerson(false);
            }, 30000);
            
            console.log('Nova pessoa adicionada:', newLatestPerson);
          }
        }
      } catch (error) {
        console.error('Erro ao conectar com a API:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    
    // Verificar por novas pessoas a cada 5 segundos
    const interval = setInterval(fetchData, 5000);
    
    return () => clearInterval(interval);
  }, [lastPersonId]);

  // UseEffect para alternar entre ranking e instruções
  useEffect(() => {
    // Limpar timeouts existentes
    if (cycleTimeoutRef.current) {
      clearTimeout(cycleTimeoutRef.current);
      cycleTimeoutRef.current = null;
    }
    if (instructionsTimeoutRef.current) {
      clearTimeout(instructionsTimeoutRef.current);
      instructionsTimeoutRef.current = null;
    }

    if (!loading && !showLatestPerson) {
      const startCycle = () => {
        // Mostrar ranking por 1 minuto (60 segundos)
        setShowInstructions(false);
        
        cycleTimeoutRef.current = setTimeout(() => {
          // Mostrar instruções por 15 segundos
          setShowInstructions(true);
          
          instructionsTimeoutRef.current = setTimeout(() => {
            // Voltar ao ranking e repetir o ciclo
            startCycle();
          }, 20000);
        }, 60000);
      };
      
      startCycle();
    }

    // Cleanup function
    return () => {
      if (cycleTimeoutRef.current) {
        clearTimeout(cycleTimeoutRef.current);
      }
      if (instructionsTimeoutRef.current) {
        clearTimeout(instructionsTimeoutRef.current);
      }
    };
  }, [loading, showLatestPerson]);
  return (
    <div className={styles.landingContainer}>
      <div className={styles.title}>
        <p className={styles.main}>VENDA DA LUÍSA</p>
        <p className={styles.secondary}>Ranking Camisola amarela</p>
      </div>
      <div className={styles.image1}>
        <img src={conceicao} alt="Nossa Senhora" />
      </div>
      <div className={styles.image2}>
        <img src={camisola} alt="Nossa Senhora" />
      </div>
      <div className={styles.image3}>
        <img src={elo} alt="Elo Sushi" />
      </div>
        {/** 
      <div className={styles.rankingContainer}>
        {loading ? (
          <div className={styles.loading}>Carregando ranking...</div>
        ) : (
          <Ranking persons={persons} />
        )}
      </div>
        */}
      <div className={styles.rankingContainer }>
        {loading ? (
          <div className={styles.loading}>Carregando...</div>
    ) : showLatestPerson && latestPerson ? (
          <div className={styles.transform}>
            <ShowPerson 
              primeiroNome={latestPerson.primeiro_nome}
              segundoNome={latestPerson.ultimo_nome}
              alcool={latestPerson.alcool}
      foto={latestPerson.foto || ''}
              numero={0} // Sem número
              corNumero="transparent" // Sem cor
              nomesVertical={false}
            />
          </div>
        ) : showInstructions ? (
          <div className={styles.instructionsContainer}>
            <img src={instructions} alt="Instruções" className={styles.instructions} />
          </div>
        ) : (
          <Ranking persons={persons} />
        )}
      </div>


    </div>
  );
};

export default LandingPage;