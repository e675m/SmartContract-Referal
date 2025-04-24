const contractAddress = "0x1c91347f2A44538ce62453BEBd9Aa907C662b4bD"; // Замените на адрес вашего контракта
const contractABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "referrer",
				"type": "address"
			}
		],
		"name": "register",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "referrer",
				"type": "address"
			}
		],
		"name": "Registered",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "bonuses",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "getBonus",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getReferrers",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "referrers",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "registered",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

let provider;
let signer;
let contract;
let currentAccount;

async function init() {
	if (!window.ethereum) {
	  alert("Установите MetaMask!");
	  return;
	}
  
	try {
	  provider = new ethers.providers.Web3Provider(window.ethereum);
	  await provider.send("eth_requestAccounts", []);
	  signer = provider.getSigner();
	  currentAccount = await signer.getAddress();
  
	  // Проверяем сеть
	  const network = await provider.getNetwork();
	  if (network.chainId !== 11155111) { // ChainID Sepolia
		alert("Переключитесь на Sepolia в MetaMask!");
		return;
	  }
  
	  contract = new ethers.Contract(contractAddress, contractABI, signer);
	  console.log("Контракт инициализирован:", contract);
  
	  document.getElementById("account").innerText = `Аккаунт: ${currentAccount}`;
	  await showBonus();
	} catch (err) {
	  console.error("Ошибка инициализации:", err);
	  alert("Ошибка: " + err.message);
	}
  }

async function register() {
	try {
	  const referrer = document.getElementById("referrer").value.trim();
	  console.log("Пробуем зарегистрироваться с реферером:", referrer);
  
	  // Если поле реферера пустое, используем нулевой адрес
	  const referrerAddress = referrer || ethers.constants.AddressZero;
	  const tx = await contract.register(referrerAddress);
	  await tx.wait();
	  
	  console.log("Регистрация прошла, бонусы обновлены");
	  alert("Регистрация прошла!");
	  await showBonus();
	} catch (err) {
	  console.error("Ошибка регистрации:", err);
	  alert("Ошибка регистрации: " + err.message);
	}
  }
  
  

async function getReferrers() {
  try {
    const refs = await contract.getReferrers();
    document.getElementById("referrers").innerText = `Рефералы: ${refs.join(", ")}`;
  } catch (err) {
    console.error(err);
  }
}

async function showBonus() {
	try {
	  const bonus = await contract.getBonus(currentAccount);
	  console.log("Бонус получен:", bonus);
	  document.getElementById("bonusDisplay").innerText = `Ваш бонус: ${bonus}`;
	} catch (err) {
	  console.error("Ошибка получения бонуса:", err);
	  document.getElementById("bonusDisplay").innerText = "Ошибка при получении бонуса";
	}
  }
  

window.addEventListener("load", init);