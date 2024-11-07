function permitOnlyAdmin(req, res) {
	if (req.role!='admin') return res.status(403).json({ error: 'Forbidden' })
	
}

module.exports = permitOnlyAdmin
