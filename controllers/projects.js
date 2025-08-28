import Projects from '../models/projects.js'
import { StatusCodes } from 'http-status-codes'
import validator from 'validator'

export const create = async (req, res) => {
  try {
    const projects = await Projects.create({
      studentName: req.body.studentName,
      title: req.body.title,
      demoUrl: req.body.demoUrl,
      imageUrl: req.body.imageUrl,
      description: req.body.description,
      sortOrder: req.body.sortOrder,
      visible: req.body.visible,
    })
    res.status(StatusCodes.CREATED).json({
      success: true,
      message: '建立成功🌹',
      projects,
    })
  } catch (err) {
    console.log('controllers/projects.js create')
    console.error(err)
    if (err.name === 'ValidationError') {
      const key = Object.keys(err.errors)[0]
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: err.errors[key].message,
      })
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: '伺服器內部錯誤',
      })
    }
  }
}

export const getAll = async (req, res) => {
  try {
    const projects = await Projects.find()
    res.status(StatusCodes.OK).json({
      success: true,
      message: 'projects列表取得成功',
      projects,
    })
  } catch (error) {
    console.log('controllers/projects.js getAll')
    console.error(error)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: '伺服器內部錯誤',
    })
  }
}

export const get = async (req, res) => {
  try {
    const projects = await Projects.find({ visible: true })
    res.status(StatusCodes.OK).json({
      success: true,
      message: 'projects列表取得成功',
      projects,
    })
  } catch (error) {
    console.log('controllers/projects.js getAll')
    console.error(error)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: '伺服器內部錯誤',
    })
  }
}

export const update = async (req, res) => {
  try {
    if (!validator.isMongoId(req.params.id)) {
      throw new Error('PROJECTS ID')
    }

    // Mongoose 方法：依 ID 更新並回傳
    const projects = await Projects.findByIdAndUpdate(
      req.params.id,
      {
        // 代表表單中送來的資料欄位（例如 name、price）
        ...req.body,
      },
      {
        // 	回傳「更新後」的新資料
        // 強制啟用 Mongoose 的欄位驗證
        new: true,
        runValidators: true,
      },

      // 若查不到對應 ID，則丟錯（走 catch）
    ).orFail(new Error('PROJECTS NOT FOUND'))

    // ✅ 成功時，回傳更新後的PROJECTS資料
    res.status(StatusCodes.OK).json({
      success: true,
      message: 'PROJECTS更新成功',
      projects,
    })
  } catch (error) {
    console.log('controllers/projects.js update')
    console.error(error)
    if (error.message === 'PROJECTS ID') {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: '無效的PROJECTS ID',
      })
    } else if (error.message === 'PROJECTS NOT FOUND') {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: 'PROJECTS不存在',
      })
    } else if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: error.errors[key].message,
      })
    } else {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: '伺服器內部錯誤',
      })
    }
  }
}

export const getId = async (req, res) => {
  try {
    // 檢查PROJECTS ID 是否有效
    if (!validator.isMongoId(req.params.id)) {
      throw new Error('PROJECTS ID')
    }

    const projects = await Projects.findById(req.params.id).orFail(new Error('PROJECTS NOT FOUND'))

    res.status(StatusCodes.OK).json({
      success: true,
      message: 'PROJECTS取得成功',
      projects,
    })
  } catch (error) {
    console.log('controllers/projects.js getId')
    console.error(error)
    if (error.message === 'PROJECTS ID') {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: '無效的PROJECTS ID',
      })
    } else if (error.message === 'PROJECTS NOT FOUND') {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: 'PROJECTS不存在',
      })
    } else {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: '伺服器內部錯誤',
      })
    }
  }
}

export const remove = async (req, res) => {
  try {
    // 檢查PROJECTS ID 是否有效
    if (!validator.isMongoId(req.params.id)) {
      throw new Error('PROJECTS ID')
    }

    await Projects.findByIdAndDelete(req.params.id).orFail(new Error('PROJECTS NOT FOUND'))

    res.status(StatusCodes.OK).json({
      success: true,
      message: 'PROJECTS刪除成功',
    })
  } catch (error) {
    console.log('controllers/projects.js remove')
    console.error(error)
    if (error.message === 'PROJECTS ID') {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: '無效的PROJECTS ID',
      })
    } else if (error.message === 'PROJECTS NOT FOUND') {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: 'PROJECTS不存在',
      })
    } else {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: '伺服器內部錯誤',
      })
    }
  }
}
