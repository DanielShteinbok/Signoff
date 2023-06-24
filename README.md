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
