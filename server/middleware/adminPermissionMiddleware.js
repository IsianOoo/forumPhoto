function permitOnlyAdmin(req, res, next) {
	if (req.role!='admin') return res.status(403).json({ error: 'Forbidden' })
	
}

module.exports = permitOnlyAdmin
