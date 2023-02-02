//Input x & y is always greater than or equal to 1
//GCD is always greater than or equal to 1


// None-recursion method
function mygcd(x, y) {
    //Pick smallest between x or y
    let minimum = Math.min(x,y)
    console.log("Minimum = ", minimum)
    for (let i = Math.min(x,y); i > 0; i--){
        if(x % i === 0 && y % i === 0) return i 
    }
}

//euclidian algorithm
function mygcd2(a,b){
    // GCD(A,0) = A
    // GCD(0,B) = B
    // If A = B⋅Q + R and B≠0 then GCD(A,B) = GCD(B,R) where Q is an integer, R is an integer between 0 and B-1
    // let a = Math.max(x,y);
    // let b = Math.min(x,y);
    if (b === 0){
        return a
    }
    return mygcd2(b, a % b)
}

console.log(mygcd2(30,12), 6)
console.log(mygcd2(8,9), 1)
console.log(mygcd2(1,1), 1)