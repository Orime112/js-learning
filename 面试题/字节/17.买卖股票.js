/**
* 买卖股票的最佳时机
https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock/
给定一个数组 prices ，它的第 i 个元素 prices[i] 表示一支给定股票第 i 天的价格。

你只能选择 某一天 买入这只股票，并选择在 未来的某一个不同的日子 卖出该股票。设计一个算法来计算你所能获取的最大利润。

返回你可以从这笔交易中获取的最大利润。如果你不能获取任何利润，返回 0 。

 
示例 1：

输入：[7,1,5,3,6,4]
输出：5
解释：在第 2 天（股票价格 = 1）的时候买入，在第 5 天（股票价格 = 6）的时候卖出，最大利润 = 6-1 = 5 。
     注意利润不能是 7-1 = 6, 因为卖出价格需要大于买入价格；同时，你不能在买入前卖出股票。
示例 2：

输入：prices = [7,6,4,3,1]
输出：0
解释：在这种情况下, 没有交易完成, 所以最大利润为 0。
 
*/

// * 思路：暴力解法，双层遍历O(n2)

/**
 * @param {number[]} prices
 * @return {number}
 */
 var maxProfit = function (prices) {
  if (!prices || !prices.length) return 0
  const len = prices.length
  let max = 0, cur = 0, next = 0
  for (let i = 0; i < len; i++) {
    cur = prices[i]
    for (let j = i + 1; j < len; j++) {
      next = prices[j]
      if (cur < next) {
        max = Math.max(max, next - cur)
      }
    }
  }
  return max
};

// * 解法二：由于先买后卖，依次向后推进过程中，只需要跟踪最小值和最大差值即可

/**
 * @param {number[]} prices
 * @return {number}
 */
 var maxProfit1 = function (prices) {
  if (!prices || !prices.length) return 0
  let min = prices[0] // 最小值
  let res = 0 // 最大差值
  for (let i = 0; i < prices.length; i++) {
    min = Math.min(min, prices[i])
    res = Math.max(res, prices[i] - min)
  }
  return res
};

var maxProfit2 = function (price){
  if(!price || !price.length) return 0
  let min = price[0]
  let res = 0
  for(let i = 0; i < price.length; i++){
    min = Math.min(min, price[i])
    res = Math.max(res, price[i] - min)
  }
  return res
}


// 测试用例
let test = [7, 1, 5, 3, 6, 4]
let test1 = [7, 6, 4, 3, 1]

console.time('执行用时');
console.log(maxProfit(test));
console.log(maxProfit(test1));
console.log(maxProfit1(test));
console.log(maxProfit1(test1));
console.timeEnd('执行用时');