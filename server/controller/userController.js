const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const signup = async (req, res) => {
  try {

    const { name, email,password } = req.body;
    if (!name || !email ) {
      return res.status(403).json({
        success: false,
        message: 'All fields are required',
      })
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists',
      })
    }
    let hashedPassword
    try {
      hashedPassword = await bcrypt.hash(password, 10)
    } 
    catch (error) {
      return res.status(500).json({
        success: false,
        message: `Hashing password error for ${password}: ` + error.message,
      })
    }
    console.log('Hashed Password: ', hashedPassword)
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    })
    res.status(201).json({
      status: 'success',
      message: 'User registered successfully',
      data: user,
    })

  } catch (error) {
    res.status(500).json({
      status: 'failed',
      message:
        'OOPss!!, there was some problem with user registration.... Please try again',
    })
  }
}

const signin = async (req, res) => {
    try {
      const { email, password } = req.body
      if (!email || !password) {
        res.status(500)
        throw new Error('All fields are mandatory!')
      }
      const user = await User.findOne({ email })
      //compare password with hashedpassword
  
      if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken=jwt.sign(
          {
            user: {
              username: user.username,
              email: user.email,
              id: user.id,
            },
          },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: '1h' }
        )
        res.status(200).json({ message: "Signed Up successfully", 
          accessToken
        })
      } else {
        res.status(401)
        throw new Error('Email or password is not valid')
      }
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Internal server error' })
    }
  }
module.exports={signup,signin}