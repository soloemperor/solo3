export default {
    getUrlVal() {
        var url = window.location.search
        var Request = new Object();
        if (url.indexOf("?") != -1) {　　
            var str = url.substr(1)　 //去掉?号
                　　 var strs = str.split("&");　　
            for (var i = 0; i < strs.length; i++)　　 {　　
                var tarGets = strs[i].split("=")
                Request[tarGets[0]] = unescape(tarGets[1]);　　
            }
            return Request
        } else {
            return Request
        }
    }
}