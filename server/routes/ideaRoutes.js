
const router = require("express").Router();
const auth = require("../middleware/auth");
const ctrl = require("../controllers/ideaController");

router.post("/",auth,ctrl.createIdea);
router.get("/",auth,ctrl.getIdeas);
router.patch("/:id/approve",auth,ctrl.approveIdea);
router.patch("/:id/reject",auth,ctrl.rejectIdea);

module.exports = router;
