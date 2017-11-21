// 确定JQ文件加载完毕
$(document).ready(function(){
    // 注册弹窗
    $('#Regist').click(function(){
        $('#RegistModal').modal('show');
    });
    // 登陆验证
    $('#loginForm')
        .bootstrapValidator({
            message: 'This value is not valid',
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
                account: {
                    message: 'The account is not valid',
                    validators: {
                        notEmpty: {
                            message: '账号不能为空'
                        },
                        stringLength: {
                            min: 6,
                            max: 15,
                            message: '账号长度在6到15额字符之间'
                        },
                        /*remote: {
                            url: 'remote.php',
                            message: 'The username is not available'
                        },*/
                        regexp: {
                            regexp: /^[a-zA-Z0-9_\.]+$/,
                            message: '账号只允许为字母、数字、点以及下划线'
                        }
                    }
                },
                password: {
                    validators: {
                        notEmpty: {
                            message: '密码不能为空'
                        },
                        stringLength: {
                            min: 6,
                            max: 20,
                            message: '密码长度在6到20额字符之间'
                        }
                    }
                }
            }
        })
        .on('success.form.bv', function(e) {
            // Prevent form submission
            e.preventDefault();

            // Get the form instance
            var $form = $(e.target);

            // Get the BootstrapValidator instance
            var bv = $form.data('bootstrapValidator');

            // Use Ajax to submit form data
            $.post($form.attr('action'), $form.serialize(), function(result) {
                console.log(result);
            }, 'json');
        });
        // 注册验证
        $('#registForm')
            .bootstrapValidator({
                message: 'This value is not valid',
                feedbackIcons: {
                    valid: 'glyphicon glyphicon-ok',
                    invalid: 'glyphicon glyphicon-remove',
                    validating: 'glyphicon glyphicon-refresh'
                },
                fields: {
                    registAccount: {
                        message: 'The account is not valid',
                        validators: {
                            notEmpty: {
                                message: '账号不能为空'
                            },
                            stringLength: {
                                min: 6,
                                max: 15,
                                message: '账号长度在6到15额字符之间'
                            },
                            /*remote: {
                                url: 'remote.php',
                                message: 'The username is not available'
                            },*/
                            regexp: {
                                regexp: /^[a-zA-Z0-9_\.]+$/,
                                message: '账号只允许为字母、数字、点以及下划线'
                            }
                        }
                    },
                    registPassword: {
                        validators: {
                            notEmpty: {
                                message: '密码不能为空'
                            },
                            stringLength: {
                                min: 6,
                                max: 20,
                                message: '密码长度在6到20额字符之间'
                            }
                        }
                    },
                    registConfirmPassword: {
                        validators: {
                            notEmpty: {
                                message: '确认密码不能为空'
                            },
                            identical: {
                                field: 'registPassword',
                                message: '两次输入密码不一致'
                            }
                        }
                    }
                }
            })
            .on('success.form.bv', function(e) {
                // Prevent form submission
                e.preventDefault();
                //密码加密
                $('#registInputPassword').val() = md5($('#registInputPassword').val());
                // Get the form instance
                var $form = $(e.target);

                // Get the BootstrapValidator instance
                var bv = $form.data('bootstrapValidator');

                // Use Ajax to submit form data
                $.post($form.attr('action'), $form.serialize(), function(result) {
                    console.log(result);
                }, 'json');
            });
});
