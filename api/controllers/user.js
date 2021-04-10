module.exports = {
  register: (req, res) => {
    res.json({username: req.user.username})
  },

  login: (req, res) => {
    res.json({username: req.user.username})
  },

  logout: (req, res) => {
    req.logout()
    res.json({message: "Logged out"})
  }
}