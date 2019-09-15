 //dom元素
        var btn = document.querySelector(".btnClass");
        var heightClass = document.querySelector(".heightClass");
        var weightClass = document.querySelector(".weightClass");
        var list = document.querySelector(".list");
        var data = JSON.parse(localStorage.getItem("mybmi")) || [];
        //設定時間
        var d = new Date();
        //月份的轉換
        var month = new Array(12)
        month[0] = "01"
        month[1] = "02"
        month[2] = "03"
        month[3] = "04"
        month[4] = "05"
        month[5] = "06"
        month[6] = "07"
        month[7] = "08"
        month[8] = "09"
        month[9] = "10"
        month[10] = "11"
        month[11] = "12"
        var datares = d.getDate() + "-" + month[d.getMonth()] + "-" + d.getFullYear();

        //判斷值不可為空值
        heightClass.addEventListener('blur', function (e) {
            if (e.target.value == "") {
                alert("尚未輸入完成~");
            }
        });
      weightClass.addEventListener('blur', function (e) {
        if (e.target.value == "") {
          alert("尚未輸入完成~");
        }
      });

        //按鈕點擊
        btn.addEventListener('click', btnres);
        list.addEventListener('click', delres);
        upres(data);

        //若無任何一個值的話
        window.onload = a;
        function a(){
            if(data == ""){
                list.innerHTML="無任何紀錄";
            }
        }

        //按鈕新增身高、體重
        function btnres(e) {
            e.preventDefault();
            var height = heightClass.value;
            var weight = weightClass.value;
            var status = "";
            if (height == "" || weight == "") {
                alert("尚未輸入完成~");
                return
            }
            //計算BMI
            var bmi = Math.floor((weight / Math.pow(height, 2) * 10000) * 10) / 10;
            //設定一個物件
            var bmio = {
                content: bmi,
                content1: datares,
                content2: height,
                content3: weight,
                content4: ""
            };
            //把值(物件)加到取值裡
            console.log(typeof (bmio));
            data.push(bmio);
            upres(data);
            localStorage.setItem("mybmi", JSON.stringify(data));
            window.location.reload();
        }

        function upres(items) {
            var str = "";
            for (var i = 0; i < items.length; i++) {
                var bmi = items[i].content;
                var d = items[i].content1;
                var height = items[i].content2;
                var weight = items[i].content3;
                if (bmi >= 18.5 && bmi < 24) {
                    items[i].content4 = "理想";
                } else if (bmi < 18.5) {
                    items[i].content4 = '過輕';
                } else if (bmi >= 24 && bmi < 27) {
                    items[i].content4 = '過重';
                } else if (bmi >= 27 && bmi < 30) {
                    items[i].content4 = '輕度肥胖';
                } else if (bmi >= 30 && bmi < 35) {
                    items[i].content4 = '中度肥胖';
                } else {
                    items[i].content4 = '重度肥胖';
                }
                localStorage.setItem("mybmi", JSON.stringify(data));
                var status = items[i].content4;
                str += '<li data-index=">' + i + '"><span>' +status + '</span><span>' + bmi + '</span><span class="small">height</span><span>' + height + 'cm <span class="small">weight</span><span>' + weight + 'kg</span><span class="small">' + d + '</span><a href="#">刪除</a></li>';                                                           
                list.innerHTML = str;
            }
        }
        //刪除值
        function delres(e) {
            if (e.target.nodeName !== 'A') {
                return
            }
            var index = e.target.dataset.index;
            console.log(index);
            data.splice(index, 1);
            localStorage.setItem("mybmi", JSON.stringify(data));
            upres(data);
            window.location.reload();
           
        }

  