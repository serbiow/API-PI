const userService = {
    // findByEmail: () => {
    //     return callApi({
    //         method: "POST",
    //         url: "localhost:3000/auth/login/"
    //     }) 
    // },
    login: user => {
        return callApi({
            method: "POST",
            url: "http://localhost:3000/auth/login",
            params: user
        })
    }
}

function callApi({ method, url, params }) {
    return new Promise(async (resolve, reject) => {
        var data = JSON.stringify({
            "email": "daniel@email.com",
            "password": "daniel123"
        });

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                console.log(this.responseText);
            }
        });

        xhr.open(
            method,
            url,
            true
        );
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(params));
    })
}

export default userService