<?php
namespace app\walls\model;
use think\Model;
/**
 * 基础类文件，用于做一些基础控制
 * @author  baozi(768588658@qq.com)
 * @datetime 2017-12-07
 */
class BaseModel extends Model
{
    // 设置返回数据集的对象名
	protected $resultSetType = 'collection';
    /**
     * 初始化方法
     *
     *
     */
    protected function initialize()
    {
        //需要调用`Model`的`initialize`方法
        parent::initialize();
        //TODO:自定义的初始化
    }
}
