import Cookies from "js-cookie";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export declare interface AuthenticationProps {
  children?: JSX.Element | JSX.Element[] | React.ReactNode;
  [x: string]: any;
}

export default function Authentication(
  props: AuthenticationProps
): JSX.Element {
  const { children } = props;
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [token, setToken] = useState<string | undefined>(
    Cookies.get("accessToken")
  );

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      const decodedToken = jwtDecode(token) as JwtPayload;
      const currentDate = new Date();
      if (decodedToken.exp !== undefined) {
        if (decodedToken.exp * 1000 < currentDate.getTime()) {
          navigate("/login");
        }
      }
    }
  }, [navigate, token]);

  return (
    <>
      <div>{children}</div>
    </>
  );
}
