<?php
namespace app\walls\controller;
use  app\walls\controller\Base;
use  app\walls\validate\LoginValidate;
use  app\walls\model\UserModel;
/**
 *万事墙首页控制类
 *
 *author  baozi   2017-11-15
 */
class Login extends Base
{
    protected $validate;
    protected $data;
    protected $noCheck = ['login'];
    /**
     *初始化方法
     */
    public function _initialize()
    {
        //实例化验证类
        $this->validate = new LoginValidate();
        //接收数据
        $this->data = $this->request->post();
        //验证数据
        if ( !in_array( $this->request->action(),$this->noCheck ) ) {//不在非验证操作里
            if( !$this->validate->scene($this->request->action())->check( $this->data ) ){//验证数据正确性
                $this->validateReturn(false,$this->validate->getError());
            }
        }
    }
    /**
    * 显示登录页
    */
    public function login()
    {
        return view('login');
    }
    /**
    * 注册方法
    * @param   string  registAccount   注册账号
    * @param   string  registPassword  注册密码
    * @return  json
    */
    public function regist()
    {
        //获取随机盐
        $salt  = createSalt(8);
        //拼装数据
        $_POST['password'] = md5($salt.$data['password']);
        $_POST['salt'] = $salt;
        //存入数据库
        $userDb = new UserModel($_POST);
        $userDb->allowField(true)->save();//过滤非表单字段
        $userId = $userDb->id;
        //返回结果
        if ( empty( $userId ) ) {
            $this->result(NULL,1,'创建失败');
        } else {
            $this->result(NULL,0,'成功');
        }
    }
    /**
     * 检查账号是否存在
     * @param  string  account
     * @return josn
     */
    public function checkAccount()
    {
        //获取该账号的id
        $userId = UserModel::where($this->data)->value('id');
        //返回结果
        if ( empty( $userId ) ) {
            $valid = true;

        } else {
            $valid = false;
            $message = '该账号已被使用';
        }
        //暂写，后续有复用，写成公共方法
        echo json_encode(
            $valid ? array('valid' => $valid) : array('valid' => $valid, 'message' => $message)
        );
    }

}
