var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'user' });
});

router.get('/reg', function (req, res, next) {
  res.render('reg', { errmsg: '' }); // 加载reg.ejs模板
});

// post方式
router.post('/reg', function (req, res, next) {
  var username = req.body.username || '',
    password = req.body.password || '',
    password2 = req.body.password2 || '';

  if (password != password2) {
    res.render('reg', { errmsg: '密码不一致' });
    return;
  }
  var password_hash = user_m.hash(password), // 对密码进行加密
    regtime = parseInt(Date.now() / 1000);

  // 数据库处理
});

var user_m = require('../models/user'); // 引入model

// post方式
router.post('/reg', function (req, res, next) {
  // 与上面的代码一样

  // 数据库处理
  user_m.reg(username, password_hash, regtime, function (result) {
    if (result.isExisted) {
      res.render('reg', { errmsg: '用户名已存在' }); // 重新加载注册模板，并提示用户名已存在
    } else if (result.affectedRows) {
      // 注册成功
      res.redirect('/');
    } else {
      // console.log('登录失败');
      res.render('reg', { errmsg: '注册失败，请重新尝试' });
    }
  });
});

module.exports = router;
