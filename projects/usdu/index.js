const morpho = '0xBBBBBbbBBb9cC5e90e3b3Af64bdAF62C37EEFFCb'
const usdc = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48';

const usduStable = '0xdde3ec717f220fc6a29d6a4be73f91da5b718e55'

// morpho related
const usduCoreVault = '0xce22b5fb17ccbc0c5d87dc2e0df47dd71e3adc0a'
const usduStakedVault = '0x0b5281e1fa7fc7c1f0890f311d5f04d55c0fd63c'
const usduMorphoAdapterV1 = '0x6D6525D8e234D840b2699f7107f14fa0D6C62c42' // set to expire
const usduMorphoAdapterV1_1 = '0xab6523Cd7fa669EC35Bd5358dF505382b810CDB5'

// curve pool
const usduCurveAdapterV1_USDC = '0x6f05782a28cDa7f01B054b014cF6cd92023937e4' // set to expire
const usduCurveAdapterV1_1_USDC = '0x77eBb1D7a7f5371a61b7D21D7734b6dDE6F0f94F'
const curveStableSwapNG_USDUUSDC = '0x771c91e699B4B23420de3F81dE2aA38C4041632b';

// core vault market ids
const marketIdUSDUIdle = '0x0F2C33F9074109B75B88617534E6AC6DFA8EBF97270C716782221A27CBF0D880';
const marketIdUSDUUSDC = '0x60f855f6b8c6919c2a4f3ab5f367fc923e3172e6dc8f4e8b6c448eb2d43421a1';
const marketIdUSDUWETH = '0xa6b5b5cc24a40900156a503afc6c898118b6d37ae545c2c144326fb95ac68e7a';
const marketIdUSDUCBBTC = '0x5BFC5484227F34C205E652C0426192DDE746FDB709D8947125A06C03F07EA4C7';
const marketIdUSDUCurveLPUSDC = '0xC12387D79D5D7BA35C5D2ED60B71DC4D6341889A30AFEA50A790C4E8967C209C';

const fetch = async (api) => {
    // get markets
    const markets = {
        [marketIdUSDUIdle]: await getMarketInfo(api, marketIdUSDUIdle),
        [marketIdUSDUUSDC]: await getMarketInfo(api, marketIdUSDUUSDC),
        [marketIdUSDUWETH]: await getMarketInfo(api, marketIdUSDUWETH),
        [marketIdUSDUCBBTC]: await getMarketInfo(api, marketIdUSDUCBBTC),
        [marketIdUSDUCurveLPUSDC]: await getMarketInfo(api, marketIdUSDUCurveLPUSDC),
    }


    // declare total supply and borrow assets
    let totalSupplyAssets = 0n;
    let totalBorrowAssets = 0n;

    // sum up total supply and borrow assets
    for (const market of Object.values(markets)) {
        totalSupplyAssets += BigInt(market.totalSupplyAssets);
        totalBorrowAssets += BigInt(market.totalBorrowAssets);
    }

    console.log(totalSupplyAssets);
    console.log(totalBorrowAssets);


    // await morphoAdapter(api, usduMorphoAdapterV1);
    // await morphoAdapter(api, usduMorphoAdapterV1_1);

    // assets
    // - totalAssets
    // - supplyAssets


    // liabilities
    // - totalMinted
    // - borrowedAssets

    api.add(usduStable, (totalSupplyAssets * 10n ** 6n) / 10n ** 18n);
    api.add(usdc, (totalSupplyAssets * 10n ** 6n) / 10n ** 18n);
    api.add(curveStableSwapNG_USDUUSDC, (totalSupplyAssets * 10n ** 6n) / 10n ** 18n);
    return api.getBalances();
}

const morphoAdapter = async (api, adapter) => {
    const markets = {
        [marketIdUSDUIdle]: await getMarketInfo(api, marketIdUSDUIdle),
        [marketIdUSDUUSDC]: await getMarketInfo(api, marketIdUSDUUSDC),
        [marketIdUSDUWETH]: await getMarketInfo(api, marketIdUSDUWETH),
        [marketIdUSDUCBBTC]: await getMarketInfo(api, marketIdUSDUCBBTC),
        [marketIdUSDUCurveLPUSDC]: await getMarketInfo(api, marketIdUSDUCurveLPUSDC),
    }


    // ASSETS
    const totalAssets = await api.call({
        target: adapter,
        abi: 'function totalAssets() view returns (uint256)',
    });

    console.log(markets[marketIdUSDUIdle].totalSupplyAssets);
    console.log(totalAssets);

    // LIABILITIES
}

const getMarketInfo = async (api, marketId) => {
    return await api.call({
        target: morpho,
        abi: `function market(bytes32) view returns (
            uint128 totalSupplyAssets, 
            uint128 totalSupplyShares, 
            uint128 totalBorrowAssets, 
            uint128 totalBorrowShares, 
            uint128 lastUpdate, 
            uint128 fee
        )`,
        params: [marketId],
    });
}

module.exports = {
    methodology: "TVL represents the total USDU tokens that users have deposited into the vaults",
    ethereum: {
      tvl: fetch,
      start: '2025-07-04',
      timetravel: true,
    },
  };