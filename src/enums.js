export const UserType = {
  HIRER: 'Hirer',
  MUSICIAN: 'Musician',
  BAND: 'Band',
  ADMIN: 'Admin',
};

export const Gender = {
  MALE: 'Male',
  FEMALE: 'Female',
  OTHER: 'Other',
};

export const EventStatus = {
  CREATED: 'Created',
  HAVE_APPLICANT: 'HaveApplicant',
  CANCELLED: 'Cancelled',
  CONTRACT_DRAFTING: 'ContractDrafting',
  PAYMENT_PENDING: 'PaymentPending',
  SETTLE: 'Settle',
  COMPLETE: 'Complete',
};

export const ApplicationStatus = {
  IS_INVITED: 'isInvited',
  IS_APPLIED: 'isApplied',
  APPLICATION_REJECTED: 'applicationRejected',
  IS_ACCEPTED: 'isAccepted',
};

export const ContractStatus = {
  DRAFTING: 'Drafting',
  REVIEW_PENDING: 'Sent', // i want it to make more sense
  ACCEPTED: 'Accpeted',
  REJECTED: 'Rejected',
  CANCELLED: 'Cancelled',
  //OIL
  NOT_ACTIVE: 'NotActive',
  WAIT_FOR_START_DRAFTING: 'WaitForStartDrafting',
  //OIL
};
