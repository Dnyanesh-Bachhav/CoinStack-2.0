import banner1 from '../assets/banner1.png';
import banner2 from '../assets/banner2.png';
import banner3 from '../assets/banner3.png';
import banner4 from '../assets/banner4.png';
import banner5 from '../assets/banner5.png';
const COLORS = {
    primary: '#211DDD',
    secondary: '#EBEBFE',
    white: '#ffffff',
    black: '#000000',
    gray: '#C4C4C4',
    grayDark: '#A39F9F',
    success: '#067A0A',
    activeGreen: '#5bb98c',
    backgroundGreen: '#ddf3e4',
    borderGreen: '#b4dfc4',
    lightGreen: '#E2F0E5',
    red: '#780606',
    lightRed: '#ffe6e6',
    backgroundRed: '#ffe5e5',
    borderRed: '#f9c6c6',
    brown: '#d17338',
    grey: "#64748B",
    purple: "#1E293B",
}
const MostGainedCoins = [
    {
      id: 1,
      name: 'Bitcoin',
      market_cap_change_24h: 21,
      price: 2763656,
      imgSrc: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png'
    },
    {
      id: 2,
      name: 'Ethereum',
      market_cap_change_24h: 12,
      price: 206980,
      imgSrc: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png'
    },
    {
      id: 3,
      name: 'Decentraland',
      market_cap_change_24h: 6,
      price: 76.96,
      imgSrc: 'https://assets.coingecko.com/coins/images/325/large/Tether-logo.png'
    },
    {
      id: 4,
      name: 'Gala',
      market_cap_change_24h: 28,
      price: 10.71,
      imgSrc: 'https://assets.coingecko.com/coins/images/12493/large/GALA-COINGECKO.png',
    },
    {
      id: 5,
      name: 'Theta',
      market_cap_change_24h: 34,
      price: 169.01,
      imgSrc: 'https://assets.coingecko.com/coins/images/2538/large/theta-token-logo.png'
    },
  ]
  const MostGainedCoins2 = [
    {
      id: 1,
      name: 'Bitcoin',
      percentage: 5.8,
      price: "1,402,338",
      imgSrc: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png'
    },
    {
      id: 2,
      name: 'Ethereum',
      percentage: 4.9,
      price: "103,670",
      imgSrc: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png'
    },
    {
      id: 3,
      name: 'Decentraland',
      percentage: 4.7,
      price: "34.42",
      imgSrc: 'https://assets.coingecko.com/coins/images/325/large/Tether-logo.png'
    },
    {
      id: 4,
      name: 'Gala',
      percentage: 4.5,
      price: "2.29",
      imgSrc: 'https://assets.coingecko.com/coins/images/12493/large/GALA-COINGECKO.png',
    },
    {
      id: 5,
      name: 'Theta',
      percentage: 4.5,
      price: "73.63",
      imgSrc: 'https://assets.coingecko.com/coins/images/2538/large/theta-token-logo.png'
    },
  ];
  const profitCoins = [
    {
      id: 1,
      name: 'Alpaca Finance',
      percentage: 45,
      price: "23.09",
      imgSrc: 'https://assets.coingecko.com/coins/images/14165/large/Logo200.png'
    },
    {
      id: 2,
      name: 'Theta',
      percentage: 40,
      price: "73.63",
      imgSrc: 'https://assets.coingecko.com/coins/images/2538/large/theta-token-logo.png'
    },
    {
      id: 3,
      name: 'Enjin Coin',
      percentage: 34,
      price: "26.01",
      imgSrc: 'https://assets.coingecko.com/coins/images/1102/large/enjin-coin-logo.png'
    },
    {
      id: 4,
      name: 'Wax',
      percentage: 28.84,
      price: "4.87",
      imgSrc: 'https://assets.coingecko.com/coins/images/1372/large/WAX_Coin_Tickers_P_512px.png'
    },
    {
      id: 5,
      name: 'Shiba Inu',
      percentage: 24.42,
      price: "0.00077269",
      imgSrc: 'https://assets.coingecko.com/coins/images/11939/large/shiba.png'
    },
  ];
  const lossCoins = [
    {
      id: 1,
      name: 'Sushi',
      percentage: -33.2
    },
    {
      id: 2,
      name: 'Apecoin',
      percentage: -22.24
    },
    {
      id: 3,
      name: 'COTI',
      percentage: -14.43
    },
    {
      id: 4,
      name: 'Tether',
      percentage: -5.04
    },
    {
      id: 5,
      name: 'Stacks',
      percentage: -4.42
    },
  ];
  const trustedCoins = [
    {
      id: 1,
      name: 'Bitcoin',
      percentage: 45
    },
    {
      id: 2,
      name: 'Ethereum',
      percentage: 40
    },
    {
      id: 3,
      name: 'BNB',
      percentage: 34
    },
    {
      id: 4,
      name: 'Solana',
      percentage: 28.84
    },
    {
      id: 5,
      name: 'Cardano',
      percentage: 24.42
    },
  ];
  const memeCoins = [
    {
      id: 1,
      name: 'Shiba Inu',
      percentage: 45
    },
    {
      id: 2,
      name: 'Dogecoin',
      percentage: 40
    },
    {
      id: 3,
      name: 'Saitama',
      percentage: 34
    },
    {
      id: 4,
      name: ' Puli',
      percentage: 28.84
    },
    {
      id: 5,
      name: 'Babydogecoin',
      percentage: 24.42
    },
  ];
  const banners = [
    {
      id: 1,
      imgSrc: banner1,
    },
    {
      id: 2,
      imgSrc: banner2,
    },
    {
      id: 3,
      imgSrc: banner3,
    },
    {
      id: 4,
      imgSrc: banner4,
    },
    {
      id: 5,
      imgSrc: banner5,
    }
  ]
