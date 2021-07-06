const jwt = require('jsonwebtoken')
const config = require('config')

const auth = (req, res, next) => {
  try {
    const token = req.header('x-auth-token')
    if(!token) return res.status(401).json({ msg: 'No auth token' })

    const verified = jwt.verify(token, process.env.JWT_SECRET)
    if(!verified) return res.status(401).json({ msg: 'Verification failed' })

    req.user = verified.id
    next()
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const isUser = (req, res, next) => {
	try {
    const token = req.header('x-auth-token')
    if(!token) return res.status(401).json({ msg: 'No auth token' })
    
    const verified = jwt.verify(token, config.get('JWT_SECRET'))
    if(!verified) return res.status(401).json({ msg: 'Verification failed' })

    if (verified.role !== 'user') return res.status(401).json({ msg: 'Not a user' })
		next()
	} catch (err) {
	 	res.status(401).json({ error: err.message })
	}
}

module.exports = auth
module.exports = isUser
