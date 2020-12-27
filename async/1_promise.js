const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class MyPromise {
  constructor(executor) {
    // Promise初始状态
    this.status = PENDING;

    // 状态变更默认处理
    this.onResolvedCallback = function(data) { return data; };
    this.onRejectedCallback = function(err) { throw new Error(err); };

    // 更改Promise状态为成功，并调起then中注册的成功回调
    const resolve = (data) => {
      if (this.status === PENDING) {
        this.data = data;
        this.status = FULFILLED;
        this.onResolvedCallback(data);
      }
    }

    // 更改Promise状态为失败，并调起then中注册的失败回调
    const reject = (err) => {
      if (this.status === PENDING) {
        this.data = err;
        this.status = REJECTED;
        this.onRejectedCallback(err);
      }
    }

    // 把任务放入微任务队列，优先执行then注册回调处理函数
    process.nextTick(() => {
      try {
        executor(resolve, reject)
      } catch (e) {
        this.onRejectedCallback(e);
      }
    });
  }

  then(onResolved, onRejected) {
    const handleResolved = typeof onResolved === 'function' ? onResolved : this.onResolvedCallback;
    const handleRejected = typeof onRejected === 'function' ? onRejected : this.onRejectedCallback;

    if (this.status === PENDING) {
      return new MyPromise((resolve, reject) => {
        this.onResolvedCallback = () => {
          try {
            const result = handleResolved(this.data);
            if (result instanceof MyPromise) {
              result.then(resolve, reject);
            } else {
              resolve(result);
            }
          } catch (e) {
            handleRejected(e);
          }
        }

        this.onRejectedCallback = () => {
          try {
            const result = handleRejected(this.data);
            if (result instanceof MyPromise) {
              result.then(resolve, reject);
            } else {
              resolve(result);
            }
          } catch (e) {
            handleRejected(e);
          }
        }
      });
    }


    return new MyPromise((resolve, reject) => {
      try {
        // Promise状态变更后，触发返回Promise2的状态控制
        const result = this.status === FULFILLED
          ? handleResolved(this.data)
          : handleRejected(this.data);

        if (result instanceof MyPromise) {
          result.then(resolve, reject);
        } else {
          resolve(result);
        }
      } catch (e) {
        handleRejected(e);
      }
    });
  }

  catch(onRejected) {
    this.then(null, onRejected);
  }
}

module.exports = MyPromise;