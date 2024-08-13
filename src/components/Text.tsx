import { FunctionComponent, useEffect, useState } from 'react';
import styles from "../style/test.module.scss"
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchText, setText, setCurrentCharIndex, increasePressingCount, setMistakes } from '../redux/store/textSlice';
import { increaseSeconds, setIsTimerOn } from '../redux/store/timerSlice';
import { setIsTestFinished } from '../redux/store/testSlice';

import { getCurrentChar, compareChars } from '../helpers/charTransform';

const Text:FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const text = useAppSelector(state => state.textSlice.text);
  const isLoading = useAppSelector(state => state.textSlice.isLoading);
  const error = useAppSelector(state => state.textSlice.error);
  const currentCharIndex = useAppSelector(state => state.textSlice.currentCharIndex);
  const mistakes = useAppSelector(state => state.textSlice.mistakes);
  const pressingCount = useAppSelector(state => state.textSlice.pressingCount);
  const sentences = useAppSelector(state => state.testSlice.sentences);
  const isTimerOn = useAppSelector(state => state.timerSlice.isTimerOn);
  const [mistakeCount, setMistakeCount] = useState(0);
 


  useEffect(() => {
    dispatch(fetchText(sentences));
  }, [dispatch]);

  useEffect(() => {
    const newText = getCurrentChar(text, currentCharIndex);
    dispatch(setText(newText));
  }, [dispatch, currentCharIndex]);

  useEffect(() => {
    if (currentCharIndex < text.length) {
      const keyPressHandler = (event: KeyboardEvent) => {
        const [newText, newCurrentIndex, newMistakes] = compareChars(text, currentCharIndex, event.key, mistakes);
        
        dispatch(setCurrentCharIndex(newCurrentIndex));
        dispatch(setText(newText));
        dispatch(setMistakes(newMistakes));
        dispatch(increasePressingCount());

        if(newMistakes > mistakes){
          setMistakeCount(mistakeCount + 1);
        }


        if (newCurrentIndex === text.length) {
          dispatch(setIsTimerOn(false));
          dispatch(setIsTestFinished(true));
        }
      }

      document.addEventListener('keypress', keyPressHandler);

      return () => {
        document.removeEventListener('keypress', keyPressHandler);
      };
    }
  }, [dispatch, text]);

  useEffect(() => {
    if (pressingCount === 0 && text.length > 0) {
      dispatch(setIsTimerOn(false));
    }
  }, [dispatch, pressingCount, text]);

  useEffect(() => {
    if (pressingCount > 0) {
      dispatch(setIsTimerOn(true));
    }
  }, [dispatch, pressingCount]);

  useEffect(() => {
    if (isTimerOn && currentCharIndex < text.length) {
      const timer = setTimeout(() => {
        dispatch(increaseSeconds());
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isTimerOn, currentCharIndex, text, dispatch]);

  useEffect(() => {
    if (currentCharIndex === text.length) {
      dispatch(setIsTimerOn(false));
    }
  }, [currentCharIndex, dispatch]);

  return (
    <div className={styles.test__text__wrapper}>
      {
        error && 
          <p className={styles.error__text}>{error}</p>
      }
      {
        isLoading 
          ? <p className={styles.test__loading__text}>Loading text...</p>
          : <div>
              {
             text.map((item, index) => {
                  return (
                    <span className={item.class} key={index}>
                      {item.char}
                    </span>
                  )
                })
              }
            </div> 
      }
    </div>
  );
};

export default Text;