<?php
namespace app\walls\controller;
use  app\walls\controller\Base;
use  app\walls\validate\LoginValidate;
use  app\walls\model\UserModel;
use  think\Cache;
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
        $_POST['password'] = md5($salt.$this->data['password']);
        $_POST['salt'] = $salt;
        $_POST['status'] = USER_STATUS_TRUE ;
        //检查账号是否唯一
        $account['account'] = $this->data['account'];
        $userId = UserModel::accountExist($account);
        //返回结果
        if ( !empty( $userId ) ) {
            $this->result(NULL,1,'该账号已被使用');
        }
        //存入数据库
        $userDb = new UserModel($_POST);
        $abc =  $userDb->allowField(true)->save();//过滤非表单字段
        $userId = $userDb->id;//这么用要求该表有且只有一个主键，否则不生效。
        //返回结果
        if ( empty( $userId ) ) {
            $this->result(NULL,1,'创建失败');
        } else {
            //存入redis
            $redis = Cache::connect(config('cache'));
            if ( !empty( $redis ) ) {
                Cache::set('accountList_'.$account['account'],$_POST['password'],172800);//记录账号密码缓存
            }
            $this->result(NULL,0,'成功');
        }
    }
    /**
     * ajax检查账号是否存在
     * @param  string  account
     * @return josn
     */
    public function checkAccount()
    {
        //获取该账号的id
        $userId = UserModel::accountExist($this->data);
        //返回结果
        if ( empty( $userId ) ) {
            $this->validateReturn(true,'success');
        } else {
            $this->validateReturn(false,'该账号已被使用');
        }

    }
    /**
     * 执行登陆操作
     *
     *
     *
     */
     public function doLogin()
     {
         //从redis查询账号密码
         
            //有，对比账号密码
                //对比
                    //正确 刷新时效 增加登录次数、把登陆信息存入redis hash
                    //错误 返还结果
            //没有，从数据库查,
                //对比
                    //正确，存入redis、增加登录次数、把登陆信息存入redis hash
                    //错误 返还结果
     }
}
