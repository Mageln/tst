import { FunctionComponent } from "react";

import styles from "../../style/ui/modal.module.scss";
import { Box } from "@mui/material";

type ModalWindowProps = {
  children: JSX.Element | JSX.Element[];
  title: string;
};

const ModalWindow: FunctionComponent<ModalWindowProps> = ({
  children,
  title,
}) => {
  return (
    <div  className={styles.modalWindow_blackout}>
      <div className={styles.modalWindow} >
        <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
          height={500}
          width={500}
          my={4}
          gap={4}
          p={2}
          sx={{  }}
        >
          <h1 className= {styles.modalWindow_text}>{title}</h1>
          {children}
        </Box>
      </div>
    </div>
  );
};

export default ModalWindow;
