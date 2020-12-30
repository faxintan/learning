/**
 * 冒泡算法
 * 
 * 1. 比较相邻的元素，如果前一个比后一个大，就把它们两个调换位置。
 * 2. 对每一对相邻元素作同样的工作，从开始第一对到结尾的最后一对。这步做完后，最后的元素会是最大的数。
 * 3. 针对所有的元素重复以上的步骤，除了最后一个。
 * 4. 持续每次对越来越少的元素重复上面的步骤，直到没有任何一对数字需要比较。
 * 
 * @ref https://images2015.cnblogs.com/blog/739525/201603/739525-20160329100034660-1420925220.gif
 */
function bubbleSort(arr) {
    for (let i = arr.length - 1; i >= 0; i--) {
        for (let j = 0; j < i; j++) {
            if (arr[j] > arr[j + 1]) {
                temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    return arr;
}

console.log(bubbleSort([6,2,5,9, 9,7]));
