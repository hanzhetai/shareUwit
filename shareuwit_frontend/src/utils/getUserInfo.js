import api from "../api";

//获取用户信息函数
export default async function getUserInfo(accessToken) {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `JWT ${accessToken}`,
      'Accept': 'application/json'
    }
  };
  try{
    const {data} = await api.userInfo(config);
    console.log('获取用户信息',data);
    localStorage.setItem('username',data.username);
    localStorage.setItem('id',data.id);
  } catch(error) {
    console.log(error);
  }
};