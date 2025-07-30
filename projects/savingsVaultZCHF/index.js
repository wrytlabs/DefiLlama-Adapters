const zchf = '0xB58E61C3098d85632Df34EecfB899A1Ed80921cB';
const vault = "0x637F00cAb9665cB07d91bfB9c6f3fa8faBFEF8BC";

module.exports = {
  methodology: "TVL represents the total Frankencoin (ZCHF) tokens that users have deposited into the savings vault to earn yield",
  ethereum: {
    tvl: async (api) => {
      const totalAssets = await api.call({
        target: vault,
        abi: 'function totalAssets() view returns (uint256)',
      });
      
      api.add(zchf, totalAssets);
      return api.getBalances();
    },
    start: '2025-07-21',
    timetravel: true,
  },
};