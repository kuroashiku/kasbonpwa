export const moneyList = [
    {value:5000, neighbor: [10000, 20000]},
    {value: 10000, neighbor: [20000, 50000]},
    {value: 15000, neighbor: [20000, 50000]},
    {value: 20000, neighbor: [50000, 100000]},
    {value: 25000, neighbor: [50000, 100000]},
    {value: 30000, neighbor: [50000, 100000]},
    {value: 35000, neighbor: [50000, 100000]},
    {value: 40000, neighbor: [50000, 100000]},
    {value: 45000, neighbor: [50000, 100000]},
    {value: 50000, neighbor: [100000]},
    {value: 100000, neighbor: []},
    // {value: 120000, neighbor: [150000, 200000]},
    // {value: 150000, neighbor: [200000]},
    // {value: 170000, neighbor: [200000]},
    // {value: 200000, neighbor: []},
];

export const getAmountRecommendations=(totalPrice=0)=>{
    const maxMoney =  moneyList[moneyList.length-1].value;
    let remaining = 0;
    let priceAnalize = totalPrice;
    let maxMoneyCount = 0;
    if(totalPrice > maxMoney){
        remaining = totalPrice % maxMoney;
        maxMoneyCount = Math.floor(totalPrice / maxMoney);
        priceAnalize = remaining;
    }
    for(let i=0;i<moneyList.length;i++){
        if(moneyList[i].value > priceAnalize){
            const maxMoneyValue = maxMoneyCount * maxMoney;
            const recomList = [moneyList[i].value, ...moneyList[i].neighbor];
            return recomList.map((r)=> r + maxMoneyValue);
        }
    }
    return [];
}
