/*
SQLyog Ultimate v12.08 (64 bit)
MySQL - 10.1.28-MariaDB : Database - walls
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`walls` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `walls`;

/*Table structure for table `walls_comment_for_info` */

CREATE TABLE `walls_comment_for_info` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '万事墙评论编号',
  `info_id` bigint(20) NOT NULL COMMENT '万事墙编号',
  `user_id` bigint(20) NOT NULL COMMENT '评论用户id',
  `content` varchar(128) NOT NULL COMMENT '评论内容',
  `create_time` int(11) NOT NULL COMMENT '评论时间',
  PRIMARY KEY (`id`),
  KEY `id` (`id`,`info_id`,`user_id`),
  FULLTEXT KEY `content` (`content`)
) ENGINE=MyISAM AUTO_INCREMENT=1000 DEFAULT CHARSET=utf8mb4 COMMENT='万事墙信息评论表';

/*Table structure for table `walls_info` */

CREATE TABLE `walls_info` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '万事墙信息编号',
  `scholl_id` bigint(20) NOT NULL COMMENT '学校编号',
  `content` varchar(256) NOT NULL COMMENT '内容',
  `imgs` text COMMENT '图片地址',
  `address` varchar(48) DEFAULT NULL COMMENT '地点',
  `time_horizon` varchar(56) DEFAULT NULL COMMENT '时间范围',
  `create_time` int(11) unsigned NOT NULL COMMENT '创建时间',
  `update_time` int(11) DEFAULT NULL COMMENT '修改时间',
  `user_id` bigint(20) NOT NULL COMMENT '发布人id',
  PRIMARY KEY (`id`),
  KEY `id` (`id`,`scholl_id`,`user_id`),
  FULLTEXT KEY `content` (`content`,`address`)
) ENGINE=MyISAM AUTO_INCREMENT=1000 DEFAULT CHARSET=utf8mb4 COMMENT='万事墙信息表';

/*Table structure for table `walls_reply_for_user_comment` */

CREATE TABLE `walls_reply_for_user_comment` (
  `walls_comment_id` bigint(20) NOT NULL COMMENT '万事墙评论编号',
  `by_reply_user_id` bigint(20) NOT NULL COMMENT '被回复人编号',
  `reply_user_id` bigint(20) NOT NULL COMMENT '回复人编号',
  `content` varchar(128) NOT NULL COMMENT '回复内容',
  `create_time` int(11) NOT NULL COMMENT '回复时间',
  PRIMARY KEY (`walls_comment_id`),
  KEY `walls_comment_id` (`walls_comment_id`,`by_reply_user_id`,`reply_user_id`),
  FULLTEXT KEY `content` (`content`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='万事墙用户回复表';

/*Table structure for table `walls_school` */

CREATE TABLE `walls_school` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '学校编号',
  `name` varchar(128) NOT NULL COMMENT '学校名称',
  `create_time` int(11) NOT NULL COMMENT '创建时间',
  `update_time` int(11) DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`id`),
  KEY `id` (`id`,`name`)
) ENGINE=MyISAM AUTO_INCREMENT=1000 DEFAULT CHARSET=utf8 COMMENT='万事墙学校表';

/*Table structure for table `walls_user` */

CREATE TABLE `walls_user` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '用户编号',
  `account` varchar(18) NOT NULL COMMENT '用户账号',
  `password` varchar(56) NOT NULL COMMENT '用户密码',
  `salt` varchar(8) NOT NULL COMMENT '随机八位salt',
  `create_time` int(11) NOT NULL COMMENT '创建时间',
  `update_time` int(11) DEFAULT NULL COMMENT '修改时间',
  `status` tinyint(3) NOT NULL COMMENT '状态：1.正常 2.废弃',
  PRIMARY KEY (`id`),
  UNIQUE KEY `account` (`account`),
  KEY `id` (`id`),
  KEY `status` (`status`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8 COMMENT='万事墙用户表';

/*Table structure for table `walls_user_info` */

CREATE TABLE `walls_user_info` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '用户信息编号',
  `user_id` bigint(20) NOT NULL COMMENT '用户编号',
  `nickname` varchar(48) NOT NULL COMMENT '昵称',
  `header` varchar(256) DEFAULT NULL COMMENT '用户头像地址',
  `create_time` int(11) NOT NULL COMMENT '创建时间',
  `update_time` int(11) DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`id`),
  KEY `id` (`id`,`user_id`,`nickname`)
) ENGINE=MyISAM AUTO_INCREMENT=1000 DEFAULT CHARSET=utf8 COMMENT='万事墙用户信息表';

/*Table structure for table `walls_user_school` */

CREATE TABLE `walls_user_school` (
  `school_id` bigint(20) NOT NULL COMMENT '学校id',
  `user_id` bigint(20) NOT NULL COMMENT '用户id',
  `create_time` int(11) NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`school_id`),
  KEY `school_id` (`school_id`,`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=1000 DEFAULT CHARSET=utf8 COMMENT='万事墙用户学校关系表';

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
