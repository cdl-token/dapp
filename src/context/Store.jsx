"use client";
import React, { useState, useEffect, createContext } from "react";
import { ethers, providers, utils } from "ethers";
import CryptoJS from "crypto-js";
import axios from "axios";
import {
  useWeb3Modal,
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers5/react";
import { ToastContainer, toast } from "react-toastify";

import CdlCoinAddress from "./contractsData/CryptoDataLive-address.json";
import CdlCoin from "./contractsData/CryptoDataLive.json";

import CdlMasterContractAddress from "./contractsData/CryptoDataLiveMasterContract-address.json";
import CdlMasterContract from "./contractsData/CryptoDataLiveMasterContract.json";

import CdlMainBridgeBaseAddress from "./contractsData/CryptoDataLiveBridgeBase-address.json";
import CdlMainBridgeBaseAbi from "./contractsData/CryptoDataLiveBridgeBase.json";

//////   ETHEREUM WRAPPED BRIDGE  //////////////
import WrappedBridgeETHCdlAddress from "./contractsData/WrappedBridgeCdl-address.json";
import WrappedBridgeETHCdlAbi from "./contractsData/WrappedBridgeCdl.json";

import WrappedTokenETHCdlAddress from "./contractsData/WrappedCryptoDataLive-address.json";
import WrappedTokenETHCdlAbi from "./contractsData/WrappedCryptoDataLive.json";

//////   BINANCE Staking Contract WITH USDT AND USDC   //////////////
import USDCTokenAddress from "./contractsData/USDCToken-address.json";
import USDTTokenAddress from "./contractsData/USDTToken-address.json";
import WBTCTokenAddress from "./contractsData/WBTCToken-address.json";
import WETHTokenAddress from "./contractsData/WETHToken-address.json";
import WBNBTokenAddress from "./contractsData/WBNBToken-address.json";

import CdlStakingContractAddress from "./contractsData/CryptoDataLiveStakingContract-address.json";
import CdlStakingContractAbi from "./contractsData/CryptoDataLiveStakingContract.json";
import Loader from "@/components/Loader";

const getProviderMasterContract = () => {
  const providers = process.env.NEXT_PUBLIC_RPC_URL_BNB;
  const provider = new ethers.providers.JsonRpcProvider(providers); //"http://localhost:8545/"
  const masterContract = new ethers.Contract(
    CdlMasterContractAddress.address,
    CdlMasterContract.abi,
    provider
  );
  return masterContract;
};

const getProviderStakingContract = () => {
  const providers = process.env.NEXT_PUBLIC_RPC_URL_BNB;
  const provider = new ethers.providers.JsonRpcProvider(providers); //"http://localhost:8545/"
  const stakingContract = new ethers.Contract(
    CdlStakingContractAddress.address,
    CdlStakingContractAbi.abi,
    provider
  );
  return stakingContract;
};

export const Store = createContext();

export const StoreProvider = ({ children }) => {
  const { address, chainId, isConnected } = useWeb3ModalAccount();

  const { walletProvider } = useWeb3ModalProvider();

  const [loader, setloader] = useState(false);

  const [tronConnected, setTronConnected] = useState(false);

  const [proposal, setProposals] = useState([]);

  const [withdrawInvestedTokensRequests, setWithdrawInvestedTokensRequests] =
    useState([]);

  const [masterContractProposalData, setMasterContractProposalData] = useState(
    []
  );

  const [stakingContractData, setStakingContractData] = useState({
    CdlBalance: 0,
    UsdtBalance: 0,
    UsdcBalance: 0,
    TotalEarnedReward: 0,
    claimedRewards: 0,
    CdlStaked: [],
    USDTStaked: [],
    USDCStaked: [],
    WETHStaked: [],
    WBNBStaked: [],
    WBTCStaked: [],
  });

  const [masterContractData, setMasterContractData] = useState({
    totalStakers: 0,
    totalStakeAmount: 0,
    totalRewards: 0,
    distributed: 0,
  });

  const [coin, setCoin] = useState([]);
  const [tronCurrentAccount, setTronCurrentAccount] = useState("");
  const [tronWalletForBridge, setTronWalletForBridge] = useState("");

  //////////////////////////////////////////  MASTER CONTRACT STAKING ///////////////////////////////
  //////////////////////////////////////////  MASTER CONTRACT STAKING ///////////////////////////////
  //////////////////////////////////////////  MASTER CONTRACT STAKING ///////////////////////////////
  //////////////////////////////////////////  MASTER CONTRACT STAKING ///////////////////////////////
  //////////////////////////////////////////  MASTER CONTRACT STAKING ///////////////////////////////
  //////////////////////////////////////////  MASTER CONTRACT STAKING ///////////////////////////////

  const getCdlBalance = async () => {
    if (isConnected) {
      const provider = new ethers.providers.Web3Provider(walletProvider);
      const signer = provider.getSigner();
      const CdlContracts = new ethers.Contract(
        CdlCoinAddress.address,
        CdlCoin.abi,
        signer
      );
      const balance = await CdlContracts.balanceOf(address?.toString());
      setStakingContractData((prevState) => ({
        ...prevState,
        CdlBalance: ethers.utils.formatEther(balance?.toString())?.toString(),
      }));
    }
  };

  const getStakingContractData = async () => {
    const totalStakedTokens =
      await getProviderStakingContract().totalStakedTokens();
    const totalStakers = await getProviderStakingContract().totalInvestors();
    const getAllUsersEarnedTokens =
      await getProviderStakingContract().getTotalEarnings();
    const getAllUsersClaimedTokens =
      await getProviderStakingContract().totalClaimedTokens();

    setMasterContractData((prevState) => ({
      ...prevState,
      totalStakers: totalStakers?.toString(),
      totalRewards: ethers.utils
        .formatEther(getAllUsersEarnedTokens?.toString() || 0)
        ?.toString(),
      totalStakeAmount: ethers.utils
        .formatEther(totalStakedTokens?.toString() || 0)
        ?.toString(),
      distributed: ethers.utils
        .formatEther(getAllUsersClaimedTokens?.toString() || 0)
        ?.toString(),
    }));
  };

  // const getStakedInfoByUser = async () => {
  //   if (isConnected) {
  //     const provider = new ethers.providers.Web3Provider(walletProvider);
  //     const signer = provider.getSigner();

  //     const stakingContract = new ethers.Contract(
  //       CdlStakingContractAddress.address,
  //       CdlStakingContractAbi.abi,
  //       signer
  //     );

  //     try {
  //     // Get the number of stakes for the user
  //     const numberOfStakes = await stakingContract.getUserStakesLength(address); // Assuming you have a way to get this //TODO::
  //     const claimedRewards = await stakingContract.claimedRewards(address); // Assuming you have a way to get this

  //     const CdlStaked = [];
  //     const USDTStaked = [];
  //     const USDCStaked = [];

  //     let TotalEarnedReward = 0;
  //     for (let i = 0; i < numberOfStakes?.toString(); i++) {
  //       //numberOfStakes?.length

  //       // Fetch earned reward tokens using the rewardedTokens function
  //       const earnedRewardTokens = await stakingContract.rewardedTokens(
  //         address,
  //         i
  //       );

  //       TotalEarnedReward += parseFloat(ethers.utils.formatEther(earnedRewardTokens?.toString()));

  //       // Get each stake by index
  //       const stakeInfo = await stakingContract.userStakes(address, i);
  //       if (
  //         stakeInfo?.stakedTokenAddress?.toLowerCase() ===
  //         CdlCoinAddress?.address?.toLowerCase()
  //       ) {
  //         CdlStaked.push({
  //           stakedTokens: ethers.utils.formatEther(
  //             stakeInfo?.stakedTokens?.toString()
  //           ),
  //           startTime: stakeInfo?.startTime?.toString(),
  //           duration: stakeInfo?.duration?.toString() * 1000,
  //           rewardEarned: ethers.utils.formatEther(
  //             stakeInfo?.rewardEarned?.toString()
  //           ),
  //           stakedTokenAddress: stakeInfo?.stakedTokenAddress?.toString(),
  //         });
  //       } else if (
  //         stakeInfo?.stakedTokenAddress?.toLowerCase() ===
  //         USDTTokenAddress?.address?.toLowerCase()
  //       ) {

  //         USDTStaked.push({
  //           stakedTokens: ethers.utils.formatEther(
  //             stakeInfo?.stakedTokens?.toString()
  //           ),
  //           startTime: stakeInfo?.startTime?.toString(),
  //           duration: stakeInfo?.duration?.toString() * 1000,
  //           rewardEarned: ethers.utils.formatEther(
  //             stakeInfo?.rewardEarned?.toString()
  //           ),
  //           stakedTokenAddress: stakeInfo?.stakedTokenAddress?.toString(),
  //         });
  //       } else if (
  //         stakeInfo?.stakedTokenAddress?.toLowerCase() ===
  //         USDCTokenAddress?.address?.toLowerCase()
  //       ) {
  //         USDCStaked.push({
  //           stakedTokens: ethers.utils.formatEther(
  //             stakeInfo?.stakedTokens?.toString()
  //           ),
  //           startTime: stakeInfo?.startTime?.toString(),
  //           duration: stakeInfo?.duration?.toString() * 1000,
  //           rewardEarned: ethers.utils.formatEther(
  //             stakeInfo?.rewardEarned?.toString()
  //           ),
  //           stakedTokenAddress: stakeInfo?.stakedTokenAddress?.toString(),
  //         });
  //       }
  //     }

  //     setStakingContractData((prevState) => ({
  //       ...prevState,
  //       CdlStaked: CdlStaked,
  //       USDTStaked: USDTStaked,
  //       USDCStaked: USDCStaked,
  //       TotalEarnedReward: TotalEarnedReward,
  //       claimedRewards: ethers.utils.formatEther(claimedRewards?.toString()),
  //     }));
  //     } catch (error) {
  //         console.error("Error fetching staked info:", error);
  //     }
  //   } else {
  //     console.warn("User is not connected.");
  //   }
  // };

  const getStakedInfoByUser = async () => {
    if (isConnected) {
      const provider = new ethers.providers.Web3Provider(walletProvider);
      const signer = provider.getSigner();

      const stakingContract = new ethers.Contract(
        CdlStakingContractAddress.address,
        CdlStakingContractAbi.abi,
        signer
      );

      try {
        // Call the Solidity function and destructure the returned values
        const CdlStaked = await stakingContract.userStakesByToken(
          address,
          CdlCoinAddress.address
        );
     
        const USDCStaked = await stakingContract.userStakesByToken(
          address,
          USDCTokenAddress.address
        );
        const USDTStaked = await stakingContract.userStakesByToken(
          address,
          USDTTokenAddress.address
        );
        const WETHStaked = await stakingContract.userStakesByToken(
          address,
          WETHTokenAddress.address
        );
        const WBNBStaked = await stakingContract.userStakesByToken(
          address,
          WBNBTokenAddress.address
        );

        const WBTCStaked = await stakingContract.userStakesByToken(
          address,
          WBTCTokenAddress.address
        );

        const CdlEarned = await stakingContract.rewardedTokens(
          address,
          CdlCoinAddress.address
        );
        const USDCEarned = await stakingContract.rewardedTokens(
          address,
          USDCTokenAddress.address
        );
        const USDTEarned = await stakingContract.rewardedTokens(
          address,
          USDTTokenAddress.address
        );
        const WETHEarned = await stakingContract.rewardedTokens(
          address,
          WETHTokenAddress.address
        );
        const WBNBEarned = await stakingContract.rewardedTokens(
          address,
          WBNBTokenAddress.address
        );
        const WBTCEarned = await stakingContract.rewardedTokens(
          address,
          WBTCTokenAddress.address
        );
        let CdlCdl = ethers.utils.formatEther(CdlEarned?.toString());
        let CdlUSDC = ethers.utils.formatEther(USDCEarned?.toString());
        let CdlUSDT = ethers.utils.formatEther(USDTEarned?.toString());
        let CdlWETH = ethers.utils.formatEther(WETHEarned?.toString());
        let CdlWBNB = ethers.utils.formatEther(WBNBEarned?.toString());
        let CdlWBTC = ethers.utils.formatEther(WBTCEarned?.toString());

        setStakingContractData((prevState) => ({
          ...prevState,
          WETHStaked:
            WETHStaked?.stakedTokens > 0
              ? {
                  stakedTokens: ethers.utils.formatEther(WETHStaked?.stakedTokens?.toString()),
                  startTime: WETHStaked?.startTime?.toString(),
                  duration: WETHStaked?.duration?.toString() * 1000,
                  stakedTokenAddress: WETHStaked?.stakedTokenAddress?.toString(),
                }
              : null,
          WBNBStaked: WBNBStaked?.stakedTokens > 0
              ? {
                  stakedTokens: ethers.utils.formatEther(WBNBStaked?.stakedTokens?.toString()),
                  startTime: WBNBStaked?.startTime?.toString(),
                  duration: WBNBStaked?.duration?.toString() * 1000,
                  stakedTokenAddress: WBNBStaked?.stakedTokenAddress?.toString(),
                }
              : null,
          WBTCStaked: WBTCStaked?.stakedTokens > 0
              ? {
                  stakedTokens: ethers.utils.formatEther(WBTCStaked?.stakedTokens?.toString()),
                  startTime: WBTCStaked?.startTime?.toString(),
                  duration: WBTCStaked?.duration?.toString() * 1000,
                  stakedTokenAddress: WBTCStaked?.stakedTokenAddress?.toString(),
                }
              : null,

          CdlStaked: CdlStaked?.stakedTokens > 0
              ? {
                  stakedTokens: ethers.utils.formatEther(CdlStaked?.stakedTokens?.toString()),
                  startTime: CdlStaked?.startTime?.toString(),
                  duration: CdlStaked?.duration?.toString() * 1000,
                  stakedTokenAddress: CdlStaked?.stakedTokenAddress?.toString(),
                }
              : null,

          USDTStaked: USDTStaked?.stakedTokens > 0
              ? {
                  stakedTokens: ethers.utils.formatEther(USDTStaked?.stakedTokens?.toString()),
                  startTime: USDTStaked?.startTime?.toString(),
                  duration: USDTStaked?.duration?.toString() * 1000,
                  stakedTokenAddress: USDTStaked?.stakedTokenAddress?.toString(),
                }
              : null,

          USDCStaked: USDCStaked?.stakedTokens > 0
              ? {
                  stakedTokens: ethers.utils.formatEther(USDCStaked?.stakedTokens?.toString()),
                  startTime: USDCStaked?.startTime?.toString(),
                  duration: USDCStaked?.duration?.toString() * 1000,
                  stakedTokenAddress: USDCStaked?.stakedTokenAddress?.toString(),
                }
              : null,

          TotalEarnedReward: (CdlCdl + CdlUSDC + CdlUSDT + CdlWETH + CdlWBNB + CdlWBTC),
        }));
      } catch (error) {
        console.error("Error fetching staked info:", error);
      }
    } else {
      console.warn("User is not connected.");
    }
  };

  const getClaimedRewardsByUser = async () => {
    if (isConnected) {
      const provider = new ethers.providers.Web3Provider(walletProvider);
      const signer = provider.getSigner();

      const stakingContract = new ethers.Contract(
        CdlStakingContractAddress.address,
        CdlStakingContractAbi.abi,
        signer
      );

      try {
        // Call the function to get claimed rewards for the user
        const claimedRewards = await stakingContract.claimedRewards(address);

        setStakingContractData((prevState) => ({
          ...prevState,
          claimedRewards: ethers.utils.formatEther(claimedRewards.toString()),
        }));
      } catch (error) {
        console.error("Error fetching claimed rewards:", error);
      }
    } else {
      console.warn("User is not connected.");
    }
  };

  const StakeTokensSend = async (amount, duration, token) => {
    setloader(true);
    if (!isConnected) {
      return toast.error("Please Connect Your Wallet."), setloader(false);
    }
    try {
      if (amount <= 0)
        return setloader(false), toast.error("Please enter amount");
console.log("1");
const provider = new ethers.providers.Web3Provider(walletProvider);
const signer = provider.getSigner();
      const stakingContract = new ethers.Contract(
        CdlStakingContractAddress.address,
        CdlStakingContractAbi.abi,
        signer
      );
      console.log("2");
      
      console.log(amount, duration, token,"amount, duration, token");
      
      const CdlContracts = new ethers.Contract(
        token === "USDT"
        ? USDTTokenAddress.address
        : token === "USDC"
        ? USDCTokenAddress.address
        : token === "BTC"
        ? WBTCTokenAddress.address
        : token === "ETH"
        ? WETHTokenAddress.address
        : token === "BNB"
        ? WBNBTokenAddress.address
        : CdlCoinAddress.address,
        CdlCoin.abi,
        signer
      );
      console.log("3");
      
      const tokens = ethers.utils.parseEther(amount?.toString());
      let balance = await CdlContracts.balanceOf(address?.toString());
      let allow = await CdlContracts.allowance(
        address?.toString(),
        CdlStakingContractAddress?.address
      );

      console.log("4");
      
    //   if (+tokens?.toString() > +balance?.toString())
    //     return (
    //   setloader(false),
    //   toast.error(
    //     `Your available balance is ${Number(
    //       ethers.utils.formatEther(balance?.toString())
    //     )?.toFixed(5)} Cdl`
    //   )
    // );

    console.log("5");
    
    if (+allow?.toString() < +tokens?.toString()) {
      let approve = await CdlContracts.approve(
        CdlStakingContractAddress.address,
        tokens?.toString()
      );
      
      await approve.wait();
    }
    console.log("6");
    
    //TODO:: update this code
    // const currentTimestamp = Math.floor(Date.now() / 1000);
      // const ninetyDaysInSeconds = duration * 24 * 60 * 60; // 90 days in seconds
      // let days = currentTimestamp + ninetyDaysInSeconds;
      
      const currentTimestamp = Math.floor(Date.now() / 1000);
      const ninetyDaysInSeconds = duration * 60; // 90 days in seconds
      let days = currentTimestamp + ninetyDaysInSeconds;
      
      let tokenAddress =
      token === "USDT"
      ? USDTTokenAddress.address
      : token === "USDC"
      ? USDCTokenAddress.address
      : token === "BTC"
      ? WBTCTokenAddress.address
      : token === "ETH"
      ? WETHTokenAddress.address
      : token === "BNB"
      ? WBNBTokenAddress.address
      : CdlCoinAddress.address;
      console.log("7");
      
      let respon = await stakingContract.stakeTokens(
        tokens?.toString(),
        days,
        tokenAddress
      );
      await respon.wait();

      toast.success("successfuly Staked");
      getStakedInfoByUser();
      setloader(false);
    } catch (error) {
      console.log(error,"errorerror");
      setloader(false);
      toast.error(`${JSON.stringify(error.reason)}`);
      return false;
    }
  };

  const unstakeTokensRequest = async (token) => {
    setloader(true);
    if (!isConnected) {
      return toast.error("Please Connect Your Wallet."), setloader(false);
    }
    try {
      // if (+stakingContractData?.rewardEarned <= 0)
      //   return setloader(false), toast.error("Please wait for End Time");
      const provider = new ethers.providers.Web3Provider(walletProvider);
      const signer = provider.getSigner();

      const stakingContract = new ethers.Contract(
        CdlStakingContractAddress.address,
        CdlStakingContractAbi.abi,
        signer
      );

      let tokenAddress =
        token === "USDT"
          ? USDTTokenAddress.address
          : token === "USDC"
            ? USDCTokenAddress.address
            : token === "BTC"
              ? WBTCTokenAddress.address
              : token === "ETH"
                ? WETHTokenAddress.address
                : token === "BNB"
                  ? WBNBTokenAddress.address
                  : CdlCoinAddress.address;

      const response = await stakingContract.unstakeTokensRequest(tokenAddress);
      await response.wait();

      // await GetValues();
      // setWithdrawRequests([]);
      // setWithdrawInvestedTokensRequests([]);
      // await GetWithdrawRequests();
      toast.success("successfuly Requested");
      setloader(false);
    } catch (error) {
      setloader(false);
      toast.error(`${JSON.stringify(error.reason)}`);
    }
  };

  ////////////////////////////////////////  MASTER CONTRACT PROPOSAL ///////////////////////////////

  const submitProposal = async (data) => {
    setloader(true);
    if (!isConnected) {
      return toast.error("Please Connect Your Wallet."), setloader(false);
    }
    try {
      const provider = new ethers.providers.Web3Provider(walletProvider);
      const signer = provider.getSigner();
      const masterContract = new ethers.Contract(
        CdlMasterContractAddress.address,
        CdlMasterContract.abi,
        signer
      );
      const response = await masterContract.submitProposal(data);
      await response.wait();
      // setWithdrawRequests([]);
      // setWithdrawInvestedTokensRequests([]);
      // await GetWithdrawRequests();
      toast.success("successfuly Submited");
      GetAllProposalByArray();
      setloader(false);
    } catch (error) {
      setloader(false);
      toast.error(`${JSON.stringify(error.reason)}`);
    }
  };

  const GetAllProposalByArray = async () => {
    try {
      let RewardAmount = [];
      const proposalCount = await getProviderMasterContract().proposalCount();

      for (let i = 1; i <= proposalCount?.toString(); i++) {
        let reward = await getProviderMasterContract().proposals(i);

        const decryptData = (ciphertext) => {
          try {
            let keys = process.env.NEXT_PUBLIC_ENCRYPT_SECRET_KEYS;
            const bytes = CryptoJS.AES.decrypt(ciphertext, keys);
            const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
            return decryptedData;
          } catch (error) {
            console.error("Error decrypting data:", error);
            return null;
          }
        };

        let title = decryptData(reward?.description?.toString());

        const Data = {
          proposer: reward.proposer?.toString(),
          description: title,
          startTime: reward.startTime?.toString(),
          endTime: reward.endTime?.toString(),
          votes: reward.votes?.toString(),
          yesVotes: reward.yesVotes?.toString(),
          noVotes: reward.noVotes?.toString(),
          executed: reward.executed?.toString(),
          proposerId: i,
        };
        RewardAmount.push(Data);
      }
      setMasterContractProposalData(RewardAmount);
      // setloader(false);
    } catch (error) {
      setloader(false);
    }
  };

  const addingVote = async (votingId, status) => {
    if (!isConnected) {
      return toast.error("Please Connect Your Wallet."), setloader(false);
    }

    try {
      setloader(true);
      const provider = new ethers.providers.Web3Provider(walletProvider);
      const signer = provider.getSigner();
      let masterContract = new ethers.Contract(
        CdlMasterContractAddress.address,
        CdlMasterContract.abi,
        signer
      );

      if (status === 0) {
        const totalProposalLists = await masterContract.vote(votingId, false);
        totalProposalLists.wait();
        setloader(false);
      } else {
        const totalProposalLists = await masterContract.vote(votingId, true);
        totalProposalLists.wait();
        setloader(false);
      }
      GetAllProposalByArray();
      setloader(false);
    } catch (error) {
      setloader(false);
      toast.error(`${JSON.stringify(error.reason)}`);
    }
  };

  // ////////////////////////////////////////  Bridge CONTRACT Functions ///////////////////////////////
  // ////////////////////////////////////////  Bridge CONTRACT Functions ///////////////////////////////
  // ////////////////////////////////////////  Bridge CONTRACT Functions ///////////////////////////////
  // ////////////////////////////////////////  Bridge CONTRACT Functions ///////////////////////////////

  const LockDeposit = async (amount, from, to) => {
    try {
      if (from === "Binance" && to == "Ethereum") {
        if (chainId != 97) {
          return toast.error("Please change Network to BNB Smart Chain");
        }
        const provider = new ethers.providers.Web3Provider(walletProvider);
        const signer = provider.getSigner();

        const CdlBNBMainBridge = new ethers.Contract(
          CdlMainBridgeBaseAddress.address,
          CdlMainBridgeBaseAbi.abi,
          signer
        );
        const CdlToken = new ethers.Contract(
          CdlCoinAddress.address,
          CdlCoin.abi,
          signer
        );
        let burnAmount = ethers.utils.parseEther(amount?.toString());
        let tokensApproved = await CdlToken.allowance(
          address,
          CdlMainBridgeBaseAddress.address
        );
        if (tokensApproved < burnAmount) {
          let tokens = ethers.utils.parseEther("3000000000000000");
          let tx = await CdlToken.approve(
            CdlMainBridgeBaseAddress.address,
            tokens
          );
          await tx.wait();
        }
        let tx = await CdlBNBMainBridge.depositTokenFor(
          address,
          address,
          burnAmount,
          1
        ); //TODO change wanted chain
        await tx.wait();
      }

      // else if (from === "Ethereum" && to == "Binance") {
      //     if (chainId != 11155111) {
      //       //TODO::
      //       return toast.error("Please change Network to Sepolia Smart Chain");
      //     }
      //     const provider = new ethers.providers.Web3Provider(walletProvider);
      //     const signer = provider.getSigner();

      //     const CdlETHMainBridge = new ethers.Contract(
      //       CdlMainBridgeBaseAddress.address,
      //       CdlMainBridgeBaseAbi.abi,
      //       signer
      //     );
      //     const CdlToken = new ethers.Contract(
      //       CdlCoinAddress.address,
      //       CdlCoin.abi,
      //       signer
      //     );
      //     let burnAmount = ethers.utils.parseEther(amount?.toString());
      //     let tokensApproved = await CdlToken.allowance(
      //       address,
      //       CdlMainBridgeBaseAddress.address
      //     );
      //     if (tokensApproved < burnAmount) {
      //       let tokens = ethers.utils.parseEther("3000000000000000");
      //       let tx = await CdlToken.approve(
      //         CdlMainBridgeBaseAddress.address,
      //         tokens
      //       );
      //       await tx.wait();
      //     }
      //     let tx = await CdlETHMainBridge.depositTokenFor(
      //       address,
      //       address,
      //       burnAmount,
      //       to
      //     ); //TODO change wanted chain
      //     await tx.wait();
      //   }

      // else if (from === 56 && to == 1000) {
      //   if (chainId != from) {
      //     //Tron
      //     return toast.error("Please change Network to BNB Smart Chain");
      //   } else if (!tronWalletForBridge) {
      //     return toast.error("Please input Tron wallet Address");
      //   }
      //   const provider = new ethers.providers.Web3Provider(walletProvider);
      //   const signer = provider.getSigner();

      //   const CdlBNBMainBridge = new ethers.Contract(
      //     CdlMainBridgeBaseAddress.address,
      //     CdlBNBBridge.abi,
      //     signer
      //   );
      //   const CdlToken = new ethers.Contract(
      //     CdlCoinAddress.address,
      //     CdlCoin.abi,
      //     signer
      //   );

      //   let burnAmount = ethers.utils.parseEther(amount?.toString());

      //   let tokensApproved = await CdlToken.allowance(
      //     address,
      //     CdlMainBridgeBaseAddress.address
      //   );
      //   if (tokensApproved < burnAmount) {
      //     let tokens = ethers.utils.parseEther("3000000000000000");
      //     let tx = await CdlToken.approve(
      //       CdlMainBridgeBaseAddress.address,
      //       tokens
      //     );
      //     await tx.wait();
      //   }

      //   let tx = await CdlBNBMainBridge.lockDeposit(burnAmount, to); //TODO change wanted chain
      //   await tx.wait();

      //   let apiData = {
      //     from: address,
      //     to: tronWalletForBridge,
      //     amount: burnAmount?.toString(),
      //     date: new Date(),
      //     chainId: to,
      //   };
      //   await apis.swapTokenForTronBridge(apiData);
      //   //await apis.lockForTronUpdate(apiData);
      // }
    } catch (error) {
      console.log(error, "error");
    }
  };

  const unLockDeposit = async (amount, from, to) => {
    try {
      // if (from === 80002 && to == 11155111) {
      if (from === "Ethereum" && to === "Binance") {
        if (chainId != 11155111) {
          //ETHEREUM
          return toast.error("Please Change Network to Ethereum Chain");
        }
        const provider = new ethers.providers.Web3Provider(walletProvider);
        const signer = provider.getSigner();

        const wrappedETHBridge = new ethers.Contract(
          WrappedBridgeETHCdlAddress.address,
          WrappedBridgeETHCdlAbi.abi,
          signer
        );
        const wrappedETHToken = new ethers.Contract(
          WrappedTokenETHCdlAddress.address,
          WrappedTokenETHCdlAbi.abi,
          signer
        );

        let tokens = ethers.utils.parseEther("300000000000000");
        let tokensApproved = await wrappedETHToken.allowance(
          address,
          WrappedBridgeETHCdlAddress.address
        );

        if (tokensApproved < tokens) {
          let tx = await wrappedETHToken.approve(
            WrappedBridgeETHCdlAddress.address,
            tokens
          );
          await tx.wait();
        }
        let burnAmount = ethers.utils.parseEther(amount?.toString());
        let tx = await wrappedETHBridge.burn(address, address, burnAmount, 97); //TODO change wanted chain
        await tx.wait();
      }
      // else if (from === "Ethereum" && to === "Binance") {
      //   if (chainId != from) {
      //     //ETHEREUM
      //     return toast.error("Please change network to Polygon chain");
      //   }
      //   const provider = new ethers.providers.Web3Provider(walletProvider);
      //   const signer = provider.getSigner();

      //   const wrappedPolyBridge = new ethers.Contract(
      //     WrappedPolygonBridgeAddress.address,
      //     WrappedETHBridge.abi,
      //     signer
      //   );
      //   const wrappedToken = new ethers.Contract(
      //     WrappedPolygonTokenAddress.address,
      //     WrappedETHToken.abi,
      //     signer
      //   );

      //   let tokens = ethers.utils.parseEther("300000000000000");
      //   let tokensApproved = await wrappedToken.allowance(
      //     address,
      //     WrappedPolygonBridgeAddress.address
      //   );

      //   if (tokensApproved < tokens) {
      //     let tx = await wrappedToken.approve(
      //       WrappedPolygonBridgeAddress.address,
      //       tokens
      //     );
      //     await tx.wait();
      //   }
      //   let burnAmount = ethers.utils.parseEther(amount?.toString());
      //   let tx = await wrappedPolyBridge.burn(address, burnAmount, to); //TODO change wanted chain
      //   await tx.wait();
      // }
      // else if (from === 1000 && to == 56) {
      //   if (!tronConnected) {
      //     //Tron TODO:
      //     return toast.error("Please Connect Tron wallet");
      //   } else if (!tronWalletForBridge) {
      //     return toast.error("Please Insert BNB wallet");
      //   }
      //   // let resultToken = await TronWrappedCdlContract.approve("TQHVAmS6CoDuDfM74kGyAuHM1zuGDzQri9",tokens?.toString()).send({
      //   //   feeLimit:100_000_000,
      //   //   callValue:0,
      //   //   shouldPollResponse:true
      //   // });
      //   // // await result.wait();

      //   // let result = await TronWrappedBridgeContract.burn("TUQvyTGrZkqgVQrWP8gwJH1tce8cfp8yuX",tokens?.toString(),1,1000).send({
      //   //     feeLimit:100_000_000,
      //   //     callValue:0,
      //   //     shouldPollResponse:true
      //   //   });


      //   let TronWrappedCdlContract = await window.tronWeb
      //     .contract()
      //     .at(WrappedTronTokenAddress.address);

      //   let tokens = ethers.utils.parseEther("300000000000000");
      //   let tokensApproved = await TronWrappedCdlContract.allowance(
      //     tronCurrentAccount,
      //     WrappedTronBridgeAddress.address
      //   );

      //   if (tokensApproved < tokens) {
      //     await TronWrappedCdlContract.approve(
      //       WrappedTronBridgeAddress.address,
      //       tokens
      //     ).send({
      //       feeLimit: 100_000_000,
      //       callValue: 0,
      //       shouldPollResponse: true,
      //     });
      //   }

      //   let burnAmount = ethers.utils.parseEther(amount?.toString());
      //   let TronWrappedBridgeContract = await window.tronWeb
      //     .contract()
      //     .at(WrappedTronBridgeAddress.address);

      //   await TronWrappedBridgeContract.burn(
      //     tronWalletForBridge,
      //     burnAmount,
      //     to
      //   ).send({
      //     feeLimit: 100_000_000,
      //     callValue: 0,
      //     shouldPollResponse: true,
      //   });
      // }
    } catch (error) {
      console.log(error, "error");
    }
  };

  useEffect(() => {
    getCdlBalance();
  }, [address]);

  return (
    <>
      <Store.Provider
        value={{
          coin,
          loader,
          setloader,
          getClaimedRewardsByUser,
          GetAllProposalByArray,
          stakingContractData,
          tronCurrentAccount,
          setTronCurrentAccount,
          tronWalletForBridge,
          setTronWalletForBridge,
          unstakeTokensRequest,
          StakeTokensSend,
          getStakedInfoByUser,
          masterContractData,
          getStakingContractData,
          submitProposal,
          proposal,
          masterContractProposalData,
          addingVote,
          withdrawInvestedTokensRequests,
          tronConnected,
          setTronConnected,
          LockDeposit,
          unLockDeposit,
        }}
      >
        {loader ? <Loader /> : children}
      </Store.Provider>
    </>
  );
};
