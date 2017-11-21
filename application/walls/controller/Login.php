<?php
namespace app\walls\controller;
use  app\walls\controller\Base;
/**
 *万事墙首页控制类
 *
 *author  baozi
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
        paramCheck();
        echo $this->action;
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

    }

}
