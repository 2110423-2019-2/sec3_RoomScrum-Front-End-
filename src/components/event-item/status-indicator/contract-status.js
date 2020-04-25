import { ContractStatus } from 'src/enums';

export const calculateContractStatus = (contractStatus) => {
  switch (contractStatus) {
    case ContractStatus.DRAFTING:
      return 'Drafting';
    case ContractStatus.REVIEW_PENDING:
      return 'In review';
    case ContractStatus.ACCEPTED:
      return 'Completed';
    case ContractStatus.REJECTED:
      return 'Rejected';
    case ContractStatus.CANCELLED:
      return 'Cancelled';
    case ContractStatus.WAIT_FOR_START_DRAFTING:
      return 'Wait for start drafting';
    case ContractStatus.NOT_ACTIVE:
      return 'Not active';
    default:
      return 'N/A';
  }
};

export const calculateContractColor = (contractStatus) => {
  switch (contractStatus) {
    case ContractStatus.DRAFTING:
      return 'grey';
    case ContractStatus.REVIEW_PENDING:
      return 'yellow';
    case ContractStatus.ACCEPTED:
      return 'green';
    case ContractStatus.REJECTED:
      return 'red';
    case ContractStatus.CANCELLED:
      return 'grey';
    case ContractStatus.WAIT_FOR_START_DRAFTING:
      return 'grey';
    case ContractStatus.NOT_ACTIVE:
      return 'grey';
    default:
      return 'grey';
  }
};
