import { Modal, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { GoArrowUpRight } from "react-icons/go"
import { useLocation, useNavigate } from "react-router-dom";
import abi from '../../config/abi.json'
import { useWaitForTransactionReceipt, useWriteContract, useAccount, BaseError} from 'wagmi'
const CreateTransaction = () => {

  const OverlayOne = () => (
    <ModalOverlay
      bg='blackAlpha.300'
      backdropFilter='blur(3px) hue-rotate(0deg)'
    />
  )


  const { isOpen, onOpen, onClose } = useDisclosure()
  const [overlay, setOverlay] = useState(<OverlayOne />)

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const itemName = searchParams.get('itemName') || "";
  const amount = searchParams.get('amount') || "";
  const currency = searchParams.get('currency') || "";
  const initiatorRole = searchParams.get('initiator') || "";

  
  const transactionInitialData = {
    itemName,
    amount,
    currency,
  }

  console.log('Details:', transactionInitialData);

  const [transactionTitle, setTransactionTitle] = useState<string>('')
  const [inspectionPeriod, setInspectionPeriod] = useState<string>('')
  const [itemDescription, setItemDescription] = useState<string>('')
  const [itemCategory, setItemCategory] = useState<string>('')
  const [seller, setReciever] = useState<string>('')
  const [recieverEmail, setRecieverEmail] = useState<string>('')

  const handleTitle = (e : any)=>{
    setTransactionTitle(e.target.value)
  }

  const handlePeriod = (e : any)=>{
    setInspectionPeriod(e.target.value)
  }


  const handleDescription = (e : any)=>{
    setItemDescription(e.target.value)
  }


  const handleCategory = (e : any)=>{
    setItemCategory(e.target.value)
  }

  const handleReciever = (e : any)=>{
    setReciever(e.target.value)
  }

  const handleRecieverEmail = (e : any)=>{
    setRecieverEmail(e.target.value)
  }

  const isFormValid = transactionTitle !== "" && inspectionPeriod !== "" && itemDescription !== "" && itemCategory !== "";


  // ==================== CONTRACT ========================

  const {address} = useAccount()

  const { 
    data: hash,
    error,
    isPending, 
    writeContract 
  } = useWriteContract()


  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) { 
    e.preventDefault() 
    if (!address) return  
    
    writeContract({
      address: "0x557a4807479252FbBEdfBCbf2512035c3289fF8E",
      abi,
      functionName: 'initiateTransaction',
      args: [
        transactionTitle, 
        itemName, 
        BigInt(amount), // Assuming amount is in wei
        BigInt(inspectionPeriod), 
        itemDescription, 
        itemCategory, 
        initiatorRole, 
        initiatorRole === 'buyer' ? address : seller, 
        initiatorRole === 'seller' ? address : seller
      ],
    })
  } 



  const { isLoading: isConfirming, isSuccess: isConfirmed, data } = 
    useWaitForTransactionReceipt({ 
      hash, 
  }) 

  const navigate = useNavigate()

  if (isConfirmed) {
    navigate("/created");
  }


  console.log('Successfull', hash, 'Error:', error);
  
  // 0xa7A02E3eD58139D1822582ff1134D8f687EB0B5c


  return (
    <div className="lg:pt-[10rem] pt-[7rem] pb-[5rem] w-[100%] flex justify-center relative">

      <div className="bg-white shadow-md border border-neutral-200 rounded-lg lg:p-10 p-5 py-10 lg:w-[50%] w-[95%]">
        <h2 className="text-3xl font-bold pb-5">Start transaction</h2>
        <form action="" className="w-[100%]">
    
          <div>
            <p className="text-sm pb-2">Transaction title</p>
            <input type="text"  
              required placeholder="Title" 
              value={transactionTitle}
              onChange={handleTitle}
              className="input text-sm input-bordered w-full" />
          </div>

          <h2 className="pb-5 pt-5 font-bold text-xl">Item declaration</h2>

          <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
            <div>
              <p className="text-sm pb-2">What item are you selling?</p>
              <input type="text" value={itemName} required placeholder="Item name" className="input font-bold text-sm input-bordered w-full" />
            </div>

            <div>
              <p className="text-sm pb-2">How much does the item cost? </p>
              <input type="text" value={amount} required placeholder="Amount" className="input text-sm font-bold input-bordered w-full" />
            </div>

            <div>
              <p className="text-sm pb-2">Select currency for payment</p>
              <input type="text" value={currency}  required placeholder="Currency" className="input text-sm font-bold input-bordered w-full" />
            </div>

            <div>
              <p className="text-sm pb-2">Inspection period (days e.g 5 days)</p>
              <input type="number" 
                required placeholder="2" 
                value={inspectionPeriod}
                onChange={handlePeriod}
                className="input text-sm input-bordered w-full" />
            </div>
          </div>

          <div className="pt-6">
            <p className="text-sm pb-2">Item description</p>
            <textarea className="textarea 
              textarea-bordered max-w-full min-w-full max-h-[6rem] min-h-[6rem]" 
              placeholder="Description"
              required
              value={itemDescription}
              onChange={handleDescription}
            >
            </textarea>
          </div>

          <div className="pt-6">
            <p className="text-sm pb-2">Item category</p>
            <input type="text" 
              required placeholder="Category" 
              className="input text-sm input-bordered w-full" 
              value={itemCategory}
              onChange={handleCategory}
            />
          </div>

          {isFormValid ? 
          <p 
            onClick={() => {
              setOverlay(<OverlayOne />)
              onOpen()
            }}
            className="bg-[#054FBB] lg:w-[50%] w-full cursor-pointer hover:bg-blue-600 flex items-center justify-center lg:ml-auto m-auto gap-3 py-3 px-6 text-sm text-white rounded-md mt-8">
            Next <GoArrowUpRight />
          </p> :


          <p 
            className="bg-neutral-400 lg:w-[50%] cursor-not-allowed w-full  flex items-center justify-center lg:ml-auto m-auto gap-3 py-3 px-6 text-sm text-white rounded-md mt-8">
            Next <GoArrowUpRight />
          </p>
          }

        </form>
      </div>

      <Modal isCentered isOpen={isOpen} onClose={onClose} size={'2xl'} >
          {overlay}
          <ModalContent maxW={{ base: '95vw', md: '700px' }} borderRadius={'10px'}>
            <ModalHeader>Transaction detail</ModalHeader>
            <ModalCloseButton />

            {error && (
            <div role="alert" className="alert alert-error absolute py-2 px-4 m-auto  top-5 bg-red-50 border rounded-lg border-red-200 lg:w-fit max-w-fit flex items-center justify-center left-0 right-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm">{(error as BaseError).shortMessage || error.message}</span>
            </div>
            )}
            
            <form action="" onSubmit={handleSubmit} className="lg:text-sm text-xs lg:p-8 px-4 py-0">
              <div>
                <h2 className="text-base font-semibold mb-5">Item Detail</h2>
                <div className={'flex items-center mb-2'}>
                  <p>{itemName}</p>
                  <p className="ml-auto font-semibold">{amount} USDT</p>
                </div>

                <div className={'flex items-center mb-2'}>
                  <p>Inspection period:</p>
                  <p className="ml-auto font-semibold">{inspectionPeriod} days</p>
                </div>

                <div className="border border-neutral-200 p-3 rounded-lg">
                  <p className="font-semibold pb-3">Item description: </p>
                  <p>{itemDescription}</p>
                </div>
              </div>


              <div>
                <h2 className="text-base font-semibold pb-3 pt-5">Transaction Summary</h2>
                <div className={'flex items-center mb-2'}>
                  <p>Subtotal</p>
                  <p className="ml-auto">{amount} USDT</p>
                </div>

                <div className={'flex items-center mb-2 border-b border-neutral-200 pb-3'}>
                  <p>Escrow charge</p>
                  <p className="ml-auto">10 USDT</p>
                </div>

                <div className={'flex items-center mb-2'}>
                  <p>Buyers total charge</p>
                  <p className="ml-auto font-semibold">{Number(amount) + Number(10)} USDT</p>
                </div>

                <div className={'flex items-center mb-2 border-b border-neutral-200 pb-3'}>
                  <p>Sellers proceeds</p>
                  <p className="ml-auto font-semibold"> {amount} USDT</p>
                </div>
              </div>

              <div>
                <h2 className="text-base font-semibold pb-3 pt-5">{initiatorRole === 'Buyer' ? 'Seller' : 'Buyers'} Details</h2>

                <div className={'flex lg:flex-row flex-col gap-4 lg:items-center mb-2 w-full'}>

                  <div className="w-full">
                    <p className="pb-2">{initiatorRole === 'Buyer' ? 'Seller' : 'Buyers'} Wallet address</p>
                    <input type="text" required 
                      placeholder="0xA0Cf…251e" 
                      className="input text-xs input-bordered w-full" 
                      value={seller}
                      onChange={handleReciever}
                    />
                  </div>

                  <div className="w-full">
                    <p className="pb-2">{initiatorRole === 'Buyer' ? 'Seller' : 'Buyers'} Email address</p>
                    <input type="email" required 
                      placeholder="buyer@example.com" 
                      className="input text-xs input-bordered w-full" 
                      value={recieverEmail}
                      onChange={handleRecieverEmail}
                    />
                  </div>

                </div>

                <div className="pt-3">
                  <div className="form-control flex flex-row gap-3 items-center">
                    <input type="checkbox" required className="checkbox checkbox-info text-white w-[19px] h-[19px]" />
                    <p>I have read and agree to the <span className="text-blue-500">Terms and condition</span> of  ZeroTrust</p>
                  </div>
                </div>
              </div>

              <div className="mb-5">
                <button type="submit"  className={`bg-[#054FBB] hover:bg-blue-600 w-full mt-5 flex items-center m-auto justify-center gap-3 py-3 px-6 text-sm text-white rounded-md `}>
                 {isPending ? 'Creating . .' :  <p className="flex gap-3 items-center">Create Transaction <GoArrowUpRight /></p>}
                </button>
              </div>
            </form>

            {/* {hash && <div>Transaction Hash: {hash}</div>} */}
            {isConfirming && <div className="text-sm text-green-600">Waiting for confirmation...</div>} 
            {isConfirmed && <div className="text-sm text-green-600">Transaction confirmed.</div>} 
      
          </ModalContent>
        </Modal>
    </div>
  )
}

export default CreateTransaction
