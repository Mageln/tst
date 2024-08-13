import { FunctionComponent, useState, useEffect } from 'react';

import styles from '../style/stats.module.scss';

import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { increaseSeconds, setIsTimerOn } from '../redux/store/timerSlice';

import { speedCounting, accuracyCounting } from '../helpers/statsCounting';

type StatsProps = {
  children?: JSX.Element | JSX.Element[];
};

const Stats:FunctionComponent<StatsProps> = ( {children} ) => {
  const dispatch = useAppDispatch();
  const mistakes = useAppSelector(state => state.textSlice.mistakes);
  const pressingCount = useAppSelector(state => state.textSlice.pressingCount);
  const seconds = useAppSelector(state => state.timerSlice.seconds);
  const isTimerOn = useAppSelector(state => state.timerSlice.isTimerOn);
  const [speed, setSpeed] = useState('0.00');
  const [accuracy, setAccuracy] = useState('0.00');
  const startTimer = useState(false);



  useEffect(() => {
    const correctLetters = pressingCount - mistakes;
    
    setAccuracy(accuracyCounting(mistakes, pressingCount));
    setSpeed(speedCounting(correctLetters, seconds));
  }, [mistakes, pressingCount, seconds]);


  useEffect(() => {
    if(startTimer && !isTimerOn){
      dispatch(setIsTimerOn(true));
    }
  },[startTimer,isTimerOn,dispatch])

  useEffect(() => {
    if (isTimerOn) {
      const timer = setTimeout(() => {
        dispatch(increaseSeconds());
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isTimerOn, seconds, dispatch]);
  


  const formatTime = (seconds:number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}: ${remainingSeconds.toString().padStart(2, "0")}`
  }

  return (
    <div className={styles.stats__container}>
      <div>
        <p className={styles.uppercase__text}>speed</p>
        <p className={styles.uppercase__text} >{speed} WPM</p>
      </div>
      <div>
        <p className={styles.uppercase__text}>accuracy</p>
        <p className={styles.uppercase__text}>{accuracy} %</p>
      </div>
      <div>
        <p  className={styles.uppercase__text}>time</p>
        <p  className={styles.uppercase__text}>{formatTime(seconds)}</p>
      </div>
      <div>
      <p className={styles.uppercase__text}>mistakes</p>
      <p className={styles.uppercase__text}>{mistakes}</p>
      </div>
      {children}
    </div>
  );
};

export default Stats;