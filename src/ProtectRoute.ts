import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAccount } from "wagmi";

const ProtectedRoute = ({ element }: any) => {
  const navigate = useNavigate();
  const account  = useAccount();

  console.log('This is the account', account.address);
  

  useEffect(() => {
    if (!account.address) {
      navigate("/"); 
    }
  }, [account, navigate]);

  return account ? element : null;
};

export default ProtectedRoute;
