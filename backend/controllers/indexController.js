//get landing page
const landingPage = async (req, res) => {
    res.status(200).json({msg: "This is landing page"})
}

module.exports = landingPage;