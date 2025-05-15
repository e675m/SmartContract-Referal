const contractAddress = "0x7EE59366FF544A4f87d954b57Cd22fF1c2b4EBFE"; 
const contractABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "allowance",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "needed",
				"type": "uint256"
			}
		],
		"name": "ERC20InsufficientAllowance",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "balance",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "needed",
				"type": "uint256"
			}
		],
		"name": "ERC20InsufficientBalance",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "approver",
				"type": "address"
			}
		],
		"name": "ERC20InvalidApprover",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "receiver",
				"type": "address"
			}
		],
		"name": "ERC20InvalidReceiver",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			}
		],
		"name": "ERC20InvalidSender",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "ERC20InvalidSpender",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "OwnableInvalidOwner",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "OwnableUnauthorizedAccount",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
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
				"indexed": true,
				"internalType": "address",
				"name": "referrer",
				"type": "address"
			}
		],
		"name": "Registered",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
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
				"internalType": "uint256",
				"name": "newBonus",
				"type": "uint256"
			}
		],
		"name": "UpdateBonus",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "allowance",
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
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "balanceOf",
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
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
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
		"name": "getLastPrice",
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
		"name": "getMyBonus",
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
		"name": "getRef",
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
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
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
		"inputs": [],
		"name": "registerSolo",
		"outputs": [],
		"stateMutability": "nonpayable",
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
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
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
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];

let provider, signer, contract, account;

async function connect() {
	if (window.ethereum) {
		window.ethereum.on("accountsChanged", () => {
			location.reload(true);
		});
		await window.ethereum.request({ method: "eth_requestAccounts" });
		provider = new ethers.providers.Web3Provider(window.ethereum);
		signer = provider.getSigner();
		account = await signer.getAddress();
		document.getElementById("userAddress").innerText = account;

		contract = new ethers.Contract(contractAddress, contractABI, signer);

		const ownerAddress = await contract.owner();
		
		if(account.toLowerCase() === ownerAddress.toLowerCase()) {
			const adminHTML = `
				<div id="adminPanel" class="card p-3 mb-4">
					<h4>Админ-панель</h4>

					<hr>
					<h5>Получить рефералов пользователя</h5>
					<input type="text" id="target-user-address" class="form-control mb-2" placeholder="Адрес пользователя">
					<button class="btn btn-info mb-2" id="get-ref-btn">Показать рефералов</button>
					<div id="user-referrals-result"></div>

					<hr>
					<h5>Получить бонусы пользователя</h5>
					<input type="text" id="bonus-user-address" class="form-control mb-2" placeholder="Адрес пользователя">
					<button class="btn btn-success mb-2" id="get-bonus-btn">Показать бонус</button>
					<div id="user-bonus-result"></div>
				</div>
			`;
			document.getElementById("adminContainer").innerHTML = adminHTML;

			document.getElementById("get-ref-btn").addEventListener("click", async () => {
				const address = document.getElementById("target-user-address").value.trim();
				const resultDiv = document.getElementById("user-referrals-result");
				resultDiv.innerHTML = "";

				if (!ethers.utils.isAddress(address)) {
					resultDiv.innerHTML = `<div class="text-danger">Неверный адрес</div>`;
					return;
				}

				try {
					const referrals = await contract.getRef(address);

					if (referrals.length === 0) {
						resultDiv.innerHTML = `<div>У пользователя нет рефералов</div>`
					} else {
						const ul = document.createElement("ul");
						referrals.forEach(ref => {
							const li = document.createElement("li");
							li.textContent = ref;
							ul.appendChild(li);
						});
						resultDiv.appendChild(ul)
					}
				} catch (err) {
					resultDiv.innerHTML = `<div class="text-danger">Ошибка: ${err.message}</div>`
				}
			});

			document.getElementById("get-bonus-btn").addEventListener("click", async () => {
				const address = document.getElementById("bonus-user-address").value.trim();	
				const resultDiv = document.getElementById("user-bonus-result");
				resultDiv.innerHTML = "";
				
				if(!ethers.utils.isAddress(address)) {
					resultDiv.innerHTML = `<div class="text-danger">Неверный адрес ${address}</div>`;
					return;
				}

				try {
					const bonus = await contract.getBonus(address);
					resultDiv.innerHTML = `<div>Бонусы: ${formatTokens(bonus.toString())} RFT</div>`;
				} catch (err) {
					resultDiv.innerHTML = `<div class="text-danger">Ошибка: ${err.message}</div>`;
				}
			});
		}

		const isRegistered = await contract.registered(account);
		
		if(!isRegistered){
			document.getElementById("registrationBlock").classList.remove("d-none");
		} else {
			document.getElementById("registrationBlock").classList.add("d-none");
			getMyBonus();
			getMyReferrals();
			showEthPrice();
		}

	} else {
		alert("Metamask не найден");
	}
}

async function register() {
  const referrer = document.getElementById("referrerInput").value;
  try {
    const tx = await contract.register(referrer);
    await tx.wait();
    document.getElementById("registerStatus").innerText = "✅ Регистрация успешна";
	await connect();
  } catch (err) {
    document.getElementById("registerStatus").innerText = "❌ Ошибка: " + err.message;
  }
}

async function selfRegister() {
  try {
    const tx = await contract.registerSolo();
    await tx.wait();
    document.getElementById("registerStatus").innerText = "✅ Регистрация без реферала успешна";
	await connect();
  } catch (err) {
    document.getElementById("registerStatus").innerText = "❌ Ошибка: " + err.message;
  }
}

async function getMyBonus() {
  try {
    const bonus = await contract.getMyBonus();
    document.getElementById("bonusAmount").innerText = formatTokens(bonus.toString()) + " RFT";
  } catch (error) {
	const message = error?.data?.message || error?.message || "";
	if (message.includes("User is not registered")) {
		alert("Требуется регистрация");
	} else {
    	alert("Ошибка при получении бонуса: " + message);
	}
  }
}

async function getMyReferrals() {
  try {
    const referrals = await contract.getReferrers();
    const list = document.getElementById("referralList");
    list.innerHTML = "";
	if (referrals.length === 0) {
		list.innerHTML = `<div>У вас нет рефералов</div>`;
		return;
	}
    referrals.forEach(addr => {
      const li = document.createElement("li");
      li.textContent = addr;
      list.appendChild(li);
    });
  } catch (err) {
    alert("Ошибка при получении рефералов: " + err.message);
  }
}

function formatTokens(value, decimals = 18) {
	return ethers.utils.formatUnits(value, decimals);
}

async function showEthPrice() {
	try {
		const price = await contract.getLastPrice();
		const ethUsd = Number(price.toString()) / 10 ** 8;
		document.getElementById("ethPrice").innerText = ethUsd.toFixed(2);

		const reward = ethUsd / 10;
		document.getElementById("referrerBonus").innerText = (reward * 0.7).toFixed(2);
		document.getElementById("referralBonus").innerText = (reward * 0.3).toFixed(2);
	} catch (err) {
		alert("Ошибка при получении курса ETH: " + err.message);
	}
}
