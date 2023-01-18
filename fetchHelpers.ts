export function fetchHandler(url: string, delayTime = 3000) {
  let timerId;
  return new Promise((resolve, reject) => {
    let attempts = 0;
    function onFetch() {
      fetch(url)
        .then((response: Response) => {
          resolve(response);
          clearTimeout(timerId);
        })
        .catch((error) => {
          attempts++;
          if (attempts < 3) {
            timerId = setTimeout(onFetch, delayTime);
          } else {
            reject(error);
            clearTimeout(timerId);
          }
        });
    }
    onFetch();
  });
}
