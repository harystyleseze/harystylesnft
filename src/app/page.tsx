"use client";

import Image from "next/image";
// import { Button } from "@/components/ui/button";
import { client } from "./client";
import {
  ConnectButton,
  TransactionButton,
  useActiveAccount,
} from "thirdweb/react";
import { getContract } from "thirdweb";
import { defineChain } from "thirdweb/chains";
import { getContractMetadata } from "thirdweb/extensions/common";
import { claimTo } from "thirdweb/extensions/erc721";
import { MediaRenderer } from "thirdweb/react";
import {
  Twitter,
  Linkedin,
  Send,
  MessagesSquare,
  MessageSquare,
} from "lucide-react";
import { useEffect, useState } from "react";

// Define the type for contract metadata
interface ContractMetadata {
  name: string;
  symbol: string;
  [key: string]: any;
}

export default function Home() {
  const account = useActiveAccount();
  const [contractMetadata, setContractMetadata] =
    useState<ContractMetadata | null>(null);
  const [contract, setContract] = useState<any>(null);

  useEffect(() => {
    async function fetchMetadata() {
      // get and parse the chain id
      const chainId = parseInt(process.env.NEXT_PUBLIC_CHAIN_ID as string);

      // define the chain
      const chain = defineChain({
        id: chainId,
        rpcUrls: {
          default: {
            http: [process.env.NEXT_PUBLIC_RPC_URL as string],
          },
        },
        nativeCurrency: {
          decimals: 18,
          name: "tCORE",
          symbol: "tCORE2",
        },
        name: "Core Blockchain Testnet 2",
      });

      const contractInstance = getContract({
        client,
        chain,
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string,
      });
      setContract(contractInstance);

      const metadata = await getContractMetadata({
        contract: contractInstance,
      });
      setContractMetadata(metadata);
    }
    // fetch the metadata
    fetchMetadata();
  }, []);

  // console.log the contract metadata
  console.log(contractMetadata);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-4 bg-gray-800">
        <div className="text-2xl font-bold text-[#F89213]">NFT Claim</div>
        {/* <Button
          variant="outline"
          className="bg-[#F89213] text-white hover:bg-[#F89213]/80"
        >
          Connect Wallet
        </Button> */}
        <ConnectButton
          client={client}
          connectButton={{
            label: "Connect Wallet",
            className: "bg-[#F89213] text-white hover:bg-[#F89213]/80",
            style: {
              backgroundColor: "#F89213",
              color: "white",
              borderRadius: "8px",
            },
          }}
        />
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center gap-8">
        <div className="md:w-1/2 max-w-md mx-auto">
          {/* <Image
            src="/placeholder.svg?height=400&width=400"
            alt="NFT Preview"
            width={400}
            height={400}
            className="rounded-lg shadow-lg"
          /> */}
          <MediaRenderer
            client={client}
            src={contractMetadata?.image}
            width="400"
            height="400"
            style={{
              borderRadius: "1rem",
              border: "0.01px solid #F89213",
              boxShadow: "0px 1px 2px 0px rgba(248, 146, 19, 0.5)",
            }}
          />
        </div>
        <div className="md:w-1/2 space-y-6 max-w-md mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold">
            Claim Exclusive NFT
          </h1>
          <h3 className="text-2xl font-semibold mb-4 text-[#F89213]">
            {/* The Artwork */}
            {contractMetadata?.name}
          </h3>
          <p className="text-xl text-gray-300">
            {contractMetadata?.description}
          </p>
          {/* <Button className="bg-[#F89213] text-white hover:bg-[#F89213]/80 text-lg px-8 py-4">
            Claim NFT
          </Button> */}
          <TransactionButton
            transaction={() =>
              claimTo({
                contract,
                to: account?.address || "",
                quantity: BigInt(1),
              })
            }
            style={{
              backgroundColor: "#F89213",
              color: "white",
              borderRadius: "8px",
            }}
            className="bg-[#F89213] text-white hover:bg-[#F89213]/80 text-lg px-8 py-4"
            onTransactionConfirmed={async () => {
              alert("Transaction successful");
            }}
          >
            Claim 1 HNFT
          </TransactionButton>
        </div>
      </section>

      {/* About the NFT Section */}
      {/* <section className="py-16 bg-gray-800">
        <div className="container mx-auto px-4 max-w-screen-lg">
          <h2 className="text-3xl font-bold text-center mb-12">
            About the NFT
          </h2>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2 max-w-screen-lg mx-auto">
              <Image
                src="/placeholder.svg?height=400&width=400"
                alt="NFT Artwork"
                width={400}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="md:w-1/2 space-y-4 max-w-screen-lg mx-auto">
              <h3 className="text-2xl font-semibold mb-4 text-[#F89213]"> */}
      {/* The Artwork */}
      {/* {contractMetadata?.name}
              </h3> */}
      {/* <p className="text-gray-300">
                This unique NFT represents a fusion of digital art and
                blockchain technology. Each piece is meticulously crafted to
                offer a one-of-a-kind experience for collectors. The intricate
                details and vibrant colors showcase the pinnacle of digital
                artistry, making it a must-have for any serious NFT enthusiast.
              </p>
              <p className="text-gray-300">
                Owning this NFT not only grants you a piece of digital art
                history but also unlocks exclusive benefits within our
                community. The scarcity and uniqueness of each piece ensure that
                your investment is truly one of a kind.
              </p> */}
      {/* {contractMetadata?.description}
            </div>
          </div>
        </div>
      </section> */}

      {/* The Creator Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-screen-lg">
          <h2 className="text-3xl font-bold text-center mb-12">The Creator</h2>
          <div className="flex flex-col md:flex-row-reverse items-center gap-8">
            <div className="md:w-1/2 max-w-screen-lg mx-auto">
              <Image
                src="/images/harystyles.png"
                alt="Harystyles photo"
                width={400}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="md:w-1/2 space-y-4 max-w-screen-lg mx-auto">
              <h3 className="text-2xl font-semibold mb-4 text-[#F89213]">
                Harrison Eze
              </h3>
              <p className="text-gray-300">
                Harrison Eze (Harystyles) is the visionary creator behind the
                HarystylesNft (HNFT). With a passion for blockchain technology
                and a deep commitment to excellence, Harrison's work is driven
                by a relentless pursuit of innovation and creativity. His
                expertise in blockchain development and node operation is
                matched only by his unwavering determination and dedication to
                building something meaningful.
              </p>
              <p className="text-gray-300">
                When he's not immersed in the world of coding and blockchain,
                Harrison cherishes spending quality time with his family and
                loved ones. He values the importance of balance in life, finding
                inspiration and strength in the connections he shares with those
                closest to him. Through his work and his personal life, Harrison
                embodies the core values of perseverance, bravery, and the grit
                needed to overcome any challenge.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Holder Benefits
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Exclusive Access",
                description: "Get VIP access to future drops and events.",
              },
              {
                title: "Community",
                description:
                  "Join a vibrant community of NFT enthusiasts and artists.",
              },
              {
                title: "Royalties",
                description: "Earn a share of secondary market sales.",
              },
            ].map((feature, index) => (
              <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4 text-[#F89213]">
                  {feature.title}
                </h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-800 py-8 mt-auto">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold text-[#F89213] mb-2">
                NFT Claim
              </h3>
              <p className="text-sm text-gray-400">
                Exclusive digital art collectibles
              </p>
            </div>
            <div className="flex gap-4">
              <a
                href="https://twitter.com/Harystylesdev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#F89213] transition-colors"
              >
                <Twitter size={24} />
                <span className="sr-only">Twitter</span>
              </a>
              <a
                href="https://www.linkedin.com/in/harrison-eze-dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#F89213] transition-colors"
              >
                <Linkedin size={24} />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a
                href="https://discord.com/users/harystyles_98126"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#F89213] transition-colors"
              >
                <MessagesSquare size={24} />
                <span className="sr-only">Discord</span>
              </a>
              <a
                href="https://t.me/DevHarystyles"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#F89213] transition-colors"
              >
                <Send size={24} />
                <span className="sr-only">Telegram</span>
              </a>
              <a
                href="https://wa.me/2348102414875"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#F89213] transition-colors"
              >
                <MessageSquare size={24} />
                <span className="sr-only">WhatsApp</span>
              </a>
            </div>
          </div>
          <div className="mt-8 text-center text-sm text-gray-400">
            &copy; {new Date().getFullYear()} NFT Claim. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
