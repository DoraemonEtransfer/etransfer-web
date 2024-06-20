// testnet
const ETransferHost = 'https://test.etransfer.exchange';
const AuthHost = 'https://test.etransfer.exchange';
const GraphqlHostV1 =
  'https://dapp-portkey-test.portkey.finance/Portkey_DID/PortKeyIndexerCASchema';
const GraphqlHostV2 =
  'https://dapp-aa-portkey-test.portkey.finance/Portkey_V2_DID/PortKeyIndexerCASchema';

// mainnet
// const ETransferHost = 'https://etransfer.exchange';
// const AuthHost = 'https://etransfer.exchange';

module.exports = [
  {
    source: '/api/etransfer/:path*',
    destination: `${ETransferHost}/api/etransfer/:path*`,
  },
  {
    source: '/connect/:path*',
    destination: `${AuthHost}/connect/:path*`,
  },
  {
    source: '/v1/graphql/:path*',
    destination: `${GraphqlHostV1}/graphql/:path*`,
  },
  {
    source: '/v2/graphql/:path*',
    destination: `${GraphqlHostV2}/graphql/:path*`,
  },
];
