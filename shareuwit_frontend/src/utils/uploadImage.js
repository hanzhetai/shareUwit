import api from "../api";

export default  function uploadImage(blobInfo, progress, success, failure){
  new Promise((resolve, reject) => {
    if (blobInfo.blob()) {
      const formData = new FormData();
      formData.append('images',blobInfo.blob(),blobInfo.filename());
      api.uploadArticleImage(formData)
      .then((res) => {
        console.log('resHere',res)
        if(res.data.images){
          //成功上传后将图片插入到当前的编辑器中
          console.log(res.data.images)
          {notifyRes('图片保存成功')};
        }
      })
      .catch((error) => {
        alert(error);
      })
      } else {
        alert('error');
    }
  })
}