import type {NextPage} from "next";

import {FormEventHandler, useEffect, useState} from "react";
import {useAccount} from "wagmi";

import {TokenList} from "@/Components";

const Home: NextPage = () => {
  const {address: connectedAddress} = useAccount();
  const [address, setAddress] = useState("");
  const [enabled, setEnabled] = useState(false);

  const submitHandler: FormEventHandler = (e) => {
    e.preventDefault();
    if (address.trim().length === 0) {
      return;
    }
    setEnabled(true);
  };

  useEffect(() => {
    if (!connectedAddress) {
      return;
    }
    setAddress(connectedAddress);
    setEnabled(true);
  }, [connectedAddress]);

  return (
    <section className="flex flex-col items-center gap-16">
      <h1 className="mt-20 max-w-3xl text-center text-6xl font-bold">
        The best way to track your tokens
      </h1>
      <form className="w-1/2" onSubmit={submitHandler}>
        <input
          className="w-full rounded-xl p-3 text-background outline-none"
          placeholder="Enter a valid address"
          type="text"
          value={address}
          onChange={(e) => {
            setAddress(e.target.value);
            setEnabled(false);
          }}
        />
      </form>
      {<TokenList address={address} enabled={enabled} />}
    </section>
  );
};

export default Home;
