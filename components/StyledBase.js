import styled from 'styled-components';
import {
  Fab,
  Card,
  Typography,
  BottomNavigation,
  BottomNavigationAction
} from '@material-ui/core';

// Color Theme
export const primary = '#673ab7';
export const secondary = '#764ec0';
export const grey = '#6E6E6E';

export const Container = styled.div`
  position: relative;
  max-width: ${props => props.mymaxwidth || '720px'};
  margin: 0 auto;
  padding: ${props => props.mypadding || '0 8%'};
  padding-bottom: ${props => props.mypaddingbottom || '90px'};
`;

export const ContainerFluid = styled.div`
  position: relative;
  max-width: 500px;
  margin: 0 auto;
  padding: 0;
  padding-bottom: ${props => props.mypaddingbottom || '90px'};
`;

export const ContainerBible = styled.div`
  padding: 65px 0 10px 0;
  max-width: 360px;
  margin: 0 auto;
`;

export const HeaderTitle = styled.h2`
  font-family: 'SF Text';
  font-weight: 700;
  font-size: 32px;
  line-spacing: 36;
  color: white;
  margin-bottom: ${props => props.marginBottom || 0};
  margin-top: ${props => props.marginTop};
`;

export const HeaderSubtitle = styled.p`
  font-family: 'SF Text';
  font-weight: 200;
  font-size: 16;
  line-spacing: 18;
  color: white;
  margin-top: 0;
`;

export const StyledCard = styled(Card)`
  width: 100%;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.14) !important;
`;

export const StyledFluidCard = styled(Card)`
  position: relative;
  width: 100%;
  height: 100%;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.14) !important;
  border-radius: 25px 25px 0 0 !important;
`;

export const StyledBottomNav = styled(BottomNavigation)`
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 1;
  box-shadow: 0 3px 15px rgba(0, 0, 0, 0.14);
`;

export const StyledBottomNavAction = styled(BottomNavigationAction)`
  flex: 0 !important;
`;

// Button
export const StyledFab = styled(Fab)`
  font-family: 'SF Text';
  font-weight: 700;
  padding: ${props =>
    props.variant === 'extended' &&
    props.size === 'small' &&
    '0 16px !important'};
`;

// Typography
export const BoldText = styled(Typography)`
  font-family: 'SF Text';
  font-weight: 700 !important;
  font-size: ${props => props.myfontsize} !important;
  color: ${props => (props.myprimary && '#673ab7') || props.mycolor} !important;
  line-height: ${props => props.mylineheight} !important;
  margin-bottom: ${props => props.mymarginbottom} !important;
`;

export const RegularText = styled(Typography)`
  font-family: 'SF Text';
  font-weight: 400 !important;
  font-size: ${props => props.myfontsize} !important;
  color: ${props => (props.myprimary && '#673ab7') || props.mycolor} !important;
  line-height: ${props => props.mylineheight} !important;
  margin-bottom: ${props => props.mymarginbottom} !important;
`;

export const LightText = styled(Typography)`
  font-family: 'SF Text';
  font-weight: 200 !important;
  font-size: ${props => props.myfontsize} !important;
  color: ${props => (props.myprimary && '#673ab7') || props.mycolor} !important;
  line-height: ${props => props.mylineheight} !important;
  margin-bottom: ${props => props.mymarginbottom} !important;
`;

export const LightItallicText = styled(Typography)`
  font-family: 'SF Text';
  font-weight: 200 !important;
  font-style: italic;
  font-size: ${props => props.myfontsize} !important;
  color: ${props => (props.myprimary && '#673ab7') || props.mycolor} !important;
  line-height: ${props => props.mylineheight} !important;
  margin-bottom: ${props => props.mymarginbottom} !important;
`;
