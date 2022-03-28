import knex from "knex";
import config from "../knexfile.js";
import { sliceHex, txType } from "./utils.js";

const db = knex(config.development);

const insertBlock = (block_number, hash, timestamp) => {
  return new Promise((resolve, reject) => {
    db("block")
      .insert({
        block_number,
        hash,
        timestamp,
      })
      .then(() => resolve())
      .catch((e) => reject(e));
  });
};

const insertTx = (tx, bt) => {
  return new Promise((resolve, reject) => {
    db("transaction")
      .insert({
        timestamp: bt[tx.blockNumber],
        block_number: tx.blockNumber,
        contract_address: tx.address,
        tx_type: txType(tx.topics[1]),
        tx_hash: tx.transactionHash,
        tx_from: sliceHex(tx.topics[1]),
        tx_to: sliceHex(tx.topics[2]),
        token_id: Number(tx.topics[3]),
      })
      .then(() => resolve())
      .catch((e) => reject(e));
  });
};

const getNFT = (address) => {
  return new Promise((resolve, reject) => {
    db("transaction")
      .select({
        contract: "contract_address",
        owner: "tx_to",
        id: "token_id",
      })
      .where({
        contract_address: address,
      })
      .then((d) => resolve(d))
      .catch((e) => reject(e));
  });
};

const closeConnection = () => db.destroy();

export { insertBlock, insertTx, getNFT, closeConnection };
