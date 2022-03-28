const txType = (hex) => (Number(hex) === 0 ? "Mint" : "Transfer");

const sliceHex = (addr) => `0x${addr.slice(26)}`;

export { txType, sliceHex };
