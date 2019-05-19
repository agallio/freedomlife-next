import styled from 'styled-components';
import { primary, grey } from '../components/StyledBase';

export const GuideBox = styled.div`
  width: 105px;
  padding: 15px 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.14);
  border-radius: 5px;
  text-align: center;
`;

export const GuideBoxDayText = styled.h5`
  font-family: 'SF Text';
  font-weight: 700;
  font-size: 14pt;
  color: ${primary};
  margin: 0;
`;

export const GuideBoxDateText = styled.h5`
  font-family: 'SF Text';
  font-weight: 700;
  font-size: 30px;
  color: ${primary};
  margin: 0;
`;

export const GuideBoxPassageText = styled.p`
  font-family: 'SF Text';
  font-weight: 400;
  font-size: 16px;
  color: ${grey};
  line-height: 1.5;
  margin: 0;
`;
