import type {NextPage} from "next";

import {Alchemy, Network} from "alchemy-sdk";
import {FormEventHandler, useEffect, useRef, useState} from "react";

const settings = {
  apiKey: "oqn6yIU_bcHgkSNXEycAv-Ikr5OYRdP-",
  network: Network.ETH_MAINNET,
};

const Home: NextPage = () => {
  const [value, setValue] = useState("");
  const alchemySDKRef = useRef<Alchemy | undefined>();

  useEffect(() => {
    if (!alchemySDKRef.current) {
      alchemySDKRef.current = new Alchemy(settings);
    }
  }, []);

  const submitHandler: FormEventHandler = (e) => {
    e.preventDefault();
    if (value.trim().length === 0 || !alchemySDKRef.current) {
      return;
    }

    alchemySDKRef.current.core
      .getTokenBalances(value)
      .then(console.log);
  };

  return (
    <section className="flex flex-col items-center gap-10">
      <h1 className="mt-10 max-w-3xl text-center text-6xl font-bold">
        The best way to track your tokens
      </h1>
      <form className="w-1/2" onSubmit={submitHandler}>
        <input
          className="w-full rounded-xl p-3 text-background outline-none"
          placeholder="Enter a valid address"
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </form>
    </section>
  );
};

export default Home;
