'use client'

import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { ClipboardIcon, CheckIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import { ConnectWallet } from "@nfid/identitykit/react"
import { useIdentityKit } from "@nfid/identitykit/react"
import { CkBTCMinterCanister } from "@dfinity/ckbtc";
import { createAgent } from "@dfinity/utils";
import { HttpAgent } from "@dfinity/agent";
import { Principal } from '@dfinity/principal';

const CKBTC_MINTER_CANISTER_ID = Principal.fromText("ml52i-qqaaa-aaaar-qaaba-cai");


const RequestBoost: React.FC = () => {
  const { agent, user, identity } = useIdentityKit()
  
  const [currentStep, setCurrentStep] = useState(1);
  const [amount, setAmount] = useState('');
  const [bitcoinAddress, setBitcoinAddress] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (user) {
      setCurrentStep(2);
    }
  }, [user]);

  const steps = [
    { title: 'Connect ICP Wallet', completed: currentStep > 1 },
    { title: 'Set Amount', completed: currentStep > 2 },
    { title: 'Send Bitcoin', completed: currentStep > 3 },
    { title: 'Register Boost', completed: currentStep > 4 },
  ];

 

  const connectWallet = () => {
    // Implement wallet connection logic
    setCurrentStep(2);
  };

  const setConversionAmount = async () => {

    console.log('set conversion');
    let btcAddress = '1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2';

    console.log(identity);

    console.log(user);

    if (user?.principal) {
      console.log('Identity and user principal')

    //   const agent = HttpAgent.createSync({host: 'https://icp-api.io'});
        if (agent) {
    //   const agent = await createAgent({ identity });
        const { getBtcAddress, getMinterInfo } = CkBTCMinterCanister.create({
            agent,
            canisterId: CKBTC_MINTER_CANISTER_ID,
        });

        const minterInfo = await getMinterInfo({ certified: false });

        console.log(minterInfo);

        btcAddress = await getBtcAddress({
            owner: user.principal,
            subaccount: user.subaccount?.toUint8Array()
        });

    }



      console.log(btcAddress)
    }

    // Implement amount setting logic
    // setCurrentStep(3);
    // For demo purposes, set a dummy Bitcoin address
    // setBitcoinAddress(btcAddress);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(bitcoinAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const registerBoost = () => {
    // Implement boost registration logic
    setCurrentStep(4);
  };

  const goBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <section className="bg-white text-black py-12 sm:py-20 relative overflow-hidden mt-16">
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center">Request ckBTC Boost</h2>
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-8">
          <ol className="md:flex-shrink-0 flex flex-col md:w-64 mb-8 md:mb-0">
            {steps.map((step, index) => (
              <li key={index} className="flex items-center mb-4 md:mb-8">
                <span className={`flex items-center justify-center w-8 h-8 rounded-full shrink-0 ${step.completed ? 'bg-blue-600' : 'bg-gray-100'} mr-3`}>
                  {step.completed ? (
                    <svg className="w-3.5 h-3.5 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5"/>
                    </svg>
                  ) : (
                    <span className={`text-gray-500 ${currentStep === index + 1 ? 'font-bold' : ''}`}>{index + 1}</span>
                  )}
                </span>
                <span className={`text-sm ${currentStep === index + 1 ? 'font-bold' : ''}`}>{step.title}</span>
                {index < steps.length - 1 && (
                  <div className="hidden md:block w-full border-t border-gray-200 mt-4"></div>
                )}
              </li>
            ))}
          </ol>

          <div className="flex-grow">
            {currentStep === 1 && (
              <div className="mb-4">
                <h2 className="text-lg font-semibold mb-2">Connect ICP Wallet</h2>
                {/* <ConnectWallet /> */}
              </div>
            )}

            {currentStep === 2 && (
              <div className="mb-4">
        
        <h2 className="text-lg font-semibold mb-2">Account to be credited with ckBTC</h2>
                {user?.principal?.toString()}
                <ConnectWallet />

                <h2 className="text-lg font-semibold mb-2 py-4">Set Amount to Convert</h2>
                <span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="border rounded px-2 py-1 mr-2 mb-2"
                  placeholder="Enter amount"
                />
                </span> sats
                <div>
                  <Button onClick={setConversionAmount} className="mr-2">Set Amount</Button>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="mb-4">
                <h2 className="text-lg font-semibold mb-2">Send Bitcoin</h2>
                <div className="bg-gray-100 p-4 rounded-lg text-center mb-4">
                  <QRCodeSVG value={bitcoinAddress} size={200} className="mx-auto" />
                  <div className="mt-2 flex items-center justify-center">
                    <p className="text-sm break-all mr-2">{bitcoinAddress}</p>
                    <button
                      onClick={copyToClipboard}
                      className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                      aria-label="Copy address"
                    >
                      {copied ? <CheckIcon className="h-4 w-4" /> : <ClipboardIcon className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                <div>
                  <Button onClick={() => setCurrentStep(4)} className="mr-2">Next</Button>
                  <Button onClick={goBack} variant="outline">Back</Button>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="mb-4">
                <h2 className="text-lg font-semibold mb-2">Register Boost Request</h2>
                <Button onClick={registerBoost} className="mr-2">Register Boost</Button>
                <Button onClick={goBack} variant="outline">Back</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RequestBoost;
