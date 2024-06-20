// testnet
const ETransferHost = 'https://test.etransfer.exchange';
const AuthHost = 'https://test.etransfer.exchange';

// mainnet
// const ETransferHost = 'https://etransfer.exchange';
// const AuthHost = 'https://etransfer.exchange';

module.exports = [
  {
    source: '/api/etransfer/:path*',
    destination: `${ETransferHost}/api/app/:path*`,
  },
  {
    source: '/connect/:path*',
    destination: `${AuthHost}/connect/:path*`,
  },
];
