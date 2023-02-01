import type {NextPage} from "next";

import {FormEventHandler, useEffect, useState} from "react";
import {useAccount} from "wagmi";

import {TokenList} from "@/Components";

const Home: NextPage = () => {
  const {address: connectedAddress} = useAccount();
  const [address, setAddress] = useState("");
  const [enabled, setEnabled] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [touched, setTouched] = useState(false);

  const submitHandler: FormEventHandler = (e) => {
    e.preventDefault();
    if (address.trim().length === 0) {
      return;
    }
    setEnabled(true);
  };

  useEffect(() => {
    const validAddress = /^0x[a-fA-F0-9]{40}$/i.test(address);
    const validENS = /^[A-Z0-9_%+-]+\.eth$/i.test(address);
    const isInputValid = validAddress || validENS;

    setIsValid(isInputValid);
  }, [address]);

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
      <form
        className="flex w-1/2 flex-col gap-2"
        onSubmit={submitHandler}
      >
        <input
          className={`w-full rounded-xl border-2 p-3 text-background outline-none ${
            isValid || !touched ? "" : "border-secondary"
          }`}
          placeholder="Enter a valid address"
          type="text"
          value={address}
          onBlur={() => setTouched(true)}
          onChange={(e) => {
            setAddress(e.target.value);
            setTouched(false);
            setEnabled(false);
          }}
        />
        <span
          className={`ml-2 text-xs text-secondary ${
            (isValid || !touched) && "invisible"
          }`}
        >
          Invalid Address Entered!
        </span>
      </form>
      {<TokenList address={address} enabled={enabled} />}
    </section>
  );
};

export default Home;
