import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAccount } from "wagmi";

const ProtectedRoute = ({ element }: any) => {
  const navigate = useNavigate();
  const {address}  = useAccount();
  console.log('This is the account', address);
  

  useEffect(() => {
    if (!address) {
      navigate("/"); 
    }
  }, [address, navigate]);


  return address ? element : null;
};




export default ProtectedRoute;
