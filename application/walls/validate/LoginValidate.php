<?php
namespace app\walls\validate;
use think\Validate;
/**
* 登陆验证 类
*
* @author         baozi<768588658@qq.com>
*/
class LoginValidate extends Validate
{
    //验证规则
    protected $rule =   [
        'account'  => 'require|max:15|min:6|alphaDash',
        'password'   => 'require|length:32',
    ];
    //错误提示信息
    protected $message  =   [
        'account.require' => '账号必须',
        'name.max'     => '账号最多不能超过15个字符',
        'password.require'   => '密码必须',
        'password.length'  => '密码不是MD5且32长度',
    ];
    //场景  因为会设定不区分大小写url，所以这里统一使用小写场景
    protected $scene = [
        'regist'  =>  ['account','password'],
        'checkaccount'=>['account'],
        'dologin'  =>  ['account','password']
    ];

}
