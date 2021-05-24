import styled from "styled-components";
import { ProcessedStats } from "../../types/interface";

interface StatsProps {
  stats: ProcessedStats;
}
const StatsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
const Col = styled.div`
  display: flex;
  flex-direction: column;
`;

const Stat = styled.span`
  display: block;
  font-family: Roboto;
  font-size: 18px;
  line-height: 21px;
  color: #020166;
`;

const StatsDisplay = ({ stats }: StatsProps) => {
  const { hp, attack, defense, specialAttack, specialDefense, speed, total } =
    stats;

  return (
    <StatsContainer>
      <Col>
        <Stat>{`HP: ${hp}`}</Stat>
        <Stat>{`Attack: ${attack}`}</Stat>
        <Stat>{`Defense: ${defense}`}</Stat>
      </Col>
      <Col>
        <Stat>{`Special Atk: ${specialAttack}`}</Stat>
        <Stat>{`Special Def: ${specialDefense}`}</Stat>
        <Stat>{`Speed: ${speed}`}</Stat>
      </Col>
      <Col>
        <Stat>{`Total: ${total}`}</Stat>
      </Col>
    </StatsContainer>
  );
};

export default StatsDisplay;
