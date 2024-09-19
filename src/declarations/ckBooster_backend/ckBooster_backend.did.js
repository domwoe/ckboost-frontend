export const idlFactory = ({ IDL }) => {
  const InitArg = IDL.Record({
    'ck_ledger_id' : IDL.Principal,
    'ck_index_id' : IDL.Principal,
    'service_fee_in_percent' : IDL.Opt(IDL.Nat64),
    'booster_fee_in_percent' : IDL.Opt(IDL.Nat64),
    'min_booster_balance' : IDL.Opt(IDL.Nat64),
  });
  const BoostRequestResult = IDL.Record({ 'timestamp' : IDL.Nat64 });
  const BoostRequestError = IDL.Variant({
    'InvalidAmount' : IDL.Null,
    'OpenBoostRequest' : IDL.Null,
    'InsufficientBalance' : IDL.Null,
    'RequestNotFound' : IDL.Null,
    'PrincipalMismatch' : IDL.Null,
    'InternalError' : IDL.Null,
  });
  const Result = IDL.Variant({
    'Ok' : BoostRequestResult,
    'Err' : BoostRequestError,
  });
  const BoostRequestStatus = IDL.Variant({
    'SettlmentPending' : IDL.Null,
    'Open' : IDL.Null,
    'Boosted' : IDL.Principal,
    'BoostPending' : IDL.Null,
    'Settled' : IDL.Null,
  });
  const FetchBoostRequestArgs = IDL.Record({
    'status' : IDL.Opt(BoostRequestStatus),
    'amount_from' : IDL.Opt(IDL.Nat64),
    'amount_to' : IDL.Opt(IDL.Nat64),
    'timestamp_from' : IDL.Opt(IDL.Nat64),
  });
  const Account = IDL.Record({
    'owner' : IDL.Principal,
    'subaccount' : IDL.Opt(IDL.Vec(IDL.Nat8)),
  });
  const BoostRequest = IDL.Record({
    'fee' : IDL.Opt(IDL.Nat64),
    'status' : BoostRequestStatus,
    'tx_id' : IDL.Text,
    'account' : IDL.Opt(Account),
    'timestamp' : IDL.Opt(IDL.Nat64),
    'amount' : IDL.Nat64,
  });
  const Result_1 = IDL.Variant({
    'Ok' : IDL.Vec(BoostRequest),
    'Err' : BoostRequestError,
  });
  const BoostRequestArg = IDL.Record({
    'fee' : IDL.Opt(IDL.Nat64),
    'tx_id' : IDL.Text,
    'account' : IDL.Opt(Account),
    'amount' : IDL.Nat64,
  });
  return IDL.Service({
    'boost_request' : IDL.Func([IDL.Principal], [Result], []),
    'fetch_boost_requests' : IDL.Func(
        [FetchBoostRequestArgs],
        [Result_1],
        ['query'],
      ),
    'register_boost_request' : IDL.Func([BoostRequestArg], [Result], []),
  });
};
export const init = ({ IDL }) => {
  const InitArg = IDL.Record({
    'ck_ledger_id' : IDL.Principal,
    'ck_index_id' : IDL.Principal,
    'service_fee_in_percent' : IDL.Opt(IDL.Nat64),
    'booster_fee_in_percent' : IDL.Opt(IDL.Nat64),
    'min_booster_balance' : IDL.Opt(IDL.Nat64),
  });
  return [InitArg];
};
