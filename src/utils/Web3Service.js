import Web3 from 'web3';

class Web3Service {
  static instance;

  constructor() {
    if (Web3Service.instance) return Web3Service.instance;

    const RPC_URI = process.env.REACT_APP_RPC_URI;
    try {
      Web3Service.instance = new Web3(Web3.givenProvider || RPC_URI);
      return Web3Service.instance;
    } catch (error) {
      throw error;
    }
  }
}

export default Web3Service;
