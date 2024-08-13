import { FunctionComponent, ComponentPropsWithoutRef } from "react";
import Button from "@mui/material/Button";

interface ButtonProps extends ComponentPropsWithoutRef<typeof Button> {
  btnText: string;
}

const Btn: FunctionComponent<ButtonProps> = ({ btnText, ...props }) => {
  return (
    <Button 
    component="button" {...props} variant="contained">
      {btnText}
    </Button>
  );
};

export default Btn;
