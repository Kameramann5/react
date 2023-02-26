import React, { useEffect } from "react";
import styles from "./styles.module.css";
import { ContentWrapper } from "../../components/content-wrapper";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPlane } from "../../store/plane/planeSlice";
import { Spinner } from "../../components/spinner";
import { Button } from "../../components/button";

export const PlanePage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { plane, isLoading } = useSelector((state) => state.plane);

  useEffect(() => {
    dispatch(getPlane(id));
  }, [dispatch, id]);

  if (isLoading) return <Spinner />;

  return (
    plane && (
      <ContentWrapper className={styles.plane}>
        <div className={styles.descContent}>
        
          <h1 className={styles.title}>{plane.name}</h1>
          <div className={styles.price}>Цена: {plane.price}$</div>
       
          <p className={styles.desc}>Описание: {plane.description}</p>
          <p className={styles.desc}>Наличие (шт.): {plane.capacity}</p>
          <Button
            className={styles.buyBtn}
            onClick={() => navigate('/order') }
          >
            Оформить 
          </Button>
          <Button
            className={styles.buyBack}
           onClick={() => navigate(-1)} isBackButton={true}>
            Вернуться в каталог ←
          </Button> 
        </div>
        <div className={styles.imageContent}>
          <img className={styles.image} src={plane.planeImage} alt="" />
        </div>
      </ContentWrapper>
    )
  );
};