const bitcoin_data = [
    {
      y: 3519965.6488598064,
    },
    {
      y: 3520291.6682269224,
    },
    {
      y: 3519344.8474035123,
    },
    {
      y: 3519266.015041937,
    },
    {
      y: 3520937.7263061893,
    },
    {
      y: 3522002.135321482,
    },
    {
      y: 3520574.0759106204,
    },
    {
      y: 3517290.6365488684,
    },
    {
      y: 3516552.2157415776,
    },
    {
      y: 3513327.1767427465,
    },
    {
      y: 3514139.57971109,
    },
    {
      y: 3509094.6576507036,
    },
    {
      y: 3507707.5416720654,
    },
    {
      y: 3501182.5433938685,
    },
    {
      y: 3507148.252259806,
    },
    {
      y: 3503946.0779717006,
    },
    {
      y: 3504262.708836886,
    },
    {
      y: 3495131.289483641,
    },
    {
      y: 3500487.6610963847,
    },
    {
      y: 3498570.6168611497,
    },
    {
      y: 3492164.779775937,
    },
    {
      y: 3488840.054906445,
    },
    {
      y: 3490304.2022781735,
    },
    {
      y: 3503297.1748367962,
    },
    {
      y: 3491515.462941581,
    },
    {
      y: 3506862.20321601,
    },
    {
      y: 3493429.469670976,
    },
    {
      y: 3492366.6277205264,
    },
    {
      y: 3487763.750276022,
    },
    {
      y: 3488232.264203757,
    },
    {
      y: 3495502.150363169,
    },
    {
      y: 3502981.6373447645,
    },
    {
      y: 3500431.2280424116,
    },
    {
      y: 3492008.342409412,
    },
    {
      y: 3493791.466195848,
    },
    {
      y: 3488736.0911800014,
    },
    {
      y: 3489988.8191266004,
    },
    {
      y: 3489523.6013239487,
    },
    {
      y: 3490471.051968435,
    },
    {
      y: 3485977.2936665555,
    },
    {
      y: 3484839.7613674644,
    },
    {
      y: 3473385.185176673,
    },
    {
      y: 3469970.6319644046,
    },
    {
      y: 3457531.4648831664,
    },
    {
      y: 3462048.93002277,
    },
    {
      y: 3476496.3757316507,
    },
    {
      y: 3471573.284832851,
    },
    {
      y: 3481951.4158607023,
    },
    {
      y: 3482872.8853156017,
    },
    {
      y: 3478551.1327578453,
    },
    {
      y: 3474986.410757563,
    },
    {
      y: 3484632.705459043,
    },
    {
      y: 3481451.064809239,
    },
    {
      y: 3470123.3934142618,
    },
    {
      y: 3477294.5824025013,
    },
    {
      y: 3466787.0284039616,
    },
    {
      y: 3469846.6430620966,
    },
    {
      y: 3466997.021966369,
    },
    {
      y: 3464459.989702771,
    },
    {
      y: 3468047.469124323,
    },
    {
      y: 3464119.334985144,
    },
    {
      y: 3463939.767635894,
    },
    {
      y: 3451287.11190267,
    },
    {
      y: 3445792.881972405,
    },
    {
      y: 3434583.389838082,
    },
    {
      y: 3429497.0541232843,
    },
    {
      y: 3411804.182198876,
    },
    {
      y: 3425056.872805198,
    },
    {
      y: 3404299.957304446,
    },
    {
      y: 3402469.941910429,
    },
    {
      y: 3394859.4632150345,
    },
    {
      y: 3405836.791356149,
    },
    {
      y: 3404513.0306705507,
    },
    {
      y: 3416059.3876577695,
    },
    {
      y: 3416645.4713158566,
    },
    {
      y: 3415271.890637064,
    },
    {
      y: 3419799.921368826,
    },
    {
      y: 3413176.552575828,
    },
    {
      y: 3404602.7613970763,
    },
    {
      y: 3382990.787200982,
    },
    {
      y: 3384184.9554175665,
    },
    {
      y: 3377795.2135706595,
    },
    {
      y: 3383248.654976385,
    },
    {
      y: 3360732.716201453,
    },
    {
      y: 3372116.4825834767,
    },
    {
      y: 3393013.990780145,
    },
    {
      y: 3388813.9979000716,
    },
    {
      y: 3396964.5397632276,
    },
    {
      y: 3399349.6814064104,
    },
    {
      y: 3385945.059590296,
    },
    {
      y: 3384959.7242362723,
    },
    {
      y: 3380905.5680545047,
    },
    {
      y: 3386343.603403385,
    },
    {
      y: 3387522.1504779323,
    },
    {
      y: 3380341.413035532,
    },
    {
      y: 3390151.7164996555,
    },
    {
      y: 3389473.3363418197,
    },
    {
      y: 3402350.6378714917,
    },
    {
      y: 3402169.3872232535,
    },
    {
      y: 3400184.624159565,
    },
    {
      y: 3409716.4020093936,
    },
    {
      y: 3418635.128106,
    },
    {
      y: 3420917.870536917,
    },
    {
      y: 3436085.2189314626,
    },
    {
      y: 3421149.801113701,
    },
    {
      y: 3427975.7815120155,
    },
    {
      y: 3430787.022753261,
    },
    {
      y: 3427114.295084311,
    },
    {
      y: 3426408.3643806227,
    },
    {
      y: 3423213.614745893,
    },
    {
      y: 3425754.004605879,
    },
    {
      y: 3425359.642555498,
    },
    {
      y: 3435436.248620193,
    },
    {
      y: 3432631.4085736135,
    },
    {
      y: 3428708.040128282,
    },
    {
      y: 3440055.9335177755,
    },
    {
      y: 3439568.226698425,
    },
    {
      y: 3438276.8404370975,
    },
    {
      y: 3436792.2021378134,
    },
    {
      y: 3435745.5915254843,
    },
    {
      y: 3439857.5781056215,
    },
    {
      y: 3443151.350426559,
    },
    {
      y: 3444694.043775484,
    },
    {
      y: 3438763.8950064983,
    },
    {
      y: 3435825.7473550863,
    },
    {
      y: 3432032.7338843304,
    },
    {
      y: 3431831.632331627,
    },
    {
      y: 3433262.890639733,
    },
    {
      y: 3435552.5878212685,
    },
    {
      y: 3431735.921092338,
    },
    {
      y: 3438879.6390618235,
    },
    {
      y: 3432062.0139111853,
    },
    {
      y: 3438954.1531473985,
    },
    {
      y: 3433781.329425494,
    },
    {
      y: 3433830.1297089434,
    },
  ];
  
export {COLORS,MostGainedCoins,MostGainedCoins2,profitCoins,lossCoins,trustedCoins,memeCoins,banners, bitcoin_data  };