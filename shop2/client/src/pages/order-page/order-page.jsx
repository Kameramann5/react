import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/button";
import { ContentWrapper } from "../../components/content-wrapper";
import styles from "./styles.module.css";

export const OrderPage = () => {
  const navigate = useNavigate();

  return (
    <ContentWrapper className={styles.order}>
      <h1>В ближайшее время с вами свяжется менеджер, чтобы подтвердить заявку.</h1>
      <Button className={ styles.buttonBackOrder } onClick={() => navigate('/')}>На главную</Button>
    </ContentWrapper>
  );
};
