/**
真题描述：给你两个有序整数数组 nums1 和 nums2，请你将 nums2 合并到 nums1 中，使 nums1 成为一个有序数组。
说明: 初始化 nums1 和 nums2 的元素数量分别为 m 和 n 。 你可以假设 nums1 有足够的空间（空间大小大于或等于 m + n）来保存 nums2 中的元素。

示例: 输入:
nums1 = [1,2,3,0,0,0], m = 3
nums2 = [2,5,6], n = 3
输出: [1,2,2,3,5,6]
*/

var merger = function (nums1, m, nums2, n) {
  const len1 = nums1.length
  const len2 = nums2.length
  var insert = function(arr, item){
    for(let i = m-1; i >= 0; i--){
      if(item > arr[i]){
        nums1.splice(len1-1, 1)
        nums1.splice(i+1, 0, item)
        break
      }
    }
  }
  for(let i = len2 -1; i >= 0; i--) {
    // 每次取出nums2中的每一项，进行插入操作，再对新的nums1数组进行依次操作
    let item = nums2[i]
    insert(nums1, item)
  }
}


// 测试用例
let nums1 = [1, 2, 3, 0, 0, 0], m = 3
let nums2 = [2, 5, 6], n = 3

merger(nums1, m, nums2, n)
console.log(nums1)

// 1、双指针从后往前比较，大于最大的往后填补，并记录此时被填补位置