<?php
namespace app\walls\controller;
use think\Request;
use think\Controller;
include APP_PATH.'/walls/const_def.php';
/**
 *万事墙基础控制类
 *
 *author  baozi
 */
class Base extends Controller
{
    public $module;
    public $controller;
    public $action;
    /**
    *初始化加载
    */
    public function __construct()
    {
        //获取访问的控制类 模块、控制器、操作
        $request = Request::instance();
        //echo "当前模块名称是" . $request->module();
        //echo "当前控制器名称是" . $request->controller();
        //echo "当前操作名称是" . $request->action();
        //die;
        //验证是否登陆
        if ( !in_array($request->controller(),NO_LOGIN) ) {
            $this->checklogin();
        }

    }

    /**
    *验证是否登陆方法
    */
    protected function checkLogin()
    {

        //根据session判断是否是登陆状态
        if ( !empty(session('user')) )
        {//是
            //跳转至主页
            $this->redirect('Index/index');
        } else {//否
             //跳转至登录页
             $this->redirect('Login/login');
        }


    }
}
