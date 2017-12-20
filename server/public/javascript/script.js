window.onload = function () {
    document.querySelector("#container").addEventListener('click', function() {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState==4 && xmlHttp.status===200) {
                console.log(xmlHttp.response)
            } else if (xmlHttp.readyState==4 && xmlHttp.status!==200){
                alert('twoja różdżka się zjebała hhyhyhy')
            }
        }
        xmlHttp.open("POST", '/', true);
        xmlHttp.send();
    })
}
