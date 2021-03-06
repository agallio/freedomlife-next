import styled from 'styled-components';
import { primary, secondary } from './StyledBase';
import { Fab } from '@material-ui/core';

export const JumboHeader = styled.div`
  position: absolute;
  width: 100%;
  height: 250px;
  background: ${primary};
`;

export const JumboHeaderOverlay = styled.div`
  position: absolute;
  width: 88%;
  height: 75%;
  background: ${secondary};
`;

// Guide Box
export const GuidePassageBox = styled.div`
  width: 60px;
  padding: 20px 10px 20px 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.14);
  border-radius: 5px;
  text-align: center;
`;

export const GuidePassageBoxText = styled.h5`
  font-family: 'Rubik';
  font-weight: 700 !important;
  font-size: 14pt;
  color: ${primary};
  margin: 0;
`;

export const GuidePassageBoxFAB = styled(Fab)`
  font-family: 'Rubik' !important;
  font-weight: 400 !important;
  width: 100% !important;
  margin: ${props => props.mymargin};
  background-color: ${props => props.mybackcolor};
  color: ${props => props.mycolor};
`;
