// 确定JQ文件加载完毕
$(document).ready(function(){
    var account_min_length = 5;
    var account_max_length = 15;
    var account_regexp = /^[a-zA-Z0-9_\-]+$/ ;
    var account_regexp_error_tip = '账号只允许为字母、数字、-以及_';
    var password_min_length = 6;
    var password_max_length = 20;
    // 注册弹窗
    $('#Regist').click(function(){
        $('#RegistModal').modal('show');
    });
    $('#RegistModal').on('hidden.bs.modal', function (e) {
        $('#RegistModal input').val('');
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
                            min: account_min_length,
                            max: account_max_length,
                            message: '账号长度在'+account_min_length+'到'+account_max_length+'额字符之间'
                        },
                        /*remote: {
                            url: 'remote.php',
                            message: 'The username is not available'
                        },*/
                        regexp: {
                            regexp: account_regexp,
                            message:account_regexp_error_tip
                        }
                    }
                },
                password: {
                    validators: {
                        notEmpty: {
                            message: '密码不能为空'
                        },
                        stringLength: {
                            min: password_min_length,
                            max: password_max_length,
                            message: '密码长度在'+password_min_length+'到'+password_max_length+'额字符之间'
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
                    account: {
                        message: 'The account is not valid',
                        validators: {
                            notEmpty: {
                                message: '账号不能为空'
                            },
                            stringLength: {
                                min: account_min_length,
                                max: account_max_length,
                                message: '账号长度在'+account_min_length+'到'+account_max_length+'额字符之间'
                            },
                            /*remote: {
                                url: 'remote.php',
                                message: 'The username is not available'
                            },*/
                            regexp: {
                                regexp: account_regexp,
                                message: account_regexp_error_tip
                            }
                        }
                    },
                    password: {
                        validators: {
                            notEmpty: {
                                message: '密码不能为空'
                            },
                            stringLength: {
                                min: password_min_length,
                                max: password_max_length,
                                message: '密码长度在'+password_min_length+'到'+password_max_length+'额字符之间'
                            }
                        }
                    },
                    confirmPassword: {
                        validators: {
                            notEmpty: {
                                message: '确认密码不能为空'
                            },
                            identical: {
                                field: 'password',
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
                $('#registInputPassword').val(md5($('#registInputPassword').val()));
                $('#registConfirmPassword').val(md5($('#registInputPassword').val()));
                // Get the form instance
                var $form = $(e.target);

                // Get the BootstrapValidator instance
                var bv = $form.data('bootstrapValidator');
                // Use Ajax to submit form data
                $.post($form.attr('action'), $form.serialize(), function(result) {
                    if ( result.code !== 0 ) {
                        var alert_str = '<div class="alert alert-danger alert-dismissible text-center fade in" style="word-wrap:break-word; margin-top:2rem;"  role="alert">'+
                        '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
                            '<strong >'+result.msg+'</strong>'+
                        '</div>';
                        $('#RegistModal .modal-footer').append(alert_str);
                    } else {
                        $('#RegistModal button[type="submit"]').attr('disabled','disabled')
                        var alert_str = '<div class="alert alert-success alert-dismissible text-center fade in" style="word-wrap:break-word; margin-top:2rem;"  role="alert">'+
                        '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
                            '<strong >'+result.msg+'</strong>'+
                        '</div>';
                        $('#RegistModal .modal-footer').append(alert_str);
                        $('.alert').on('closed.bs.alert', function () {
                            $('#RegistModal').modal('hide');
                        });

                    }
                }, 'json');
            });
})      ;
