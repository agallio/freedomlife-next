import React from 'react';
import {
  Container,
  HeaderTitle,
  HeaderSubtitle
} from '../components/StyledBase';
import { GuidePassageBoxFAB } from '../components/StyledHome';

const New = () => (
  <div>
    <Container>
      <HeaderTitle marginTop="100px">FreedomLife</HeaderTitle>
      <HeaderSubtitle>
        Aplikasi ini ada versi terbaru! Silakan klik tombol dibawah ini untuk
        menuju kesana.
      </HeaderSubtitle>
      <GuidePassageBoxFAB
        size="small"
        variant="extended"
        color="inherit"
        style={{ marginTop: 40 }}
        href="https://freedomlife.id"
        target="_blank"
      >
        New Freedomlife
      </GuidePassageBoxFAB>
    </Container>
  </div>
);

export default New;
