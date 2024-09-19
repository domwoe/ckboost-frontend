'use client'

import React, { useState } from 'react';
import RequestBoost from '../components/request-boost';
import Header from '../components/header';
import HeroSection from '../components/hero-section';
import OpenRequests from '../components/open-requests';
import { IdentityKitProvider } from "@nfid/identitykit/react"
import { HttpAgent } from "@dfinity/agent";

export default function CkBoostPage() {


  const [showRequestBoost, setShowRequestBoost] = useState(false);

  const handleGetCkBTC = () => {
    setShowRequestBoost(true);
  };

  const agent = HttpAgent.createSync({host: 'https://icp-api.io'});

  return (
    
    <IdentityKitProvider agent={agent}>
    <div className="min-h-screen font-mono">
      <Header />

      {showRequestBoost ? (
        <RequestBoost />
      ) : (
        <HeroSection onGetCkBTC={handleGetCkBTC} />
      )}

      <OpenRequests />

    </div>
    </IdentityKitProvider>
  );
}