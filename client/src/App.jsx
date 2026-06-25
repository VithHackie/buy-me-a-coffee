import { useEffect, useState } from "react";
import "./App.css";
import { RxCross1 } from "react-icons/rx";
import web3 from "./web3.jsx";
import { contractABI } from "./DonateMeABI.js";
import UPIPayment from "./components/upi.jsx";

function App() {
  const [email, setEmail] = useState("");
  const [visible, setVisible] = useState(false);
  const [ethvisib, setEthVisib] = useState(" hidden");
  const [msg, setMsg] = useState("");
  const [userAcc, setUserAcc] = useState("");
  const [bg, setBG] = useState(" bg-red-500");
  const [btnVisib, setBtnVisib] = useState("");
  const [eth, setEth] = useState(0.01);
  const [animationVisib, setAnimationVisib] = useState(" hidden")
  const [btnText, setBtnText] = useState("Send")
  const [showModal, setShowModal] = useState(false)
  
  const transactionHandler = async () => {
    const amount = web3.utils.toWei(Number(eth), "ether");
    setAnimationVisib("");
    setBtnText("");

    try {
      const myContract = new web3.eth.Contract(
        contractABI,
        "0xe02CD584c03CbBe75f4b7fd671b0537b32679DC3",
      );

      await myContract.methods.pay(email).send({
        from: userAcc,
        value: amount,
      });

      if (validate(email)) {
        setBG(" bg-emerald-600");
        setMsg("Thank You for the donation. Check Your Email");
        setVisible(true);
      }
    } catch (e) {
      setBG(" bg-red-500");
      setMsg(e.message || "Transaction failed.");
      setVisible(true);
    }finally{
      setAnimationVisib(" hidden");
      setBtnText("Send")
    }
  };

  const initEth = async () => {
    if (window.ethereum) {
      await window.ethereum.request({ method: "eth_requestAccounts" });

      const accounts = await web3.eth.getAccounts();
      const userAcc = accounts[0];

      setUserAcc(userAcc);
      setEthVisib(" ");
      setBtnVisib(" hidden");
    } else {
      console.log("Please Download and create a wallet for this task.");
      setBG(" bg-red-500");
      setMsg(
        " Please Download any wallet and create an account for this task. You can download any wallet avaiable on internet, like Metamask, Bagpack Brave Wallet etc...",
      );
      setVisible(true);
    }
  };

  const validate = async (email) => {
    const baseurl = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080"
    const url = `${baseurl}/validate`
    try {
      const response = await fetch(url, {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          eth: eth,
        }),
      });

      const data = await response.json();
      console.log(data);
      if (data.message === "message sent") {
        return true;
      } else {
        setBG(" bg-red-500");
        setMsg(data.message);
        setVisible(true);
      }
    } catch (e) {
      setBG(" bg-red-500");
      setMsg(e.message);
      setVisible(true);
      console.log(e);
      return false;
    }
  };

  return (
    <main className="min-h-screen w-full bg-[url(/images/bg.avif)] flex flex-col justify-center gap-4 items-center">
      <div className="w-full max-w-lg relative flex flex-col items-center z-50">
        
        {visible && (
          <div className="absolute bg-[#121418]/90 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/50 w-full p-8 rounded-2xl animate-in zoom-in duration-200">
             
             {/* Close Button */}
             <button 
                onClick={() => setVisible(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-white hover:bg-white/10 p-2 rounded-full transition-all cursor-pointer"
             >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
             </button>

             <div className="flex flex-col items-center text-center mt-2">
                
                {/* DYNAMIC ICON: Green Checkmark for Success, Red Exclamation for Error */}
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 border ${bg === " bg-emerald-600" ? "bg-emerald-500/10 border-emerald-500/20" : "bg-red-500/10 border-red-500/20"}`}>
                  {bg === " bg-emerald-600" ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="12"></line>
                      <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                  )}
                </div>
                
                {/* DYNAMIC HEADING */}
                <h3 className="text-white font-semibold text-2xl mb-2">
                  {bg === " bg-emerald-600" ? "Payment Successful!" : "Something went wrong"}
                </h3>

                <p className="text-gray-400 text-base leading-relaxed max-w-sm">
                  {msg}
                </p>
                
                <button 
                  onClick={() => setVisible(false)}
                  className="mt-8 w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl font-medium transition-colors cursor-pointer"
                >
                  Close
                </button>
             </div>
          </div>
        )}
      </div>
      <title>Buy Me a Coffee!</title>
      <h1 className="mb-4 text-4xl text-center font-bold tracking-tight text-white text-heading md:text-5xl/16 lg:text-6xl/18 z-10">
        Hey there!{" "}
        <mark className="px-2 pb-0.5 text-white bg-[#155dfc] rounded-lg">
          Welcome
        </mark>
        .<br /> Donate and Contact me to Collaborate!
      </h1>
      <div className="h-[70vh] w-[30vw] min-w-87.5 bg-[#596066]/70 rounded-xl shadow-xl/30 border-white border flex flex-col justify-between items-center z-10">
        <img
          src="/images/coffee.gif"
          className="rounded-tl-xl rounded-tr-xl w-full h-[30vh] object-cover"
          draggable="false"
        />
        <div className="w-full h-[40vh] bg-linear-to-r/increasing from-[#0a0a0a] to-[#594842] rounded-bl-xl rounded-br-xl border-b border-white/40 shadow-lg shadow-white/35">
          <div className="btns w-full flex flex-col justify-center items-center px-14 gap-4 pt-3">
            <h1 className="font-medium text-lg my-3 text-white font-[satoshi]">
              <span className="text-2xl font-extrabold text-white">Buy Me A Coffee</span> Choose a Payment Option :)
            </h1>
            <input
              type="email"
              placeholder="Enter Your Email"
              value={email}
              required
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="w-full h-14 bg-white/5 border border-white/10 rounded-lg px-4 text-white text-lg placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-inner"
            />
            <button
              onClick={() => {
                setShowModal(true)
              }}
              className="w-full h-14 rounded-lg font-[satoshi] text-xl font-medium text-white bg-linear-to-r from-slate-700 to-slate-800 border border-white/10 hover:border-white/20 hover:from-slate-600 hover:to-slate-700 hover:scale-[1.02] hover:shadow-xl transition-all duration-300 active:scale-95 cursor-pointer"

            >
              Pay via UPI
            </button>
            <div
              className={
                "eth w-full gap-3 flex flex-row justify-around" + ethvisib
              }
            >
              <input
                type="number"
                placeholder="Enter The Amount of Ether"
                value={eth}
                onChange={(e) => {
                  setEth(e.target.value);
                }}
                className={
                  "flex-1 h-14 bg-white/5 border border-white/10 rounded-lg px-4 text-white text-lg placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-inner"
                }
              />
              <button
                className="w-28 h-14 bg-blue-600 hover:bg-blue-500 text-white font-medium text-lg rounded-lg transition-all duration-200 hover:scale-[1.05] active:scale-95 shadow-lg shadow-blue-500/20 flex items-center justify-center cursor-pointer border border-blue-500/50"
                onClick={() => {
                  transactionHandler();
                }}
              >
                <svg
                aria-hidden="true"
                className={"w-8 h-8 text-neutral-tertiary animate-spin fill-brand" + animationVisib}
                viewBox="0 0 100 101"
                fill="navy"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
                {btnText}
              </button>
            </div>
            <button
              className={
                "w-full h-14 rounded-lg font-[satoshi] text-xl font-medium text-white bg-linear-to-r from-slate-700 to-slate-800 border border-white/10 hover:border-white/20 hover:from-slate-600 hover:to-slate-700 hover:scale-[1.02] hover:shadow-xl transition-all duration-300 active:scale-95 cursor-pointer " +
                btnVisib
              }
              onClick={() => {
                initEth();
              }}
            >
              
              Pay via Crypto
            </button>
            <a
              href="https://www.linkedin.com/in/krish-verma-384234271/"
              className="text-lg font-[satoshi] text-white underline font-light hover:scale-104 duration-100"
              target="_blank"
            >
              Contact Me
            </a>
          </div>
        </div>
      </div>
      {showModal && <UPIPayment onClose={() => setShowModal(false)}/>}
    </main>
  );
}

export default App;