const AdminUser = require('../../models/AdminUser')

module.exports  = app => {
  
  const express = require('express')
  const router = express.Router({
    mergeParams: true
  })

  // 不能require一个固定的模式进来
  // const Category = require('../../models/Category')
  
  
  // 新增
  router.post('/', async (req,res) => {
    const model = await req.Model.create(req.body)
    res.send(model)
  }) 

  // 修改
  router.put('/:id', async (req,res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id,req.body)
    res.send(model)
  }) 

  // 删除
  router.delete('/:id', async (req,res) => {
    await req.Model.findByIdAndDelete(req.params.id,req.body)
    res.send({
      success: true
    })
  })

  // 列表
  router.get('/',async (req,res) => { 
    const queryOptions = {}
    if(req.Model.modelName === 'Category') {
      queryOptions.populate = 'parent'
    }

    // const items = await req.Model.find().populate('parent').limit(10)
    const items = await req.Model.find().setOptions(queryOptions).limit(10)
    res.send(items)
  }) 

  // 详情
  router.get('/:id', async (req,res) => {
    const model = await req.Model.findById(req.params.id)
    res.send(model)
  }) 
  
  // 登录校验中间件
  const authMiddlewar = require('../../middleware/auth');

  const resourceMiddleware = require('../../middleware/resourse')
  app.use('/admin/api/rest/:resource',authMiddlewar(),resourceMiddleware(), router)

  const multer = require('multer')
  const upload = multer({dest:__dirname + '../../../uploads'})

  app.use('/admin/api/upload',authMiddlewar(),upload.single('file'), async (req, res) =>{
    // return res.file
    const file = req.file
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(file)
  })


  //登录 login
  app.post('/admin/api/login',async (req, res) => {
    const {username, password} = req.body
    //1.根据用户名找用户
    const user = await AdminUser.findOne({username}).select('+password')   
    assert(user, 422, '用户不存在')
    //2.校验密码
    const isValid = require('bcrypt').compareSync(password,user.password)
    assert(isValid, 422, '密码错误')
    //3.返回token
    const token = jwt.sign({id: user._id},app.get('secret'))
    res.send({token})
  })


  //错误处理函数
  app.use(async (err, req, res, next) => {
    res.status(err.statusCode || 500 || err.status ).send({
      message: err.message
    })
  })

}
