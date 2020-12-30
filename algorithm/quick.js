/**
 * 快速排序
 * 
 * 快速排序的基本思想是：通过一趟排序将要排序的数据分割成独立的两部分，
 * 其中一部分的所有数据比另一部分的所有数据要小，再按这种方法对这两部
 * 分数据分别进行快速排序，整个排序过程可以递归进行，使整个数据变成有序序列
 */

function quickSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }
    let left = [], right = [];
    for(let i = 1; i < arr.length; i++) {
        arr[i] < arr[0] ? left.push(arr[i]) : right.push(arr[i]);
    }
    return quickSort(left).concat(arr[0], quickSort(right));
}

console.log(quickSort([2,6,3,9,7,1]));
