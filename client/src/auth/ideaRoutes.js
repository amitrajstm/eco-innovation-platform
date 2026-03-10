const admin = require("../middleware/admin");

router.patch("/:id/approve", auth, admin, ctrl.approveIdea);
router.patch("/:id/reject", auth, admin, ctrl.rejectIdea);
