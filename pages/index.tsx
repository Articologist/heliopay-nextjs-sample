import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/main.module.scss";

import { HelioPay } from "@heliofi/react";

import "@solana/wallet-adapter-react-ui/styles.css";
import Header from "../src/components/Header";
import { useEffect, useMemo, useState } from "react";
import { Cluster } from "@solana/web3.js";
import { HelioSDK, ClusterType } from "@heliofi/sdk";
import { Paylink, PaymentRequestType } from "@heliofi/common";

type Favicon = {
  rel: string;
  href: string;
  sizes?: string;
  type?: string;
};

const favicons: Array<Favicon> = [
  {
    rel: 'apple-touch-icon',
    sizes: '57x57',
    href: '/favicon/apple-icon-57x57.png',
  },
  {
    rel: 'apple-touch-icon',
    sizes: '60x60',
    href: '/favicon/apple-icon-60x60.png',
  },
  {
    rel: 'apple-touch-icon',
    sizes: '72x72',
    href: '/favicon/apple-icon-72x72.png',
  },
  {
    rel: 'apple-touch-icon',
    sizes: '76x76',
    href: '/favicon/apple-icon-76x76.png',
  },
  {
    rel: 'apple-touch-icon',
    sizes: '114x114',
    href: '/favicon/apple-icon-114x114.png',
  },
  {
    rel: 'apple-touch-icon',
    sizes: '120x120',
    href: '/favicon/apple-icon-120x120.png',
  },
  {
    rel: 'apple-touch-icon',
    sizes: '144x144',
    href: '/favicon/apple-icon-144x144.png',
  },
  {
    rel: 'apple-touch-icon',
    sizes: '152x152',
    href: '/favicon/apple-icon-152x152.png',
  },
  {
    rel: 'apple-touch-icon',
    sizes: '180x180',
    href: '/favicon/apple-icon-180x180.png',
  },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '192x192',
    href: '/favicon/android-icon-192x192.png',
  },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '32x32',
    href: '/favicon/favicon-32x32.png',
  },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '96x96',
    href: '/favicon/favicon-96x96.png',
  },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '16x16',
    href: '/favicon/favicon-16x16.png',
  },
  {
    rel: 'manifest',
    href: '/favicon/manifest.json',
  },
  {
    rel: 'shortcut icon',
    href: '/favicon/favicon.ico',
  },
];

const Home: NextPage = () => {
  const defaultPaymentRequestId = '643845e234ddef95bad6abbe';
  const [paymentRequestId, setPaymentRequestId] = useState<string>(defaultPaymentRequestId);
  const [cluster, setCluster] = useState<Cluster>(ClusterType.Mainnet);
  const [paymentType, setPaymentType] = useState<PaymentRequestType>(PaymentRequestType.PAYLINK);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [paymentRequest, setPaymentRequest] = useState<Paylink | null>(null);
  const [isShownCustom, setIsShownCustom] = useState<boolean>(false);

  const sdk = useMemo(() => {
    return new HelioSDK({ cluster })
  }, [cluster]);

  useEffect( () => {
    const fetchPaylink = async () => {
      if (paymentType === PaymentRequestType.PAYLINK && paymentRequestId) {
        const paylink = await sdk.apiService.getPaymentRequestByIdPublic(paymentRequestId, paymentType);
        setPaymentRequest(paylink as Paylink);
      } else {
        setPaymentRequest(null);
      }
    }
    fetchPaylink();

  }, [paymentRequestId, sdk.apiService, paymentType])
  return (
    <div>
      <Head>
        <title>Audi0FILE Wallet-To-Wallet</title>
        <meta name="description" content="audioFILE Crypto-Checkout" />
        {favicons.map((linkProps) => (
          <link key={linkProps.href} {...linkProps} />
        ))}
      </Head>

      <main className={styles.main}>
        <Header />

        <div className={styles.hero}>
          <div className={styles.heroContainer}>
            <div className={styles.heroTitle}>Featured Product</div>
            <div className={styles.heroText}>Under the Basmala banner, HA's Control Room album is Post-Modern Hip-Hop, JazzHop, Beats and Jazztronica. Culminated by instrumental hip-hop or beat art.
            </div>
            <div className={styles.product}>
              <div className={styles.productLeft}>
                {!isSuccess && (
                  <>
                    <div className={styles.productTitle}>
                      Purchase NFT w/ Tandem Goods
                    </div>

                    <select
                      className={styles.productSelect}
                      defaultValue={paymentRequestId}
                      onChange={(e) => {
                        setIsShownCustom(!e.target.value);
                        setPaymentRequestId(e.target.value);
                        setCluster(e.target[e.target.selectedIndex].getAttribute('data-cluster') as Cluster);
                        setPaymentType(e.target[e.target.selectedIndex].getAttribute('data-payment-type') as PaymentRequestType);
                      }}
                    >
                     
                        Control Room (KING Coin - buyout collection)
                      </select>
                    
                <div className={styles.paybutton}>
                  <HelioPay
                    cluster={cluster}
                    payButtonTitle="Purchase"
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
                    totalAmount={3600}
                    paymentType={paymentType}
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
                  src="https://www.scoop.orng.store/ws/media-library/5015dcb987b94eb98b025d1006215cc5/cr_vinyl_mock.png"
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
