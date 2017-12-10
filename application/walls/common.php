<?php
use think\Request;
// +----------------------------------------------------------------------
// | wsq 万事墙
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: baozi <768588658@qq.com>
// +----------------------------------------------------------------------
/*
模块函数目录，用于存放当前模块的公共函数
*/
/**
 * 生成随机盐
 * @param  int length
 * @return string salt
 */
function createSalt($length)
{
    $str="QWERTYUIOPASDFGHJKLZXCVBNM1234567890qwertyuiopasdfghjklzxcvbnm*&^%$#@!()_+=-?><.,~`:';\\|{][}";
    $str = str_shuffle($str);
    $salt=substr($str,26,$length);
    return $salt;
}
