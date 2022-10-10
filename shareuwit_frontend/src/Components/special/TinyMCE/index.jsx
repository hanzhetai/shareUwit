import React, { Component } from 'react'
import api from '../../../api';
import getUserInfo from '../../../utils/getUserInfo';
import {APP_API_URL} from '../../../baseConfig'

import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Fab from '@mui/material/Fab';
import Stack from '@mui/material/Stack';
import PublishIcon from '@mui/icons-material/Publish';
import SaveIcon from '@mui/icons-material/Save';

import { Editor } from '@tinymce/tinymce-react'

//消息提醒
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


//错误信息提醒
const notifyErr = (msg) => toast.warn('😲' + '😲' + msg + '😲' + '😲', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
});

//成功信息提醒
const notifyRes = (msg) => toast(msg, {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
});

export default class editorComponent extends Component {
  state = {
    title:'',
    content:'',
    article_status:false,
    current_uuid:'',
    saveState:false,
  }
  
  handleTitleChange = (event) => {
    this.setState({saveState:false});
    this.setState({title:event.target.value});
  }
  
  handleEditorChange = (content, editor) => {
    this.setState({saveState:false});
    this.setState({content:content});
  };

  // 文章保存逻辑
  onSave = async() => {
    //确认并刷新用户的信息
    const accessToken = localStorage.getItem('access_token');
    //验证当前用户信息是否有效
    await getUserInfo(accessToken);
    //创建当前article对象
    const {title, content} = this.state;
    //本处将article_status修改为false，即保存的草稿
    const articleObj = {title:title, content:content, article_status:false};
    //检查uuid是否存在，不存在则执行保存，存在则执行更新
    if (localStorage.getItem('current_uuid')) {
      api.updateArticle(articleObj,localStorage.getItem('current_uuid'))
      .then(res => {
        this.setState({saveState:true});
        {notifyRes('保存成功')};
      })
      .catch(err => {
        {notifyErr(err.message)};
      })
    } else {
      api.publishArticle(articleObj)
      .then(res => {
        //保存成功则向本地执行写入uuid操作
        const current_uuid = res.data.id
        localStorage.setItem('current_uuid',current_uuid);
        this.setState({saveState:true});
        {notifyRes('保存成功')};
      })
      .catch(err => {
        {notifyErr(err.message)};
      })
    }
  }

  // 文章上传逻辑
  onSubmit = async() => {
    //确认并刷新用户的信息
    const accessToken = localStorage.getItem('access_token');
    await getUserInfo(accessToken);
    const {title, content} = this.state;
    //本处将article_status修改为true，即发表的文章
    const articleObj = {title:title, content:content, article_status:true};
    //确认本地uuid是否存在
    if (localStorage.getItem('current_uuid')) {
      //uuid存在则执行更新patch操作，并发布
      const articleObj = {title:title, content:content, article_status:true};
      api.updateArticle(articleObj,localStorage.getItem('current_uuid'))
      .then(res => {
        //成功则从当前localstorage抹除uuid，并执行页面跳转至主页
        localStorage.removeItem('current_uuid')
        window.location = "/"
        {notifyRes('保存成功')};
      })
      .catch(err => {
        {notifyErr(err.message)};
      })
    } else {
      //uuid不存在则直接执行发布post操作
      api.publishArticle(articleObj)
      .then(res => {
        //成功则从当前localstorage抹除uuid，并执行页面跳转至主页
        localStorage.removeItem('current_uuid')
        window.location = "/"
      })
      .catch(err => {
        {notifyErr(err.message)};
      })  
    }
  };

  render() {
    return (
      <div>
        <ToastContainer theme='dark'/>
        <Typography sx={{ fontSize: 25 }} color="text.secondary" gutterBottom>创作</Typography>
          
          <Grid container>
            <Grid xs={6} sx={{display: 'flex', alignItems: 'center'}}>
              <Typography sx={{ fontSize: 25, display: 'flex', alignItems: 'center'}} color="text.secondary" marginBottom={0}>标题</Typography>
            </Grid>

            <Grid xs={6}>
              <Stack direction="row">
                <Grid>
                  {
                    this.state.saveState ?
                    <Fab variant="extended" size="medium" color="primary" aria-label="add" display='flex' disabled onClick={this.onSave}>
                      <SaveIcon/>
                        已保存
                    </Fab>
                    :
                    <Fab variant="extended" size="medium" color="primary" aria-label="add" display='flex' onClick={this.onSave}>
                      <SaveIcon/>
                        保存
                    </Fab>
                  }
                </Grid>
                <Grid >
                  <Fab variant="extended" size="medium" color="primary" aria-label="add" onClick={this.onSubmit}>
                    <PublishIcon/>
                    发表
                  </Fab>
                </Grid>
              </Stack>
            </Grid>
            <Grid  xs={12}>
              <TextField
                required
                id="title"
                label="标题"
                defaultValue="标题"
                sx={{ width: 1046 }}
                onChange={this.handleTitleChange}
              />
          </Grid>
          </Grid>
        
        <Grid container>
          <Grid>
            <Typography sx={{ fontSize: 25 }} color="text.secondary" gutterBottom>内容</Typography>
            <Editor
                id={"tincyEditor"}
                tinymceScriptSrc={'/tinymce/tinymce.min.js'}
                apiKey="sm8q2x4neqknwx5kpfjtnhx7hrbvpsdf58irtkd8fyjrhvtg"
                init={{
                plugins: 'autosave',
                autosave_ask_before_unload: false,
                image_advtab: true,
                convert_urls: false,
                language: 'zh_CN',
                width: 1046,
                min_height: 716,
                plugins: 'preview searchreplace autolink directionality visualblocks visualchars fullscreen image link template code codesample table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists wordcount imagetools textpattern help emoticons autosave autoresize formatpainter paste',
                toolbar: 'code undo redo restoredraft | cut copy paste pastetext | forecolor backcolor bold italic underline strikethrough link anchor | alignleft aligncenter alignright alignjustify outdent indent | styleselect formatselect fontselect fontsizeselect | bullist numlist | blockquote subscript superscript removeformat | table image media charmap emoticons hr pagebreak insertdatetime print preview | fullscreen | bdmap indent2em lineheight formatpainter axupimgs',
                fontsize_formats: '12px 14px 16px 18px 24px 36px 48px 56px 72px',
                paste_data_images: true,
                //编辑过程中图片上传逻辑
                images_upload_handler: (blobInfo, success, failure)=> new Promise((resolve,reject) =>{
                    if (blobInfo.blob()) {
                      const formData = new FormData();
                      formData.append('images',blobInfo.blob(),blobInfo.filename());
                      api.uploadArticleImage(formData)
                      .then((res) => {
                        if(res.data.images){
                          //成功上传后将图片插入到当前的编辑器中
                          console.log(res.data.images);
                          console.log('success', success);
                          const imgURL = APP_API_URL.slice(0,-1) + res.data.images
                          success(imgURL);
                          resolve(imgURL);
                          {notifyRes('图片保存成功')};
                        }
                      })
                      .catch((error) => {
                        {notifyErr(error.message)}
                      })
                    } else {
                      {notifyErr('error')}
                    }
                  })
                }
                }
                onEditorChange = {this.handleEditorChange}
            />
          </Grid>
        </Grid>
      </div>
    )
  }
}