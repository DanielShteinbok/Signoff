# Signoff

## The Problem:
Imagine an employer is employing people, like traders, that need to frequently interact with dApps.
The simplest way for the employee to interact with those dApps is with a wallet like Metamask, but what if the employee quits or gets fired? 
How will the employer be able to revoke access at that point? Furthermore, what if the employer wants to automatically allow only some kinds of transactions, or interactions with only some smart contracts?

## The Solution:
The simplest solution is for the employees to never actually have acess to a private key directly. Instead, transactions they generate are sent to a server, in the control of the employer, where the transactions are signed and returned. Ideally, the process works for the employee almost exactly like the use of metamask with any web3 app does typically. Here's an idea of the possible flow:

1. Employee interacts with the dapp as they typically would. A transaction is generated and sent to WalletConnect (or possibly Metamask, depending on what it supports).
2. WalletConnect (or Metamask) sends the transaction to a program on the user's computer that acts like a hardware wallet
3. This faux-hardware wallet sends the transaction over to the employer's server along with some information authenticating the employee (e.g. a signature by the employee's personal private key, or a proof of identity of some sort)
4. The employer's server signs the transaction and returns the signature to the faux-hardware wallet on the employee's machine
5. The faux-hardware wallet sends this signature to WalletConnect or Metamask, from where the transaction is published as it normally would be.

The idea behind this flow is to absolutely minimize the changes to the employee's workflow: for them, this is exactly like using a hardware wallet with Metamask or WalletConnect and all dapps work as they normally would. However the employer has several opportunities:
* The employer can instantly shut off the employee's access to the account at any time;
* The employer can restrict the employee to certain kinds of transactions, interactions with specific contracts, only during specific hours of the day, etc.
* Many employees can share access to funds while maintaining traceability of who made what transaction

## What we are building:
There are two components we are building:
* The faux-wallet middleware thing that interacts with WalletConnect/Metamask and forwards transactions to the server for signing
* The server, which manages the private key and signs transactions for the employees.

## Opportunities for integration:
* We need a way of authenticating the employee for these signatures. This could be done as outlined above, but perhaps with Worldcoin ID, Sismo, Polygon ID or something similar?
* We need a way to later monitor this activity on chain retrospectively for the employer. This could be done by logging transactions on the server, but perhaps it can be done in a stateless way using The Graph?
* Rather than just having one server sign with one key, we could have multiple servers run by multiple organizations or stakeholders, and then use multisig (e.g. through Gnosis) to control shared funds or make transactions that all the stakeholders care about.
