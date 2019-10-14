import styled from 'styled-components';
import { primary, grey } from '../components/StyledBase';

export const GuideBox = styled.div`
  width: 105px;
  padding: 15px 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.14);
  border-radius: 5px;
  text-align: center;
  background-color: ${props => (props.today ? primary : 'white')};
`;

export const GuideBoxDayText = styled.h5`
  font-family: 'Rubik';
  font-weight: 700 !important;
  font-size: 14pt;
  color: ${props => (props.today ? 'white' : primary)};
  margin: 0;
`;

export const GuideBoxDateText = styled.h5`
  font-family: 'Rubik';
  font-weight: 700 !important;
  font-size: 30px;
  color: ${props => (props.today ? 'white' : primary)};
  margin: 0;
`;

export const GuideBoxPassageText = styled.p`
  font-family: 'Rubik';
  font-weight: 400 !important;
  font-size: 16px;
  color: ${props => (props.today ? primary : grey)};
  line-height: 1.5;
  margin: 0;
`;
