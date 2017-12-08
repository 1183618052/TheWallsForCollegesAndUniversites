<?php
namespace app\walls\controller;
use think\Controller;
use think\Db;
include APP_PATH.'/walls/const_def.php';
/**
 * @descrption万事墙基础控制类
 *
 * @author  baozi
 */
class Base extends Controller
{
    public $db;
    /**
     * 初始化加载
     */
    protected function _initialize()
    {
        $this->db = Db::instance();
        //验证是否登陆
        if ( !in_array($this->request->controller(),NO_LOGIN) ) {
            $this->checklogin();
        }

    }

    /**
     * 验证是否登陆方法
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
