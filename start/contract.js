/*global ethereum, MetamaskOnboarding */

/*
The `piggybankContract` is compiled from:

  pragma solidity ^0.4.0;
  contract PiggyBank {

      uint private balance;
      address public owner;

      function PiggyBank() public {
          owner = msg.sender;
          balance = 0;
      }

      function deposit() public payable returns (uint) {
          balance += msg.value;
          return balance;
      }

      function withdraw(uint withdrawAmount) public returns (uint remainingBal) {
          require(msg.sender == owner);
          balance -= withdrawAmount;

          msg.sender.transfer(withdrawAmount);

          return balance;
      }
  }
*/

const forwarderOrigin = 'http://localhost:9010'

const initialize = () => {
  //You will start here 
  const initialize = () => {
    //Basic Actions Section
    const onboardButton = document.getElementById('connectButton');
  
    //Created check function to see if the MetaMask extension is installed
    const isMetaMaskInstalled = () => {
      //Have to check the ethereum binding on the window object to see if it's installed
      const { ethereum } = window;
      return Boolean(ethereum && ethereum.isMetaMask);
    };
    //------Inserted Code------\\

    //We create a new MetaMask onboarding object to use in our app
const onboarding = new MetaMaskOnboarding({ forwarderOrigin });

//This will start the onboarding proccess
const onClickInstall = () => {
  onboardButton.innerText = 'Onboarding in progress';
  onboardButton.disabled = true;
  //On this object we have startOnboarding which will start the onboarding process for our end user
  onboarding.startOnboarding();
};
const onClickConnect = async () => {
  try {
    // Will open the MetaMask UI
    // You should disable this button while the request is pending!
    await ethereum.request({ method: 'eth_requestAccounts' });
  } catch (error) {
    console.error(error);
  }
};
  const MetaMaskClientCheck = () => {
    //Now we check to see if MetaMask is installed
    if (!isMetaMaskInstalled()) {
    //If it isn't installed we ask the user to click to install it
    onboardButton.innerText = 'Click here to install MetaMask!';
    //When the button is clicked we call th is function
    onboardButton.onclick = onClickInstall;
    //The button is now disabled
    onboardButton.disabled = false;
    } else {
    //If MetaMask is installed we ask the user to connect to their wallet
    onboardButton.innerText = 'Connect';
    //When the button is clicked we call this function to connect the users MetaMask Wallet
    onboardButton.onclick = onClickConnect;
    //The button is now disabled
    onboardButton.disabled = false;
    }
  };
  MetaMaskClientCheck();
  //Eth_Accounts-getAccountsButton
getAccountsButton.addEventListener('click', async () => {
  //we use eth_accounts because it returns a list of addresses owned by us.
  const accounts = await ethereum.request({ method: 'eth_accounts' });
  //We take the first address in the array of addresses and display it
  getAccountsResult.innerHTML = accounts[0] || 'Not able to get accounts';
});
  //------/Inserted Code------\\
  };
}
window.addEventListener('DOMContentLoaded', initialize)
