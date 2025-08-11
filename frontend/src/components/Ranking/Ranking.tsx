import React from 'react';
import styles from './Ranking.module.scss';
import ShowPerson from '../ShowPerson/ShowPerson';
import Bar from '../Bar/Bar';

interface Person {
  id: number;
  primeiro_nome: string;
  ultimo_nome: string;
  alcool: number;
  foto?: string | null;
}

interface RankingProps {
  persons: Person[];
}

const Ranking: React.FC<RankingProps> = ({ persons }) => {
  // Cores para os números
  const cores = [
    "#FFD700", // Ouro para o 1º
    "#C0C0C0", // Prata para o 2º  
    "#CD7F32", // Bronze para o 3º
    "#ff0303ff", // Preto para os demais
    "#ff9900ff",
    "#eeff00ff",
    "#73ff00ff",
    "#ff00ff",
    "#00ffff",
    "#ffff00"
  ];

  // Pegar as primeiras 3 pessoas para ShowPerson
  const topThree = persons.slice(0, 3);
  
  // Pegar as próximas 4 pessoas para Bar
  const nextFour = persons.slice(3, 7);

  return (
    <div className={styles.rankingContainer}>
      <div className={styles.showPersonContainer}>
        {topThree.map((person, index) => (
          <ShowPerson 
            key={person.id}
            id={person.id}
            primeiroNome={person.primeiro_nome}
            segundoNome={person.ultimo_nome}
            alcool={person.alcool}
            foto={person.foto || null}
            numero={index + 1}
            corNumero={cores[index]}
            nomesVertical={true}
          />
        ))}
      </div>
      
      <div className={styles.barContainer}>
        {nextFour.map((person, index) => (
          <Bar 
            key={person.id}
            primeiroNome={person.primeiro_nome}
            segundoNome={person.ultimo_nome}
            alcool={person.alcool}
            foto={person.foto || ""}
            numero={index + 4}
            corNumero={cores[index + 3]}
          />
        ))}
      </div>
    </div>
  );
};

export default Ranking;