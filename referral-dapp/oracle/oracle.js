require("dotenv").config();
const express = require("express");
const {abi} = require("./abi.js");
const ethers = require("ethers")
const{JsonRpcProvider, Wallet, Contract, isAddress} = require("ethers");

const app = express();
app.use(express.json());

const INFURA_URL = process.env.INFURA_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

const provider = new JsonRpcProvider(INFURA_URL);
const wallet = new Wallet(PRIVATE_KEY, provider);
const contract = new Contract(CONTRACT_ADDRESS, abi, wallet);

app.post("/award", async (req, res) => {
  const { userAddress } = req.body;
  

  try {
    const tx = await contract.awardBonus(userAddress);
    await tx.wait();
    res.send(`Бонус отправлен: ${tx.hash}`);
  } catch (err) {
    console.error("Ошибка:", err);
    res.status(500).send("Ошибка при отправке бонуса");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Оракул слушает на порту ${PORT}`));
