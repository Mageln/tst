import { FunctionComponent } from 'react';

import styles from '../../style/ui/footer.module.scss';

const Footer:FunctionComponent = () => {
  return (
    <footer className={`${styles.container} ${styles.footer}`}>
      <p>Typing Speed Trainer ©2024 </p>
    </footer>
  );
};

export default Footer;
