export default ()=>{
    return  new Promise((resolve, reject) => {

        function sayHi() {
            resolve({ key:true
            })
        }

        setTimeout(sayHi, 10000);


    })
}