//图片显示
       function showPics(url,name){
    	 //根据路径读取到文件
           plus.io.resolveLocalFileSystemURL(url,function(entry){
        	   entry.file( function(file){
        		   var fileReader = new plus.io.FileReader();
        		   fileReader.readAsDataURL(file);
                      fileReader.onloadend = function(e) {
                	       var picUrl = e.target.result.toString();
                	       var picIndex = $("#picIndex").val();
	               		var nowIndex = parseInt(picIndex)+1;
	               		$("#picIndex").val(nowIndex);
	               		var html = '';
	               		html += '<div class="image-item " id="item'+nowIndex+'">';
	               		html += '<div class="image-close" onclick="delPic('+nowIndex+')">X</div>';
	               		html += '<div><img src="'+picUrl+'" class="upload_img" style="width:100%;height:100%;"/></div>';
	               		html += '</div>';
	               		html += $("#image-list").html();
	               		$("#image-list").html(html);
                   }
        	   });
          });
       }
     	//压缩图片
       function compressImage(url,filename){
           var name="_doc/upload/"+filename;
           plus.zip.compressImage({
                   src:url,//src: (String 类型 )压缩转换原始图片的路径
                   dst:name,//压缩转换目标图片的路径
                   quality:40,//quality: (Number 类型 )压缩图片的质量.取值范围为1-100
                   overwrite:true//overwrite: (Boolean 类型 )覆盖生成新文件
               },
               function(zip) {
            	   //页面显示图片
            	   showPics(zip.target,name);
               },function(error) {
                   plus.nativeUI.toast("压缩图片失败，请稍候再试");
           });
       }

     	//调用手机摄像头并拍照
       function getImage() {
           var cmr = plus.camera.getCamera();
           cmr.captureImage(function(p) {
               plus.io.resolveLocalFileSystemURL(p, function(entry) {
                   compressImage(entry.toLocalURL(),entry.name);
               }, function(e) {
                   plus.nativeUI.toast("读取拍照文件错误：" + e.message);
               });
           }, function(e) {
           }, {
               filter: 'image'
           });
       }
       //从相册选择照片
       function galleryImgs() {
    	    plus.gallery.pick(function(e) {
    	    	var name = e.substr(e.lastIndexOf('/') + 1);
    	       compressImage(e,name);
    	    }, function(e) {
    	    }, {
    	        filter: "image"
    	    });
    	}

       //点击事件，弹出选择摄像头和相册的选项
    	function showActionSheet() {
            alert('aaa');
    	    var bts = [{
    	        title: "拍照"
    	    }, {
    	        title: "从相册选择"
    	    }];
    	    plus.nativeUI.actionSheet({
    	            cancel: "取消",
    	            buttons: bts
    	        },
    	        function(e) {
    	            if (e.index == 1) {
    	                getImage();
    	            } else if (e.index == 2) {
    	                galleryImgs();
    	            }
    	        }
    	    );
    	}
   function GetBase64Code(path){
     	var bitmap = new plus.nativeObj.Bitmap("xxx");
     	// 从本地加载Bitmap图片将图片转换为base64格式
          bitmap.load(path,function(){
              var base4=bitmap.toBase64Data();
              var datastr=base4.split(',',3);//截取掉没用的前缀
              var imgbase64 = [];
              if(datastr.length>1)
              {
                 imgbase64.push(datastr[1]);
              }else
              {
                 imgbase64.push(datastr[0]);
              }
              console.log(imgbase64);
              var traceNo=Utils.genTrn();//流水号
  			//然后就是发送ajax请求
          },function(e){
              console.log('加载图片失败：'+JSON.stringify(e));
          });
     }
     function Img2dataURL(path){
         plus.io.resolveLocalFileSystemURL(path, function(entry){
             entry.file(function(file){
                 debugger
                 var reader = new plus.io.FileReader();
                 reader.onload = function (e) {
                     imgBase64=e.target.result;
                     console.log("****"+e.target.result);
                 };
                 reader.readAsDataURL(file);
             },function(e){
                Ext.toast("读写出现异常: " + e.message );
             })
         })
        }
