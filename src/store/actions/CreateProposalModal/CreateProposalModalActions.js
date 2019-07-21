import {
  ON_PROPOSAL_CHANGE,
  ON_SEND_PROPOSAL_BEGIN,
  ON_SEND_PROPOSAL_SUCCESS,
  ON_SEND_PROPOSAL_FAILURE,
} from '../';
import Web3Service from '../../../utils/Web3Service';
import {
  ProcurementManagementABI,
  ProcurementManagementAddress,
} from '../../../assets/data/contracts';

const onProposalChange = proposal => ({
  type: ON_PROPOSAL_CHANGE,
  payload: { proposal },
});

const onSendProposalBegin = () => ({
  type: ON_SEND_PROPOSAL_BEGIN,
});

const onSendProposalSuccess = result => ({
  type: ON_SEND_PROPOSAL_SUCCESS,
  payload: { result },
});

const onSendProposalFailure = error => ({
  type: ON_SEND_PROPOSAL_FAILURE,
  payload: { error },
});

const sendProposal = (sellerAddress, poId, proposal) => {
  return async dispatch => {
    dispatch(onSendProposalBegin());

    try {
      const web3 = new Web3Service();
      const PMContract = new web3.eth.Contract(ProcurementManagementABI);
      PMContract.address = ProcurementManagementAddress;
      const tx = await PMContract.methods
        .createProposal(sellerAddress, poId, proposal)
        .send({ from: sellerAddress, gas: 3000000 });
      tx.gasUsed = web3.utils.hexToNumberString(tx.gasUsed);
      dispatch(onSendProposalSuccess(tx));
    } catch (error) {
      dispatch(onSendProposalFailure(error));
    }
  };
};

export { onProposalChange, sendProposal };
