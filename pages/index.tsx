import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/main.module.scss";

import {
  HelioPay
} from "@heliofi/react";

import "@solana/wallet-adapter-react-ui/styles.css";
import Header from "../src/components/Header";
import { useState } from "react";
import { Cluster } from "@solana/web3.js";

const Home: NextPage = () => {
  const [paymentRequestId, setPaymentRequestId] = useState<string>(
    "63a5802fa14ca68210928eac"
  );
  const [cluster, setCluster] = useState<Cluster>("devnet");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Header />

        <div className={styles.hero}>
          <div className={styles.heroContainer}>
            <div className={styles.heroTitle}>Your coffee order</div>
            <div className={styles.heroText}>Speciality 80+ arabica single origin coffee beans. Characterised by zesty
              acidity and heavy body, with slightly herbal, chocolate, citric undertones.
              All coffee is roasted daily and fresh!
            </div>
            <div className={styles.product}>
              <div className={styles.productLeft}>
                {!isSuccess && (
                  <>
                    <div className={styles.productTitle}>
                      Choose an example
                    </div>

                    <select
                      className={styles.productSelect}
                      defaultValue={paymentRequestId}
                      onChange={(e) => {
                        setPaymentRequestId(e.target.value);
                      }}
                    >
                      <option value="" disabled>
                        Select one...
                      </option>
                      <option value="63c5527565f452f94a1da81d">
                        Coffee order (mainnet)
                      </option>
                      <option value="63c552ac5cff95b55ea5fcfc">
                        Coffee order (testnet)
                      </option>
                    </select>
                    <div className={styles.productTitle} data-tooltip={'Log in to hel.io and create a Pay Link or ' +
                        '"Dynamic payment". Copy paste the paymentRequestId from Step 4: Integrate Helio'}>
                      Or paste your "paymentRequestId" to test your checkout
                    </div>
                    <input
                      type="text"
                      value={paymentRequestId}
                      onChange={(e) => setPaymentRequestId(e.target.value)}
                    />
                    <br />
                    <br />
                    <div>
                      <label>
                        <input
                          type="radio"
                          name="cluster"
                          value="devnet"
                          checked={cluster === "devnet"}
                          onChange={() => setCluster("devnet")}
                        />
                        &nbsp; devnet
                      </label>
                      &nbsp;&nbsp;&nbsp;
                      <label>
                        <input
                          type="radio"
                          name="cluster"
                          value="mainnet-beta"
                          checked={cluster === "mainnet-beta"}
                          onChange={() => setCluster("mainnet-beta")}
                        />
                        &nbsp; mainnet-beta
                      </label>
                    </div>
                    <br />
                    <br />
                  </>
                )}

                <div className={styles.paybutton}>
                  <HelioPay
                    cluster={cluster}
                    payButtonTitle="Buy Coffee"
                    paymentRequestId={paymentRequestId}
                    onSuccess={function (event): void {
                      console.log("onSuccess", event);
                      setIsSuccess(true);
                    }}
                    onError={function (event): void {
                      console.log("onError", event);
                      setIsSuccess(false);
                    }}
                    onPending={function (event): void {
                      console.log("onPending", event);
                    }}
                    onStartPayment={function (): void {
                      console.log("onStartPayment");
                    }}
                    supportedCurrencies={['USDC']}
                    totalAmount={0.01}
                    // theme={{
                    //     colors: {
                    //         primary: "#ff0000",
                    //         secondary: "#00ff00",
                    //     }
                    // }}
                  />
                </div>
              </div>
              <div className={styles.productRight}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://www.ambercay.com.tr/cropped/?src=dosyalar/page_77/img_11616842956.png&w=553&h=600"
                  alt="TheGreatProduct"
                  className={styles.productImage}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
