(function () {
    
    const $main = document.querySelector("main")
    
    function getHTML(options) {
        
        let {url, succes, error} = options
        const xhr = new XMLHttpRequest()
        xhr.addEventListener("readystatechange", function (e) {
            if(xhr.readyState !== 4) return
            if(xhr.status>=200 && xhr.status<=300){
                let html = xhr.responseText
                succes(html)
            }else{
                let message = xhr.statusText || "OCURRIO UN ERROR"
                error(`ERROR: ${xhr.status} ${message}`)
            }
        })
        xhr.open("GET",url)
        xhr.setRequestHeader("Content-type","text/html;charset=utf-8")
        xhr.send()

    }

    document.addEventListener("DOMContentLoaded", function (e) {
        getHTML({
            url:"assets/index1.html",
            succes: function (html) {
                $main.innerHTML = html
            },
            error: function(error) {
              $main.innerHTML = `<h1>${error}</h1>`  
            }
        })
    })

    document.addEventListener("click", function (e) {
        if(e.target.matches("nav a")){
            e.preventDefault()
            getHTML({
                url:e.target.href,
                succes: function (html) {
                    $main.innerHTML = html
                },
                error: function(error) {
                  $main.innerHTML = `<h1>${error}</h1>`  
                }
            })
        }
    })
    

   


})()