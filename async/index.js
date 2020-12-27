const MyPromise = require('./1_promise');

new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('test');
  }, 1000);
})
  .then(
    // (data) => { console.log(data); return new MyPromise((resolve) => resolve(data + 100)) }, // 无法触后面的then
    (data) => { console.log(data); return new MyPromise((resolve) => setTimeout(() => resolve(data + 100), 100)) },
    (err) => { console.log('error', err); },
  )
  .then((data) => console.log('next: ', data))
  .then((data) => console.log('next: ', data))
  .then((data) => console.log('next: ', data))
  .then((data) => console.log('next: ', data))