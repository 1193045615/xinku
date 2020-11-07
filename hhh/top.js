let ajax = new XMLHttpRequest();

ajax.open('get', 'http://192.168.3.100:7436/index/info');

// 设置ajax请求完成的回调
ajax.onreadystatechange = function () {
    // 判断ajax是否请求完成了
    if (ajax.readyState == ajax.DONE) {
        // 判断与服务器通讯的状态

        if (ajax.status == 200) {
            var topdata = JSON.parse(ajax.responseText);
            var topaddhtml = '';
            var topimg = '';
            for (let i = 0; i < topdata.data.length; i++) {
                if (topdata.data[i].type == 2) {
                    topaddhtml = topdata.data[i].imgUrl;
                } else if (topdata.data[i].type == 1) {
                    topimg = topdata.data[i].imgUrl;
                }
            }
            topaddhtml = `<a class="logoadd" href="https://new.shuge.org/">
            <img class="logo" src=imgs/${topaddhtml} alt=""></a>`;
            document.querySelector('.top').style.background = `url(imgs/${topimg})`;


            let ajax1 = new XMLHttpRequest();

            ajax1.open('get', 'http://192.168.3.100:7436/index/menus');

            // 设置ajax请求完成的回调
            ajax1.onreadystatechange = function () {
                // 判断ajax是否请求完成了
                if (ajax1.readyState == ajax1.DONE) {
                    // 判断与服务器通讯的状态
                    var phtml = '';
                    if (ajax1.status == 200) {
                        var topdata1 = JSON.parse(ajax1.responseText);
                        for (let i = 0; i < topdata1.data.length; i++) {
                            // console.log(topdata1.data[i].name)
                            phtml += `<p class="navigation">
                                    <span class="lige">${topdata1.data[i].name}</span>
                                    <span class="Underline">
                                    <span class="delta"></span>
                                    </span>
                                    <span class="twonav"></span>
                                     </p>`;
                        }
                        document.querySelector('.nav').innerHTML = phtml + topaddhtml;

                        var nav = document.querySelector('.nav');
                        var Underline = document.querySelectorAll('.Underline');
                        var delta = document.querySelectorAll('.delta');
                        var navigation = document.querySelectorAll('.navigation');

                        //设置三角形所在的位置
                        let addredss = 0;

                        for (let i = 0; i < navigation.length; i++) {
                            navigation[i].onclick = function () {
                                for (let j = 0; j < delta.length; j++) {
                                    if (i == j) {
                                        Underline[j].style.display = 'inline-block';
                                        delta[j].style.display = 'block';
                                        addredss = j;
                                    } else {
                                        delta[j].style.display = 'none';
                                        Underline[j].style.display = 'none';

                                    }
                                }
                            }
                            navigation[i].onmouseenter = function () {
                                for (let j = 0; j < delta.length; j++) {
                                    if (j != addredss) {
                                        if (i == j) {
                                            Underline[j].style.display = 'inline-block';
                                            navigation[j].onmouseleave = function () {
                                                if (j != addredss) {
                                                    Underline[j].style.display = 'none';
                                                }
                                            }
                                        } else {
                                            Underline[j].style.display = 'none';
                                        }
                                    }
                                }
                            }
                        }
                        Underline[addredss].style.display = 'inline-block';
                        delta[addredss].style.display = 'block';
                    }
                }
            }
            ajax1.send(null);

        }
    }
}
ajax.send(null);








