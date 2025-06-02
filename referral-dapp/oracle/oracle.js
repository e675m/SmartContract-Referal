require("dotenv").config();
const express = require("express");
const {abi} = require("./abi.js");
const ethers = require("ethers");
const cors = require("cors");
const axios = require("axios");
const qs = require('querystring');
const{JsonRpcProvider, Wallet, Contract, isAddress} = require("ethers");

const app = express();
const corsOptions = {
  origin: "https://referraldapp.store",
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
};

app.use(express.json());

const INFURA_URL = process.env.INFURA_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

const provider = new JsonRpcProvider(INFURA_URL);
const wallet = new Wallet(PRIVATE_KEY, provider);
const contract = new Contract(CONTRACT_ADDRESS, abi, wallet);

async function verifyCaptcha(token) {
  const secret = process.env.RECAPTCHA_SECRET_KEY; 
  const url = "https://www.google.com/recaptcha/api/siteverify";

  const res = await axios.post(url, qs.stringify({
    secret: secret,
    response: token,
  }), {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  });

  return res.data.success;
}

app.post("/referral", async (req, res) => {
  const { captcha, userAddress } = req.body;
  
  if(!userAddress || !captcha) {
	return res.status(400).json({error: "missing data"});
  }
  
  const isHuman = await verifyCaptcha(captcha);
  if (!isHuman) {
	return res.status(400).json({error: "captcha verification failed"});
  }

  try {
    const tx = await contract.awardBonus(userAddress);
    await tx.wait();
     res.json({ message: `Bonus send: ${tx.hash}` });
  } catch (err) {
    console.error("РћС€РёР±РєР°:", err);
    res.status(500).json({ error: "Error" });
  }
});
 
console.log("Р“РѕС‚РѕРІ Рє Р·Р°РїСѓСЃРєСѓ СЃРµСЂРІРµСЂР°");

const PORT = 3000;
app.listen(PORT, () => console.log(`РћСЂР°РєСѓР» СЃР»СѓС€Р°РµС‚ РЅР° РїРѕСЂС‚Сѓ ${PORT}`));
