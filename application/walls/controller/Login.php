<?php
namespace app\walls\controller;
use  app\walls\controller\Base;
use  app\walls\validate\LoginValidate;
/**
 *万事墙首页控制类
 *
 *author  baozi   2017-11-15
 */
class Login extends Base
{
    /**
    *登录页
    *
    *
    */
    public function login()
    {
        return view('login');
    }
    /**
    *注册方法
    *@param   string  registAccount   注册账号
    *@param   string  registPassword  注册密码
    *@return  json
    */
    public function regist()
    {
        //接收数据
        $data = $this->request->post();
        //验证数据
        $validate = new LoginValidate();
        if(!$validate->check($data)){
            $this->result(NULL,1,$validate->getError());
        }
        $this->result(NULL,0,'成功');
    }

}
