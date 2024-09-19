import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Account {
  'owner' : Principal,
  'subaccount' : [] | [Uint8Array | number[]],
}
export interface BoostRequest {
  'fee' : [] | [bigint],
  'status' : BoostRequestStatus,
  'tx_id' : string,
  'account' : [] | [Account],
  'timestamp' : [] | [bigint],
  'amount' : bigint,
}
export interface BoostRequestArg {
  'fee' : [] | [bigint],
  'tx_id' : string,
  'account' : [] | [Account],
  'amount' : bigint,
}
export type BoostRequestError = { 'InvalidAmount' : null } |
  { 'OpenBoostRequest' : null } |
  { 'InsufficientBalance' : null } |
  { 'RequestNotFound' : null } |
  { 'PrincipalMismatch' : null } |
  { 'InternalError' : null };
export interface BoostRequestResult { 'timestamp' : bigint }
export type BoostRequestStatus = { 'SettlmentPending' : null } |
  { 'Open' : null } |
  { 'Boosted' : Principal } |
  { 'BoostPending' : null } |
  { 'Settled' : null };
export interface FetchBoostRequestArgs {
  'status' : [] | [BoostRequestStatus],
  'amount_from' : [] | [bigint],
  'amount_to' : [] | [bigint],
  'timestamp_from' : [] | [bigint],
}
export interface InitArg {
  'ck_ledger_id' : Principal,
  'ck_index_id' : Principal,
  'service_fee_in_percent' : [] | [bigint],
  'booster_fee_in_percent' : [] | [bigint],
  'min_booster_balance' : [] | [bigint],
}
export type Result = { 'Ok' : BoostRequestResult } |
  { 'Err' : BoostRequestError };
export type Result_1 = { 'Ok' : Array<BoostRequest> } |
  { 'Err' : BoostRequestError };
export interface _SERVICE {
  'boost_request' : ActorMethod<[Principal], Result>,
  'fetch_boost_requests' : ActorMethod<[FetchBoostRequestArgs], Result_1>,
  'register_boost_request' : ActorMethod<[BoostRequestArg], Result>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
