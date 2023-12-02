import {useNavigate} from "react-router-dom";
import {ReactElement, useEffect} from "react";

export const AuthWall = (): ReactElement => {
  const navigate = useNavigate();
  const userHasCredentialsOrIsLogged = true;

  useEffect(() => {
    if (userHasCredentialsOrIsLogged) {
      navigate("/home");
      return;
    }

    navigate("/login");
  });

  return(
    <>
    </>
  )
}