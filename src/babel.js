async function f() {
    let promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve("done!"), 1000)
    });
    let result = await promise; // wait until the promise resolves
    console.log(result)
}

f();

class Util{
    static id = Date.now()
}

console.log('util id:', Util.id)