const contractAddress = "0x55C890ae169Ba3F6a7509068cc93A088cf0B8CE3"; 

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
					<h5>Адрес оракула</h5>
					<input type="text" id="new-address-oracle" class="form-control mb-2" placeholder="Новый адрес оракула">
					<button class="btn btn-info mb-2" id="get-ref-btn">Редактировать адрес оракула</button>
				</div>
			`;
			document.getElementById("adminContainer").innerHTML = adminHTML;

			document.getElementById("get-ref-btn").addEventListener("click", async () => {
				const address = document.getElementById("new-address-oracle").value.trim();

				if (!ethers.utils.isAddress(address)) {
					alert("Не верный адрес")
					return;
				}

				try {
					await contract.setOracle(address);
				} catch (err) {
					alert(err.message);
				}
			});
		}

		const isRegistered = await contract.registered(account);
		
		if(!isRegistered){
			document.getElementById("registrationBlock").classList.remove("d-none");
		} else {
			document.getElementById("registrationBlock").classList.add("d-none");
			getMyBonus();
			showReferralLink();
			showEthPrice();
			getMyReferrals()
		}

	} else {
		alert("Metamask не найден");
	}
}

async function selfRegister() {
  try {
    const tx = await contract.registerSolo();
    await tx.wait();
    document.getElementById("registerStatus").innerText = "✅ Регистрация успешна";
	await connect();
  } catch (err) {
    document.getElementById("registerStatus").innerText = "❌ Ошибка: " + err.message;
  }
}

async function getMyBonus() {
  try {
    const bonus = await contract.balanceOf(account);
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
    const referrals = await contract.getReferralActions(account);
	if (referrals === 0) {
		list.innerHTML = `<div>У вас нет рефералов</div>`;
		return;
	}
	document.getElementById("referralList").innerText = referrals;
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
		document.getElementById("referrerBonus").innerText = reward.toFixed(2);
	} catch (err) {
		alert("Ошибка при получении курса ETH: " + err.message);
	}
}

function showReferralLink() {
  const link = `http://127.0.0.1:5500/test/index.html?ref=${account}`;
  document.getElementById("referralLink").value = link;
}

function copyReferralLink() {
  const input = document.getElementById("referralLink");
  input.select();
  input.setSelectionRange(0, 99999); // Для мобильных устройств
  navigator.clipboard.writeText(input.value)
    .then(() => alert("Ссылка скопирована"))
    .catch(() => alert("Не удалось скопировать"));
}
